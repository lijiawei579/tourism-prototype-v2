'use strict';

const resortFieldMajors=resortRules.majors.map(major=>({
  id:major.id,name:major.title,max:major.max,
  questions:major.sections.flatMap(section=>section.items)
}));
const resortLegacySheet=(p,sheet)=>p.type==='resort'&&sheet.submitted&&!sheet.resortRuleVersion;
const resortScoreSum=(items,answers)=>Number(items.reduce((sum,item)=>sum+(answers[item.id]?.score??0),0).toFixed(6));
const resortRequiredCounts=checks=>{
  const values=resortRules.required.map((_,i)=>checks[i]);
  return {answered:values.filter(value=>value==='pass'||value==='fail').length,passed:values.filter(value=>value==='pass').length};
};
const resortScoreValid=(item,answer)=>Number.isFinite(answer?.score)&&answer.score>=0&&answer.score<=item.max;

function seedProvincialResortProjects(data){
  if(data.provincialResortDemoVersion)return;
  data.provincialResortDemoVersion=1;
  const samples=[
    ['SC-2026-0251','云溪山地旅游度假区','document'],
    ['SC-2026-0252','清水江谷旅游度假区','document-summary'],
    ['SC-2026-0253','云岭森林旅游度假区','field']
  ];
  for(const [id,name,stage] of samples){
    if(data.projects.some(project=>project.id===id))continue;
    const fieldStage=stage==='field',year=new Date().getFullYear(),date=fieldStage?`${year-1}-10-20`:today();
    const project={id,name,type:'resort',resortReportVersion:resortRules.version,stage,date,applicationYear:Number(date.slice(0,4)),
      statisticsYear:year,region:'黔东南州',unit:'黔东南州文化和旅游局',values:{},files:{},version:1,recordCounter:0,
      recordsVersion:1,creationStatus:'not-requested',
      assigned:{document:['EX-001']},reviews:{},sheets:{},avoidance:{'EX-001':{conflict:false,at:today()}},
      history:[
        {stage:'draft',title:'申报已提交',actor:'市州申创人员',at:date,version:1,comment:'提交省级旅游度假区认定申请报告书及证明材料。'},
        {stage:'initial',title:'厅方初审通过',actor:'省厅审核人员',at:date,version:1,comment:'报告书和证明材料已收齐。'}
      ]};
    if(stage!=='document'){
      project.reviews['EX-001']={decision:'complete',comment:'已核验十项必备条件及基础评价，建议进入现场创建期。',at:date,version:1,
        resortEvaluation:{ruleVersion:resortRules.version,checks:Object.fromEntries(resortRules.required.map((_,i)=>[i,'pass'])),
          basic:{answers:Object.fromEntries(resortRules.basic.map(q=>[q.id,{score:q.max-2,note:'根据该项材料完整度和佐证情况，酌减2分。'}])),total:84}}};
      project.history.push({stage:'document',title:'专家资料审核全部完成',comment:'已完成细则一核验和基础评价，交省厅汇总。',actor:'系统',at:date,version:1});
    }
    if(fieldStage){
      project.creationStart=addDays(date,10);
      project.creationEnd=addMonths(project.creationStart,12);
      project.planDue=addDays(project.creationStart,60);
      project.creationStatus='requested';
      project.assigned.field=['EX-001'];
      project.fieldAssignedAt=today();
      project.history.push(
        {stage:'document-summary',title:'省厅资料审核意见汇总完成',comment:'省厅同意进入现场创建期。',actor:'省厅审核人员',at:project.creationStart,version:1},
        {stage:'creation',title:'省厅已指派现场专家，进入现场评审',comment:'完成专家指派，已激活现场综合评价任务。',actor:'省厅审核人员',at:today(),version:1}
      );
    }
    project.history.forEach((record,i)=>{record.id=id+'-H'+i;});
    data.projects.push(project);
  }
}

