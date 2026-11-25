'use strict';

const hotSpringSurveyFiles={hotSurveyForms:'现场回收的有效游客问卷',hotSurveyTally:'表 C.2 计分表及汇总统计'};
const hotSpringQuestions=hotSpringRules.majors.flatMap(group=>group.questions);
const hotSpringRequired=grade=>hotSpringRules.required[grade==='gold'?'gold':'silver'];
const hotSpringChecks=grade=>hotSpringRequired(grade).flatMap(group=>group.items);
const hotSpringGrade=p=>p.values.hotGrade==='silver'?'silver':'gold';
const hotSpringCanReview=(p,stage)=>isHotSpring(p)&&state.role==='expert'&&p.stage===stage&&canHandle(p)&&p.avoidance[state.expert]?.conflict===false;
const hotSpringDocumentDraft=p=>(p.hotDocumentDrafts??={})[state.expert]??={};
const hotSpringRound=value=>Number(value.toFixed(6));

function hotSpringPrerequisites(grade,checks,scope,locked){
  const labels=scope==='document'?{pass:'材料支持',fail:'材料不足'}:{pass:'达标',fail:'不达标'};
  return hotSpringRequired(grade).map(group=>`<h4>${group.id}. ${esc(group.title)}</h4>${group.items.map(item=>`
    <fieldset class="required-item resort-check"><legend>${item.id} ${esc(item.title)}</legend>
    ${locked?badge(labels[checks[item.id]]||'未记录',checks[item.id]==='pass'?'green':'red'):`<div class="radio-group">${Object.entries(labels).map(([value,label])=>`<label class="radio-card"><input type="radio" data-hot-check="${scope}" data-id="${item.id}" name="hot-${scope}-${item.id}" value="${value}" ${checks[item.id]===value?'checked':''}>${label}</label>`).join('')}</div>`}
    </fieldset>`).join('')}`).join('');
}

function hotSpringDocumentTask(p){
  const grade=hotSpringGrade(p),checks=hotSpringDocumentDraft(p);
  return `<div class="task-heading"><div><h2>专家资料审核</h2><p>${hotSpringGrades[grade]} · 核验材料对附录 A 必备条件的支撑，并对照附录 B、C 自评与佐证给出意见。</p></div>${button('填入演示核验','hot-fill')}</div>
  <div class="material-layout resort-material-layout"><section class="task-card">${submitted(p)}</section><section class="task-card resort-criteria">
  <h3>必备条件材料核验</h3>${hotSpringPrerequisites(grade,checks,'document',false)}
  <h3>本人审核意见</h3><div class="radio-group"><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="complete" checked>资料具备评审条件</label><label class="radio-card"><input type="radio" name="expertDocumentDecision" value="supplement">建议补充材料</label></div>
  ${field('expertDocumentComment','自评材料核对及审核意见 *','textarea','','写明核验依据或需补充材料')}${primary('提交本人资料审核','submit-document-expert')}</section></div>`;
}
function hotSpringDocumentResult(p){
  if(!hotSpringCanReview(p,'document'))return null;
  const grade=hotSpringGrade(p),checks=hotSpringDocumentDraft(p);
  const missing=hotSpringChecks(grade).find(item=>!['pass','fail'].includes(checks[item.id]));
  if(missing){validationError('请核验此项材料',`[data-hot-check="document"][data-id="${missing.id}"]`);return null;}
  return {grade,checks:clone(checks),standard:hotSpringRules.source};
}
function hotSpringDocumentSummary(record){
  const data=record.hotEvaluation;
  if(!data)return '—';
  return `材料支持 ${Object.values(data.checks).filter(value=>value==='pass').length} / ${hotSpringChecks(data.grade).length} 项`;
}

