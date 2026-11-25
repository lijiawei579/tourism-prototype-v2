'use strict';

const materialCheckCategory=p=>isLeisureBlock(p)||p?.type==='summer-resort';
const materialCheckDraft=p=>(p.conditionReviewDrafts??={})[state.expert]??={};
const materialCheckItems=p=>isLeisureBlock(p)?leisureRequired:D.summerRequired.map((text,i)=>[String(i+1),text]);
const leisureFieldGroups=[{id:'required',title:'必要条件',items:leisureRequired},...leisureGeneral];
const leisureFieldItems=leisureFieldGroups.flatMap(group=>group.items);
const materialLabels={pass:'材料支持',fail:'材料不足'};
const siteLabels={pass:'符合',fail:'存在差异',unverified:'未核实'};

function conditionRows(items,answers,scope,locked=false,expertId=''){
  const labels=scope==='document'?materialLabels:siteLabels;
  return items.map(([id,text])=>{
    const answer=answers[id]||{};
    return `<fieldset class="resort-check condition-check" data-condition-row="${id}"><legend>${id} ${esc(text)}</legend>
      ${locked?badge(labels[answer.result]||'未记录',answer.result==='pass'?'green':'amber'):
        `<div class="radio-group">${Object.entries(labels).map(([value,label])=>`<label class="radio-card"><input type="radio" name="criteria-${scope}-${id}" data-condition-scope="${scope}" data-condition-id="${id}" value="${value}" ${answer.result===value?'checked':''}>${label}</label>`).join('')}</div>`}
      ${locked?(answer.note?`<p class="remark-text">${esc(answer.note)}</p>`:''):
        `<label class="field"><span>${scope==='document'?'材料依据或缺项':'实测数据、核验依据或问题'}</span><textarea rows="2" data-condition-note="${scope}" data-condition-id="${id}">${esc(answer.note||'')}</textarea></label>`}
      ${scope==='field'?(locked?fileRows(null,'resort-record|'+expertId+'|evidence-'+id,answer.evidence||[],false):
        button('现场证据'+(answer.evidence?.length?'（'+answer.evidence.length+'）':''),'item-evidence',`data-question="${id}"`)):''}
    </fieldset>`;
  }).join('');
}

function conditionDocumentTask(p){
  return `<div class="task-heading"><div><h2>专家资料审核</h2><p>${isLeisureBlock(p)?leisureStandard+' · 核对必要条件及一般条件相关佐证':'核对10项避暑旅游度假区必备条件的材料支撑'}</p></div>${button('填入演示核验','fill-condition-review')}</div>
    <div class="material-layout resort-material-layout"><section class="task-card">${submitted(p)}</section>
    <section class="task-card resort-criteria"><h3>${isLeisureBlock(p)?'必要条件材料核验':'必备条件材料核验'}</h3>
    ${conditionRows(materialCheckItems(p),materialCheckDraft(p),'document')}
    <h3>本人审核意见</h3><div class="radio-group"><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="complete" checked>资料具备评审条件</label><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="supplement">建议补充材料</label></div>
    ${field('expertDocumentComment',isLeisureBlock(p)?'一般条件佐证、现场待查事项及审核意见 *':'自评材料核对及审核意见 *','textarea')}
    <div class="footer">${primary('提交本人资料审核','submit-document-expert')}</div></section></div>`;
}

function conditionIssue(items,answers,scope){
  const options=scope==='document'?materialLabels:siteLabels;
  for(const [id] of items){
    const answer=answers[id];
    if(!Object.hasOwn(options,answer?.result))return {id,selector:`[data-condition-scope="${scope}"][data-condition-id="${id}"]`,message:'请完成此项核验。'};
    if(answer.result!=='pass'&&!answer.note?.trim())return {id,selector:`[data-condition-note="${scope}"][data-condition-id="${id}"]`,message:scope==='document'?'请说明本项缺失的材料或依据。':'请说明本项差异或未核实原因。'};
  }
  return null;
}
function conditionDocumentResult(p){
  const draft=materialCheckDraft(p);
  const issue=conditionIssue(materialCheckItems(p),draft,'document');
  if(issue){validationError(issue.message,issue.selector);return null;}
  return {checks:clone(draft),standard:isLeisureBlock(p)?leisureStandard:'DB52/T 1790-2024'};
}
function conditionDocumentSummary(p,record){
  const checks=record.conditionEvaluation?.checks;
  if(!checks)return record.at?'历史意见 · 无逐项核验':'—';
  return `材料支持 ${Object.values(checks).filter(a=>a.result==='pass').length} / ${materialCheckItems(p).length} 项`;
}

