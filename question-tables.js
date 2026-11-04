'use strict';
// Question revisions are reusable sources; published tables retain a complete snapshot.
const qbButton=(text,action,extra='')=>button(text,'qb-'+action,extra);
const qbQuestions=()=>Object.values(db.questionBank.questions);
const qbSourceName=table=>table.sourceCategory||table.name;
function qbNormalize(table){
  if(table.scoreEnabled===undefined)table.scoreEnabled=table.kind==='numeric';
  table.calculation??='sum';table.requireAllQualified??=true;table.configurable=true;
  table.kind=table.scoreEnabled?'numeric':'qualification';
  return table;
}
function qbSum(table){return table.items.filter(item=>item.mode!=='qualification').reduce((sum,item)=>sum+Number(item.max||0),0);}
function qbQualified(table,data){const questions=table.items.filter(item=>item.mode==='qualification');return !table.requireAllQualified||questions.every(item=>data.answers[item.id]?.result==='pass');}
function qbNoScoreControls(root){
  root.querySelectorAll('.option b,.sc-special,[data-sm-item-total]').forEach(el=>el.remove());
  root.querySelectorAll('.choice-grid label').forEach(label=>[...label.childNodes].filter(node=>node.nodeType===3).forEach(node=>node.textContent=node.textContent.replace(/（[^）]*分[^）]*）/g,'')));
  root.querySelectorAll('.options + p.helper').forEach(el=>el.textContent='可多选；“以上条件均不满足”与其他选项互斥。');
  root.querySelectorAll('.field').forEach(field=>{const label=field.querySelector('span'),input=field.querySelector('input');if(!label)return;if(input?.dataset.scNumber==='count')label.textContent='核验数量';else if(input?.dataset.scNumber==='score')label.textContent='填写核验数值';else if(label.textContent.startsWith('扣分依据'))label.textContent='核验说明';});
  root.querySelectorAll('small').forEach(el=>{if(/^0分/.test(el.textContent))el.textContent='以上条件均不满足';});
}
function qbSummaryText(table){
  const types=Object.entries(table.items.reduce((types,item)=>(types[SC_MODE_NAMES[item.mode]]=(types[SC_MODE_NAMES[item.mode]]||0)+1,types),{})).map(([type,n])=>type+' '+n+'题').join('；');
  const sum=qbSum(table);return `${table.name}\n${smEntry(table.id)?.draft===table?'未发布草稿':'发布版本 V'+table.version}\n题表：${table.groups.length}组 / ${table.items.length}题\n计分：${table.scoreEnabled?'开启':'关闭'}\n原始题分合计：${sum}分\n${table.scoreEnabled?`题表总分：${table.total}分；通过门槛：${table.threshold}分\n计算：${table.calculation==='scale'?`原始得分 ÷ ${sum} × ${table.total}，保留两位小数`:'原始题分直接累加'}`:'本表不生成数值成绩，不显示题分；题目本身的分值配置仍保留'}\n达标判断：${table.requireAllQualified?'所有达标题必须达标':'仅记录答案，由办理人综合判断'}\n题型：${types||'未选题'}\n题库来源：${[...new Set(table.items.map(item=>item.bankCategory||'自定义'))].join('、')||'未选题'}\n绑定节点：${table.nodeKeys.map(node=>STAGES[node][0]+'（'+STAGES[node][1]+'）').join('、')||'未挂载，使用默认流程样式'}\n生效：发布仅用于尚未开始的节点；已开始节点与历史评分不追溯修改。`;
}
function qbSummary(table){
  const rows=qbSummaryText(table).split('\n'),errors=scValidation([table]);if(!table.items.length)errors.push({message:'尚未选入题目'});
  return `<section class="qb-summary"><h3>配置总结 · ${esc(table.name)}</h3><dl>${rows.slice(1).map(row=>{const colon=row.indexOf('：');return `<dt>${esc(colon<0?'配置状态':row.slice(0,colon))}</dt><dd>${esc(colon<0?row:row.slice(colon+1))}</dd>`;}).join('')}<dt>校验结果</dt><dd>${errors.length?errors.map(issue=>esc(issue.message)).join('；'):'配置完整，可以发布。'}</dd></dl></section>`;
}
function qbTabs(){return `<nav class="qb-tabs" aria-label="题库与题表"><button data-action="qb-tab" data-tab="tables" class="${state.qbTab!=='bank'?'active':''}">题表配置</button><button data-action="qb-tab" data-tab="bank" class="${state.qbTab==='bank'?'active':''}">题库管理</button></nav>`;}
function qbTableList(){
  return pageHead('题库与题表','题目可复用，题表管计分，节点按需绑定。',qbButton('+ 新建题表','new'))+qbTabs()+`<div class="qb-intro"><div><h2>先选题，再配置题表的使用规则</h2><p>细则一、细则二、细则三均为题库来源，不再锁定某个流程或分值。题干、选项、题分在题库维护；是否计分、总分、门槛和挂载节点在题表外层配置。</p></div>${badge('4A级景区申创','gray')}</div><div class="sc-table-grid">${smAll(true).map(table=>{qbNormalize(table);const entry=smEntry(table.id);return `<article class="task-card sc-table-card"><div class="qb-bank-status">${badge(table.scoreEnabled?'计分题表':'不计分题表',table.scoreEnabled?'':'gray')}${badge(entry.draft?'有未发布草稿':'已发布','gray')}</div><h2>${esc(table.name)}</h2><p>${table.scoreEnabled?`${table.calculation==='scale'?'折算':'原分累加'} · 总分 ${table.total} / 门槛 ${table.threshold}`:'只收集答案，不生成数值成绩'}</p><div class="metric-list"><div>题目<strong>${table.items.length}</strong></div><div>分组<strong>${table.groups.length}</strong></div><div>发布版本<strong>V${entry.published.version}</strong></div></div><div class="sm-mount-label">${entry.draft?'草稿绑定（发布后生效）':'已发布绑定'}</div>${smMountLabels(table)}<div class="qb-card-actions">${scButton('管理题目 →','open',`data-table="${table.id}"`)}${qbButton('计分与节点','settings',`data-table="${table.id}"`)}${qbButton('配置总结','summary',`data-table="${table.id}"`)}${smButton('复制','copy',`data-table="${table.id}"`)}</div></article>`;}).join('')}</div><section class="panel"><p class="helper">题库修改不自动改写已发布题表。题表保存草稿、试填校验后独立发布；已开始节点和专家原始评分保留绑定快照。</p><div class="actions">${smButton('导出全部题表配置','export')}<a class="btn" href="docs/PRD-题库与题表配置.md" target="_blank">题库与题表PRD ↗</a></div></section>`;
}
function qbFiltered(picker=false){const query=(picker?state.qbPickQuery:state.qbQuery)||'',source=(picker?state.qbPickSource:state.qbSource)||'',mode=picker?'':state.qbMode;return qbQuestions().filter(question=>(!picker||question.active)&&(!source||question.bankCategory===source)&&(!mode||question.mode===mode)&&(question.title+question.id+question.note+question.sourceText).includes(query));}
function qbSourceOptions(selected){return '<option value="">所有来源分类</option>'+[...new Set(qbQuestions().map(question=>question.bankCategory))].map(source=>`<option value="${esc(source)}" ${selected===source?'selected':''}>${esc(source)}</option>`).join('');}
function qbBankPage(){
  const questions=qbFiltered(),page=Math.min(state.qbPage||0,Math.max(0,Math.ceil(questions.length/20)-1));
  return pageHead('题库管理','题干、选项、题分与规则在这里维护；总分、是否计分和绑定节点在题表配置。',qbButton('+ 新增题目','question-new'))+qbTabs()+`<div class="qb-stat"><div><strong>${qbQuestions().length}</strong>题库题目</div><div><strong>${qbQuestions().filter(question=>question.active).length}</strong>可选用题目</div><div><strong>${[...new Set(qbQuestions().map(question=>question.bankCategory))].length}</strong>来源分类</div><div><strong>${smAll().length}</strong>题表（独立版本）</div></div><section class="panel"><div class="qb-filters"><label class="field"><span>来源分类</span><select id="qbSource">${qbSourceOptions(state.qbSource)}</select></label><label class="field"><span>题型</span><select id="qbMode"><option value="">所有题型</option>${Object.entries(SC_MODE_NAMES).map(([mode,name])=>`<option value="${mode}" ${state.qbMode===mode?'selected':''}>${name}</option>`).join('')}</select></label><label class="search"><input id="qbQuery" placeholder="搜索题干、编号或原文" value="${esc(state.qbQuery||'')}"></label>${qbButton('查询','search')}</div><div class="table-wrap"><table class="qb-question-table"><thead><tr><th>编号 / 来源</th><th>题目与说明</th><th>题型 / 题分</th><th>修订 / 状态</th><th>操作</th></tr></thead><tbody>${questions.slice(page*20,page*20+20).map(question=>`<tr><td>${esc(question.id)}<small>${esc(question.bankCategory)}</small></td><td><strong>${esc(question.title)}</strong><small>${esc(question.note)}</small></td><td>${SC_MODE_NAMES[question.mode]}<small>${question.mode==='qualification'?'达标判断，不占数值分':question.max+'分'}</small></td><td>R${question.revision}<small>${question.active?'可选用':'已停用'}</small>${question.adjusted?badge('配置已调整','amber'):''}</td><td><div class="actions">${qbButton('编辑','question-edit',`data-bank="${question.bankId}"`)}${qbButton('复制','question-copy',`data-bank="${question.bankId}"`)}${qbButton(question.active?'停用':'启用','question-toggle',`data-bank="${question.bankId}"`)}</div></td></tr>`).join('')||'<tr><td colspan="5">没有匹配题目</td></tr>'}</tbody></table></div><div class="publicity-actions"><span>${questions.length}题 · 第${page+1}/${Math.max(1,Math.ceil(questions.length/20))}页</span>${qbButton('上一页','bank-prev',page?'':'disabled')}${qbButton('下一页','bank-next',(page+1)*20<questions.length?'':'disabled')}</div></section>`;
}
function qbConfigPage(){
  const table=scCurrentTable(),root=document.createElement('div');root.innerHTML=qbLegacyConfigPage();
  const heading=root.querySelector('.page-head h1');if(heading)heading.textContent=table.name;
  const actions=root.querySelector('.sc-items-panel .panel-head .actions');actions.insertAdjacentHTML('afterbegin',qbButton('从题库选题','pick')+qbButton('同步题库修订','sync'));
  const groupName=root.querySelector('.sc-group-heading strong');if(groupName)groupName.textContent='题目分组';
  const itemAdd=root.querySelector('[data-action="sc-item-add"]');if(itemAdd){itemAdd.textContent='新建题目并选入';itemAdd.dataset.action='qb-question-new';}
  const toolbar=root.querySelector('.task-card .actions');toolbar.insertAdjacentHTML('beforeend',qbButton('配置总结','summary',`data-table="${table.id}"`));
  const info=toolbar.querySelector('[data-action="sc-table-edit"]');if(info)info.textContent='题表计分与节点配置';
  const metric=root.querySelector('.metric-list');metric.innerHTML=`<div>发布版本<strong>V${smEntry(table.id).published.version}</strong></div><div>题库原始题分<strong>${qbSum(table)}分</strong></div><div>题表设置<strong>${table.scoreEnabled?`${table.total}分 / 门槛${table.threshold}`:'不计分'}</strong></div>`;
  const helper=root.querySelector('.task-card .helper');helper.textContent='题目源自题库，可灵活编辑内容与题分；整表是否计分、总分和绑定节点在外层“题表计分与节点配置”中设置。修改不影响历史记录。';
  root.querySelectorAll('.sc-item-table tbody tr').forEach(row=>{const edit=row.querySelector('[data-action="sc-item-edit"]');if(!edit)return;const item=table.items.find(item=>item.id===edit.dataset.id);if(!item)return;edit.dataset.action='qb-question-edit';edit.dataset.bank=item.bankId;const latest=db.questionBank.questions[item.bankId];row.cells[0].insertAdjacentHTML('beforeend',`<small>题库 R${item.bankRevision||1}${latest?.revision>item.bankRevision?' · 有新修订':''}</small>`);row.querySelector('td:last-child .actions').insertAdjacentHTML('beforeend',qbButton('移除','remove-item',`data-id="${item.id}"`));});
  root.insertAdjacentHTML('afterbegin',qbTabs());return root.innerHTML;
}
let qbLegacyConfigPage;
function qbEditSettings(adding=false,copyId=null){
  const table=copyId?clone(smTable(copyId,true)):adding?null:scCurrentTable();if(table)qbNormalize(table);state.qbSettings={adding,copyId};
  openModal(adding?'新建题表':'题表计分与节点配置','题库之外的表级设置；保存为草稿，发布后生效',`${scInput('qbTableName','题表名称 *',copyId?table.name+'（副本）':table?.name||'')}<section class="qb-table-settings"><h3>整表计分设置</h3><label class="check-line"><input type="checkbox" id="qbScoreEnabled" ${table?.scoreEnabled!==false?'checked':''}>本题表需要打分</label><div id="qbScoreFields" ${table?.scoreEnabled===false?'hidden':''}><div class="form-grid">${scInput('qbTotal','题表总分 *',table?.total||100,'number')}${scInput('qbThreshold','通过门槛 *',table?.threshold??80,'number')}<label class="field"><span>计算方式</span><select name="qbCalculation"><option value="sum" ${table?.calculation!=='scale'?'selected':''}>原始题分直接累加</option><option value="scale" ${table?.calculation==='scale'?'selected':''}>按题表总分等比例折算</option></select></label></div><p class="helper">当前数值题满分合计：${table?qbSum(table):0}分。直接累加时须与题表总分一致；折算 = 原始得分 ÷ 题分合计 × 题表总分。</p></div><label class="check-line"><input type="checkbox" id="qbAllQualified" ${table?.requireAllQualified!==false?'checked':''}>达标判断题须全部达标（不被数值高分抵消）</label><p class="helper">关闭计分时只收集答案，不生成数值成绩；题库里的题分仍然保留。</p></section><h3>绑定流程节点（可多选）</h3><div class="sm-node-options">${SM_NODE_KEYS.map(node=>`<label><input type="checkbox" name="qbNodes" value="${node}" ${!adding&&table?.nodeKeys?.includes(node)?'checked':''}>${STAGES[node][0]}<small> · ${STAGES[node][1]}</small></label>`).join('')}</div><p class="helper">题目内容与分值可灵活配置，正式原文仅作为对照。已发布快照、已开始节点和历史原始评分不会被修改。</p>`,qbButton('取消','cancel')+qbButton('保存题表配置','save-settings'),null,true);
}
function qbSaveSettings(){
  const name=read('qbTableName'),enabled=document.getElementById('qbScoreEnabled').checked,total=Number(read('qbTotal')),threshold=Number(read('qbThreshold')),calculation=read('qbCalculation'),requireAllQualified=document.getElementById('qbAllQualified').checked,nodeKeys=[...document.querySelectorAll('[name="qbNodes"]:checked')].map(input=>input.value),edit=state.qbSettings;
  if(!name)return validationError('请填写题表名称','[name="qbTableName"]');if(smAll(true).some(table=>table.name===name&&(edit.adding||table.id!==state.scTable)))return validationError('题表名称已存在','[name="qbTableName"]');
  if(enabled&&(!Number.isFinite(total)||total<=0||!Number.isFinite(threshold)||threshold<0||threshold>total))return validationError('总分须大于0，门槛须在0到总分之间','[name="qbTotal"]');
  let table;if(edit.adding){const copy=edit.copyId?clone(smTable(edit.copyId,true)):null,id='custom-'+Date.now();table={...(copy||{}),id,name,stage:copy?.stage||'meeting',source:'自定义题表',sourceVersion:'管理员配置',version:0,groups:copy?.groups||[],items:copy?.items||[],official:false};db.scoringLibrary.tables[id]={published:{...clone(table),nodeKeys:[],groups:[],items:[],scoreEnabled:enabled,kind:enabled?'numeric':'qualification'},draft:table,versions:[]};state.scTable=id;state.scGroup=null;}
  else table=scDraftTable();Object.assign(table,{name,scoreEnabled:enabled,kind:enabled?'numeric':'qualification',total:enabled?total:0,threshold:enabled?threshold:0,calculation,requireAllQualified,nodeKeys,configurable:true});
  save();closeModal();render();qbShowSummary(table.id);toast('题表设置已保存为草稿，请核对配置总结');
}
function qbShowSummary(id=scCurrentId()){state.qbSummaryId=id;const table=smTable(id,true);openModal('题表配置总结',table.name,qbSummary(table),qbButton('复制总结','copy-summary')+qbButton('导出总结','export-summary')+qbButton('关闭','cancel'),null,true);}
async function qbCopySummary(){const value=qbSummaryText(smTable(state.qbSummaryId,true));try{await navigator.clipboard.writeText(value);toast('配置总结已复制');}catch{openModal('复制配置总结','请选择下面的文本复制',`<textarea id="qbSummaryCopy" rows="18" readonly aria-label="配置总结文本">${esc(value)}</textarea>`,qbButton('关闭','cancel'),null,true);const input=document.getElementById('qbSummaryCopy');input.focus();input.select();}}
function qbEditQuestion(bankId,copy=false){
  const question=bankId&&db.questionBank.questions[bankId],inTable=state.qbTab!=='bank'&&!!state.scTable;
  state.qbQuestionEdit={bankId:copy?null:bankId,copy,inTable,group:state.scGroup,table:state.scTable,source:question?.bankCategory||'自定义题目'};
  const item=question?clone(question):{id:'Q-'+Date.now(),groupId:'bank',title:'新增题目',mode:'condition',max:1,options:[{key:'yes',label:'符合本项条件',score:1,min:1}],note:'请结合申报材料与证明内容核验。',originalMode:'自定义配置'};
  if(copy){item.id='Q-'+Date.now();item.title+='（副本）';}
  state.qbVirtualTable={id:'qb-edit',name:'题库题目',stage:'meeting',kind:'mixed',groups:[{id:'bank',name:'题库',parentId:null}],items:[{...item,groupId:'bank'}]};
  state.qbUseVirtual=true;try{qbLegacyEditItem(item.id);}finally{state.qbUseVirtual=false;}
  state.scEditing.bankId=state.qbQuestionEdit.bankId;state.scEditing.bankCategory=state.qbQuestionEdit.source;
  document.getElementById('modalTitle').textContent=bankId&&!copy?'编辑题库题目':'新增题库题目';document.getElementById('modalSubtitle').textContent='只配置此题的内容、题型与题分，不设置整表总分和绑定节点';
  const selector=document.querySelector('[name="scMode"]');selector.disabled=false;selector.innerHTML=Object.entries(SC_MODE_NAMES).map(([mode,label])=>`<option value="${mode}" ${item.mode===mode?'selected':''}>${label}</option>`).join('');
  document.querySelector('[name="scItemGroup"]').closest('.field').hidden=true;
  document.getElementById('modalBody').insertAdjacentHTML('afterbegin',scInput('qbQuestionSource','题库来源分类 *',state.qbQuestionEdit.source));
  document.getElementById('modalFooter').innerHTML=qbButton('取消','question-cancel')+qbButton('保存题库题目','save-question');
  const source=document.querySelector('#modalBody .sc-source');source?.insertAdjacentHTML('beforebegin','<p class="qb-config-note">题目内容和分值允许修改。修改后按新配置运行，原文仅供对照；已发布题表不会自动更新，需在题表草稿中主动同步。</p>');
}
let qbLegacyEditItem;
function qbSaveQuestion(){
  scReadEditing();const item=state.scEditing,edit=state.qbQuestionEdit,source=read('qbQuestionSource');if(!source)return validationError('请填写题库来源分类','[name="qbQuestionSource"]');if(!item.title?.trim())return validationError('请填写题干','[name="scTitle"]');
  const test={id:'bank-test',name:'题目校验',kind:item.mode==='qualification'?'qualification':'numeric',total:item.max,groups:[{id:'bank',name:'题库',parentId:null}],items:[{...item,groupId:'bank'}]};const issue=scValidation([test]).find(issue=>issue.item===item.id);if(issue)return validationError(issue.message,'#scModeFields');
  const existing=edit.bankId&&db.questionBank.questions[edit.bankId],bankId=existing?.bankId||'BANK-'+Date.now(),revision=(existing?.revision||0)+1;
  const question={...clone(item),groupId:'bank',bankId,bankCategory:source,revision,active:existing?.active??true,adjusted:true,sourceSnapshot:existing?.sourceSnapshot||null};delete question.bankRevision;
  db.questionBank.questions[bankId]=question;
  if(edit.inTable&&smEntry(edit.table)){
    const table=scDraftTable(),bound=table.items.find(item=>item.bankId===bankId);if(bound)Object.assign(bound,clone(question),{id:bound.id,groupId:bound.groupId,bankRevision:revision});else table.items.push({...clone(question),id:table.items.some(item=>item.id===question.id)?bankId:question.id,groupId:edit.group||table.groups[0]?.id,bankRevision:revision});scRefreshDraft(table);
  }
  save();closeModal();render();toast(edit.inTable?'题库已修订，当前题表草稿已同步；发布版不变':'题库修订已保存，已发布题表不变');
}
function qbPick(reset=true){if(reset){state.qbPicked=new Set();state.qbPickPage=0;state.qbPickQuery='';state.qbPickSource='';}const table=scCurrentTable(),existing=new Set(table.items.map(item=>item.bankId)),questions=qbFiltered(true),page=Math.min(state.qbPickPage||0,Math.max(0,Math.ceil(questions.length/20)-1));
  openModal('从题库选题',table.name,`<div class="qb-picked"><strong id="qbPickCount">已勾选 ${state.qbPicked.size} 题</strong><span>题目将选入左侧当前分组。已选入本表的题目不能重复添加。</span></div><div class="qb-filters"><label class="field"><span>来源分类</span><select id="qbPickSource">${qbSourceOptions(state.qbPickSource)}</select></label><label class="search"><input id="qbPickQuery" placeholder="检索题干或原文" value="${esc(state.qbPickQuery||'')}"></label>${qbButton('查询','pick-search')}${qbButton('勾选当前页','pick-page-all')}</div><div class="table-wrap"><table class="qb-question-table"><thead><tr><th>选择</th><th>题干 / 来源</th><th>题型</th><th>题分</th></tr></thead><tbody>${questions.slice(page*20,page*20+20).map(question=>`<tr><td><input type="checkbox" data-qb-pick="${question.bankId}" ${existing.has(question.bankId)?'checked disabled':state.qbPicked.has(question.bankId)?'checked':''} aria-label="选择${esc(question.title)}"></td><td><strong>${esc(question.title)}</strong><small>${esc(question.bankCategory)} · R${question.revision}${existing.has(question.bankId)?' · 已选入':''}</small></td><td>${SC_MODE_NAMES[question.mode]}</td><td>${question.mode==='qualification'?'达标判断':question.max+'分'}</td></tr>`).join('')||'<tr><td colspan="4">没有可选题目</td></tr>'}</tbody></table></div><div class="publicity-actions"><span>${questions.length}题 · ${page+1}/${Math.max(1,Math.ceil(questions.length/20))}页</span>${qbButton('上一页','pick-prev',page?'':'disabled')}${qbButton('下一页','pick-next',(page+1)*20<questions.length?'':'disabled')}</div>`,qbButton('取消','cancel')+qbButton('确认选入当前分组','pick-save'),null,true);
}
function qbInitialize(){
  if(window.QB_READY)return;window.QB_READY=true;
  db.questionBank??={questions:{}};
  for(const entry of Object.values(db.scoringLibrary.tables)){
    for(const table of [entry.published,entry.draft,...entry.versions].filter(Boolean))qbNormalize(table);
    for(const table of [entry.draft,entry.published].filter(Boolean))for(const item of table.items){const bankId=item.bankId||table.id+'::'+item.id;if(!db.questionBank.questions[bankId])db.questionBank.questions[bankId]={...clone(item),bankId,bankCategory:table.name,revision:1,active:true,sourceSnapshot:clone(item),adjusted:false};item.bankId=bankId;item.bankCategory=db.questionBank.questions[bankId].bankCategory;item.bankRevision??=db.questionBank.questions[bankId].revision;}
  }
  const oldCurrent=scCurrentTable;scCurrentTable=()=>state.qbUseVirtual?state.qbVirtualTable:oldCurrent();
  const oldEdit=scEditItem;qbLegacyEditItem=oldEdit;
  const oldModeFields=scModeFields;scModeFields=item=>oldModeFields(item).replace('固定空间5分 + 实体最高5分；空间不完整本项0分。','空间分与实体选项分相加，最高不超过本题满分；空间不完整本题0分。')+(item.mode==='integrity'?scInput('qbSpaceScore','空间完整部分分值 *',item.spaceScore??5,'number'):'');
  const oldReadEditing=scReadEditing;scReadEditing=()=>{oldReadEditing();if(state.scEditing?.mode==='integrity')state.scEditing.spaceScore=Number(read('qbSpaceScore'));};
  const oldBaseScore=scBaseAnswerScore;scBaseAnswerScore=(item,answer)=>item.mode==='integrity'?(answer.integrity===false?0:answer.integrity===true?Math.min(item.max,(item.spaceScore??5)+Number(item.options.find(option=>option.key===answer.option)?.score||0)):undefined):oldBaseScore(item,answer);
  const oldControls=scControls;scControls=(item,answer,prefix)=>oldControls(item,answer,prefix).replaceAll('空间完整（5分）',`空间完整（${item.spaceScore??5}分）`).replaceAll('5 + ',(item.spaceScore??5)+' + ');
  const oldValidation=scValidation;scValidation=tables=>{
    const errors=[];for(const table of tables){
      const adjusted=clone(table);adjusted.id=adjusted.id==='prerequisite'?'editable-prerequisite':adjusted.id;adjusted.kind='mixed';adjusted.groups.forEach(group=>delete group.sourceMax);
      for(const item of adjusted.items)if(item.mode==='integrity'){const space=item.spaceScore??5;if(!Number.isFinite(space)||space<0||space>item.max)errors.push({table:table.id,item:item.id,message:'空间部分分值须在0到本题满分之间'});item.mode='single';item.options=item.options.map(option=>({...option,score:option.score+space,min:option.score+space}));}
      errors.push(...oldValidation([adjusted]).filter(error=>!error.message.startsWith('整表满分')));
      if(table.scoreEnabled){const sum=qbSum(table);if(sum<=0)errors.push({table:table.id,message:'计分题表至少需要一道有分值的数值题'});if(!Number.isFinite(table.total)||table.total<=0||!Number.isFinite(table.threshold)||table.threshold<0||table.threshold>table.total)errors.push({table:table.id,message:'请检查外层题表总分和通过门槛'});if(table.calculation!=='scale'&&sum!==table.total)errors.push({table:table.id,message:`题目满分合计${sum}与题表总分${table.total}不一致，请调整题分或在外层选择折算`});}
    }return errors;
  };
  const rawCalculate=scCalculate;scCalculate=(table,answers,checks={})=>{
    if(table.scoreEnabled===undefined)return rawCalculate(table,answers,checks);
    const qualified=qbQualified(table,{answers});if(!table.scoreEnabled)return table.requireAllQualified?(qualified?'达标':'未全部达标'):'已填写';
    const numeric={...table,kind:'numeric',items:table.items.filter(item=>item.mode!=='qualification')},raw=rawCalculate(numeric,answers,checks);return table.calculation==='scale'?Math.round(raw/(qbSum(table)||1)*table.total*100)/100:raw;
  };
  const oldEffective=smEffectiveLabel;smEffectiveLabel=(table,item,answer,checks)=>item.mode==='qualification'?(answer.result==='pass'?'达标':answer.result==='fail'?'不达标':'待核验'):oldEffective(table,item,answer,checks);
  qbLegacyConfigPage=rulesPage;rulesPage=()=>state.role!=='admin'?empty('仅系统管理员可配置题库与题表。'):state.qbTab==='bank'?qbBankPage():!state.scTable?qbTableList():qbConfigPage();
  smEditTable=qbEditSettings;
  const oldRender=render;render=()=>{oldRender();document.querySelectorAll('#nav [data-nav="rules"]').forEach(button=>button.innerHTML=icon('list-checks')+'题库与题表');if(state.view==='rules')document.querySelector('#breadcrumb strong').textContent='题库与题表';};
  const oldQuestion=smQuestion;smQuestion=(project,table,item,answer)=>{let markup=oldQuestion(project,table,item,answer);if(table.scoreEnabled===false){const root=document.createElement('div');root.innerHTML=markup;root.firstElementChild.classList.add('qb-noscore');qbNoScoreControls(root);markup=root.innerHTML;}return markup;};
  const oldRenderPreview=scRenderPreview;scRenderPreview=()=>{oldRenderPreview();if(state.scPreview.table.scoreEnabled===false)qbNoScoreControls(document.getElementById('scPreviewBody'));};
  const oldPreview=scPreview;scPreview=(tableId,itemId)=>{oldPreview(tableId,itemId);const table=state.scPreview.table;document.querySelector('#modalBody .alert').textContent=table.scoreEnabled?`题表总分${table.total}，通过门槛${table.threshold}；${table.calculation==='scale'?'按题表总分折算':'原始题分直接累加'}。试填不写入项目。`:`本表不计分；${table.requireAllQualified?'达标题须全部达标':'仅收集答案，由办理人综合判定'}。试填不写入项目。`;};
  const oldOnline=smOnline;smOnline=(project,holder,expert=false)=>{const markup=oldOnline(project,holder,expert),active=smActive(project,holder);if(active?.table.scoreEnabled!==false)return markup;const root=document.createElement('div');root.innerHTML=markup;root.querySelectorAll('.sc-special').forEach(el=>el.remove());root.querySelectorAll('.sc-tree-node small').forEach(el=>el.textContent=el.textContent.replace(/ · [\d.]+分/,''));const note=root.querySelector('.sm-node-score-note');if(note)note.textContent=active.table.requireAllQualified?'本题表不计分；逐项核验，达标题须全部达标。':'本题表不计分；仅记录答案，由当前办理人综合判断。';root.querySelectorAll('[data-sm-question] .field>span').forEach(el=>{if(el.textContent.startsWith('扣分依据'))el.textContent='核验说明';});return root.innerHTML;};
  const oldOffline=smOffline;smOffline=(project,sheet)=>{const root=document.createElement('div');root.innerHTML=oldOffline(project,sheet);for(const table of smBind(project)){if(table.scoreEnabled&&table.items.some(item=>item.mode==='qualification'))root.querySelector(`[data-sm-offline-table="${table.id}"]`).insertAdjacentHTML('beforeend',`<p>达标题核验结论${table.requireAllQualified?'（不达标不能被高分抵消）':'（仅记录）'}</p><div class="choice-grid">${[['pass','全部达标'],['fail','存在不达标']].map(([value,label])=>`<label><input type="radio" name="qb-offline-qualified-${table.id}" data-sm-qualification="${table.id}" value="${value}" ${sheet.offlineResults[table.id].result===value?'checked':''}>${label}</label>`).join('')}</div>`);}return root.innerHTML;};
  const oldFinish=finishScore;finishScore=()=>{oldFinish();const project=getProject(),sheet=project?.sheets[project.stage]?.[state.expert];if(sheet?.scoringMethod&&document.getElementById('modalTitle')?.textContent==='专家签字并提交'){const tables=smBind(project),numericFailed=sheet.mountedResults.some(result=>result.kind==='numeric'&&result.value<result.threshold),qualifiedFailed=tables.some(table=>table.requireAllQualified!==false&&(sheet.scoringMethod==='online'?!qbQualified(table,smData(sheet,table)):(!table.scoreEnabled||table.items.some(item=>item.mode==='qualification'))&&sheet.offlineResults?.[table.id]?.result==='fail'));sheet.result=numericFailed||qualifiedFailed||!tables.length&&sheet.offlineDecision==='fail'?'fail':'pass';document.querySelector('#modalBody .alert').innerHTML=`<p>${tables.some(table=>table.scoreEnabled)?'本人评分记录：'+sheet.mountedResults.filter(result=>result.kind==='numeric').map(result=>esc(result.name)+' '+result.value+'分').join('；'):'本次不计分，仅记录核验情况'}。${sheet.result==='fail'?'存在未达标项或低于参考分值；':''}系统不作审批判定，由省厅人工形成结论。提交后锁定答案、附件与签字。</p>`;save();}};
  const oldScoringTotal=scoreTable;scoreTable=(project,stage)=>{let content=oldScoringTotal(project,stage);const sheets=project.sheets[stage]||{};for(const sheet of Object.values(sheets))if(sheet.scoringMethod&&sheet.mountedResults?.length&&!sheet.mountedResults.some(result=>result.kind==='numeric'))content=content.replaceAll('<td>'+sheet.total+'分</td>','<td>不计分</td>');return content;};
  const oldRecord=scoreRecordModal;scoreRecordModal=(stage,id)=>{oldRecord(stage,id);const sheet=getProject()?.sheets[stage]?.[id];if(sheet?.scoringMethod&&sheet.mountedResults?.length&&!sheet.mountedResults.some(result=>result.kind==='numeric')){const label=document.querySelector('#modalBody .alert strong');if(label)label.textContent=expertName(id)+' · '+(sheet.scoringMethod==='offline'?'线下填写':'线上填写')+' · 不计分';}};
  document.addEventListener('change',qbChange,true);save();
}
function qbClick(event){
  const button=event.target.closest('[data-action]');if(!button||button.disabled)return;const action=button.dataset.action;
  if(['sm-new','sm-copy','sc-table-edit','sc-publish'].includes(action)&&state.role==='admin'){
    event.stopImmediatePropagation();event.preventDefault();if(action==='sm-new')return qbEditSettings(true);if(action==='sm-copy')return qbEditSettings(true,button.dataset.table);if(action==='sc-table-edit')return qbEditSettings();
    const table=scCurrentTable(),issues=scValidation([table]);if(!table.items.length)issues.unshift({message:'请先从题库选入题目'});if(issues.length)return openModal('题表校验未通过',table.name,issues.map(issue=>`<p>${esc(issue.message)}</p>`).join(''));
    return confirm('确认配置总结并发布',qbSummary(table)+'<p>仅用于尚未开始的节点，历史记录与原始评分不变。</p>',()=>{const entry=smEntry(table.id),version={...clone(table),version:entry.published.version+1,by:person(),at:new Date().toLocaleString('zh-CN',{hour12:false})};entry.versions.push(clone(version));entry.published=version;delete entry.draft;save();closeModal();render();toast('题表及节点配置已发布');});
  }
  if(!action.startsWith('qb-'))return;event.stopImmediatePropagation();event.preventDefault();if(state.role!=='admin')return;const command=action.slice(3);
  if(command==='cancel'||command==='question-cancel'){closeModal();return;}
  if(command==='tab'){state.qbTab=button.dataset.tab;state.scTable=null;render();return;}
  if(command==='new')return qbEditSettings(true);
  if(command==='settings'){state.scTable=button.dataset.table;return qbEditSettings();}
  if(command==='save-settings')return qbSaveSettings();
  if(command==='summary')return qbShowSummary(button.dataset.table||scCurrentId());
  if(command==='copy-summary')return qbCopySummary();
  if(command==='export-summary'){const table=smTable(state.qbSummaryId,true);return downloadText(table.name+'-配置总结.txt',qbSummaryText(table));}
  if(command==='search'){state.qbQuery=document.getElementById('qbQuery').value.trim();state.qbPage=0;render();return;}
  if(command==='bank-prev'||command==='bank-next'){state.qbPage=Math.max(0,(state.qbPage||0)+(command==='bank-next'?1:-1));render();return;}
  if(command==='question-new'){if(state.qbTab!=='bank'&&state.scTable&&!scCurrentTable().groups.length)return toast('请先在左侧新增一个题目分组');return qbEditQuestion();}
  if(command==='question-edit'||command==='question-copy')return qbEditQuestion(button.dataset.bank,command==='question-copy');
  if(command==='save-question')return qbSaveQuestion();
  if(command==='question-toggle'){const question=db.questionBank.questions[button.dataset.bank];return confirm(question.active?'停用题目':'启用题目','<p>只影响后续选题，已选入题表及历史记录不变。</p>',()=>{question.active=!question.active;save();closeModal();render();});}
  if(command==='remove-item'){const table=scDraftTable();table.items=table.items.filter(item=>item.id!==button.dataset.id);scRefreshDraft(table);render();return;}
  if(command==='sync')return confirm('同步题库最新修订','<p>只更新当前题表草稿中已引用题目的内容与分值，保留分组与题表内编号，不影响发布版。请重新校验题分合计。</p>',()=>{const table=scDraftTable();table.items=table.items.map(item=>{const question=db.questionBank.questions[item.bankId];return question?{...clone(question),id:item.id,groupId:item.groupId,bankRevision:question.revision}:item;});scRefreshDraft(table);closeModal();render();});
  if(command==='pick'){if(!scCurrentTable().groups.length)return toast('请先在左侧新增一个题目分组');return qbPick();}
  if(command==='pick-search'){state.qbPickQuery=document.getElementById('qbPickQuery').value.trim();state.qbPickPage=0;return qbPick(false);}
  if(command==='pick-prev'||command==='pick-next'){state.qbPickPage=Math.max(0,(state.qbPickPage||0)+(command==='pick-next'?1:-1));return qbPick(false);}
  if(command==='pick-page-all'){document.querySelectorAll('[data-qb-pick]:not(:disabled)').forEach(input=>{input.checked=true;state.qbPicked.add(input.dataset.qbPick);});document.getElementById('qbPickCount').textContent='已勾选 '+state.qbPicked.size+' 题';return;}
  if(command==='pick-save'){const table=scDraftTable();for(const id of state.qbPicked){const question=db.questionBank.questions[id];if(question?.active&&!table.items.some(item=>item.bankId===id))table.items.push({...clone(question),id:table.items.some(item=>item.id===question.id)?question.bankId:question.id,groupId:state.scGroup||table.groups[0].id,bankRevision:question.revision});}scRefreshDraft(table);closeModal();render();return qbShowSummary(table.id);}
}
function qbChange(event){const element=event.target;if(element.id==='qbScoreEnabled')document.getElementById('qbScoreFields').hidden=!element.checked;
  if(element.dataset.smQualification){const project=getProject();if(!smCanEdit(project)||state.role!=='expert')return;const sheet=sheetFor(project,project.stage);if(sheet.submitted||sheet.scoringMethod!=='offline')return;const table=smBind(project).find(table=>table.id===element.dataset.smQualification);if(table)(sheet.offlineResults[table.id]??={}).result=element.value;save();}
  if(element.id==='qbSource'||element.id==='qbMode'){state[element.id==='qbSource'?'qbSource':'qbMode']=element.value;state.qbPage=0;render();}
  if(element.id==='qbPickSource'){state.qbPickSource=element.value;state.qbPickPage=0;qbPick(false);}
  if(element.dataset.qbPick){if(element.checked)state.qbPicked.add(element.dataset.qbPick);else state.qbPicked.delete(element.dataset.qbPick);document.getElementById('qbPickCount').textContent='已勾选 '+state.qbPicked.size+' 题';}
}
document.addEventListener('click',qbClick,true);