function resortMaterialDraft(p){
  p.resortMaterialDrafts??={};
  return p.resortMaterialDrafts[state.expert]??={checks:{},answers:{}};
}
function resortPrerequisite(item,index,checks,locked){
  return `<fieldset class="required-item resort-check"><legend>${index+1}. ${esc(item)}</legend>
    ${locked?badge(checks[index]==='pass'?'达标':'不达标',checks[index]==='pass'?'green':'red'):
      `<div class="radio-group">${[['pass','达标'],['fail','不达标']].map(([value,label])=>`<label class="radio-card"><input type="radio" name="resort-prerequisite-${index}" data-resort-check="${index}" value="${value}" ${checks[index]===value?'checked':''}>${label}</label>`).join('')}</div>`}
    </fieldset>`;
}
function resortScoreCard(item,answers,scope,locked=false,recordExpert=''){
  const a=answers[item.id]||{},onsite=scope==='field';
  return `<article class="question resort-score-card" data-question="${item.id}">
    <div class="question-head"><h4>${onsite?item.id+' ':''}${esc(item.title)}</h4>${badge('满分 '+item.max+' 分')}</div>
    ${onsite?`<details class="resort-guidance" ${locked?'':'open'}><summary>原表评分依据 · ${esc(item.mode)}</summary><ul>${item.options.map(option=>`<li><span>${esc(option.title)}</span><strong>${esc(option.points)} 分</strong></li>`).join('')}</ul></details>`:
      `<p>${esc(item.content)}</p><p class="helper">${esc(item.guidance)}</p>`}
    ${locked?`<p><strong>得分 ${a.score} / ${item.max} 分</strong></p>${a.note?`<p class="remark-text">评分依据　${esc(a.note)}</p>`:''}`:
      `<div class="resort-answer"><label class="field"><span>实得分</span><input type="number" min="0" max="${item.max}" step="any" data-resort-score="${scope}" data-item="${item.id}" value="${esc(a.raw??a.score??'')}"></label>
      <label class="field"><span>扣分依据（低于满分时必填）</span><textarea rows="2" data-resort-note="${scope}" data-item="${item.id}">${esc(a.note||'')}</textarea></label></div>`}
    ${onsite?(locked?(a.evidence?.length?fileRows(null,'resort-record|'+recordExpert+'|evidence-'+item.id,a.evidence,false):''):button('现场证据'+(a.evidence?.length?'（'+a.evidence.length+'）':''),'item-evidence',`data-question="${item.id}"`)):''}
  </article>`;
}
function resortBasicPanel(draft){
  const {answered,passed}=resortRequiredCounts(draft.checks),total=resortRules.required.length;
  if(passed!==total){
    const detail=answered<total?'请完成全部必备条件的核验。':'有必备条件不达标，可提交审核意见。';
    return `<div class="alert gray"><p>基础评价未开展。全部必备条件达标后开放评分。${detail}</p></div>`;
  }
  return `<p class="resort-subtotal" data-resort-total="basic">${resortTotalText('basic',draft.answers)}</p>
    ${resortRules.basic.map(item=>resortScoreCard(item,draft.answers,'basic')).join('')}`;
}
function resortTotalText(scope,answers){
  const isBasic=scope==='basic',items=isBasic?resortRules.basic:resortFieldMajors.flatMap(m=>m.questions);
  const total=isBasic?resortRules.basicTotal:resortRules.fieldTotal;
  const reference=isBasic?resortRules.basicReference:resortRules.fieldReference;
  const answered=items.filter(item=>resortScoreValid(item,answers[item.id])).length,sum=resortScoreSum(items,answers);
  return `${sum} / ${total} 分 · 已填 ${answered} / ${items.length} 项${answered===items.length?(sum>=reference?' · 达到省级参考分值':' · 低于省级参考分值'):''}`;
}
function resortDocumentTask(p){
  const draft=resortMaterialDraft(p);
  const {answered,passed}=resortRequiredCounts(draft.checks);
  return `<div class="task-heading"><div><h2>专家资料审核</h2><p>对照申报材料核验细则一。省厅汇总意见后人工办理。</p></div>${button('填入演示核验','resort-fill')}${badge('评审专家办理','amber')}</div>
  <div class="material-layout resort-material-layout"><section class="task-card">${submitted(p)}</section>
  <section class="task-card resort-criteria">
    <h3>第一部分 · 必备条件</h3><p class="helper" id="resortCheckProgress">已核验 ${answered} / 10 项 · 达标 ${passed} 项</p>
    ${resortRules.required.map((item,i)=>resortPrerequisite(item,i,draft.checks,false)).join('')}
    <h3>第二部分 · 资源环境与度假产品基础评价</h3><p class="helper">满分 ${resortRules.basicTotal} 分 · 省级参考分值 ${resortRules.basicReference} 分</p>
    <div id="resortBasicPanel">${resortBasicPanel(draft)}</div>
    <h3>本人审核意见</h3><div class="radio-group"><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="complete" checked>资料具备评审条件</label><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="supplement">建议补充材料</label></div>
    ${field('expertDocumentComment','审核意见 *','textarea','','说明核验依据及补充建议')}
    <div class="footer">${primary('提交本人资料审核','submit-document-expert')}</div>
  </section></div>`;
}
function resortScoreIssue(items,answers,scope){
  for(const item of items){
    const answer=answers[item.id];
    if(!resortScoreValid(item,answer))return {item,message:`请填写 ${item.title} 的实得分（0–${item.max} 分）`,selector:`[data-resort-score="${scope}"][data-item="${item.id}"]`};
    if(answer.score<item.max&&!answer.note?.trim())return {item,message:'请填写扣分依据：'+item.title,selector:`[data-resort-note="${scope}"][data-item="${item.id}"]`};
  }
  return null;
}
function resortMaterialResult(p){
  const draft=resortMaterialDraft(p),count=resortRequiredCounts(draft.checks);
  if(count.answered!==resortRules.required.length){
    const index=resortRules.required.findIndex((_,i)=>!['pass','fail'].includes(draft.checks[i]));
    validationError('请核验此项必备条件',`[data-resort-check="${index}"]`);
    return null;
  }
  const passed=count.passed===resortRules.required.length;
  if(passed){
    const issue=resortScoreIssue(resortRules.basic,draft.answers,'basic');
    if(issue){validationError(issue.message,issue.selector);return null;}
  }
  return {ruleVersion:resortRules.version,checks:clone(draft.checks),basic:passed?{
    answers:clone(draft.answers),total:resortScoreSum(resortRules.basic,draft.answers)
  }:null};
}
function resortMaterialSummary(record){
  const result=record.resortEvaluation;
  if(!result)return record.at?'历史意见 · 无逐项核验':'—';
  const {passed}=resortRequiredCounts(result.checks);
  return `必备条件 ${passed}/10 达标 · 基础评价 ${result.basic?`${result.basic.total}/100 分（${result.basic.total>=resortRules.basicReference?'达到':'低于'}省级参考分值）`:'未开展'}`;
}
function documentReviewRecord(p,id){
  if(!['hall','expert'].includes(state.role)||!visibleProjects().includes(p))return;
  const r=p.reviews[id];
  if(!r?.at)return;
  const evaluation=r.resortEvaluation;
  openModal(state.role==='expert'&&id===state.expert?'本人资料审核记录':'专家资料审核记录',p.name,
    `<div class="alert gray"><p>${esc(expertName(id))} · ${esc(r.at)} · 材料 V${r.version} · 已提交，只读</p></div>
    <h3>审核意见</h3><p>${r.decision==='complete'?'资料具备评审条件':'建议补充材料'}</p><p class="remark-text">${esc(r.comment)}</p>
    ${p.type==='resort'?`<p><strong>${resortMaterialSummary(r)}</strong></p>`:''}
    ${r.conditionEvaluation?`<details open><summary>${esc(conditionDocumentSummary(p,r))} · ${esc(r.conditionEvaluation.standard)}</summary>${conditionRows(materialCheckItems(p),r.conditionEvaluation.checks,'document',true)}</details>`:''}
    ${r.hotEvaluation?`<p><strong>${esc(hotSpringDocumentSummary(r))}</strong></p><details open><summary>${hotSpringGrades[r.hotEvaluation.grade]} · 附录 A 材料核验</summary>${hotSpringPrerequisites(r.hotEvaluation.grade,r.hotEvaluation.checks,'document',true)}</details>`:''}
    ${evaluation?`<details open><summary>第一部分 · 必备条件</summary>${resortRules.required.map((item,i)=>resortPrerequisite(item,i,evaluation.checks,true)).join('')}</details>
    ${evaluation.basic?`<details><summary>第二部分 · 基础评价逐项得分</summary>${resortRules.basic.map(item=>resortScoreCard(item,evaluation.basic.answers,'basic',true)).join('')}</details>`:''}`:''}`,
    button('查看申报材料','materials-modal')+button('关闭','close-modal'),null,true,true);
}
function resortField(p,sh){
  const selected=resortRules.majors.find(m=>m.id===state.scoreMajor)||resortRules.majors[0];
  state.scoreMajor=selected.id;
  return `<div class="score-review"><div class="score-dock"><div class="score-toolbar">
    <div><h3>细则二 · 综合评价</h3><strong data-resort-total="field">${resortTotalText('field',sh.answers)}</strong><p class="helper">省级参考分值 ${resortRules.fieldReference} 分 · 草稿自动保存</p></div>
    <div class="actions">${button('申报方提交材料','materials-modal')}${button('现场附件与问题汇总','field-uploads')}${button('填入演示评分','resort-fill')}${primary('完成评分并签字','finish-score')}</div>
    </div></div>
    <div class="score-layout resort-field-layout"><nav class="score-nav" aria-label="综合评价评分组">${resortFieldMajors.map(m=>`<button data-score-major="${m.id}" class="${m.id===selected.id?'active':''}">${m.id}. ${esc(m.name)}<small data-resort-major="${m.id}">${resortScoreSum(m.questions,sh.answers)} / ${m.max} 分</small></button>`).join('')}</nav>
    <section><p class="helper">按原表的单选、多选及区间规则核验，直接填写该项实得分。</p>
    ${selected.sections.map(section=>`<h3>${section.id} ${esc(section.title)} · ${section.max} 分</h3>${section.items.map(item=>resortScoreCard(item,sh.answers,'field')).join('')}`).join('')}</section></div>
    <section class="task-card">${field('scoreComment','现场评审意见 *','textarea',sh.comment)}</section></div>`;
}
function finishResortScore(p,sh){
  const issue=resortScoreIssue(resortFieldMajors.flatMap(m=>m.questions),sh.answers,'field');
  if(issue){
    const major=issue.item.id.split('.')[0];
    if(state.scoreMajor!==major){state.scoreMajor=major;render();}
    return validationError(issue.message,issue.selector);
  }
  if(!sh.comment)return validationError('请填写现场评审意见',fieldSelector('scoreComment'));
  sh.majorResults=resortFieldMajors.map(m=>({name:m.name,max:m.max,score:resortScoreSum(m.questions,sh.answers)}));
  sh.total=resortScoreSum(resortFieldMajors.flatMap(m=>m.questions),sh.answers);
  sh.resortRuleVersion=resortRules.version;
  sh.result=sh.total>=resortRules.fieldReference?'pass':'fail';
  save();signatureDialog(p,sh);
}
function openResortFieldRecord(p,sh,id){
  const attachLabels={scoreSheet:'现场打分表',photos:'现场照片',report:'现场验收报告'};
  const groups=resortRules.majors.map((major,i)=>`<details class="history-item"><summary>
    ${major.id}. ${esc(major.title)} · ${sh.majorResults?.[i]?.score??resortScoreSum(resortFieldMajors[i].questions,sh.answers)} / ${major.max} 分</summary>
    ${major.sections.map(s=>s.items.map(item=>resortScoreCard(item,sh.answers,'field',true,id)).join('')).join('')}</details>`).join('');
  const attachments=Object.entries(attachLabels).map(([key,name])=>`<h3>${name}</h3>${fileRows(p,'resort-record|'+id+'|'+key,sh.uploads?.[key]||[],false)}
    ${key==='photos'?(sh.uploads?.photos||[]).filter(f=>f.description).map(f=>`<p>${esc(f.name)} · ${esc(f.description)}</p>`).join(''):''}`).join('');
  openModal('现场综合评价评分记录',p.name,`<div class="alert gray"><div><strong>${esc(expertName(id))} · ${sh.total} / 1000 分</strong>
    <p>${sh.total>=resortRules.fieldReference?'达到':'低于'}省级参考分值 · ${esc(sh.at)} · 只读</p><p>${esc(sh.comment)}</p></div></div>
    ${groups}${attachments}${sh.signature?.data?`<h3>专家签字</h3><img class="signature-preview" src="${esc(sh.signature.data)}" alt="专家签字">`:''}`,'',null,true,true);
}
function resortRecordFiles(p,key){
  const [,id,name]=key.split('|'),sh=p.sheets.field?.[id];
  if(!sh?.submitted||!['hall','expert'].includes(state.role)||!visibleProjects().includes(p))return [];
  return name.startsWith('evidence-')?sh.answers[name.slice(9)]?.evidence||[]:sh.uploads?.[name]||[];
}