function leisureFieldTask(p,sh){
  const active=leisureFieldGroups.find(group=>group.id===state.scoreMajor)||leisureFieldGroups[0];
  const completed=leisureFieldItems.filter(([id])=>sh.answers[id]?.result).length;
  return `<div class="score-review"><div class="score-dock"><div class="score-toolbar"><div><h3>旅游休闲街区现场评审</h3>
    <strong id="leisureChecks">已核验 ${completed} / ${leisureFieldItems.length} 项</strong><p class="helper">${leisureStandard} · 记录必要条件和一般条件的现场核验结果</p></div>
    <div class="actions">${button('申报方提交材料','materials-modal')}${button('现场附件与问题汇总','field-uploads')}${button('填入演示核验','fill-condition-review')}${primary('完成核验并签字','finish-score')}</div></div></div>
    <div class="score-layout resort-field-layout"><nav class="score-nav" aria-label="街区现场核验分组">${leisureFieldGroups.map(group=>`<button data-score-major="${group.id}" class="${group.id===active.id?'active':''}">${esc(group.title)}<small>${group.items.length} 项</small></button>`).join('')}</nav>
    <section class="task-card"><h3>${active.title}</h3>${conditionRows(active.items,sh.answers,'field')}</section></div>
    <section class="task-card"><div class="radio-group"><label class="radio-card"><input type="radio" name="leisureFieldDecision" value="pass" ${sh.leisureDecision==='pass'?'checked':''}>建议通过</label><label class="radio-card"><input type="radio" name="leisureFieldDecision" value="fail" ${sh.leisureDecision==='fail'?'checked':''}>建议不通过</label></div>
    ${field('scoreComment','现场评审意见 *','textarea',sh.comment)}</section></div>`;
}
function finishLeisureField(p,sh){
  if(!canHandle(p)||state.role!=='expert'||p.avoidance[state.expert]?.conflict!==false)return false;
  const issue=conditionIssue(leisureFieldItems,sh.answers,'field');
  if(issue){
    const group=leisureFieldGroups.find(group=>group.items.some(([id])=>id===issue.id));
    if(state.scoreMajor!==group.id){state.scoreMajor=group.id;render();}
    validationError(issue.message,issue.selector);return false;
  }
  if(!['pass','fail'].includes(sh.leisureDecision)){validationError('请选择现场评审建议。','[name="leisureFieldDecision"]');return false;}
  if(!sh.comment.trim()){validationError('请填写现场评审意见。',fieldSelector('scoreComment'));return false;}
  return true;
}
function leisureFieldSummary(sh){
  return sh.leisureDecision==='pass'?'建议通过':'建议不通过';
}
function openLeisureFieldRecord(p,sh,id){
  const generalFiles=Object.entries({scoreSheet:'现场核验表',photos:'现场照片',report:'现场验收报告'})
    .map(([key,title])=>sh.uploads?.[key]?.length?`<h3>${title}</h3>${fileRows(p,'resort-record|'+id+'|'+key,sh.uploads[key],false)}`:'').join('');
  openModal('旅游休闲街区现场核验记录',p.name,`<div class="alert gray"><p>${esc(expertName(id))} · ${leisureFieldSummary(sh)} · ${esc(sh.at)} · 只读</p><p>${esc(sh.comment)}</p></div>
    ${leisureFieldGroups.map(group=>`<details class="history-item"><summary>${esc(group.title)} · ${group.items.filter(([key])=>sh.answers[key]?.result==='pass').length} 项符合</summary>${conditionRows(group.items,sh.answers,'field',true,id)}</details>`).join('')}
    ${generalFiles}${sh.signature?.data?`<img class="signature-preview" src="${esc(sh.signature.data)}" alt="专家签字">`:''}`,'',null,true,true);
}
function fillConditionReview(p){
  if(!p||state.role!=='expert'||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false)return;
  if(p.stage==='document'&&materialCheckCategory(p)){
    const draft=materialCheckDraft(p);
    materialCheckItems(p).forEach(([id])=>{(draft[id]??={}).result??='pass';});
  }else if(p.stage==='field'&&isLeisureBlock(p)){
    const sh=sheetFor(p,'field');
    leisureFieldItems.forEach(([id])=>{(sh.answers[id]??={}).result??='pass';});
    sh.leisureDecision??='pass';
  }else return;
  save();render();
}

