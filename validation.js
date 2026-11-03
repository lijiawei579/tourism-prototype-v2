'use strict';

let pendingValidation=null;
const fieldSelector=name=>`[name=${JSON.stringify(name)}]`;
function clearValidation(){
  document.querySelectorAll('.validation-target').forEach(element=>element.classList.remove('validation-target'));
  document.querySelectorAll('[data-validation-invalid]').forEach(element=>{element.removeAttribute('aria-invalid');delete element.dataset.validationInvalid;});
  document.getElementById('validationMessage')?.remove();
}
function validationError(message,selector){
  clearValidation();
  const target=typeof selector==='string'?document.querySelector(selector):selector;
  if(!target)return toast(message);
  const group=target.closest('.field,.attach-group,.required-item,.question,.registration-setting-row,.rx-section,.check-line,.radio-group,.choice-grid,.upload-btn')||target;
  group.classList.add('validation-target');
  const control=target.matches('input,textarea,select,button')?target:target.querySelector('input:not(:disabled),textarea:not(:disabled),select:not(:disabled),button:not(:disabled)');
  if(control){control.setAttribute('aria-invalid','true');control.dataset.validationInvalid='true';}
  const notice=document.createElement('div');notice.id='validationMessage';notice.className='validation-message';notice.setAttribute('role','alert');notice.textContent=message;
  group.insertAdjacentElement('beforebegin',notice);
  const focus=control?.type==='file'?(control.closest('label')||group):control||target;if(!focus.matches('input,textarea,select,button'))focus.tabIndex=-1;
  focus.focus({preventScroll:true});group.scrollIntoView({block:'center',behavior:'auto'});
}
function applicationIssues(project,includeOptional=false){
  const issues=[],seen=new Set();
  D.forms[project.type].forEach((html,step)=>{
    const root=document.createElement('div');root.innerHTML=html;
    for(const control of root.querySelectorAll('[data-field]')){
      const key=control.dataset.field,label=(control.id?root.querySelector(`label[for=${JSON.stringify(control.id)}]`):null)||control.closest('.field')?.querySelector('label')||control.closest('label');
      const title=label?.textContent.replace(/\*/g,'').trim()||control.getAttribute('aria-label')||'填报内容';
      const required=label?.textContent.includes('*'),selector=`#applyForm [data-field=${JSON.stringify(key)}]`;
      if(['radio','checkbox'].includes(control.type)){
        const group=control.dataset.group||key,groupKey=step+':'+group;if(seen.has(groupKey))continue;seen.add(groupKey);
        const choices=[...root.querySelectorAll('[data-field]')].filter(item=>(item.dataset.group||item.dataset.field)===group);
        if((required||includeOptional&&control.type==='radio')&&!choices.some(item=>project.values[item.dataset.field]))issues.push({step,selector,message:'请选择'+title});
        continue;
      }
      const value=String(formValue(project,key)??'');
      if((required||includeOptional)&&!value.trim()&&control.id!=='scenicLevel'){issues.push({step,selector,message:'请填写'+title});continue;}
      control.value=value;
      if(value.trim()&&(!control.checkValidity()||control.type==='number'&&!control.value))issues.push({step,selector,message:'请检查'+title+'的格式或数值范围'});
    }
    if(project.type==='scenic'&&root.querySelector('[data-field="scenicResourceOverview"]'))for(const message of window.V2_RESOURCES?.missing(project)||[])issues.push({step,selector:'#applyForm [data-rx-zone="boundary"]',message});
  });
  if(project.name==='未命名申报项目'&&!issues.some(issue=>issue.selector.includes('Name'))){const key=project.type==='scenic'?'scenicName':project.type==='resort'?'resortApplyName':'summerName';issues.unshift({step:0,selector:`#applyForm [data-field=${JSON.stringify(key)}]`,message:'请填写项目名称'});}
  D.attachments[project.type].forEach((attachment,index)=>{if(!project.files[index]?.length)issues.push({step:D.forms[project.type].length,selector:`#applyForm [data-upload="attachment-${index}"]`,message:'请上传附件：'+attachment[0]});});
  return issues;
}
function goApplicationIssue(project,issue){
  if(state.role!=='city'||project.region!=='黔东南州'||!(project.stage==='draft'||project.correction))return;
  state.project=project.id;
  const step=issue?.step??D.forms[project.type].length;
  if(state.view==='apply'&&state.formStep===step&&document.querySelector('#applyForm')){if(issue)validationError(issue.message,issue.selector);return;}
  pendingValidation=issue?{...issue,project:project.id,view:'apply'}:null;
  state.formStep=step;navigate('apply/'+project.id+'/'+step);
}
function resumeApplication(project){goApplicationIssue(project,applicationIssues(project,true)[0]);}
function focusPendingValidation(){
  if(!pendingValidation)return;
  const issue=pendingValidation;if(state.view!==issue.view||state.project!==issue.project)return;
  pendingValidation=null;validationError(issue.message,issue.selector);
}
function scoreValidationError(project,question,message,selector){
  const major=scoreQuestions(project,project.stage).find(group=>group.questions.some(item=>item.id===question.id));
  if(major&&state.scoreMajor!==major.id){state.scoreMajor=major.id;render();if(selector?.startsWith('[name=')){const control=document.querySelector(selector);if(control?.name===`deduction-${question.id}`)control.value=sheetFor(project,project.stage).answers[question.id]?.note||'';}}
  setScoreSection('scoring');
  validationError(message,selector||`[data-question=${JSON.stringify(question.id)}]`);
}
function validateAction(action){
  const project=getProject(),required={
    'submit-initial':['initialDecision','initialComment'],
    'submit-document-expert':['expertDocumentDecision','expertDocumentComment'],
    'submit-document-hall':['documentDecision','documentComment'],
    'submit-hall':['hallDecision','hallComment'],
    'submit-field-hall':['fieldDecision','fieldHallComment'],
    'save-expert':['expertName','expertPhone','expertOrg','expertAccount'],
    'submit-extension':['extensionDate','extensionReason'],
    'submit-publicity':['publicityStart','publicityEnd','publicityChannel','publicityContact'],
    'save-objection':['unresolved'],
    'save-rule':['ruleTitle','ruleKind','ruleMax'],
    'save-measure':['measureValue']
  };
  const fail=(message,selector)=>{validationError(message,selector);return false;};
  for(const name of required[action]||[]){
    const control=document.querySelector(fieldSelector(name));if(!control||control.disabled)continue;
    const blank=['radio','checkbox'].includes(control.type)?!document.querySelector(`${fieldSelector(name)}:checked`):!control.value.trim();
    if(blank)return fail('请完成此项后再提交',control);
    if(!['radio','checkbox'].includes(control.type)&&!control.checkValidity())return fail('请检查此项的格式或数值范围',control);
  }
  if(['submit-initial','submit-document-hall'].includes(action)&&['initialDecision','documentDecision'].some(name=>decision(name)==='supplement')){const value=Number(read('correctionDays'));if(!Number.isInteger(value)||value<1)return fail('补正时限须为正整数',fieldSelector('correctionDays'));}
  if(action==='confirm-avoidance'&&decision('avoidDecision')==='conflict'&&!read('avoidComment'))return fail('请填写回避说明',fieldSelector('avoidComment'));
  if(['confirm-assignment','random-experts'].includes(action)){
    const count=Number(document.getElementById('assignmentCount')?.value);
    if(!Number.isInteger(count)||count<1||count>10)return fail('专家人数须为1至10的整数','#assignmentCount');
    if(action==='confirm-assignment'&&state.assignment?.selected.size!==count)return fail('请勾选与配置人数一致的专家','#assignmentCandidates');
  }
  if(action==='submit-score'&&!sheetFor(project,project.stage).signature?.data)return fail('请上传本人签字图片或扫码手写签字','#signatureFile');
  if(action==='submit-committee'&&!project.committeeFiles?.length)return fail('请上传上会材料','[data-upload="committeeFiles"]');
  if(action==='request-field'&&!project.creationPlan?.length&&state.role==='city')return fail('请先上传创建方案','[data-upload="creationPlan"]');
  if(action==='submit-extension'&&read('extensionDate')<=project.creationEnd)return fail('延期日期须晚于创建期结束日期',fieldSelector('extensionDate'));
  if(action==='submit-publicity'&&read('publicityEnd')<workingEnd(read('publicityStart')))return fail('公示期不能少于7个工作日',fieldSelector('publicityEnd'));
  if(action==='save-objection'&&(!Number.isInteger(Number(read('unresolved')))||Number(read('unresolved'))<0))return fail('异议数量须为非负整数',fieldSelector('unresolved'));
  if(action==='save-settings'){
    const year=Number(read('configYear'));if(!Number.isInteger(year)||year<2025||year>2100)return fail('申报年度须为2025至2100的整数',fieldSelector('configYear'));
    const type=read('configCategory');if(!cat(type))return fail('请选择申创类别',fieldSelector('configCategory'));
    if(state.settingsYear&&year!==state.settingsYear)return fail('编辑时不能修改申报年度',fieldSelector('configYear'));
    if(state.settingsCategory&&type!==state.settingsCategory)return fail('编辑时不能修改申创类别',fieldSelector('configCategory'));
    if(!state.settingsEditing&&configuredPeriod(year,type))return fail('该年度的此类别已有配置，请取消后从对应行编辑',fieldSelector('configCategory'));
    const start=read('configStart-'+type),end=read('configEnd-'+type);for(const [name,value] of [['configStart-'+type,start],['configEnd-'+type,end]])if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number(value.slice(0,4))!==year||dateString(new Date(value+'T12:00:00'))!==value)return fail('请填写属于该年度的有效报名日期',fieldSelector(name));if(end<start)return fail('结束报名时间不能早于开始时间',fieldSelector('configEnd-'+type));
  }
  if(action==='save-expert'){
    if(!/^[+\d][\d ()-]{5,24}$/.test(read('expertPhone')))return fail('请填写有效联系电话',fieldSelector('expertPhone'));
    if(db.experts.some(expert=>expert.id!==state.editExpert&&(expert.account||expert.id)===read('expertAccount')))return fail('该账号已存在，请更换',fieldSelector('expertAccount'));
  }
  if(action==='save-rule'){
    const kind=read('ruleKind'),max=Number(read('ruleMax'));
    if(kind!=='required'&&(!Number.isInteger(max)||max<1||max>1000))return fail('满分须为1至1000的整数',fieldSelector('ruleMax'));
    if(kind==='options'){
      const lines=read('ruleOptions').split('\n').filter(Boolean);
      if(!lines.length||lines.some(line=>{const parts=line.split('|').map(value=>value.trim()),score=Number(parts[1]),min=parts.length>2?Number(parts[2]):score;return parts.length<2||!parts[0]||!Number.isFinite(score)||!Number.isFinite(min)||min<0||min>score||score>max;}))return fail('请检查分档选项文字、分值及最低分',fieldSelector('ruleOptions'));
    }
  }
  if(action==='configure-publicity'){
    const selected=[...state.selected].filter(id=>getProject(id)?.stage==='publicity'&&!getProject(id).publicity);
    if(!selected.length)return fail('请先勾选等待公示的项目','[data-publicity-select]:not(:disabled),.publicity-actions');
    if(new Set(selected.map(id=>getProject(id).type)).size>1)return fail('请按同一申创类别选择一批项目','.categories');
  }
  if(action==='save-innovation'&&document.querySelectorAll('[name^="innovation-"]:checked').length>4)return fail('各板块加5分，合计不能超过20分','[name^="innovation-"]:checked');
  return true;
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button||button.disabled)return;if(!validateAction(button.dataset.action)){event.preventDefault();event.stopImmediatePropagation();}},true);
document.addEventListener('input',event=>{if(event.target.closest('.validation-target'))clearValidation();});
document.addEventListener('change',event=>{if(event.target.closest('.validation-target'))clearValidation();});