function hotSpringQuestionScore(q,answer){
  const scores=answer?.options||{};
  if(answer?.none)return 0;
  const selected=q.options.filter(option=>Object.hasOwn(scores,option.id));
  if(!selected.length||q.mode==='单选'&&selected.length!==1)return null;
  if(selected.some(option=>!Number.isFinite(scores[option.id])||scores[option.id]<option.min||scores[option.id]>option.max))return null;
  return Math.min(q.max,hotSpringRound(selected.reduce((sum,option)=>sum+scores[option.id],0)));
}
function hotSpringQuestion(q,answer={},locked=false,expertId=''){
  const selected=answer.options||{},score=hotSpringQuestionScore(q,answer);
  return `<article class="question resort-score-card" data-question="${q.id}" data-hot-question="${q.id}">
    <div class="question-head"><div><small>${esc(q.path.join(' / '))}</small><h4>${q.id} ${esc(q.title)}</h4></div>${badge('满分 '+q.max+' 分')}</div>
    <p class="helper">${esc(q.mode)} · 本项 <strong data-hot-item-total>${score??'待填写'}</strong> / ${q.max} 分</p>
    ${locked&&answer.none?'<p>以上条件均不满足 · 0 分</p>':''}
    ${q.options.filter(option=>!locked||Object.hasOwn(selected,option.id)).map(option=>{
      const checked=Object.hasOwn(selected,option.id);
      return `<div class="hot-score-option">${locked?`<span>${esc(option.title)}</span><strong>${selected[option.id]} 分</strong>`:
        `<label class="check-line"><input type="${q.mode==='多选'?'checkbox':'radio'}" name="hot-option-${q.id}" data-hot-option="${option.id}" ${checked?'checked':''}><span>${esc(option.title)}</span><strong>${esc(option.points)} 分</strong></label>
        ${checked&&option.min!==option.max?`<label class="field"><span>本条实得分（${option.min}–${option.max}）</span><input type="number" step="any" min="${option.min}" max="${option.max}" data-hot-points="${option.id}" value="${selected[option.id]??''}"></label>`:''}`}</div>`;
    }).join('')}
    ${locked?(answer.note?`<p class="remark-text">评分依据　${esc(answer.note)}</p>`:''):`
      <label class="check-line"><input type="${q.mode==='多选'?'checkbox':'radio'}" name="hot-option-${q.id}" data-hot-option="none" ${answer.none?'checked':''}>以上条件均不满足 · 0 分</label>
      <label class="field"><span>评分依据</span><textarea rows="2" data-hot-note>${esc(answer.note||'')}</textarea></label>
      ${button('现场证据'+(answer.evidence?.length?'（'+answer.evidence.length+'）':''),'item-evidence',`data-question="${q.id}"`) }`}
    ${locked&&answer.evidence?.length?fileRows(null,'resort-record|'+expertId+'|evidence-'+q.id,answer.evidence,false):''}</article>`;
}
function hotSpringSurveyValue(sh){
  const value=sh.hotSurvey?.score;
  return Number.isFinite(value)&&value>=0&&value<=100?value:null;
}
function hotSpringTotal(sh){
  return hotSpringRound(hotSpringQuestions.reduce((sum,q)=>sum+(hotSpringQuestionScore(q,sh.answers[q.id])??0),0)+(hotSpringSurveyValue(sh)??0));
}
function hotSpringFieldSummary(record){
  if(record.total===null)return '评分未开展 · 必备条件未达标';
  const reference=hotSpringReference[record.hotGrade],survey=record.hotSurvey.score;
  return `${record.total} / 900 分（参考 ${reference} 分） · 满意度 ${survey} / 100 分（参考 70 分）`;
}
function hotSpringSurvey(sh,locked,id=''){
  const stats=sh.hotSurvey||{};
  return `<section class="task-card"><h3>附录 C · 游客满意度</h3><p>现场发放 100 份问卷，按附录 C 核算有效问卷得分，填写表 C.2 的总体满意度得分。满意度须单独达到 70 分。</p>
  <div class="form-grid">${[['valid','有效回收份数',100,1,1],['score','总体游客满意度（分）',100,0,'any']].map(([key,label,max,min,step])=>`<label class="field"><span>${label} *</span><input type="number" min="${min}" max="${max}" step="${step}" data-hot-survey="${key}" value="${stats[key]??''}" ${locked?'disabled':''}></label>`).join('')}</div>
  ${Object.entries(hotSpringSurveyFiles).map(([key,title])=>`<div class="attach-group"><div class="attach-head"><strong>${title} *</strong>${locked?'':upload('上传佐证',key)}</div>${fileRows(null,locked?'resort-record|'+id+'|'+key:key,sh.uploads?.[key]||[],!locked)}</div>`).join('')}</section>`;
}
function hotSpringFieldTask(p,sh){
  const grade=hotSpringGrade(p),required=hotSpringChecks(grade);
  const checked=required.filter(item=>sh.required[item.id]==='pass').length;
  const allPassed=checked===required.length;
  const active=state.scoreMajor||'required';
  if(!allPassed)state.scoreMajor='required';
  else state.scoreMajor=['required','survey',...hotSpringRules.majors.map(m=>m.id)].includes(active)?active:'required';
  const selected=hotSpringRules.majors.find(m=>m.id===state.scoreMajor);
  return `<div class="score-review"><div class="score-dock"><div class="score-toolbar"><div><h3>温泉度假地现场评审</h3>
    <strong id="hotTotal">${allPassed?hotSpringTotal(sh)+' / 900 分':'待完成必备条件核验'}</strong>
    <p class="helper">${hotSpringGrades[grade]}总分须达 ${hotSpringReference[grade]} 分，满意度须达 70 分</p></div>
    <div class="actions">${button('申报方提交材料','materials-modal')}${button('现场附件与问题汇总','field-uploads')}${button('填入演示评分','hot-fill')}${primary('完成评审并签字','finish-score')}</div></div></div>
    <div class="score-layout resort-field-layout"><nav class="score-nav" aria-label="温泉现场评审项目">
    ${[['required','必备条件'],...hotSpringRules.majors.map(m=>[m.id,m.name+' · '+m.max+'分']),['survey','游客满意度 · 100分']].map(([key,name])=>`<button data-score-major="${key}" class="${state.scoreMajor===key?'active':''}" ${key!=='required'&&!allPassed?'disabled':''}>${esc(name)}</button>`).join('')}</nav>
    <section>${selected?selected.questions.map(q=>hotSpringQuestion(q,sh.answers[q.id])).join(''):state.scoreMajor==='survey'?hotSpringSurvey(sh,false):
    `<section class="task-card resort-criteria"><h3>附录 A · ${hotSpringGrades[grade]}必备条件</h3><p class="helper" id="hotChecks">已达标 ${checked} / ${required.length} 项。全部达标后开放评分。</p>${hotSpringPrerequisites(grade,sh.required,'field',false)}</section>`}</section></div>
    <section class="task-card">${field('scoreComment','现场评审意见 *','textarea',sh.comment)}</section></div>`;
}
function hotSpringFieldIssue(p,sh){
  const required=hotSpringChecks(hotSpringGrade(p)),missing=required.find(item=>!['pass','fail'].includes(sh.required[item.id]));
  if(missing)return ['required',`[data-hot-check="field"][data-id="${missing.id}"]`,'请核验此项必备条件'];
  if(!sh.comment.trim())return [state.scoreMajor,fieldSelector('scoreComment'),'请填写现场评审意见'];
  if(required.some(item=>sh.required[item.id]==='fail'))return null;
  for(const q of hotSpringQuestions){
    if(hotSpringQuestionScore(q,sh.answers[q.id])===null)return [q.id.split('.')[0],`[data-hot-question="${q.id}"]`,'请完成本项评分：'+q.title];
  }
  if(!Number.isInteger(sh.hotSurvey?.valid)||sh.hotSurvey.valid<1||sh.hotSurvey.valid>100)return ['survey','[data-hot-survey="valid"]','请输入 1 至 100 的有效回收份数'];
  if(hotSpringSurveyValue(sh)===null)return ['survey','[data-hot-survey="score"]','请输入 0 至 100 的满意度得分'];
  for(const [key,title] of Object.entries(hotSpringSurveyFiles)){
    if(!sh.uploads?.[key]?.length)return ['survey',`[data-upload="${key}"]`,'请上传'+title];
  }
  return null;
}
function prepareHotSpringScore(p,sh){
  if(!hotSpringCanReview(p,'field'))return false;
  const issue=hotSpringFieldIssue(p,sh);
  if(issue){
    const [major,selector,message]=issue;
    if(state.scoreMajor!==major){state.scoreMajor=major;render();}
    validationError(message,selector);
    return false;
  }
  sh.hotGrade=hotSpringGrade(p);
  sh.hotStandard=hotSpringRules.source;
  sh.total=Object.values(sh.required).includes('fail')?null:hotSpringTotal(sh);
  sh.hotReference=sh.total===null?null:{totalReached:sh.total>=hotSpringReference[sh.hotGrade],surveyReached:sh.hotSurvey.score>=70};
  return true;
}
function openHotSpringRecord(p,sh,id){
  const body=sh.total===null?'':hotSpringRules.majors.map(m=>`<details class="history-item"><summary>${esc(m.name)} · ${hotSpringRound(m.questions.reduce((sum,q)=>sum+hotSpringQuestionScore(q,sh.answers[q.id]),0))} / ${m.max} 分</summary>${m.questions.map(q=>hotSpringQuestion(q,sh.answers[q.id],true,id)).join('')}</details>`).join('')+hotSpringSurvey(sh,true,id);
  const files=Object.entries({scoreSheet:'现场打分表',photos:'现场照片',report:'现场验收报告'}).map(([key,title])=>sh.uploads?.[key]?.length?`<h3>${title}</h3>${fileRows(p,'resort-record|'+id+'|'+key,sh.uploads[key],false)}`:'').join('');
  openModal('温泉现场评审记录',p.name,`<div class="alert gray"><p>${esc(expertName(id))} · ${esc(hotSpringFieldSummary(sh))} · ${esc(sh.at)} · 只读</p><p>${esc(sh.comment)}</p></div>
    <details class="history-item"><summary>${hotSpringGrades[sh.hotGrade]}必备条件核验</summary>${hotSpringPrerequisites(sh.hotGrade,sh.required,'field',true)}</details>
    ${body}${files}${sh.signature?.data?`<img class="signature-preview" src="${esc(sh.signature.data)}" alt="专家签字">`:''}`,'',null,true,true);
}