function fillResortDemo(p){
  if(!p||p.type!=='resort'||state.role!=='expert'||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false)return;
  const material=p.stage==='document',holder=material?resortMaterialDraft(p):sheetFor(p,'field');
  if(material){
    resortRules.required.forEach((_,i)=>{holder.checks[i]??='pass';});
    if(resortRequiredCounts(holder.checks).passed!==resortRules.required.length){save();render();return;}
  }
  const items=material?resortRules.basic:resortFieldMajors.flatMap(m=>m.questions);
  items.forEach(item=>{
    const answer=holder.answers[item.id]??={};
    if(answer.raw!==undefined||answer.score!==undefined)return;
    const score=material?item.max-2:Math.floor(item.max*.9);
    Object.assign(answer,{score,note:'演示评分。请以实际材料和核验结果为准。'});
  });
  save();
  render();
}

document.addEventListener('change',event=>{
  const el=event.target;
  if(el.dataset.resortCheck===undefined)return;
  const p=getProject();
  if(!p||p.type!=='resort'||p.stage!=='document'||state.role!=='expert'||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false)return;
  const draft=resortMaterialDraft(p);
  draft.checks[el.dataset.resortCheck]=el.value;
  const {answered,passed}=resortRequiredCounts(draft.checks);
  document.getElementById('resortCheckProgress').textContent=`已核验 ${answered} / 10 项 · 达标 ${passed} 项`;
  document.getElementById('resortBasicPanel').innerHTML=resortBasicPanel(draft);
  save();
});