function summerCanScore(p,sh){
  return requiredFor(p,'field').every((_,i)=>sh.required[i]==='pass');
}
function validateSummerPrerequisites(p,sh){
  if(p.stage!=='field'||state.role!=='expert'||p.avoidance[state.expert]?.conflict!==false)return false;
  const missing=requiredFor(p,'field').findIndex((_,i)=>!['pass','fail'].includes(sh.required[i]));
  if(missing!==-1){validationError('请逐项确认现场必备条件。',`[data-required="${missing}"]`);return false;}
  if(!sh.comment.trim()){validationError('请填写现场评审意见。',fieldSelector('scoreComment'));return false;}
  return true;
}
function fillSummerPrerequisites(p){
  if(p?.type!=='summer-resort'||p.stage!=='field'||state.role!=='expert'||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false)return;
  const sh=sheetFor(p,'field');
  requiredFor(p,'field').forEach((_,i)=>{sh.required[i]??='pass';});
  save();render();
}
function openSummerUnscoredRecord(p,sh,id){
  const files=Object.entries({scoreSheet:'现场评定表',photos:'现场照片',report:'现场验收报告'})
    .map(([key,title])=>sh.uploads?.[key]?.length?`<h3>${title}</h3>${fileRows(p,'resort-record|'+id+'|'+key,sh.uploads[key],false)}`:'').join('');
  openModal('避暑旅游度假区现场核验记录',p.name,`<div class="alert gray"><p>${esc(expertName(id))} · 综合评价未开展 · ${esc(sh.at)} · 只读</p><p>${esc(sh.comment)}</p></div>
    <h3>现场必备条件</h3>${requiredFor(p,'field').map((text,i)=>`<p>${i+1}. ${esc(text)} ${badge(sh.required[i]==='pass'?'达标':'不达标',sh.required[i]==='pass'?'green':'amber')}</p>`).join('')}
    ${files}${sh.signature?.data?`<img class="signature-preview" src="${esc(sh.signature.data)}" alt="专家签字">`:''}`,'',null,true,true);
}

function captureCondition(element){
  const scope=element.dataset.conditionScope||element.dataset.conditionNote;
  if(!scope)return;
  const p=getProject();
  if(state.role!=='expert'||p?.stage!==scope||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false||
    !(scope==='document'?materialCheckCategory(p):isLeisureBlock(p)))return;
  const answers=scope==='document'?materialCheckDraft(p):sheetFor(p,'field').answers;
  const answer=answers[element.dataset.conditionId]??={};
  if(element.dataset.conditionNote)answer.note=element.value;
  else{
    answer.result=element.value;
    const progress=document.getElementById('leisureChecks');
    if(progress)progress.textContent=`已核验 ${leisureFieldItems.filter(([id])=>answers[id]?.result).length} / ${leisureFieldItems.length} 项`;
  }
  save();
}
document.addEventListener('input',event=>{if(event.target.dataset.conditionNote)captureCondition(event.target);});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.dataset.conditionScope)captureCondition(el);
  if(el.name==='leisureFieldDecision'){
    const p=getProject();
    if(isLeisureBlock(p)&&p.stage==='field'&&state.role==='expert'&&canHandle(p))sheetFor(p,'field').leisureDecision=el.value;
    save();
  }
});

function seedLeisureProjects(data){
  const expert='EX-001',year=new Date().getFullYear(),region='黔东南州',unit=region+'文化和旅游局';
  for(const [id,name,stage] of [
    ['LEISURE-DEMO-DOCUMENT','青石巷旅游休闲街区','document'],
    ['LEISURE-DEMO-FIELD','梧桐里旅游休闲街区','field']
  ]){
    if(data.projects.some(p=>p.id===id))continue;
    const date=today(),applicationYear=stage==='field'?year-1:year;
    const p={id,name,type:'leisure-block',stage,applicationYear,statisticsYear:year,region,unit,
      date:stage==='field'?`${year-1}-10-12`:date,version:1,recordCounter:1,recordsVersion:1,
      values:{leisureName:name},files:{},assigned:{document:[expert]},sheets:{},reviews:{},
      avoidance:{[expert]:{conflict:false,at:date}},history:[
        {id:id+'-R1',stage:'initial',title:'厅方初审通过',actor:'省厅审核人员',at:date,version:1,comment:'申报报告和签章附件齐全。'}
      ],creationStatus:'not-requested'};
    if(stage==='field'){
      p.reviews[expert]={decision:'complete',comment:'必要条件佐证已核对，进入现场创建。',at:p.date,version:1,
        conditionEvaluation:{standard:leisureStandard,checks:Object.fromEntries(leisureRequired.map(([key])=>[key,{result:'pass'}]))}};
      p.assigned.field=[expert];p.creationStart=p.date;p.creationEnd=addMonths(p.date,12);p.planDue=addDays(p.date,60);p.fieldAssignedAt=date;
    }
    data.projects.push(p);
  }
}