document.addEventListener('change',event=>{
  const el=event.target,p=getProject();
  if(el.dataset.hotCheck&&hotSpringCanReview(p,el.dataset.hotCheck)){
    const checks=el.dataset.hotCheck==='document'?hotSpringDocumentDraft(p):sheetFor(p,'field').required;
    checks[el.dataset.id]=el.value;
    save();
    if(el.dataset.hotCheck==='field'){
      const scroll=window.scrollY;
      render();
      window.scrollTo(0,scroll);
      document.querySelector(`[data-hot-check="field"][data-id="${el.dataset.id}"][value="${el.value}"]`)?.focus({preventScroll:true});
    }
  }
  if(!el.dataset.hotOption||!hotSpringCanReview(p,'field'))return;
  const card=el.closest('[data-hot-question]'),q=hotSpringQuestions.find(item=>item.id===card.dataset.hotQuestion);
  const sh=sheetFor(p,'field'),answer=sh.answers[q.id]??={};
  const option=q.options.find(row=>row.id===el.dataset.hotOption);
  if(!option){answer.none=el.checked;answer.options={};}
  else{
    answer.none=false;
    if(q.mode==='单选')answer.options={};
    const selections=answer.options??={};
    if(el.checked)selections[option.id]=option.min===option.max?option.max:null;
    else delete selections[option.id];
  }
  card.outerHTML=hotSpringQuestion(q,answer);
  document.querySelector(`[data-hot-question="${q.id}"] [data-hot-option="${el.dataset.hotOption}"]`)?.focus({preventScroll:true});
  document.getElementById('hotTotal').textContent=hotSpringTotal(sh)+' / 900 分';
  save();
});
document.addEventListener('input',event=>{
  const el=event.target,p=getProject();
  if(!(el.dataset.hotPoints||el.dataset.hotSurvey||el.hasAttribute('data-hot-note'))||!hotSpringCanReview(p,'field'))return;
  const sh=sheetFor(p,'field');
  if(el.dataset.hotSurvey)(sh.hotSurvey??={})[el.dataset.hotSurvey]=Number.isFinite(el.valueAsNumber)?el.valueAsNumber:null;
  else{
    const card=el.closest('[data-hot-question]'),q=hotSpringQuestions.find(item=>item.id===card.dataset.hotQuestion);
    const answer=sh.answers[q.id]??={};
    if(el.hasAttribute('data-hot-note'))answer.note=el.value;
    else if(Object.hasOwn(answer.options||{},el.dataset.hotPoints))answer.options[el.dataset.hotPoints]=Number.isFinite(el.valueAsNumber)?el.valueAsNumber:null;
    card.querySelector('[data-hot-item-total]').textContent=hotSpringQuestionScore(q,answer)??'待填写';
  }
  document.getElementById('hotTotal').textContent=hotSpringTotal(sh)+' / 900 分';
  save();
});