document.addEventListener('input',event=>{
  const el=event.target,scope=el.dataset.resortScore||el.dataset.resortNote;
  if(!scope)return;
  const p=getProject(),stage=scope==='basic'?'document':'field';
  if(!p||p.type!=='resort'||p.stage!==stage||state.role!=='expert'||!canHandle(p)||p.avoidance[state.expert]?.conflict!==false)return;
  const holder=stage==='document'?resortMaterialDraft(p):sheetFor(p,'field');
  const item=(scope==='basic'?resortRules.basic:resortFieldMajors.flatMap(m=>m.questions)).find(q=>q.id===el.dataset.item);
  if(!item||stage==='document'&&resortRequiredCounts(holder.checks).passed!==resortRules.required.length)return;
  const answer=holder.answers[item.id]??={};
  if(el.dataset.resortNote)answer.note=el.value;
  else{
    answer.raw=el.value;
    const candidate={score:el.value===''?undefined:el.valueAsNumber};
    if(resortScoreValid(item,candidate))answer.score=candidate.score;
    else delete answer.score;
    if(el.value&&!resortScoreValid(item,answer))el.setAttribute('aria-invalid','true');
    else el.removeAttribute('aria-invalid');
  }
  if(stage==='field'){
    const major=resortFieldMajors.find(m=>m.id===item.id.split('.')[0]),label=document.querySelector(`[data-resort-major="${major.id}"]`);
    if(label)label.textContent=`${resortScoreSum(major.questions,holder.answers)} / ${major.max} 分`;
  }
  const total=document.querySelector(`[data-resort-total="${scope}"]`);
  if(total)total.textContent=resortTotalText(scope,holder.answers);
  save();
});
