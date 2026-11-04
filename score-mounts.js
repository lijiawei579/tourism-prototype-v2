'use strict';
// Table publication and node bindings are independent of the legacy stage rule store.
// Existing submitted sheets retain their original renderer and immutable raw scores.
const SM_NODE_KEYS=['initial','document','document-summary','meeting','hall','creation','field','committee','publicity'];
const smEntry=id=>db.scoringLibrary.tables[id];
const smAll=(draft=false)=>Object.values(db.scoringLibrary.tables).map(entry=>draft&&entry.draft||entry.published);
const smTable=(id,draft=false)=>draft&&smEntry(id)?.draft||smEntry(id)?.published;
const smVersion=(id,version)=>smEntry(id)?.versions.find(table=>table.version===version);
const smButton=(text,action,extra='')=>{const classes=extra.match(/class="([^"]*)"/);return button(text,'sm-'+action,extra.replace(/class="[^"]*"/,'' )).replace('class="btn"',`class="${classes?.[1]||'btn'}"`);};
const smPublishedMounts=node=>smAll().filter(table=>table.nodeKeys.includes(node));
function smBind(project,node=project.stage){
  project.nodeScoreBindings??={};
  if(!Object.hasOwn(project.nodeScoreBindings,node)){
    project.nodeScoreBindings[node]=smPublishedMounts(node).map(table=>({tableId:table.id,version:table.version}));save();
  }
  return project.nodeScoreBindings[node].map(ref=>smVersion(ref.tableId,ref.version)).filter(Boolean);
}
function smCanEdit(project){return project&&!project.correction&&!['draft','done','failed'].includes(project.stage)&&canHandle(project)&&!(state.role==='expert'&&(!project.avoidance?.[state.expert]||project.avoidance[state.expert].conflict));}
function smHolder(project){
  if(state.role==='expert'&&['meeting','field'].includes(project.stage))return sheetFor(project,project.stage);
  project.nodeScoreDrafts??={};return project.nodeScoreDrafts[project.stage+'-'+state.role+'-'+(state.role==='expert'?state.expert:'actor')]??={mountScore:{}};
}
function smSeedAnswer(item){
  const answer={evidence:[],note:'',rectification:''};
  if(item.mode==='qualification')answer.result='pass';
  else if(item.mode==='multiple')answer.options=item.options.filter(option=>!option.exclusive||option.key===item.options.filter(other=>other.exclusive===option.exclusive).sort((a,b)=>b.score-a.score)[0]?.key).map(option=>option.key);
  else if(item.mode==='quantity-add')answer.count=Math.ceil(item.max/item.unit);
  else if(item.mode==='quantity-deduct')answer.count=0;
  else if(['single','condition','band-range','integrity'].includes(item.mode)){answer.option=item.options.slice().sort((a,b)=>b.score-a.score)[0]?.key;if(item.mode==='integrity')answer.integrity=true;answer.score=answer.rawScore=item.max;}
  else answer.score=answer.rawScore=item.max;
  if(item.mode!=='qualification')answer.score=scAnswerScore(item,answer);return answer;
}
function smData(holder,table){
  holder.mountScore??={};let data=holder.mountScore[table.id];if(!data){
    data=holder.mountScore[table.id]={answers:{},checks:{}};
    for(const [index,item] of table.items.entries()){
      const existing=holder.answers?.[item.id]||(item.mode==='qualification'&&holder.required?.[index]?{result:holder.required[index]}:null);
      if(existing&&!scAnswerIssue(item,existing))data.answers[item.id]=clone(existing);else if(window.V2_DEMO)data.answers[item.id]=smSeedAnswer(item);
    }
    for(const group of table.groups)if(holder.groupChecks?.[group.id])data.checks[group.id]=clone(holder.groupChecks[group.id]);else if(window.V2_DEMO&&group.zeroRule)data.checks[group.id]={zero:false};
  }return data;
}
function smResult(table,data){return scCalculate(table,data.answers,data.checks);}
function smRulesList(){
  return pageHead('自定义评分表','评分表 → 评分组 → 评分项。发布挂载后，节点使用评分表；未挂载时使用默认流程页面。',smButton('+ 新建评分表','new'))+`<section class="task-card"><label class="field sc-category"><span>申创类别（预留扩展）</span><select aria-label="评分表申创类别"><option value="scenic">旅游景区质量等级申创 · 4A</option></select></label><p class="helper">正式细则是预置评分表。可以复制或新建，独立发布，并选择一个或多个流程节点。</p></section><div class="sc-table-grid">${smAll(true).map(table=>{const entry=smEntry(table.id);return `<article class="task-card sc-table-card sm-table-card"><span class="sc-kicker">${table.official?'正式细则 · 预置表':'自定义评分表'}</span><h2>${esc(table.name)}</h2><p>${table.kind==='qualification'?'全部达标 · 不计入数值总分':`满分 ${table.total} 分 · 通过门槛 ${table.threshold} 分`}</p><div class="metric-list"><div>评分组<strong>${table.groups.length}</strong></div><div>评分项<strong>${table.items.length}</strong></div><div>发布版本<strong>V${entry.published.version}</strong></div></div><div class="sm-mount-label">${entry.draft?'草稿挂载（发布后生效）':'已发布挂载'}</div>${smMountLabels(table)}${badge(entry.draft?'有未发布草稿':'已发布','gray')}<div class="footer">${scButton('配置评分表 →','open',`data-table="${table.id}"`)}${smButton('复制','copy',`data-table="${table.id}"`)}${scButton('试算','preview',`data-table="${table.id}"`)}</div></article>`;}).join('')}</div><section class="panel"><h3>版本与生效范围</h3><p>发布只影响尚未开始的节点。已开始节点和已提交的专家评分保留原表版本；评分结果不代替原有审批结论。</p><div class="actions">${smButton('导出全部配置','export')}<a class="btn" href="docs/PRD-自定义评分表与节点挂载.md" target="_blank">本次调整PRD ↗</a></div></section>`;
}
function smMountLabels(table){return `<div class="sm-mounts">${table.nodeKeys.length?table.nodeKeys.map(node=>badge(STAGES[node][0],'gray')).join(''):badge('未挂载 · 默认流程样式','gray')}</div>`;}
function smRulesPage(){
  if(state.role!=='admin')return empty('仅系统管理员可配置评分表。');if(!state.scTable)return smRulesList();
  if(!smEntry(state.scTable)){state.scTable=null;return smRulesList();}
  const table=scCurrentTable(),entry=smEntry(table.id),root=document.createElement('div');root.innerHTML=smLegacyRulesPage();
  const left=root.querySelector('.sc-group-panel'),right=root.querySelector('.sc-items-panel'),tools=document.createElement('div');tools.className='sm-group-tools';
  const group=table.groups.find(group=>group.id===state.scGroup);tools.innerHTML=`<strong>当前组：${esc(group?.name||'尚无评分组')}</strong><div class="actions"></div>`;
  right.querySelectorAll('[data-action^="sc-group-"]').forEach(element=>tools.querySelector('.actions').append(element));left.querySelector('.sc-group-heading').after(tools);
  root.querySelector('[data-action="sc-publish"]').textContent='发布本评分表';root.querySelector('[data-action="sc-discard"]').textContent='放弃本表草稿';
  const select=root.querySelector('#scTableSelect');select.innerHTML=smAll(true).map(value=>`<option value="${value.id}" ${value.id===table.id?'selected':''}>${esc(value.name)}</option>`).join('');
  const metric=root.querySelector('.metric-list');metric.innerHTML=`<div>发布版本<strong>V${entry.published.version}</strong></div><div>${table.kind==='qualification'?'总体要求':'满分 / 通过门槛'}<strong>${table.kind==='qualification'?'全部达标':table.total+' / '+table.threshold+'分'}</strong></div><div>编辑状态<strong>${entry.draft?'有未发布草稿':'与发布版一致'}</strong></div>`;
  const card=root.querySelector('.task-card'),helper=card.querySelector('.helper');helper.innerHTML=`${table.official?'预置正式规则':'自定义规则'} · ${esc(table.source||'管理员配置')}。当前表独立发布；已开始及历史节点不变。`;helper.insertAdjacentHTML('afterend',smMountLabels(table));
  return root.innerHTML;
}
let smLegacyRulesPage;
function smEditTable(adding=false,copyId=null){
  const table=copyId?clone(smTable(copyId,true)):adding?null:scCurrentTable();state.smTableEdit={adding,copyId};
  openModal(adding?(copyId?'复制评分表':'新建自定义评分表'):'表信息与节点挂载','挂载决定节点的页面形式；未挂载使用默认流程样式',`<div class="form-grid">${scInput('smName','评分表名称 *',copyId?table.name+'（副本）':table?.name||'')}<label class="field"><span>计分性质</span><select name="smKind" ${table?'disabled':''}><option value="numeric" ${table?.kind!=='qualification'?'selected':''}>数值评分表</option><option value="qualification" ${table?.kind==='qualification'?'selected':''}>达标 / 不达标表</option></select></label>${scInput('smTotal','满分（数值表）',table?.total??100,'number')}${scInput('smThreshold','通过门槛（数值表）',table?.threshold??80,'number')}</div><h3>挂载流程节点（可多选，也可不挂载）</h3><div class="sm-node-options">${SM_NODE_KEYS.map(node=>`<label><input type="checkbox" name="smNodes" value="${node}" ${!adding&&table?.nodeKeys?.includes(node)?'checked':''}>${STAGES[node][0]}</label>`).join('')}</div><p class="helper">正式细则的计分性质、满分与门槛不可修改；可复制为自定义表再配置。保存仅为草稿，校验发布后生效。</p>`,smButton('取消','cancel')+smButton(adding?'创建评分表草稿':'保存表草稿','table-save'));
  if(table?.official&&!copyId)for(const name of ['smTotal','smThreshold'])document.querySelector(`[name="${name}"]`).disabled=true;
}
function smSaveTable(){
  const name=read('smName'),kind=read('smKind'),nodes=[...document.querySelectorAll('[name="smNodes"]:checked')].map(input=>input.value),total=Number(read('smTotal')),threshold=Number(read('smThreshold')),edit=state.smTableEdit;
  if(!name)return validationError('请填写评分表名称','[name="smName"]');
  if(smAll(true).some(table=>table.name===name&&(edit.adding||table.id!==state.scTable)))return validationError('评分表名称已存在','[name="smName"]');
  if(kind==='numeric'&&(!Number.isFinite(total)||total<=0||!Number.isFinite(threshold)||threshold<0||threshold>total))return validationError('满分须大于0，门槛须在0到满分之间','[name="smTotal"]');
  if(edit.adding){
    const id='custom-'+Date.now(),copy=edit.copyId?clone(smTable(edit.copyId,true)):null;
    const table={...(copy||{}),id,name,stage:copy?.stage||'meeting',kind,nodeKeys:nodes,total:kind==='numeric'?total:0,threshold:kind==='numeric'?threshold:0,official:false,source:'管理员自定义配置',sourceVersion:'自定义',version:0,groups:copy?.groups||[],items:copy?.items||[]};
    if(copy)for(const group of table.groups)delete group.sourceMax;
    db.scoringLibrary.tables[id]={published:{...clone(table),nodeKeys:[],groups:[],items:[]},draft:table,versions:[]};state.scTable=id;state.scGroup=null;
  }else{const table=scDraftTable();table.name=name;table.nodeKeys=nodes;if(!table.official){table.total=kind==='numeric'?total:0;table.threshold=kind==='numeric'?threshold:0;}}
  save();closeModal();render();toast('表信息与节点挂载已保存为草稿');
}
function smPublish(){
  const table=scCurrentTable(),issues=scValidation([table]);if(!table.items.length)issues.unshift({message:'评分表至少包含一个评分组和评分项'});
  if(issues.length){openModal('配置尚未通过校验',table.name,issues.map(issue=>`<p>${esc(issue.group||'')} ${esc(issue.item||'')}：${esc(issue.message)}</p>`).join(''));return;}
  confirm('发布本评分表',`<p>${esc(table.name)}</p>${smMountLabels(table)}<p>仅用于尚未开始的节点。原始专家分和历史记录不会改变。</p>`,()=>{const entry=smEntry(table.id),version={...clone(table),version:entry.published.version+1,at:new Date().toLocaleString('zh-CN',{hour12:false}),by:person()};entry.versions.push(clone(version));entry.published=version;delete entry.draft;save();closeModal();render();toast('评分表及节点挂载已发布');});
}
function smMethodChoice(project,sheet){return `<section class="task-card"><div class="task-heading"><div><h2>请选择本次评分方式</h2><p>${STAGES[project.stage][0]} · ${person()} · 回避情况已确认</p></div>${badge('尚未选择','amber')}</div><p class="helper">线上逐项填写评分表；线下上传已完成的打分表并登记结果。两种方式均在完成后签字提交。</p><div class="sm-methods"><button class="sm-method" data-action="sm-method" data-method="online" ${smBind(project).length?'':'disabled'}><strong>线上评分 →</strong><small>${smBind(project).length?'进入完整评分表，逐项核验并填写分数或达标情况。':'本节点尚未挂载评分表，请使用线下评分。'}</small></button><button class="sm-method" data-action="sm-method" data-method="offline"><strong>线下评分 →</strong><small>左侧查看申报材料，右侧上传打分表、登记结果并提交意见。</small></button></div></section>`;}
function smExpertReady(project){return state.role==='expert'&&['meeting','field'].includes(project.stage)&&(project.assigned[project.stage]||[]).includes(state.expert)&&project.avoidance?.[state.expert]&&!project.avoidance[state.expert].conflict;}
function smOffline(project,sheet){
  const tables=smBind(project);sheet.offlineResults??={};
  return `<section class="task-card"><div class="sm-method-label"><h2>线下评分 · ${STAGES[project.stage][0]}</h2>${smButton('更换评分方式','switch-method')}</div><p class="helper">根据本人签署的线下打分表登记结果，不生成虚假的逐项线上答案。</p>${tables.map(table=>{const result=sheet.offlineResults[table.id]??={score:window.V2_DEMO?table.total:'',result:'pass'};return `<section class="sm-offline-table" data-sm-offline-table="${table.id}"><h3>${esc(table.name)} · V${table.version}</h3>${table.kind==='numeric'?`<p class="helper">满分${table.total}，通过门槛${table.threshold}</p><label class="field"><span>线下汇总分 *</span><input type="number" min="0" max="${table.total}" step="0.01" data-sm-offline="${table.id}" value="${result.score}"></label>`:`<div class="choice-grid">${[['pass','达标'],['fail','不达标']].map(([value,label])=>`<label><input type="radio" name="sm-offline-${table.id}" data-sm-offline="${table.id}" value="${value}" ${result.result===value?'checked':''}>${label}</label>`).join('')}</div>`}</section>`;}).join('')}${!tables.length?`<div class="choice-grid">${[['pass','评审通过'],['fail','评审不通过']].map(([value,label])=>`<label><input type="radio" name="smOfflineResult" value="${value}" ${(sheet.offlineDecision||'pass')===value?'checked':''}>${label}</label>`).join('')}</div>`:''}${smUploadBlocks(project,sheet)}${field('scoreComment','本阶段综合意见 *','textarea',sheet.comment||'已对照申报材料、评分标准与线下打分表完成核验。')}<div class="footer">${primary('完成评分并签字','finish-score')}</div></section>`;
}
function smUploadBlocks(project,sheet){return `<div class="sm-upload-block"><h3>打分表 *</h3>${upload('上传已完成的打分表','scoreSheet')}${project.stage==='meeting'?upload('上传附件OCR识别','ocr-meeting'):''}${fileRows(project,'scoreSheet',sheet.uploads?.scoreSheet||[],true)}</div>${project.stage==='field'?`<div class="sm-upload-block"><h3>现场照片 *</h3>${upload('上传现场照片','photos','accept="image/*"')}${fileRows(project,'photos',sheet.uploads?.photos||[],true)}${(sheet.uploads?.photos||[]).map((file,index)=>field('photo-desc-'+index,file.name+' · 简述（非必填）','text',file.description||'')).join('')}</div><div class="sm-upload-block"><h3>现场验收报告 *</h3>${upload('上传现场验收报告','report')}${fileRows(project,'report',sheet.uploads?.report||[],true)}</div>${button('查看单项问题与证据汇总','field-uploads')}`:''}`;}
function smActive(project,holder){
  const tables=smBind(project),context=project.id+':'+project.stage+':'+state.role+':'+state.expert;
  if(state.smContext!==context){state.smContext=context;state.smRuntimeTable=null;state.smRuntimeGroup=null;state.smRuntimePage=0;}
  const table=tables.find(table=>table.id===state.smRuntimeTable)||tables[0];if(!table)return null;state.smRuntimeTable=table.id;
  const group=table.groups.find(group=>group.id===state.smRuntimeGroup)||table.groups[0];state.smRuntimeGroup=group?.id;
  return {tables,table,group,data:smData(holder,table)};
}
function smOnline(project,holder,expert=false){
  const active=smActive(project,holder);if(!active)return empty('本节点没有挂载评分表，请使用默认流程办理。');
  const {tables,table,group,data}=active,items=group?scGroupItems(table,group.id):table.items,page=Math.min(state.smRuntimePage||0,Math.max(0,Math.ceil(items.length/20)-1)),allowed=new Set([group?.id,...(group?scDescendants(table,group.id):[]),...(scIndex(table).ancestors.get(group?.id)||[])]);
  return `<section class="sm-score-editor" data-sm-editor><div class="score-dock"><div class="score-toolbar"><div><h2>${expert?'线上评分':STAGES[project.stage][0]+' · 评分表'}</h2><strong id="smRuntimeTotal">${smResult(table,data)}${table.kind==='numeric'?' / '+table.total+'分':''}</strong><p class="sm-score-status">${esc(table.name)} · 固定版本 V${table.version} · 草稿自动保存</p></div><div class="actions">${button('申报方提交材料','materials-modal')}${expert?smButton('更换评分方式','switch-method'):''}${expert&&project.stage==='meeting'?upload('评分表附件 / OCR','ocr-meeting'):expert?button('现场附件与问题汇总','field-uploads'):''}${expert?primary('完成评分并签字','finish-score'):''}</div></div><div class="sm-runtime-tabs">${tables.map(value=>smButton(value.name,'runtime-table',`data-table="${value.id}" class="btn ${value.id===table.id?'active':''}"`)).join('')}</div></div><div class="sc-config-layout"><aside class="panel sc-group-panel"><strong>评分组</strong><nav class="sc-group-tree" aria-label="评分组">${smRuntimeTree(table)}</nav></aside><section><div class="sm-node-score-note">${table.kind==='qualification'?'逐项核验达标情况，不计入数值总分。':`满分 ${table.total} 分，通过门槛 ${table.threshold} 分。扣分需写明依据。`}<br>评分不自动替代当前节点审批结论。</div>${scGroupControls(table,data.checks,'sm-check',allowed)}${items.slice(page*20,page*20+20).map(item=>smQuestion(project,table,item,data.answers[item.id]||{})).join('')}<div class="publicity-actions"><span>${items.length}项 · 第${page+1}/${Math.max(1,Math.ceil(items.length/20))}页</span>${smButton('上一页','runtime-prev',page?'':'disabled')}${smButton('下一页','runtime-next',(page+1)*20<items.length?'':'disabled')}</div></section></div>${expert?`<section class="task-card">${field('scoreComment','本阶段综合意见 *','textarea',holder.comment||'已逐项核验申报资料和对应评定标准。')}</section>`:''}</section>`;
}
function smRuntimeTree(table,parent=null,depth=0){return table.groups.filter(group=>group.parentId===parent).map(group=>`<button class="sc-tree-node ${state.smRuntimeGroup===group.id?'active':''}" style="--depth:${depth}" data-action="sm-runtime-group" data-group="${group.id}"><span>${esc(group.name)}</span><small>${scGroupItems(table,group.id).length}项 · ${group.max}分</small></button>${smRuntimeTree(table,group.id,depth+1)}`).join('');}
function smQuestion(project,table,item,answer){return `<article class="question" data-sm-question="${item.id}" data-sm-table="${table.id}"><div class="task-heading"><h3>${esc(item.title)}</h3><strong data-sm-item-total>${item.mode==='qualification'?(answer.result==='pass'?'达标':answer.result==='fail'?'不达标':'待核验'):(scAnswerScore(item,answer)??'待填')+' / '+item.max+'分'}</strong></div><p>${esc(item.note||'')}</p>${scControls(item,answer,'sm-answer')}<p class="sm-question-source">${esc(item.sourceRef?.label||'自定义评分项')} · ${SC_MODE_NAMES[item.mode]}</p><div class="actions">${button('AI全文检索','ai-item',`data-title="${esc(item.title)}"`)}${state.role==='expert'&&project.stage==='field'?smButton('现场证据与问题','evidence',`data-table="${table.id}" data-item="${item.id}"`):''}</div><div class="form-grid"><label class="field"><span>${item.mode==='qualification'?'核验说明（不达标时必填）':'扣分依据（扣分时必填）'}</span><textarea data-sm-note="${item.id}" data-sm-property="note">${esc(answer.note||'')}</textarea></label><label class="field"><span>整改要求</span><textarea data-sm-note="${item.id}" data-sm-property="rectification">${esc(answer.rectification||'')}</textarea></label></div><details class="sc-source"><summary>原文依据</summary><p>${esc(item.sourceText||item.note||'管理员自定义配置')}</p></details></article>`;}
function smValidate(project,holder){
  const tables=smBind(project),qualificationFailed=tables.filter(table=>table.requireAllQualified!==false).some(table=>table.items.filter(item=>item.mode==='qualification').some(item=>smData(holder,table).answers[item.id]?.result==='fail'));
  for(const table of tables){const data=smData(holder,table);
    for(const group of table.groups){if(table.scoreEnabled===false)continue;const check=data.checks[group.id];if(group.zeroRule&&check?.zero===undefined||check?.exempt&&!check.reason?.trim())return smShowIssue(project,table,group.id,null,'请完成组级条件核验：'+group.name);}
    for(const item of table.items){if(qualificationFailed&&item.mode!=='qualification')continue;const answer=data.answers[item.id]||{},issue=scAnswerIssue(item,answer),deduction=table.kind==='numeric'&&item.mode!=='qualification'&&scAnswerScore(item,answer)<item.max||answer.result==='fail';if(issue||deduction&&!answer.note?.trim())return smShowIssue(project,table,item.groupId,item.id,issue||'请填写扣分或不达标依据：'+item.title);}
  }return true;
}
function smShowIssue(project,table,groupId,itemId,message){
  state.smContext=project.id+':'+project.stage+':'+state.role+':'+state.expert;state.smRuntimeTable=table.id;state.smRuntimeGroup=groupId;state.smRuntimePage=itemId?Math.max(0,Math.floor(scGroupItems(table,groupId).findIndex(item=>item.id===itemId)/20)):0;render();validationError(message,itemId?`[data-sm-question="${itemId}"]`:'[data-sm-editor]');return false;
}
function smCaptureResults(project,holder){holder.mountedResults=smBind(project).map(table=>({tableId:table.id,version:table.version,name:table.name,kind:table.kind,total:table.total,threshold:table.threshold,value:smResult(table,smData(holder,table))}));save();}
function smQueueNodeRecord(project,holder){smCaptureResults(project,holder);state.smPendingNodeScore={project:project.id,stage:project.stage,holder:clone(holder)};}
function smFinish(){
  const project=getProject(),sheet=sheetFor(project,project.stage);if(!smExpertReady(project)||!canHandle(project)||sheet.submitted)return;
  sheet.comment=read('scoreComment');if(!sheet.comment)return validationError('请填写本阶段综合意见','[name="scoreComment"]');
  const tables=smBind(project);if(sheet.scoringMethod==='online'){
    if(!smValidate(project,sheet))return;smCaptureResults(project,sheet);
  }else if(sheet.scoringMethod==='offline'){
    for(const key of project.stage==='field'?['scoreSheet','photos','report']:['scoreSheet'])if(!sheet.uploads?.[key]?.length)return validationError('请上传'+({scoreSheet:'打分表',photos:'现场照片',report:'现场验收报告'}[key]),`[data-upload="${key}"]`);
    for(const table of tables){const result=sheet.offlineResults?.[table.id];if(table.kind==='numeric'&&(result?.score===''||!Number.isFinite(Number(result?.score))||Number(result.score)<0||Number(result.score)>table.total))return validationError('请检查线下汇总分，应在0—'+table.total+'之间',`[data-sm-offline="${table.id}"]`);if(table.kind==='qualification'&&!['pass','fail'].includes(result?.result))return validationError('请选择达标结论',`[data-sm-offline="${table.id}"]`);}
    sheet.offlineDecision=decision('smOfflineResult')||sheet.offlineDecision||'pass';
    sheet.mountedResults=tables.map(table=>({tableId:table.id,version:table.version,name:table.name,kind:table.kind,total:table.total,threshold:table.threshold,value:table.kind==='numeric'?Number(sheet.offlineResults[table.id].score):sheet.offlineResults[table.id].result==='pass'?'达标':'未全部达标'}));
  }else return;
  sheet.total=sheet.mountedResults.filter(result=>result.kind==='numeric').reduce((sum,result)=>sum+Number(result.value),0);
  sheet.result=sheet.mountedResults.some(result=>result.kind==='qualification'?result.value!=='达标':result.value<result.threshold)||!tables.length&&sheet.offlineDecision==='fail'?'fail':'pass';save();signatureDialog(project,sheet);
}
function smRecord(stage,id){
  const project=getProject(),sheet=project?.sheets[stage]?.[id];if(state.role==='city')return toast('专家原始评分不对申报方公开');if(!sheet?.submitted)return toast('尚未提交评分');
  const sections=(sheet.mountedResults||[]).map(result=>{const table=smVersion(result.tableId,result.version),data=sheet.mountScore?.[result.tableId];return `<details class="sm-table-record"><summary>${esc(result.name)} · V${result.version} · ${esc(result.value)}${result.kind==='numeric'?'分':''}</summary>${sheet.scoringMethod==='online'&&table?table.items.map(item=>smQuestion(project,table,item,data?.answers[item.id]||{})).join(''):'<p>采用线下评分，逐项内容以已上传的打分表为准。</p>'}${table&&data?`<h4>组级核验记录</h4>${table.groups.filter(group=>group.zeroRule||group.exemption).map(group=>`<p>${esc(group.name)}：${data.checks[group.id]?.zero?'已触发归零':data.checks[group.id]?.exempt?'符合豁免':'未触发'} ${esc(data.checks[group.id]?.reason||'')}</p>`).join('')}`:''}</details>`;}).join('');
  openModal(STAGES[stage][0]+' · 只读评分记录',project.name,`<div class="alert green"><div><strong>${expertName(id)} · ${sheet.scoringMethod==='offline'?'线下评分':'线上评分'} · ${sheet.total}分</strong><p>${esc(sheet.at)} · ${esc(sheet.comment)}</p><p>提交后锁定，不允许修改原始评分。</p></div></div>${sections}${['scoreSheet','photos','report'].map(key=>`<section class="sm-table-record"><h3>${({scoreSheet:'打分表',photos:'现场照片',report:'现场验收报告'})[key]}</h3>${(sheet.uploads?.[key]||[]).map((file,index)=>`<p>${smButton(esc(file.name),'record-file',`data-stage="${stage}" data-expert="${id}" data-key="${key}" data-index="${index}"`)}${esc(file.description||'')}</p>`).join('')||'<p>未上传</p>'}</section>`).join('')}${sheet.signature?.data?`<h3>专家签字</h3><img class="signature-preview" alt="专家签字" src="${sheet.signature.data}">`:''}`,'',null,true,true);
  document.querySelectorAll('#modalBody input,#modalBody textarea,#modalBody select,#modalBody [data-action="sm-evidence"],#modalBody [data-action="ai-item"]').forEach(element=>element.disabled=true);
  for(const result of sheet.mountedResults||[]){const table=smVersion(result.tableId,result.version),data=sheet.mountScore?.[result.tableId];if(table?.kind==='numeric'&&data)smSyncRecordScores(table,data);}
  document.querySelectorAll('#modalBody [data-sm-question]').forEach(root=>{const tableId=root.dataset.smTable,itemId=root.dataset.smQuestion,answer=sheet.mountScore?.[tableId]?.answers[itemId];if(answer?.evidence?.length)root.insertAdjacentHTML('beforeend',`<h4>本项现场证据</h4>${answer.evidence.map((file,index)=>smButton(esc(file.name),'record-file',`data-stage="${stage}" data-expert="${id}" data-table="${tableId}" data-item="${itemId}" data-index="${index}"`)).join('')}`);});
}
function smInitialize(){
  if(window.SM_READY)return;window.SM_READY=true;
  if(!db.scoringLibrary){db.scoringLibrary={tables:{}};for(const source of scCatalog()){
    const published={...clone(scTables(source.stage).find(table=>table.id===source.id)),official:true,nodeKeys:[source.stage],version:publishedRule(source.stage).version},draft=db.ruleDrafts?.[source.stage]?.tables?.find(table=>table.id===source.id);
    db.scoringLibrary.tables[source.id]={published,draft:draft?{...clone(draft),official:true,nodeKeys:[source.stage],version:published.version}:null,versions:[clone(published)]};
  }}
  const sourceLookup=scSourceTable;scSourceTable=id=>smTable(id,true)||sourceLookup(id);
  scTables=(stage,draft=false)=>smAll(draft).filter(table=>table.stage===stage);
  scDraftTable=()=>{const entry=smEntry(scCurrentId());return entry.draft??=clone(entry.published);};
  scRefreshDraft=table=>{scIndexes.delete(table);for(const group of table.groups)group.max=scGroupItems(table,group.id).reduce((sum,item)=>sum+item.max,0);save();};
  smLegacyRulesPage=scRulesPage;rulesPage=smRulesPage;
  const originalQuestionMarkup=smQuestion;smQuestion=(project,table,item,answer)=>originalQuestionMarkup(project,table,item,answer).replaceAll('name="sm-answer-','name="sm-answer-'+table.id+'-');
  const scopedQuestionMarkup=smQuestion;smQuestion=(project,table,item,answer)=>{const markup=scopedQuestionMarkup(project,table,item,answer);if(table.kind!=='numeric')return markup;const sheet=project.sheets[project.stage]?.[state.expert],checks=sheet?.mountScore?.[table.id]?.checks||project.nodeScoreDrafts?.[project.stage+'-'+state.role+'-'+(state.role==='expert'?state.expert:'actor')]?.mountScore?.[table.id]?.checks||{};return markup.replace(/(<strong data-sm-item-total>)[\s\S]*?(<\/strong>)/,(_,start,end)=>start+smEffectiveLabel(table,item,answer,checks)+end);};
  const originalUses=usesReviewLayout;usesReviewLayout=project=>{
    if(project.stage==='draft'||state.role==='city'&&project.correction)return originalUses(project);
    if(!smCanEdit(project)||state.role!=='expert'&&['meeting','field'].includes(project.stage))return true;
    if(smExpertReady(project)){const sheet=sheetFor(project,project.stage);return sheet.submitted||sheet.scoringMethod!=='online';}
    return !smBind(project).length;
  };
  const originalWork=work;work=project=>{
    if(smExpertReady(project)&&!project.correction){const sheet=sheetFor(project,project.stage);if(!sheet.submitted){if(!sheet.scoringMethod)return smMethodChoice(project,sheet);if(sheet.scoringMethod==='offline')return smOffline(project,sheet);return smOnline(project,sheet,true);}}
    let content=project.stage==='initial'&&state.role==='hall'?initialConclusion(project):originalWork(project);
    if(project.stage==='document'&&state.role==='expert'&&content.includes('material-layout')){const root=document.createElement('div');root.innerHTML=content;content=root.querySelector('aside')?.outerHTML||content;}
    if(smCanEdit(project)&&!['meeting','field'].includes(project.stage)&&smBind(project).length)return smOnline(project,smHolder(project))+`<section class="sm-node-decision">${content}</section>`;
    return content;
  };
  const originalFinish=finishScore;finishScore=()=>{const p=getProject(),sheet=p&&['meeting','field'].includes(p.stage)?sheetFor(p,p.stage):null;return sheet?.scoringMethod?smFinish():originalFinish();};
  const originalSignature=signatureDialog;signatureDialog=(project,sheet)=>{originalSignature(project,sheet);if(sheet.scoringMethod&&sheet.mountedResults?.every(result=>result.kind==='qualification'))document.querySelector('#modalBody .alert').innerHTML=`<p>题表核验记录：${sheet.result==='fail'?'存在未达标项':'已达标'}，不代表审批结论。提交后锁定本人评分方式、意见与签字；省厅另行人工判定。</p>`;};
  const originalTotal=scoreTotal;scoreTotal=sheet=>sheet.scoringMethod&&sheet.mountedResults?sheet.mountedResults.filter(result=>result.kind==='numeric').reduce((sum,result)=>sum+Number(result.value),0):originalTotal(sheet);
  const originalRecord=scoreRecordModal;scoreRecordModal=(stage,id)=>getProject()?.sheets[stage]?.[id]?.scoringMethod?smRecord(stage,id):originalRecord(stage,id);
  const originalScoreTable=scoreTable;scoreTable=(project,stage)=>{let content=originalScoreTable(project,stage);const refs=project.nodeScoreBindings?.[stage];if(refs){const total=refs.map(ref=>smVersion(ref.tableId,ref.version)).filter(table=>table?.kind==='numeric').reduce((sum,table)=>sum+table.total,0);content=content.replace(/(?:景观质量评分 · 满分100分|现场评分 · 满分1000分)/,total?'评分表汇总 · 满分'+total+'分':'评审结论与线下材料');}return content;};
  const originalHallReview=hallReview;hallReview=project=>{const content=originalHallReview(project),refs=project.nodeScoreBindings?.meeting;if(!refs)return content;const total=refs.map(ref=>smVersion(ref.tableId,ref.version)).filter(table=>table?.kind==='numeric').reduce((sum,table)=>sum+table.total,0);return content.replace('计算均分 / 100分',total?'计算均分 / '+total+'分':'评审结论汇总');};
  const originalUploads=fieldUploadsModal;fieldUploadsModal=()=>{const project=getProject(),sheet=project&&sheetFor(project,project.stage);if(sheet?.scoringMethod==='offline'){closeModal();render();return;}originalUploads();if(sheet?.scoringMethod==='online')document.getElementById('modalBody').insertAdjacentHTML('beforeend',smProblemSummary(project,sheet));};
  const originalUploadBlocks=smUploadBlocks;smUploadBlocks=(project,sheet)=>originalUploadBlocks(project,sheet).replace('data-action="field-uploads"','data-action="sm-problems"');
  const originalFiles=filesFor;filesFor=(project,key)=>{if(key.startsWith('sm-evidence|')){const [,tableId,itemId]=key.split('|');return (smData(sheetFor(project,project.stage),smBind(project).find(table=>table.id===tableId)).answers[itemId]??={}).evidence??=[];}return originalFiles(project,key);};
  const originalUpload=uploadFiles;uploadFiles=async input=>{await originalUpload(input);if(input.dataset.upload.startsWith('sm-evidence|')){const [,tableId,itemId]=input.dataset.upload.split('|');smEvidence(tableId,itemId);}};
  const originalFileAction=fileAction;fileAction=(action,key,index)=>{originalFileAction(action,key,index);if(action==='delete-file'&&key.startsWith('sm-evidence|')){const [,tableId,itemId]=key.split('|');smEvidence(tableId,itemId);}};
  const originalRecordEvent=record;record=(project,title,comment,extra={})=>{const pending=state.smPendingNodeScore;let snapshot;
    if(pending?.project===project.id&&pending.stage===project.stage){snapshot={stage:project.stage,by:person(),at:new Date().toISOString(),...pending.holder};delete state.smPendingNodeScore;(project.nodeScoreRecords??=[]).push(snapshot);}
    originalRecordEvent(project,title,comment,{...extra,...(snapshot?{nodeScoreSnapshot:clone(snapshot)}:{})});
  };
  const originalRecords=records;records=(project,compact=false)=>{const content=originalRecords(project,compact),snapshots=project.nodeScoreRecords||[];if(state.role==='city'||!snapshots.length)return content;return content+`<section class="task-card"><h3>节点评分表办理记录</h3><p class="helper">仅记录已提交时的评分表版本与结果，原始答案只读保留。</p>${snapshots.map((snapshot,index)=>`<details class="history-item"><summary>${STAGES[snapshot.stage]?.[0]||snapshot.stage} · ${esc(snapshot.by)} · ${esc(snapshot.at)}</summary>${snapshot.mountedResults.map(result=>`<p>${esc(result.name)} · V${result.version}：${esc(result.value)}${result.kind==='numeric'?'分':''}</p>`).join('')}${smButton('查看节点评分明细','node-record',`data-index="${index}"`)}</details>`).join('')}</section>`;};
  document.addEventListener('click',smClick,true);document.addEventListener('change',smChange,true);document.addEventListener('input',smInput,true);save();
}
function smClick(event){
  const element=event.target.closest('[data-action]');if(!element||element.disabled)return;const action=element.dataset.action;
  if(action.startsWith('sm-')){
    event.stopImmediatePropagation();event.preventDefault();const command=action.slice(3);
    if(command==='cancel'||command==='evidence-close'){closeModal();if(command==='evidence-close')render();return;}
    if(['new','copy','table-save','export'].includes(command)&&state.role!=='admin')return;
    if(command==='new')return smEditTable(true);
    if(command==='copy')return smEditTable(true,element.dataset.table);
    if(command==='table-save')return smSaveTable();
    if(command==='export')return downloadText('自定义评分表与节点挂载.json',JSON.stringify(db.scoringLibrary,null,2),'application/json');
    const project=getProject();if(!project)return;
    if(command==='node-record'){
      if(!['hall','expert'].includes(state.role))return;const snapshot=project.nodeScoreRecords?.[Number(element.dataset.index)];if(!snapshot)return;
      openModal('节点评分表 · 只读记录',project.name,snapshot.mountedResults.map(result=>{const table=smVersion(result.tableId,result.version),data=snapshot.mountScore?.[result.tableId];return `<details class="sm-table-record"><summary>${esc(result.name)} · V${result.version} · ${esc(result.value)}</summary>${table?.items.map(item=>smQuestion(project,table,item,data?.answers[item.id]||{})).join('')||'<p>无逐项记录</p>'}</details>`;}).join(''),' ',null,true,true);
      document.querySelectorAll('#modalBody input,#modalBody textarea,#modalBody select,#modalBody [data-action]').forEach(control=>control.disabled=true);for(const result of snapshot.mountedResults){const table=smVersion(result.tableId,result.version),data=snapshot.mountScore?.[result.tableId];if(table?.kind==='numeric'&&data)smSyncRecordScores(table,data);}return;
    }
    if(command==='record-file'){
      if(state.role==='city')return;const sheet=project.sheets[element.dataset.stage]?.[element.dataset.expert],files=element.dataset.item?sheet?.mountScore?.[element.dataset.table]?.answers[element.dataset.item]?.evidence:sheet?.uploads?.[element.dataset.key],file=sheet?.submitted&&files?.[Number(element.dataset.index)];if(!file)return;
      openModal(file.name,'已提交的只读附件',file.type?.startsWith('image/')?`<img class="preview-image" src="${file.data}" alt="${esc(file.name)}">`:file.text?`<pre>${esc(file.text)}</pre>`:file.data?`<a class="btn" href="${file.data}" download="${esc(file.name)}">下载附件</a>`:'<p>历史附件正文未载入</p>','',null,true,true);return;
    }
    if(!smCanEdit(project))return;const holder=smHolder(project);if(holder.submitted)return;
    if(command==='ocr-apply')return smApplyOcr();
    if(command==='problems')return openModal('单项问题与证据汇总',project.name,smProblemSummary(project,holder),'',null,true);
    if(command==='method'){
      if(!smExpertReady(project)||!['online','offline'].includes(element.dataset.method)||element.dataset.method==='online'&&!smBind(project).length)return;
      holder.scoringMethod=element.dataset.method;holder.comment||='已对照申报材料及评分标准完成核验。';delete holder.mountedResults;save();render();return;
    }
    if(command==='switch-method')return confirm('更换评分方式','<p>当前草稿保留，只校验最终选择的评分方式。已上传附件不会删除。</p>',()=>{delete holder.scoringMethod;save();closeModal();render();});
    if(command==='runtime-table'){state.smRuntimeTable=element.dataset.table;state.smRuntimeGroup=null;state.smRuntimePage=0;render();return;}
    if(command==='runtime-group'){state.smRuntimeGroup=element.dataset.group;state.smRuntimePage=0;render();return;}
    if(command==='runtime-prev'||command==='runtime-next'){state.smRuntimePage=Math.max(0,(state.smRuntimePage||0)+(command==='runtime-next'?1:-1));render();return;}
    if(command==='evidence'){
      return smEvidence(element.dataset.table,element.dataset.item);
    }return;
  }
  if(state.role==='admin'&&['sc-table-edit','sc-table-save','sc-publish','sc-validate','sc-discard','sc-versions','sc-export'].includes(action)){
    event.stopImmediatePropagation();event.preventDefault();const entry=smEntry(scCurrentId());
    if(action==='sc-table-edit')return smEditTable();if(action==='sc-table-save')return smSaveTable();if(action==='sc-publish')return smPublish();
    if(action==='sc-validate'){const table=scCurrentTable(),issues=scValidation([table]);if(!table.items.length)issues.unshift({message:'请至少配置一个评分组和评分项'});return openModal(issues.length?'本表配置校验未通过':'本表配置校验通过',table.name,issues.length?issues.map(issue=>`<p>${esc(issue.group||'')} ${esc(issue.item||'')} ${esc(issue.message)}</p>`).join(''):'<p>层级、计分算法、满分、原文约束已通过校验，可预览或发布。</p>');}
    if(action==='sc-export')return downloadText('自定义评分表与节点挂载.json',JSON.stringify(db.scoringLibrary,null,2),'application/json');
    if(action==='sc-discard')return confirm('放弃本表草稿','<p>已发布的表恢复到发布版；从未发布的新表移除草稿。其他表与历史记录不变。</p>',()=>{if(!entry.versions.length){delete db.scoringLibrary.tables[scCurrentId()];state.scTable=null;}else delete entry.draft;save();closeModal();render();});
    if(action==='sc-versions')return openModal('本评分表发布记录','每个版本独立保存，历史绑定不变',entry.versions.map(table=>`<article class="history-item"><h3>V${table.version} · ${esc(table.name)}</h3><p>${esc(table.at||'正式规则基线')} ${esc(table.by||'')}</p>${smMountLabels(table)}</article>`).join('')||'<p>尚未发布</p>');
  }
  // Validate attached score tables before the existing workflow's decision handlers run.
  if(['submit-initial','submit-document-expert','submit-document-hall','submit-hall','submit-committee','submit-creation','request-field','hall-start-field','submit-extension'].includes(action)){
    const project=getProject();if(project&&smCanEdit(project)&&smBind(project).length&&!['meeting','field'].includes(project.stage)){
      if(!smValidate(project,smHolder(project))){event.stopImmediatePropagation();event.preventDefault();}else smQueueNodeRecord(project,smHolder(project));
    }
  }
}
function smEvidence(tableId,itemId){
  const project=getProject();if(!smExpertReady(project)||project.stage!=='field'||sheetFor(project,project.stage).submitted)return;
  const table=smBind(project).find(table=>table.id===tableId),item=table?.items.find(item=>item.id===itemId);if(!item)return;
  const answer=smData(smHolder(project),table).answers[item.id]??={},key='sm-evidence|'+table.id+'|'+item.id;
  openModal('现场证据与问题',item.title,upload('上传本项现场照片',key,'accept="image/*"')+fileRows(project,key,answer.evidence||[],true)+`<label class="field"><span>发现的问题 / 扣分依据</span><textarea data-sm-evidence-note="note" data-table="${table.id}" data-item="${item.id}">${esc(answer.note||'')}</textarea></label><label class="field"><span>整改要求</span><textarea data-sm-evidence-note="rectification" data-table="${table.id}" data-item="${item.id}">${esc(answer.rectification||'')}</textarea></label>`,smButton('关闭并返回','evidence-close'));
}
function smProblemSummary(project,sheet){return '<h3>评分表单项问题汇总</h3>'+smBind(project).map(table=>table.items.filter(item=>{const answer=sheet.mountScore?.[table.id]?.answers[item.id];return answer?.note||answer?.evidence?.length;}).map(item=>{const answer=sheet.mountScore[table.id].answers[item.id];return `<article class="history-item"><strong>${esc(table.name)} / ${esc(item.title)}</strong><p>${esc(answer.note||'已关联现场照片')}</p><p>整改要求：${esc(answer.rectification||'未填写')}</p><small>关联照片 ${answer.evidence?.length||0} 张</small></article>`;}).join('')).join('');}
async function smStartOcr(input){
  const project=getProject();if(!project||project.stage!=='meeting'||!smExpertReady(project)||!canHandle(project))return;
  const sheet=sheetFor(project,project.stage),file=input.files?.[0];if(sheet.submitted||!file)return;if(file.size>8*1024*1024)return toast('附件超过8MB，请选择较小文件');
  let data;if(file instanceof Blob)data=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>resolve(null);reader.readAsDataURL(file);});
  else data='data:text/plain;charset=utf-8,'+encodeURIComponent('OCR内置演示评分表，不代表真实识别结果。');
  if(!data)return toast('附件读取失败，请重新选择文件。');
  const tables=smBind(project);state.smOcr={project:project.id,expert:state.expert,stage:project.stage,file:{name:file.name,type:file.type||'text/plain',data,demo:!(file instanceof Blob),at:new Date().toISOString()},method:sheet.scoringMethod};
  openModal('评分表OCR核对','演示识别 · 未调用真实OCR服务',`<div class="alert gray"><p>已上传 ${esc(file.name)}。以下是内置演示识别结果，不是对文件内容的真实提取。确认后回填当前评分方式，不自动提交。</p></div><div class="radio-group"><label><input type="radio" name="smOcrMode" value="empty" checked>仅补齐空白</label><label><input type="radio" name="smOcrMode" value="replace">覆盖勾选内容</label></div>${tables.map(table=>`<section class="sm-table-record"><h3>${esc(table.name)}</h3>${sheet.scoringMethod==='offline'?`<label><input type="checkbox" data-sm-ocr-table="${table.id}" checked> ${table.kind==='numeric'?table.total+'分':'达标'}</label>`:table.items.map(item=>`<p><label><input type="checkbox" data-sm-ocr-table="${table.id}" data-sm-ocr-item="${item.id}" checked> ${esc(item.title)}：${item.mode==='qualification'?'达标':item.max+'分'}</label></p>`).join('')}</section>`).join('')}`,smButton('取消','cancel')+smButton('确认核对并回填','ocr-apply'),null,true);
}
function smApplyOcr(){
  const session=state.smOcr,project=getProject();if(!session||project.id!==session.project||state.expert!==session.expert||project.stage!==session.stage||!smExpertReady(project))return;
  const sheet=sheetFor(project,project.stage);if(sheet.submitted||sheet.scoringMethod!==session.method)return;const replace=decision('smOcrMode')==='replace';let count=0;
  for(const input of document.querySelectorAll('[data-sm-ocr-table]:checked')){const table=smBind(project).find(table=>table.id===input.dataset.smOcrTable);if(!table)continue;
    if(session.method==='online'){const item=table.items.find(item=>item.id===input.dataset.smOcrItem),data=smData(sheet,table);if(replace||scAnswerIssue(item,data.answers[item.id])){data.answers[item.id]=smSeedAnswer(item);count++;}}
    else{const result=(sheet.offlineResults??={})[table.id]??={};if(replace||table.kind==='numeric'&&(result.score===''||result.score==null)||table.kind==='qualification'&&!result.result){if(table.kind==='numeric')result.score=table.total;else result.result='pass';count++;}}
  }
  (sheet.uploads??={}).scoreSheet??=[];sheet.uploads.scoreSheet.push(session.file);sheet.ocrRecord={at:new Date().toISOString(),simulated:true,source:session.file.name,changed:count};save();state.smOcr=null;closeModal();render();toast('演示核对已完成，回填'+count+'项；评分表附件已保留');
}
function smUpdateTotal(project,holder){const active=smActive(project,holder);if(active){const label=document.getElementById('smRuntimeTotal');if(label)label.textContent=smResult(active.table,active.data)+(active.table.kind==='numeric'?' / '+active.table.total+'分':'');}save();}
function smEffectiveLabel(table,item,answer,checks={}){const raw=scAnswerScore(item,answer),parents=scIndex(table).ancestors.get(item.groupId)||[],effective=parents.some(id=>checks[id]?.zero)?0:parents.some(id=>checks[id]?.exempt)?item.max:raw;return `${effective??'待填'} / ${item.max}分${effective!==raw?'（原始 '+(raw??'未填')+'）':''}`;}
function smSyncRecordScores(table,data){for(const root of document.querySelectorAll('#modalBody [data-sm-question]')){if(root.dataset.smTable!==table.id)continue;const item=table.items.find(item=>item.id===root.dataset.smQuestion);if(item)root.querySelector('[data-sm-item-total]').textContent=smEffectiveLabel(table,item,data.answers[item.id]||{},data.checks);}}
function smChange(event){
  const element=event.target;if(element.disabled||!element.matches('[data-sm-answer],[data-sm-check],[data-sm-offline]'))return;
  event.stopImmediatePropagation();const project=getProject();if(!smCanEdit(project))return;const holder=smHolder(project);if(holder.submitted)return;const active=smActive(project,holder);if(!active)return;
  if(element.dataset.smOffline){const table=smBind(project).find(table=>table.id===element.dataset.smOffline),result=(holder.offlineResults??={})[table.id]??={};if(table.kind==='numeric')result.score=element.value===''?'':Number(element.value);else result.result=element.value;save();return;}
  const {table,data}=active;if(element.dataset.smAnswer){const item=table.items.find(item=>item.id===element.dataset.smAnswer);if(!item)return;const answer=data.answers[item.id]??={};scApplyInput(item,answer,element);const root=element.closest('[data-sm-question]');scSyncControls(root,item,answer);const total=root.querySelector('[data-sm-item-total]');if(total)total.textContent=item.mode==='qualification'?(answer.result==='pass'?'达标':'不达标'):(scAnswerScore(item,answer)??'待填')+' / '+item.max+'分';}
  if(element.dataset.smCheck){const proxy={dataset:{...element.dataset,scExpertGroup:element.dataset.smCheck},value:element.value,type:element.type,checked:element.checked,closest:selector=>element.closest(selector)};scUpdateGroup(proxy,data.checks);const check=data.checks[element.dataset.smCheck];element.closest('.sc-special').querySelectorAll('[data-sm-check]').forEach(input=>{if(input.dataset.scCheck!=='reason')input.checked=input.type==='checkbox'?!!check[input.dataset.scCheck]:String(check[input.dataset.scCheck])===input.value;});}
  if(table.kind==='numeric')document.querySelectorAll('[data-sm-editor] [data-sm-question]').forEach(root=>{const item=table.items.find(item=>item.id===root.dataset.smQuestion),label=root.querySelector('[data-sm-item-total]');if(item&&item.mode!=='qualification'&&label)label.textContent=smEffectiveLabel(table,item,data.answers[item.id]||{},data.checks);});
  smUpdateTotal(project,holder);
}
function smInput(event){
  const element=event.target;if(element.disabled||!element.matches('[data-sm-note],[data-sm-evidence-note]')&&element.name!=='scoreComment')return;
  const project=getProject();if(!project||!smCanEdit(project))return;const holder=smHolder(project);if(holder.submitted)return;
  if(element.name==='scoreComment'){if(state.role==='expert'&&holder.scoringMethod)holder.comment=element.value;save();return;}
  const table=smBind(project).find(table=>table.id===(element.dataset.table||element.closest('[data-sm-table]')?.dataset.smTable));if(!table)return;const itemId=element.dataset.item||element.dataset.smNote,answer=smData(holder,table).answers[itemId]??={};answer[element.dataset.smEvidenceNote||element.dataset.smProperty]=element.value;save();
}