function fillHotSpringDemo(p){
  if(!p||!hotSpringCanReview(p,p.stage)||!window.V2_DEMO)return;
  const material=p.stage==='document',sh=material?null:sheetFor(p,'field');
  const checks=material?hotSpringDocumentDraft(p):sh.required;
  hotSpringChecks(hotSpringGrade(p)).forEach(item=>{checks[item.id]??='pass';});
  if(!material&&!Object.values(checks).includes('fail')){
    for(const q of hotSpringQuestions){
      if(sh.answers[q.id]?.options||sh.answers[q.id]?.none)continue;
      const options=q.mode==='单选'?[q.options.reduce((best,option)=>option.max>best.max?option:best)]:q.options;
      sh.answers[q.id]={...sh.answers[q.id],options:Object.fromEntries(options.map(option=>[option.id,option.max]))};
    }
    sh.hotSurvey??={valid:96,score:86};
    for(const [key,title] of Object.entries(hotSpringSurveyFiles)){
      if(!sh.uploads[key]?.length)sh.uploads[key]=[window.V2_DEMO.sampleFile(p,key,title)];
    }
  }
  save();
  render();
}

function hotSpringHistoryButton(){
  return button('查阅并沿用历史材料','hot-history');
}
function hotSpringHistory(p){
  if(!isHotSpring(p)||state.role!=='city'||p.stage!=='draft'||p.region!=='黔东南州')return;
  const projects=db.projects.filter(row=>isHotSpring(row)&&row.id!==p.id&&row.region===p.region&&row.date&&row.stage!=='draft'&&!row.correction)
    .sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  state.previousRows=projects.map(row=>({key:row.id,project:row}));
  openModal('查阅并沿用历史材料','本市州已提交且当前未在补正的温泉度假地项目',
    `<p class="helper">选择往次提交材料作为本次草稿的底稿。沿用会替换本次已填的正文和附件，原记录仍可只读查看。</p>
    ${projects.map(row=>`<article class="history-item"><h3>${esc(row.name)}</h3><p>${row.applicationYear} 年度 · ${hotSpringGrades[hotSpringGrade(row)]} · ${esc(stageLabel(row))}</p>
    ${button('查看材料','hot-history-view',`data-source="${esc(row.id)}"`)}
    ${['review','upgrade'].includes(p.values.hotKind)?primary('沿用至本次草稿','hot-history-copy',`data-source="${esc(row.id)}"`):''}</article>`).join('')||empty('本市州暂无可查阅的温泉度假地历史材料。')}
    ${p.values.hotKind==='first'?'<p class="helper">选择「定期复评」或「升级」后可沿用历史材料。</p>':''}`,'',null,true);
}
function copyHotSpringHistory(p,id){
  const copy=()=>{
    const source=getProject(id);
    if(!isHotSpring(p)||state.role!=='city'||getProject()!==p||p.stage!=='draft'||p.region!=='黔东南州'||
      !isHotSpring(source)||source===p||p.region!==source.region||!source.date||source.stage==='draft'||source.correction||
      !['review','upgrade'].includes(p.values.hotKind))return toast('当前项目或历史材料不可沿用。');
    const kind=p.values.hotKind;
    const current=source.hotAwardedGrade||p.values.hotCurrentGrade||hotSpringGrade(source);
    p.values={...clone(source.values),hotKind:kind,hotCurrentGrade:current,hotGrade:kind==='upgrade'?'gold':current,hotSigned:today()};
    p.files=clone(source.files);
    p[brandRangeKey]=clone(source[brandRangeKey]||[]);
    p.coordinateData=source.coordinateData?clone(source.coordinateData):null;
    p.brandRows=clone(source.brandRows||{});
    p.brandNextRow=source.brandNextRow||1;
    p.hotHistorySource={id:source.id,version:source.version,awardedYear:source.hotAwardedGrade?Number(source.archiveDecision?.at?.slice(0,4))||source.applicationYear:null};
    p.name=p.values.hotName||source.name;
    p.savedAt=new Date().toLocaleTimeString('zh-CN',{hour12:false});
    save();closeModal();render();toast('已沿用历史材料，请核对并修改本次草稿。');
  };
  confirm('沿用历史材料','<p>确认以所选材料替换本次草稿正文和附件？</p>',copy);
}
function seedHotSpringProjects(data){
  const year=new Date().getFullYear(),region='黔东南州',unit=region+'文化和旅游局',expert='EX-001';
  const samples=[
    ['HOT-DEMO-ARCHIVE','云溪温泉度假地','done','silver',year-1],
    ['HOT-DEMO-DOCUMENT','青岚温泉度假地','document','gold',year],
    ['HOT-DEMO-FIELD','松泉温泉度假地','field','silver',year-1]
  ];
  for(const [id,name,stage,grade,applicationYear] of samples){
    if(data.projects.some(p=>p.id===id))continue;
    const date=applicationYear===year?today():`${applicationYear}-10-10`;
    const p={id,name,stage,type:'hot-spring',applicationYear,statisticsYear:stage==='done'?applicationYear:year,region,unit,date,version:1,recordCounter:1,recordsVersion:1,
      values:{hotKind:'first',hotGrade:grade,hotName:name,hotSelfRequired:grade,hotSelfGrade:grade,hotSelfScore:'690',hotSelfSurvey:'84'},
      files:{},assigned:{document:[expert]},sheets:{},reviews:{},avoidance:{[expert]:{conflict:false,at:date}},
      history:[{id:id+'-R1',stage:'initial',title:'厅方初审通过',actor:'省厅审核人员',at:date,version:1,comment:'申报材料与附件齐全。'}],
      creationStatus:'not-requested'};
    if(stage!=='document'){
      const checks=Object.fromEntries(hotSpringChecks(grade).map(item=>[item.id,'pass']));
      p.reviews[expert]={decision:'complete',comment:'已核验必备条件材料及自查结果。',at:date,version:1,hotEvaluation:{grade,checks,standard:hotSpringRules.source}};
    }
    if(stage==='field'){
      p.assigned.field=[expert];p.creationStart=date;p.creationEnd=addMonths(date,12);p.planDue=addDays(date,60);p.fieldAssignedAt=today();
    }
    if(stage==='done'){
      p.hotAwardedGrade=grade;p.archiveConclusion='success';
      p.archiveDecision={outcome:'success',comment:'公示期满，确认通过并归档。',actor:'省厅审核人员',at:date};
    }
    data.projects.push(p);
  }
}

function announceHotSpringAwards(projects){
  const hot=projects.filter(isHotSpring);
  if(!hot.length)return;
  hot.forEach(p=>{p.hotAwardedGrade=hotSpringGrade(p);});
  db.notices.unshift({title:'温泉度假地等级评定结果公告',type:'评定公告',date:today(),
    body:hot.map(p=>`${p.name} · ${hotSpringGrades[p.hotAwardedGrade]}`).join('；')+'。经规定程序完成评审并公示，现予公告。'});
}
