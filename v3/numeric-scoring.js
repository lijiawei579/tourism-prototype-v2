'use strict';
// Configuration captures questions and advice. Experts own every judgement and score.
const NS_TYPES={qualification:'达标判断',manual:'人工评分'};
const nsClone=value=>JSON.parse(JSON.stringify(value));
const nsNumeric=item=>item.mode!=='qualification';
function nsNormalize(original){
  const item=nsClone(original);if(item.humanScoringVersion)return item;
  item.options??=[];
  if(item.mode!=='qualification'){
    const old=item.mode;item.legacyMode??=old;
    if(!item.adjusted&&!item.advisoryBands){const bands={'1.Q032':[[3,'即到即停'],[2,'排队等候时间在半小时以内'],[1,'排队等候时间在1小时以内'],[0,'排队等候时间在1小时以上']],'1.Q034':[[3,'新能源汽车充电桩数量完全满足需要'],[2,'基本满足需要'],[1,'仅少量满足需要']],'7.Q031':[[4,'输电、通信线路等全部采用地下隐蔽方式'],[2,'架空线路整齐、不破坏视觉效果']]}[item.id];if(bands)item.advisoryBands=bands.map(([score,label],index)=>({key:item.id+'-advice-'+index,label,min:score,max:score}));}
    if(!item.advisoryBands&&['single','band-range','integrity','condition'].includes(old)){
      const space=old==='integrity'?(item.spaceScore??5):0;
      item.advisoryBands=item.options.map(option=>({key:option.key,label:(space?'空间完整（'+space+'分）＋':'')+option.label,min:(option.min??option.score)+space,max:option.score+space}));
    }
    const reference=[];
    if(old==='multiple')reference.push('原文参考：'+item.options.map(option=>option.label+'（'+option.score+'分）').join('；'));
    if(old.startsWith('quantity-'))reference.push('原文参考：每'+(item.countLabel||'项')+(old==='quantity-add'?'加':'扣')+item.unit+'分，满分'+item.max+'分；请由专家核验后填写实际分数。');
    for(const key of ['zeroRule','limitRule','exemption'])if(item[key])reference.push('原文参考：'+item[key]);
    if(reference.length)item.note=[item.note,...reference].filter(Boolean).join('\n');
    item.mode='manual';item.step=1;item.advisoryBands??=[];
    if(item.advisoryBands.length&&!item.advisoryBands.some(band=>band.min===0&&band.max===0))item.advisoryBands.push({key:item.id+'-none',label:'以上条件均不满足',min:0,max:0});
    item.advisoryBands.sort((a,b)=>b.max-a.max);
  }
  for(const key of ['zeroRule','limitRule','capScore','exemption','unit','countLabel','integrity','spaceScore'])delete item[key];
  item.humanScoringVersion=1;item.numericEntryVersion=1;return item;
}
function nsBands(item){return nsNormalize(item).advisoryBands||[];}
function nsScore(item,answer={}){
  if(answer.numericInvalid)return undefined;
  for(const key of ['rawScore','score'])if(Object.hasOwn(answer,key))return answer[key]===''?undefined:Number(answer[key]);
}
function nsFeedback(item,score,bands){
  if(!Number.isFinite(score))return '请由专家直接填写分数。';
  if(score<0||score>item.max)return `分数须在0—${item.max}之间。`;
  return bands.some(band=>score>=band.min&&score<=band.max)?'已高亮对应建议，实际得分以专家填写为准。':'实际得分以专家填写为准，评分建议不限制给分。';
}
function nsAdvice(item,answer){
  const bands=nsBands(item);if(!bands.length)return '';
  const score=nsScore(item,answer),valid=Number.isFinite(score)&&score>=0&&score<=item.max;
  return `<section class="ns-advice" data-ns-advice><div class="ns-advice-title"><strong>评分建议</strong><span>仅供参考，由专家自主给分</span></div><div class="ns-band-list">${bands.map((band,index)=>`<div class="ns-band ${valid&&score>=band.min&&score<=band.max?'is-matched':''}" data-ns-band="${index}" data-ns-min="${band.min}" data-ns-max="${band.max}" aria-current="${valid&&score>=band.min&&score<=band.max}"><b>${band.min===band.max?band.max:band.min+'—'+band.max}分</b><span>${esc(band.label)}</span><small data-ns-match>${valid&&score>=band.min&&score<=band.max?'当前匹配':''}</small></div>`).join('')}</div><p class="helper" data-ns-feedback aria-live="polite">${nsFeedback(item,score,bands)}</p></section>`;
}
function nsSync(root,item,answer){
  if(!root)return;const score=nsScore(item,answer),valid=Number.isFinite(score)&&score>=0&&score<=item.max;
  root.querySelectorAll('[data-ns-band]').forEach(row=>{const matched=valid&&score>=Number(row.dataset.nsMin)&&score<=Number(row.dataset.nsMax);row.classList.toggle('is-matched',matched);row.setAttribute('aria-current',String(matched));row.querySelector('[data-ns-match]').textContent=matched?'当前匹配':'';});
  const feedback=root.querySelector('[data-ns-feedback]');if(feedback)feedback.textContent=nsFeedback(item,score,nsBands(item));
  const input=root.querySelector('[data-ns-numeric]');if(input){const issue=scAnswerIssue({...item,humanScoringVersion:1},answer);input.setAttribute('aria-invalid',String(!!issue));input.setCustomValidity(issue||'');}
}
function nsBandEditor(item){return `<details class="ns-optional-advice" ${item.advisoryBands?.length?'open':''}><summary>评分建议（选填）</summary><p class="helper">可不配置。分档仅用于对照和高亮，不自动改分，也不限制专家在题目范围内填分。</p><div class="ns-band-editor"><div class="ns-band-head"><span>建议描述</span><span>最低分</span><span>最高分</span><span>操作</span></div>${(item.advisoryBands||[]).map((band,index)=>`<div class="ns-band-row" data-ns-edit-band="${index}"><textarea aria-label="建议${index+1}描述">${esc(band.label)}</textarea><input type="number" min="0" step="any" aria-label="建议${index+1}最低分" value="${band.min}"><input type="number" min="0" step="any" aria-label="建议${index+1}最高分" value="${band.max}"><button class="btn small" data-action="ns-band-delete" data-index="${index}">删除</button></div>`).join('')}</div><button class="btn" data-action="ns-band-add">+ 添加评分建议</button></details>`;}
function nsEditorModes(selected){return Object.entries(NS_TYPES).map(([mode,label])=>`<option value="${mode}" ${mode===selected?'selected':''}>${label}</option>`).join('');}
function nsInitialize(){
  if(window.NS_READY||!window.QB_READY||!db.questionBank)return;window.NS_READY=true;
  for(const key of Object.keys(SC_MODE_NAMES))Object.defineProperty(SC_MODE_NAMES,key,{value:NS_TYPES[key]||'人工评分',writable:true,configurable:true,enumerable:Object.hasOwn(NS_TYPES,key)});
  for(const entry of Object.values(db.scoringLibrary.tables)){
    if(entry.published.humanScoringVersion)continue;
    const upgrade=table=>{table.items=table.items.map(nsNormalize);table.groups.forEach(group=>{delete group.zeroRule;delete group.exemption;});table.humanScoringVersion=1;table.numericEntryVersion=1;qbUseStatistics(table);return table;};
    if(entry.versions.length){const table=upgrade(nsClone(entry.published));table.version=Math.max(table.version,...entry.versions.map(version=>version.version))+1;table.at='2026-11-09';table.by='人工评分配置精简';entry.versions.push(nsClone(table));entry.published=table;}
    else upgrade(entry.published);
    if(entry.draft)upgrade(entry.draft);
  }
  for(const [id,question] of Object.entries(db.questionBank.questions))if(!question.humanScoringVersion){const revised=nsNormalize(question);revised.revision=(question.revision||0)+1;db.questionBank.questions[id]=revised;}
  const baseScore=scAnswerScore;scAnswerScore=(item,answer={})=>item.mode==='qualification'?null:item.humanScoringVersion||answer.directNumeric?nsScore(item,answer):baseScore(item,answer);
  const calculate=scCalculate;scCalculate=(table,answers,checks={})=>table.kind==='numeric'&&(table.humanScoringVersion||Object.values(answers).some(answer=>answer.directNumeric))?Math.round(table.items.reduce((sum,item)=>sum+(Number(scAnswerScore(item,answers[item.id]||{}))||0),0)*100)/100:calculate(table,answers,checks);
  const controls=scControls;scControls=(original,answer={},prefix='sc-answer')=>{
    const item=nsNormalize(original);if(item.mode==='qualification')return controls(item,answer,prefix);
    const score=nsScore(item,answer);return nsAdvice(item,answer)+`<label class="field"><span>专家填写分数（0—${item.max}分）</span><input type="number" min="0" max="${item.max}" step="any" data-${prefix}="${esc(item.id)}" data-ns-numeric data-sc-number="score" inputmode="decimal" autocomplete="off" value="${score??''}"></label>`;
  };
  const apply=scApplyInput;scApplyInput=(item,answer,element)=>{
    if(item.mode==='qualification')return apply(item,answer,element);
    if(element.dataset.scNumber==='score'){
      const text=element.value;answer.numericInvalid=element.validity?.badInput||!!text&&!/^\d+(?:\.\d+)?$/.test(text);answer.rawScore=text===''?'':Number(text);answer.directNumeric=true;
      for(const key of ['zero','exempt','limit','option','options','count','integrity'])delete answer[key];
      if(text===''||answer.numericInvalid)delete answer.score;else answer.score=Number(text);
      const score=nsScore(item,answer);answer.label=Number.isFinite(score)?'专家填写'+score+'分':'尚未评分';
    }
    nsSync(element.closest?.('[data-sm-question],[data-sc-preview-item],[data-question]'),item,answer);return answer;
  };
  const issue=scAnswerIssue;scAnswerIssue=(item,answer={})=>item.mode!=='qualification'&&(item.humanScoringVersion||answer.directNumeric)?(!Number.isFinite(nsScore(item,answer))||nsScore(item,answer)<0||nsScore(item,answer)>item.max?'请填写0至本题满分之间的数字':null):issue(item,answer);
  const sync=scSyncControls;scSyncControls=(root,item,answer)=>{if(item.mode==='qualification')sync(root,item,answer);else nsSync(root,item,answer);};
  scGroupControls=()=>'';
  const effective=smEffectiveLabel;smEffectiveLabel=(table,item,answer,checks)=>item.mode==='qualification'?effective(table,item,answer,checks):table.humanScoringVersion||answer.directNumeric?`${scAnswerScore(item,answer)??'待填'} / ${item.max}分`:effective(table,item,answer,checks);
  scModeFields=original=>{const item=nsNormalize(original);return item.mode==='qualification'?'<p class="ns-type-hint">专家自主选择达标或不达标，不计分。</p>':`<div class="form-grid">${scInput('scMax','本题满分 *',item.max,'number')}</div>${nsBandEditor(item)}`;};
  scReadEditing=()=>{const item=state.scEditing;if(!item)return;item.title=read('scTitle');item.groupId=read('scItemGroup');item.max=item.mode==='qualification'?0:Number(read('scMax'));item.step=1;item.humanScoringVersion=1;item.numericEntryVersion=1;
    if(item.mode==='manual')item.advisoryBands=[...document.querySelectorAll('[data-ns-edit-band]')].map((row,index)=>{const inputs=row.querySelectorAll('textarea,input');return {key:item.advisoryBands?.[index]?.key||item.id+'-advice-'+index,label:inputs[0].value.trim(),min:inputs[1].value===''?NaN:Number(inputs[1].value),max:inputs[2].value===''?NaN:Number(inputs[2].value)};});
    for(const key of ['zeroRule','limitRule','capScore','exemption','unit','countLabel','integrity','spaceScore'])delete item[key];
  };
  const validation=scValidation;scValidation=tables=>{const sanitized=tables.map(table=>({...table,items:table.items.map(nsNormalize),groups:table.groups.map(group=>({...group,zeroRule:null,exemption:null}))}));const errors=validation(sanitized);
    for(const table of sanitized){if(table.scoreEnabled&&(!Number.isFinite(table.total)||table.total<=0))errors.push({table:table.id,message:'请在题库详情填写大于0的问卷总分'});for(const item of table.items){if(item.mode==='manual'&&item.max<=0)errors.push({table:table.id,item:item.id,message:'本题满分须大于0'});for(const band of item.advisoryBands||[])if(!band.label?.trim()||!Number.isFinite(band.min)||!Number.isFinite(band.max)||band.min<0||band.max>item.max||band.min>band.max)errors.push({table:table.id,item:item.id,message:'请填写建议描述，建议分数须在0至本题满分之间'});}}return errors;};
  const edit=qbEditQuestion;qbEditQuestion=(...args)=>{edit(...args);state.scEditing=nsNormalize(state.scEditing);const selector=document.querySelector('[name="scMode"]');selector.innerHTML=nsEditorModes(state.scEditing.mode);selector.disabled=false;selector.closest('.field').querySelector('span').textContent='题目类型 *';document.getElementById('scModeFields').innerHTML=scModeFields(state.scEditing);
    document.querySelectorAll('[name="scItemZero"],[name="scItemExempt"]').forEach(input=>input.closest('.field').remove());const note=document.querySelector('[name="scNote"]');note?.closest('.form-grid').remove();document.querySelectorAll('#modalBody .qb-config-note,#modalBody .sc-source').forEach(element=>element.remove());
  };
  scEditGroup=(adding=false)=>{const table=scCurrentTable(),group=adding?null:table.groups.find(group=>group.id===state.scGroup);state.scEditGroup=group?.id||null;openModal(group?'编辑评分组':'新增评分组',table.name,`<div class="form-grid">${scInput('scGroupName','评分组名称 *',group?.name||'新增评分组')}<label class="field"><span>上级评分组</span><select name="scParent"><option value="">无上级</option>${scGroupOptions(table,group?.parentId,group?[group.id,...scDescendants(table,group.id)]:[])}</select></label>${scInput('scGroupNote','分组说明（选填）',group?.note,'textarea')}</div>`,scButton('取消','cancel')+scButton('保存分组','group-save'));};
  document.addEventListener('change',event=>{if(event.target.name!=='scMode')return;event.stopImmediatePropagation();scReadEditing();const item=state.scEditing;item.mode=event.target.value;if(item.mode==='qualification')item.max=0;else if(!item.max)item.max=1;document.getElementById('scModeFields').innerHTML=scModeFields(item);},true);
  document.addEventListener('click',event=>{const button=event.target.closest('[data-action^="ns-band-"]');if(!button||button.disabled||state.role!=='admin')return;event.stopImmediatePropagation();event.preventDefault();scReadEditing();const item=state.scEditing;item.advisoryBands??=[];if(button.dataset.action==='ns-band-add')item.advisoryBands.push({key:'advice-'+Date.now(),label:'',min:0,max:0});else item.advisoryBands.splice(Number(button.dataset.index),1);document.getElementById('scModeFields').innerHTML=scModeFields(item);},true);
  document.addEventListener('keydown',event=>{if(event.target.matches('[data-ns-numeric]')&&['e','E','+','-'].includes(event.key))event.preventDefault();},true);
  document.addEventListener('paste',event=>{if(event.target.matches('[data-ns-numeric]')&&!/^\d*(?:\.\d*)?$/.test(event.clipboardData?.getData('text')||''))event.preventDefault();},true);
  document.addEventListener('input',event=>{if(event.target.matches('[data-ns-numeric]')&&!event.target.disabled)event.target.dispatchEvent(new Event('change',{bubbles:true}));},true);
  save();
}
