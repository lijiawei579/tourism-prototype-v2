'use strict';
// Numeric entry and advisory bands are shared by configuration, preview and expert scoring.
const NS_TYPES={qualification:'达标判断',condition:'条件判断（计分）',multiple:'多选题', 'quantity-add':'数量计分题',manual:'人工评分题'};
const nsClone=value=>JSON.parse(JSON.stringify(value));
const nsNumeric=item=>['single','band-range','manual','integrity'].includes(item.mode)&&nsNormalize(item).mode==='manual';
function nsNormalize(original){
  const item=nsClone(original);item.options??=[];
  if(item.numericEntryVersion)return item;
  if(['single','band-range','integrity'].includes(item.mode)){
    item.legacyMode=item.mode;
    const space=item.mode==='integrity'?(item.spaceScore??5):0;
    item.advisoryBands=item.options.map(option=>({key:option.key,label:option.label,min:(option.min??option.score)+space,max:option.score+space}));
    if(item.mode==='integrity'){
      item.integrityReference=true;
      item.zeroRule??='资源实体不在完整相连的空间范围内，本项不得分。';
      item.advisoryBands.forEach(band=>band.label='空间完整（'+space+'分）＋'+band.label);
      item.integrity=false;
    }
    item.mode='manual';item.step??=1;
  }
  // These clauses explicitly state their bands/counting rule in the supplied standard.
  if(item.mode==='manual'&&!item.adjusted){
    const bands={
      '1.Q032':[[3,'即到即停'],[2,'排队等候时间在半小时以内'],[1,'排队等候时间在1小时以内'],[0,'排队等候时间在1小时以上']],
      '1.Q034':[[3,'新能源汽车充电桩数量完全满足需要'],[2,'基本满足需要'],[1,'仅少量满足需要']],
      '7.Q031':[[4,'输电、通信线路等全部采用地下隐蔽方式'],[2,'架空线路整齐、不破坏视觉效果']]
    }[item.id];
    if(bands)item.advisoryBands=bands.map(([score,label],index)=>({key:item.id+'-advice-'+index,label,min:score,max:score}));
    if(item.id==='3.Q051'){
      item.mode='quantity-add';item.unit=1;item.countLabel='提供工具与用品的类别数量';item.advisoryBands=[];
    }
  }
  if(item.mode==='manual'){
    item.step??=1;
    item.advisoryBands??=[{key:item.id+'-full',label:item.note||item.title,min:item.max,max:item.max}];
    if(!item.advisoryBands.some(band=>band.min===0&&band.max===0))item.advisoryBands.push({key:item.id+'-zero',label:'以上条件均不满足',min:0,max:0});
    item.advisoryBands.sort((a,b)=>b.max-a.max);
  }
  item.numericEntryVersion=1;return item;
}
function nsBands(item){return nsNormalize(item).advisoryBands||[];}
function nsScore(item,answer){
  if(answer.numericInvalid)return undefined;
  if(!answer.directNumeric&&[item.mode,item.legacyMode].includes('integrity')&&answer.integrity===false)return 0;
  if(Object.hasOwn(answer,'rawScore'))return answer.rawScore===''?undefined:Number(answer.rawScore);
  if(Object.hasOwn(answer,'score'))return answer.score===''?undefined:Number(answer.score);
  if(item.mode==='single')return scOptions(item).find(option=>option.key===answer.option)?.score;
  if(item.mode==='integrity'){const option=item.options.find(option=>option.key===answer.option);return answer.integrity===false?0:answer.integrity===true&&option?(item.spaceScore??5)+Number(option.score):undefined;}
}
function nsAdvice(item,answer){
  const bands=nsBands(item),score=nsScore(item,answer),valid=Number.isFinite(score)&&score>=0&&score<=item.max;
  return `<section class="ns-advice" data-ns-advice><div class="ns-advice-title"><strong>评分建议</strong><span>填写分数后自动匹配，无需选择档次</span></div><div class="ns-band-list">${bands.map((band,index)=>`<div class="ns-band ${valid&&score>=band.min&&score<=band.max?'is-matched':''}" data-ns-band="${index}" data-ns-min="${band.min}" data-ns-max="${band.max}" aria-current="${valid&&score>=band.min&&score<=band.max}"><b>${band.min===band.max?band.max:band.min+'—'+band.max}分</b><span>${esc(band.label)}</span><small data-ns-match>${valid&&score>=band.min&&score<=band.max?'当前匹配':''}</small></div>`).join('')}</div><p class="helper" data-ns-feedback aria-live="polite">${nsFeedback(item,score,bands)}</p></section>`;
}
function nsFeedback(item,score,bands){
  if(!Number.isFinite(score))return '请直接填写数字分数。';
  if(score<0||score>item.max)return `分数须在0—${item.max}之间。`;
  return bands.some(band=>score>=band.min&&score<=band.max)?'已高亮对应的评分建议；最终分数以专家填写为准。':'当前分数未命中建议档次，请对照原文核验并填写评分依据。';
}
function nsSync(root,item,answer){
  if(!root)return;const score=nsScore(item,answer),valid=Number.isFinite(score)&&score>=0&&score<=item.max;
  root.querySelectorAll('[data-ns-band]').forEach(row=>{const matched=valid&&score>=Number(row.dataset.nsMin)&&score<=Number(row.dataset.nsMax);row.classList.toggle('is-matched',matched);row.setAttribute('aria-current',String(matched));row.querySelector('[data-ns-match]').textContent=matched?'当前匹配':'';});
  const feedback=root.querySelector('[data-ns-feedback]');if(feedback)feedback.textContent=nsFeedback(item,score,nsBands(item));
  const input=root.querySelector('[data-ns-numeric]');if(input){const issue=scAnswerIssue(item,answer);input.setAttribute('aria-invalid',String(!!issue));input.setCustomValidity(issue||'');}
}
function nsBandEditor(item){return `<h3>评分建议档次</h3><p class="helper">建议仅用于对照和高亮，不再显示单选按钮。固定分档的最低分与最高分填相同数字；没有明确档次时保留原文，不编造档次。</p><div class="ns-band-editor"><div class="ns-band-head"><span>建议描述</span><span>最低分</span><span>最高分</span><span>操作</span></div>${(item.advisoryBands||[]).map((band,index)=>`<div class="ns-band-row" data-ns-edit-band="${index}"><textarea aria-label="建议${index+1}描述">${esc(band.label)}</textarea><input type="number" min="0" step="any" aria-label="建议${index+1}最低分" value="${band.min}"><input type="number" min="0" step="any" aria-label="建议${index+1}最高分" value="${band.max}"><button class="btn small" data-action="ns-band-delete" data-index="${index}">删除</button></div>`).join('')}</div><button class="btn" data-action="ns-band-add">+ 添加评分建议</button>`;}
function nsEditorModes(selected){return Object.entries(NS_TYPES).map(([mode,label])=>`<option value="${mode}" ${mode===(selected.startsWith('quantity-')?'quantity-add':selected)?'selected':''}>${label}</option>`).join('');}
function nsInitialize(){
  if(window.NS_READY||!window.QB_READY||!db.questionBank)return;window.NS_READY=true;
  for(const key of Object.keys(SC_MODE_NAMES))Object.defineProperty(SC_MODE_NAMES,key,{value:NS_TYPES[key]||(['single','band-range','integrity'].includes(key)?'人工评分题':'数量计分题'),writable:true,configurable:true,enumerable:Object.hasOwn(NS_TYPES,key)});
  // Append versions for future bindings; never rewrite old table versions, answers or signatures.
  for(const entry of Object.values(db.scoringLibrary.tables)){
    if(entry.published.numericEntryVersion&&entry.published.statisticsOnly)continue;
    if(!entry.versions.length){if(entry.draft){entry.draft.items=entry.draft.items.map(nsNormalize);qbUseStatistics(entry.draft);}continue;}
    const table=nsClone(entry.published);table.items=table.items.map(nsNormalize);table.numericEntryVersion=1;qbUseStatistics(table);
    table.version=Math.max(table.version,...entry.versions.map(version=>version.version))+1;table.at='2026-11-06';table.by='题型交互升级';
    entry.versions.push(nsClone(table));entry.published=table;
    if(entry.draft){entry.draft.items=entry.draft.items.map(nsNormalize);entry.draft.numericEntryVersion=1;qbUseStatistics(entry.draft);}
  }
  for(const [id,question] of Object.entries(db.questionBank.questions))if(!question.numericEntryVersion){const revised=nsNormalize(question);revised.revision=(question.revision||0)+1;db.questionBank.questions[id]=revised;}
  for(const entry of Object.values(db.scoringLibrary.tables))for(const table of [entry.published,entry.draft].filter(Boolean))for(const item of table.items){const bank=db.questionBank.questions[item.bankId];if(bank)item.bankRevision=bank.revision;}
  const base=scBaseAnswerScore;scBaseAnswerScore=(item,answer)=>nsNumeric(item)?nsScore(item,answer):item.mode==='manual'&&nsNormalize(item).mode.startsWith('quantity-')?(answer.count===undefined?answer.score:base(nsNormalize(item),answer)):base(item,answer);
  const effective=scAnswerScore;scAnswerScore=(item,answer)=>answer.zero&&nsNumeric(item)&&nsNormalize(item).zeroRule?0:effective(item,answer);
  const controls=scControls;scControls=(item,answer={},prefix='sc-answer')=>{
    if(!nsNumeric(item)){const projected=nsNormalize(item);return controls(projected,projected.mode.startsWith('quantity-')&&answer.count===undefined?{...answer,count:Number.isFinite(answer.score)?answer.score/projected.unit:''}:answer,prefix);}
    const projected=nsNormalize(item),markup=controls({...projected,mode:'manual'}, {...answer,score:nsScore(item,answer)},prefix);
    return nsAdvice(projected,answer)+markup.replace('data-sc-number="score"','data-ns-numeric data-sc-number="score" inputmode="decimal" autocomplete="off"').replace('本项实际评分（','专家填写分数（');
  };
  const apply=scApplyInput;scApplyInput=(item,answer,element)=>{
    if(!nsNumeric(item))return apply(nsNormalize(item),answer,element);
    const projected=nsNormalize(item);if(element.dataset.scNumber==='score'){
      const text=element.value;answer.numericInvalid=!!text&&!/^\d+(?:\.\d+)?$/.test(text);answer.rawScore=answer.score=text===''?'':Number(text);answer.directNumeric=true;delete answer.option;
    }
    apply(projected,answer,element);
    if(element.dataset.scNumber==='score'&&element.value===''){answer.rawScore='';delete answer.score;}
    if(answer.numericInvalid)delete answer.score;
    const score=nsScore(projected,answer),matching=nsBands(projected).filter(band=>Number.isFinite(score)&&score>=band.min&&score<=band.max);
    answer.label=matching.map(band=>band.label).join('；')||`专家填写${Number.isFinite(score)?score:'未填'}分`;
    nsSync(element.closest?.('[data-sm-question],[data-sc-preview-item],[data-question]'),projected,answer);return answer;
  };
  const issue=scAnswerIssue;scAnswerIssue=(item,answer={})=>issue(nsNormalize(item),answer);
  const sync=scSyncControls;scSyncControls=(root,item,answer)=>{sync(root,nsNumeric(item)?nsNormalize(item):item,answer);if(nsNumeric(item))nsSync(root,item,answer);};
  const modeFields=scModeFields;scModeFields=item=>{
    if(item.mode==='manual')return `<p class="ns-type-hint">专家直接填写数字；建议档次自动高亮，不作为可点击选项。</p><div class="form-grid">${scInput('scMax','本项满分 *',item.max,'number')}${scInput('scStep','给分步长 *',item.step??1,'number')}</div>${nsBandEditor(item)}<div class="form-grid">${scInput('scItemLimit','条件限分规则',item.limitRule,'textarea')}${scInput('scCapScore','触发条件时最高得分',item.capScore??'','number')}</div>`;
    const markup=modeFields(item);if(item.mode.startsWith('quantity-'))return `<p class="ns-type-hint">填写数量后自动计算得分，可分别配置按数量加分或扣分。</p><label class="field"><span>数量计分方向</span><select name="nsQuantityDirection"><option value="quantity-add" ${item.mode==='quantity-add'?'selected':''}>按数量加分（从0分起，最高本题满分）</option><option value="quantity-deduct" ${item.mode==='quantity-deduct'?'selected':''}>按数量扣分（从满分起，最低0分）</option></select></label>`+markup;
    return (item.mode==='qualification'?'<p class="ns-type-hint">只记录达标或不达标，不填写数值分数。</p>':item.mode==='multiple'?'<p class="ns-type-hint">各条件可多选，选中分值相加，最高不超过本项满分。</p>':'<p class="ns-type-hint">满足条件得配置分，不满足得0分；如需直接填写分数，请选人工评分题。</p>')+markup;
  };
  const readEdit=scReadEditing;scReadEditing=()=>{readEdit();const item=state.scEditing;if(!item)return;
    if(item.mode==='manual')item.advisoryBands=[...document.querySelectorAll('[data-ns-edit-band]')].map((row,index)=>{const inputs=row.querySelectorAll('textarea,input');return {key:item.advisoryBands?.[index]?.key||item.id+'-advice-'+index,label:inputs[0].value.trim(),min:inputs[1].value===''?NaN:Number(inputs[1].value),max:inputs[2].value===''?NaN:Number(inputs[2].value)};});
    if(item.mode.startsWith('quantity-')&&document.querySelector('[name="nsQuantityDirection"]'))item.mode=read('nsQuantityDirection');
  };
  const validation=scValidation;scValidation=tables=>{
    const errors=validation(tables);
    for(const table of tables)for(const original of table.items){const item=original.numericEntryVersion?original:nsNormalize(original);if(item.mode==='manual'){
      const bands=item.advisoryBands||[];if(!bands.length)errors.push({table:table.id,item:item.id,message:'人工评分题至少需要一条评分建议'});
      for(const band of bands)if(!band.label?.trim()||!Number.isFinite(band.min)||!Number.isFinite(band.max)||band.min<0||band.max>item.max||band.min>band.max)errors.push({table:table.id,item:item.id,message:'评分建议描述必填，区间须在0至本题满分之间，最低分不能大于最高分'});
      for(let a=0;a<bands.length;a++)for(let b=a+1;b<bands.length;b++)if(Math.max(bands[a].min,bands[b].min)<=Math.min(bands[a].max,bands[b].max))errors.push({table:table.id,item:item.id,message:'评分建议区间不能重叠，请明确每个分值对应的档次'});
    }}return errors;
  };
  const edit=qbEditQuestion;qbEditQuestion=(...args)=>{edit(...args);state.scEditing=nsNormalize(state.scEditing);const selector=document.querySelector('[name="scMode"]');selector.innerHTML=nsEditorModes(state.scEditing.mode);selector.disabled=false;document.getElementById('scModeFields').innerHTML=scModeFields(state.scEditing);};
  const filtered=qbFiltered;qbFiltered=(picker=false)=>{if(picker||state.qbMode!=='quantity-add')return filtered(picker);const mode=state.qbMode;try{state.qbMode='';return filtered().filter(question=>question.mode.startsWith('quantity-'));}finally{state.qbMode=mode;}};
  document.addEventListener('change',event=>{
    const element=event.target;
    if(element.name==='scMode'){
      event.stopImmediatePropagation();scReadEditing();const item=state.scEditing;item.mode=element.value;item.numericEntryVersion=1;
      if(item.mode==='qualification')item.max=0;else if(item.max===0)item.max=1;
      if(item.mode==='manual'){item.step??=1;item.advisoryBands??=[{key:item.id+'-advice',label:item.note||'符合本项要求',min:item.max,max:item.max},{key:item.id+'-none',label:'以上条件均不满足',min:0,max:0}];}
      if(item.mode==='condition')item.options=[{key:item.id+'-met',label:item.note||'符合本项要求',score:item.max,min:item.max}];
      if(item.mode==='multiple'&&!item.options.length)item.options=[{key:item.id+'-choice',label:'符合本项条件',score:item.max,min:item.max}];
      if(item.mode.startsWith('quantity-')){item.unit??=1;item.countLabel??='符合条件数量';}
      document.getElementById('scModeFields').innerHTML=scModeFields(item);
    }
    if(element.name==='nsQuantityDirection'){scReadEditing();document.getElementById('scModeFields').innerHTML=scModeFields(state.scEditing);}
  },true);
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action^="ns-band-"]');if(!button||button.disabled||state.role!=='admin')return;event.stopImmediatePropagation();event.preventDefault();scReadEditing();const item=state.scEditing;
    if(button.dataset.action==='ns-band-add')item.advisoryBands.push({key:'advice-'+Date.now(),label:'新增评分建议',min:0,max:0});else item.advisoryBands.splice(Number(button.dataset.index),1);
    document.getElementById('scModeFields').innerHTML=scModeFields(item);
  },true);
  document.addEventListener('keydown',event=>{if(event.target.matches('[data-ns-numeric]')&&['e','E','+','-'].includes(event.key))event.preventDefault();},true);
  document.addEventListener('paste',event=>{if(event.target.matches('[data-ns-numeric]')&&!/^\d*(?:\.\d*)?$/.test(event.clipboardData?.getData('text')||''))event.preventDefault();},true);
  document.addEventListener('input',event=>{const element=event.target;if(element.matches('[data-ns-numeric]')&&!element.disabled)element.dispatchEvent(new Event('change',{bubbles:true}));},true);
  save();
}
