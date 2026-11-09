'use strict';
// V2 本地交互扩展。正式鉴权、短信、跨设备签字同步仍待后端集成。
function applicationOpening(type,year=new Date().getFullYear(),asOf=today()){
  if(!type){const open=D.categories.some(category=>category.enabled&&applicationOpening(category.id,year,asOf).open);return {open,reason:open?`${year}年度按类别开放申报，请进入新建申报查看各类别时间。`:`${year}年度暂无可申报类别，可进入新建申报查看各类别报名时间。获准补正的项目按补正期限办理。`};}
  const category=cat(type),period=annualConfig(year)?.categoryPeriods?.[type];
  if(!category?.enabled)return {open:false,status:'development',label:'开发中',reason:'开发中 · 暂不可申报',period};
  if(!period?.start||!period.end)return {open:false,status:'unconfigured',label:'时间待公布',reason:`${year}年度申报时间尚未配置，请联系管理员。`,period};
  if(asOf>period.end)return {open:false,status:'closed',label:'报名已截止',reason:`${year}年度报名已于${period.end}截止。`,period};
  const daysBetween=(from,to)=>{const parts=value=>value.split('-').map(Number),start=parts(from),end=parts(to);return Math.round((Date.UTC(end[0],end[1]-1,end[2])-Date.UTC(start[0],start[1]-1,start[2]))/86400000);};
  if(asOf<period.start){const days=daysBetween(asOf,period.start);return {open:false,status:'upcoming',label:'尚未开始',reason:`距离报名开始还有 ${days} 天`,days,period};}
  if(Number(asOf.slice(0,4))!==Number(year))return {open:false,status:'closed',label:'非本年度申报',reason:'仅在对应年度报名时间内开放申报。',period};
  const days=daysBetween(asOf,period.end);return {open:true,status:'open',label:'报名中',reason:days===0?'今日报名截止':`距离报名截止还有 ${days} 天`,days,period};
}
function newApplicationButton(){return primary(icon('plus')+'新建申报','new','title="查看本年度各申创类别及报名时间"');}
function hasParticipated(p){
  if(state.role==='expert')return Object.values(p.assigned||{}).some(ids=>ids.includes(state.expert))||(p.formerExperts||[]).includes(state.expert);
  if(state.role==='city')return p.region==='黔东南州'&&(p.stage!=='draft'||p.savedAt);
  return (p.history||[]).some(h=>h.actor===person());
}
function filterProjectRows(rows){return rows.filter(p=>(!state.listYear||p.statisticsYear===state.listYear)&&(state.category==='all'||p.type===state.category)&&(state.filter==='all'||state.filter==='todo'&&canHandle(p)||state.filter==='handled'&&hasParticipated(p)||state.filter===p.stage)&&(!state.query||(p.name+p.id+p.unit+p.region).includes(state.query)));}
function scoringCalculation(p){
  const rows=summary(p,'meeting').completed.filter(r=>Number.isFinite(Number(r.total))).map(r=>({id:r.id,total:Number(r.total),excluded:''})).sort((a,b)=>a.total-b.total);
  if(p.removeHigh&&rows.length)rows.at(-1).excluded='剔除最高分';
  if(p.removeLow&&rows.length>(p.removeHigh?1:0))rows[0].excluded='剔除最低分';
  return rows;
}
function toggleCorrectionFields(){
  document.querySelectorAll('[name="correctionDays"]').forEach(el=>{const root=el.closest('aside')||el.closest('.task-card');const choice=root?.querySelector('input[name="initialDecision"]:checked,input[name="documentDecision"]:checked');if(choice){const active=choice.value==='supplement';el.closest('.field').hidden=!active;el.disabled=!active;}});
}
function cancelInitialAssignment(){state.initialAssignment=false;state.assignment=null;closeModal();navigate('home');toast('初审已通过，项目保留待指派状态');}
function selectedExpertsHTML(){const a=state.assignment;return `<strong>已选 ${a.selected.size} / ${a.count} 人</strong><div class="selected-experts">${[...a.selected].map(id=>`<button class="chip" data-action="remove-assigned" data-expert="${id}">${esc(expertName(id))} ×</button>`).join('')||'<span class="muted">尚未选择专家，可手动勾选或随机抽取。</span>'}</div>`;}
function updateAssignmentSelection(){
  if(!state.assignment)return;const count=document.getElementById('assignmentCount');if(count){count.value=state.assignment.count;count.setAttribute('value',state.assignment.count);}document.querySelectorAll('[data-select-expert]').forEach(el=>{el.checked=state.assignment.selected.has(el.dataset.selectExpert);el.toggleAttribute('checked',el.checked);el.closest('.expert-candidate')?.classList.toggle('selected',el.checked);});
  const list=document.getElementById('assignmentCandidates');if(list)[...list.children].sort((a,b)=>Number(state.assignment.selected.has(b.querySelector('input').dataset.selectExpert))-Number(state.assignment.selected.has(a.querySelector('input').dataset.selectExpert))).forEach(el=>list.append(el));
  const out=document.getElementById('selectedExperts');if(out)out.innerHTML=selectedExpertsHTML();
}
function assignmentDialog(){
  const p=getProject();if(state.role!=='hall'||!p||p.correction||['draft','done','failed','initial'].includes(p.stage))return toast('当前环节不能指派专家。');
  const stage=state.assignment?.stage||(['document','meeting','field'].includes(p.stage)?p.stage:p.stage==='document-summary'?'document':p.stage==='hall'?'meeting':'field');
  const selected=state.assignment?.selected||new Set(p.assigned[stage]?.length?p.assigned[stage]:stage==='field'?p.assigned.meeting||p.assigned.document||[]:[]);
  state.assignment={stage,selected,count:state.assignment?.count||selected.size||(stage==='document'?3:7)};
  const a=state.assignment;
  openModal('指派评审专家',p.name,`<div class="assignment-tools"><div><span class="muted">当前指派环节</span><strong>${STAGES[stage][0]}</strong></div><label>专家人数（1—10）<input type="number" id="assignmentCount" min="1" max="10" value="${a.count}" aria-label="专家人数"></label></div><div class="actions">${button('查看申报材料','materials-modal')}${button(icon('shuffle')+'随机抽取','random-experts')}${button(icon('user-plus')+'添加专家并开通账号','add-expert')}</div><div id="selectedExperts" class="selected-panel">${selectedExpertsHTML()}</div><label class="search"><input id="assignmentSearch" placeholder="搜索姓名、电话或单位" aria-label="搜索专家"></label><div id="assignmentCandidates">${db.experts.map(e=>`<label class="expert-candidate"><input type="checkbox" data-select-expert="${e.id}" ${selected.has(e.id)?'checked':''}><div><strong>${esc(e.name)}</strong><small>${esc(e.phone||'电话未补充')} · ${esc(e.org)}</small></div></label>`).join('')}</div><p class="helper">按账号分别派发任务。现场默认沿用前阶段专家，可改选；改派不覆盖原始分。短信通知待后端集成。</p>`,button('取消','cancel-assignment')+primary('确认指派','confirm-assignment'),null,true);
  updateAssignmentSelection();
}
function expertDialog(id){
  const e=db.experts.find(x=>x.id===id);state.editExpert=id||null;openModal(e?'维护专家档案':'添加专家并开通账号','专家库',`<div class="form-grid">${field('expertName','姓名 *','text',e?.name||'')}${field('expertPhone','电话 *','tel',e?.phone||'')}${field('expertOrg','单位 *','text',e?.org||'')}${field('expertAccount','登录账号 *','text',e?.account||e?.id||'')}</div><p class="helper">一期不要求填写职称、专业及资格有效期。原有扩展档案保留；保存后可立即选择。真实账号开通待集成。</p>`,button('取消','cancel-add-expert')+primary('保存专家','save-expert'),null,false,!!state.assignment);
}
function saveExpertSimple(){
  if(state.role!=='hall')return;const name=read('expertName'),phone=read('expertPhone'),org=read('expertOrg'),account=read('expertAccount');
  if(!name||!phone||!org||!account)return toast('请填写姓名、电话、单位和账号');
  if(!/^[+\d][\d ()-]{5,24}$/.test(phone))return toast('请填写有效联系电话');
  if(db.experts.some(e=>e.id!==state.editExpert&&(e.account||e.id)===account))return toast('该账号已存在');
  if(state.editExpert)Object.assign(db.experts.find(e=>e.id===state.editExpert),{name,phone,org,account});else db.experts.push({id:'EX-'+Date.now(),name,phone,org,account,domains:[],expiry:'',title:'',workload:0});
  save();if(state.assignment){closeModal();assignmentModal();}else{closeModal();render();}toast('专家已保存，可在指派弹窗选择');
}
function expertLibrarySimple(){return pageHead('专家库','以账号为基础管理专家；一期按姓名、电话和单位查询。',primary(icon('user-plus')+'添加专家','add-expert'))+`<section class="panel"><div class="filters"><label class="search"><input id="expertQuery" placeholder="搜索姓名、电话或单位"></label>${button('下载导入模板','expert-template')}${upload('导入专家CSV','import-experts','accept=".csv"')}</div><div class="table-wrap"><table id="expertTable"><thead><tr><th>姓名</th><th>电话</th><th>单位</th><th>账号</th><th>操作</th></tr></thead><tbody>${db.experts.map(e=>`<tr><td>${esc(e.name)}</td><td>${esc(e.phone||'待补充')}</td><td>${esc(e.org)}</td><td>${esc(e.account||e.id)}</td><td>${button('编辑','edit-expert',`data-expert="${e.id}"`)}</td></tr>`).join('')}</tbody></table></div></section>`;}
async function importExpertsSimple(el){
  if(state.role!=='hall')return;const file=el.files[0];if(!file)return;const lines=(await file.text()).replace(/^\uFEFF/,'').trim().split(/\r?\n/),legacy=lines[0].includes('资格有效期');let added=0,skipped=0;
  for(const line of lines.slice(1)){const parts=line.split(',');const [name,phone,org,account]=legacy?[parts[0],'',parts[2],parts[5]]:parts;if(!name||!phone||!org||!account||!/^[+\d][\d ()-]{5,24}$/.test(phone)||db.experts.some(e=>(e.account||e.id)===account)){skipped++;continue;}db.experts.push({id:'EX-I-'+Date.now()+'-'+added,name,phone,org,account,title:'',domains:[],expiry:'',workload:0});added++;}
  save();render();toast(`已导入${added}位，跳过${skipped}行。${legacy?'旧模板缺少电话，请使用新版模板。':'缺项、电话不合法或账号重复的行未导入。'}`);
}
function historicalApplications(p){
  const linked=db.projects.filter(x=>x.id!==p.id&&x.name===p.name&&Number(x.applicationYear)<=Number(p.applicationYear)&&x.stage!=='draft'&&(!x.date||!p.date||x.date<p.date)&&visibleProjects().some(v=>v.id===x.id));
  return [...linked.map(x=>({key:x.id,year:x.applicationYear,result:stageLabel(x),project:x})),...(p.previous||[]).filter(h=>!linked.some(x=>x.applicationYear===h.year&&h.result===stageLabel(x))).map((h,i)=>({...h,key:'saved-'+i}))].sort((a,b)=>b.year-a.year);
}
function previousApplicationButton(p){const count=historicalApplications(p).length;return count?button(icon('history')+'往次申报结果（'+count+'）','previous'):'';}
function previousApplicationsModal(){
  const p=getProject();state.previousRows=historicalApplications(p);if(!state.previousRows.length)return toast('该项目暂无往次申报结果。');openModal('往次申报结果',p.name,`<p class="helper">查看往次申报各环节形成的办理意见与备注，记录只读。本次${p.applicationYear}年度过程在页面下方查看。</p>${state.previousRows.map(h=>`<div class="history-item"><h3>${h.year}年度 · ${esc(h.result)}</h3>${h.reason?`<p>${esc(h.reason)}</p>`:''}${button('查看过程备注','previous-detail',`data-key="${esc(h.key)}"`)}</div>`).join('')}`,'',null,true);
}
function withHistoricalProject(id,action){const current=state.project;state.project=id;try{return action();}finally{state.project=current;}}
function historicalContent(p,content){return `<div data-history-project="${esc(p.id)}">${content}</div>`;}
function previousDetail(key){
  const h=state.previousRows?.find(x=>x.key===key);if(!h)return;const p=h.project;
  const events=p?.history||h.history||[{stage:'hall',title:'省文旅厅复审意见',comment:h.reason,internal:h.internal}];
  const remarks=events.filter(event=>(['hall','expert'].includes(state.role)||!event.internalOnly)&&(event.comment?.trim()||state.role==='hall'&&event.internal?.trim()));
  const content=`<p class="helper">按实际办理顺序展示节点意见与备注，不提供历史节点办理、评分或材料编辑入口。</p><div class="previous-remarks">${remarks.map(event=>`<article class="history-item"><h3>${esc(STAGES[event.stage]?.[0]||event.title||'办理记录')}</h3><p class="helper">${esc(event.title||'办理意见')} · ${esc(event.actor||'办理人未记录')} · ${esc(event.at||'时间未记录')}</p>${event.comment?`<p class="remark-text">${esc(event.comment)}</p>`:''}${event.due?`<p>补正截止：${esc(event.due)}</p>`:''}${state.role==='hall'&&event.internal?`<div class="internal"><strong>厅方内部备注</strong><p class="remark-text">${esc(event.internal)}</p></div>`:''}</article>`).join('')||empty('该次申报未保存可查看的节点备注。')}</div>`;
  openModal(`${h.year}年度申报过程备注`,p?.name||getProject().name,content,'',null,true,true);
}
function previousMaterials(key){const p=state.previousRows?.find(x=>x.key===key)?.project;if(!p)return;state.previousMaterialKey=key;state.previousMaterialSection=0;renderPreviousMaterials();}
function renderPreviousMaterials(replace=false){const p=state.previousRows.find(x=>x.key===state.previousMaterialKey)?.project;if(!p)return;const i=state.previousMaterialSection=clampFormSection(p,state.previousMaterialSection),last=D.forms[p.type].length,stack=modalStack;openModal('往次申报方提交材料',`${p.applicationYear}年度 · ${p.id} · 只读`,`<div class="section-nav">${sections(p).map((s,n)=>`<button class="btn ${i===n?'primary':''}" data-action="previous-section" data-section="${n}">${s}</button>`).join('')}</div><div id="previousForm">${i===last?historicalFiles(p):D.forms[p.type][i]}</div>`,'',null,true,!replace);if(replace)modalStack=stack;if(i<last)hydrateForm(document.getElementById('previousForm'),p,true);}
function historicalFiles(p){return D.attachments[p.type].map(([title],i)=>`<h3>${esc(title)}</h3>${(p.files[i]||[]).map((f,n)=>`<p>${esc(f.name)} ${button('预览','previous-file',`data-key="${esc(p.id)}" data-group="${i}" data-index="${n}"`)} ${button('下载','previous-download',`data-key="${esc(p.id)}" data-group="${i}" data-index="${n}"`)}</p>`).join('')||'<p class="muted">未保存材料正文</p>'}`).join('');}

// 规则使用发布版本；已经开始的评分阶段绑定固定版本，不修改历史评分。
function baseRuleSet(stage){
  const majors=stage==='meeting'?[{id:'1',name:'旅游资源吸引力',max:70,questions:D.landscape.filter(q=>q.major==='旅游资源吸引力')},{id:'2',name:'旅游市场影响力',max:30,questions:D.landscape.filter(q=>q.major==='旅游市场影响力')}]:window.SCENIC_SERVICE_RULES.majors;
  return {id:'scenic-'+stage+'-base',version:0,type:'scenic',stage,required:stage==='meeting'?clone(D.scenicRequired):[],majors:clone(majors),at:'正式细则基线'};
}
function publishedRule(stage){return (db.ruleVersions?.[stage]||[]).at(-1)||baseRuleSet(stage);}
function bindRules(p,stage=p.stage){if(p.type!=='scenic'||!['meeting','field'].includes(stage))return;p.ruleBindings??={};if(!p.ruleBindings[stage])p.ruleBindings[stage]=publishedRule(stage).id;}
function ruleSetFor(p,stage){if(p.type!=='scenic')return null;const id=p.ruleBindings?.[stage];return (db.ruleVersions?.[stage]||[]).find(v=>v.id===id)||baseRuleSet(stage);}
function configuredScoreMajors(p,stage){if(p.type!=='scenic'||!['meeting','field'].includes(stage))return null;return ruleSetFor(p,stage).majors;}
function requiredFor(p,stage){return p.type==='scenic'&&['meeting','field'].includes(stage)?ruleSetFor(p,stage).required:p.type==='summer-resort'?D.summerRequired:[];}
function ruleDraft(stage){db.ruleDrafts??={};return db.ruleDrafts[stage]??=clone(publishedRule(stage));}
function rulesPage(){
  if(state.role!=='admin')return empty('仅系统管理员可管理评分项。');const stage=state.rulesStage||'meeting',r=db.ruleDrafts?.[stage]||publishedRule(stage),query=state.rulesQuery||'',items=[...r.required.map((title,i)=>({id:'required-'+i,title,kind:'required',max:0,group:'前提条件'})),...r.majors.flatMap(m=>m.questions.map(q=>({...q,group:m.name})))],rows=items.filter(q=>(q.id+q.title+q.group).includes(query)),page=Math.min(state.rulesPage||0,Math.max(0,Math.ceil(rows.length/25)-1));
  return pageHead('评分项管理','一期配置4A级景区两阶段细则；编辑保存为草稿，发布后只用于尚未开始的评分阶段。',primary('发布当前阶段规则','publish-rules'))+`<section class="task-card"><div class="filters"><label>申创类别<select disabled><option>旅游景区质量等级申创 · 4A</option></select></label><label>适用节点<select id="rulesStage"><option value="meeting" ${stage==='meeting'?'selected':''}>线下专家会议评审</option><option value="field" ${stage==='field'?'selected':''}>现场评审</option></select></label><label class="search"><input id="rulesQuery" placeholder="搜索题目、编号或分组" value="${esc(query)}"></label></div><div class="metric-list"><div>当前发布版本<strong>V${publishedRule(stage).version}</strong></div><div>数值项总分<strong>${r.majors.reduce((n,m)=>n+m.questions.reduce((s,q)=>s+q.max,0),0)}分</strong></div><div>编辑状态<strong>${db.ruleDrafts?.[stage]?'有未发布草稿':'与发布版一致'}</strong></div></div><p class="helper">达标条件单独判断，不计入总分。正式总分保持${stage==='meeting'?100:1000}分；4A达标分与原始专家评分不可在此调整。</p><div class="actions">${button('新增评分项','add-rule')}${button('放弃未发布修改','discard-rules')}${button('查看发布记录','rule-versions')}</div></section><section class="panel"><div class="table-wrap"><table><thead><tr><th>编号 / 分组</th><th>评分题目</th><th>题型</th><th>满分</th><th>操作</th></tr></thead><tbody>${rows.slice(page*25,page*25+25).map(q=>`<tr><td>${esc(q.id)}<small>${esc(q.group)}</small></td><td style="white-space:normal">${esc(q.title)}</td><td>${q.kind==='required'?'达标判断':q.mode==='score-range'?'逐分选择':'分档选择'}</td><td>${q.kind==='required'?'不计分':q.max}</td><td>${button('编辑','edit-rule',`data-id="${q.id}"`)}</td></tr>`).join('')}</tbody></table></div><div class="publicity-actions"><span>共${rows.length}项 · 第${page+1}/${Math.max(1,Math.ceil(rows.length/25))}页</span>${button('上一页','rules-prev',page===0?'disabled':'')}${button('下一页','rules-next',(page+1)*25>=rows.length?'disabled':'')}</div></section>`;
}
function editRule(id){
  if(state.role!=='admin')return;const stage=state.rulesStage||'meeting',r=ruleDraft(stage),isRequired=id?.startsWith('required-'),existing=isRequired?{title:r.required[Number(id.slice(9))],kind:'required',max:0}:r.majors.flatMap(m=>m.questions).find(q=>q.id===id),q=existing||{title:'',max:1,options:[],mode:'official-options'},group=r.majors.find(m=>m.questions.some(x=>x.id===id))||r.majors[0];state.editRuleId=id||null;
  openModal(existing?'编辑评分项':'新增评分项',STAGES[stage][0],`<div class="form-grid">${field('ruleTitle','题目 *','textarea',q.title)}<label class="field"><span>题型 *</span><select name="ruleKind" ${q.integrity?'disabled':''}><option value="options" ${!isRequired&&q.mode!=='score-range'?'selected':''}>分档选择</option><option value="range" ${q.mode==='score-range'?'selected':''}>逐分选择</option><option value="required" ${isRequired?'selected':''}>达标 / 不达标（不计分）</option></select></label><label class="field"><span>所属分组</span><select name="ruleGroup">${r.majors.map(m=>`<option value="${m.id}" ${m.id===group.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label>${field('ruleMax','满分（数值项必填）','number',q.max)}${field('ruleNote','评分说明','textarea',q.note||'')}${field('ruleOptions','分档选项（每行：文字 | 分值 | 最低分，可省略最低分）','textarea',(q.options||[]).map(o=>`${o.label||o.description} | ${o.score}${o.min!==undefined?' | '+o.min:''}`).join('\n'))}</div><p class="helper">达标题不计分，逐分题从满分排列至0分。分档分值须在本题范围；现场0分“以上条件均不满足”自动置于最后。${q.integrity?'本题保留正式空间完整性判定，实体分值最高10分。':''}</p>`,button('取消','close-modal')+primary('保存草稿','save-rule'));
}
function saveRule(){
  if(state.role!=='admin')return;const r=ruleDraft(state.rulesStage||'meeting'),id=state.editRuleId,title=read('ruleTitle'),kind=read('ruleKind'),max=Number(read('ruleMax'));if(!title)return toast('请填写题目');
  const oldRequired=id?.startsWith('required-'),old=r.majors.flatMap(m=>m.questions).find(q=>q.id===id),options=[];
  if(kind!=='required'&&(!Number.isInteger(max)||max<1||max>1000))return toast('满分须为1—1000的整数');
  if(kind==='options'){for(const line of read('ruleOptions').split('\n').filter(Boolean)){const parts=line.split('|').map(x=>x.trim()),score=Number(parts[1]),min=parts.length>2?Number(parts[2]):score;if(parts.length<2||!parts[0]||!Number.isFinite(score)||!Number.isFinite(min)||min<0||min>score||score<0||score>(old?.integrity?10:max))return toast('请检查每行选项文字、分值及最低分');options.push({key:'cfg-'+options.length,label:parts[0],score,min});}if(!options.length)return toast('请填写分档选项');}
  if(old?.integrity&&max!==15)return toast('正式完整性评分保持15分：空间5分，实体最高10分');
  const source=r.majors.find(m=>m.questions.some(q=>q.id===id)),oldIndex=source?.questions.findIndex(q=>q.id===id);
  if(oldRequired){if(kind==='required')r.required[Number(id.slice(9))]=title;else r.required.splice(Number(id.slice(9)),1);}if(old)r.majors.forEach(m=>m.questions=m.questions.filter(q=>q.id!==id));
  if(kind==='required'){if(!oldRequired)r.required.push(title);}else{const group=r.majors.find(m=>m.id===read('ruleGroup'))||r.majors[0];const item={...(old||{}),id:old?.id||'CFG-'+Date.now(),title,max,note:read('ruleNote'),mode:kind==='range'?'score-range':'official-options',options,major:group.name};if(source===group)group.questions.splice(oldIndex,0,item);else group.questions.push(item);}
  r.majors.forEach(m=>m.max=m.questions.reduce((n,q)=>n+q.max,0));save();closeModal();render();toast('评分项草稿已保存，发布后生效');
}
function publishRules(){if(state.role!=='admin')return;const stage=state.rulesStage||'meeting',r=db.ruleDrafts?.[stage];if(!r)return toast('当前没有未发布修改');const sum=r.majors.reduce((n,m)=>n+m.questions.reduce((s,q)=>s+q.max,0),0);if(sum!==(stage==='meeting'?100:1000))return toast(`发布前总分须为${stage==='meeting'?100:1000}分，当前${sum}分`);const version=publishedRule(stage).version+1;const snapshot={...clone(r),id:'scenic-'+stage+'-v'+version,version,at:new Date().toLocaleString('zh-CN'),by:person()};db.ruleVersions??={};(db.ruleVersions[stage]??=[]).push(snapshot);delete db.ruleDrafts[stage];save();render();toast('规则已发布，已开始阶段及历史评分保持原版本');}

function documentSummaryTask(p){
  if(state.role!=='hall')return waiting(p,'等待省厅资料审核意见汇总','专家审核已完成，由省厅汇总决定补证或进入专家会议评审。');
  const s=summary(p,'document');
  return `<section class="task-card"><h2>省厅资料审核意见汇总</h2><p>${s.completed.length} / ${s.total} 位专家已提交意见，原始意见只读。</p>${reviewTable(p)}<div class="alert gray"><p>本节点由省厅人工办理。补证提交后仍返回本汇总节点，不回到初审，也不覆盖专家原始意见。</p></div><div class="radio-group"><label class="radio-card"><input type="radio" name="documentDecision" value="proceed" checked><span>进入${p.type==='scenic'?'线下专家会议评审':'现场创建期'}</span></label><label class="radio-card"><input type="radio" name="documentDecision" value="supplement"><span>退回市州补充材料</span></label></div>${field('documentComment','省厅汇总办理意见 *')}${field('correctionDays','补正时限（天）','number',10)}<div class="footer">${primary('提交办理决定','submit-document-hall')}</div></section>`;
}
function objectionRecords(p){return (p.publicity?.objections||[]).map(o=>`<article class="history-item"><strong>${esc(p.name)}</strong><p class="remark-text">${esc(o.content)}</p><small>${esc(o.at)} · ${esc(o.actor)}</small></article>`).join('')||'<p class="muted">未登记异议。</p>';}
function archiveResultPanel(p){
  return `<section class="task-card"><h2>${p.stage==='failed'?'本次申报未通过，已归档':esc(stageLabel(p))}</h2><p>申报材料、专家原始评分及办理过程已归档，只读保留。</p>${p.publicity?.completed?`<h3>公示异议记录（${p.publicity.objections?.length||0}条）</h3>${objectionRecords(p)}<div class="alert gray"><p>公示期满即归档，不因异议阻塞。系统不判定申创成功，归档结论由省厅人工确认。</p></div>${p.archiveDecision?`<h3>省厅人工确认结论</h3><p>${p.archiveConclusion==='failure'?'申创未通过':'申创成功'}：${esc(p.archiveDecision.comment)}</p><small>${esc(p.archiveDecision.actor)} · ${esc(p.archiveDecision.at)}</small>`:p.archiveConclusion==='pending'&&state.role==='hall'?primary('人工确认归档结论','archive-conclusion'):''}`:''}</section>`;
}
function archiveConclusionModal(){const p=getProject();if(state.role!=='hall'||p?.archiveConclusion!=='pending'||!p.publicity?.completed)return;
  openModal('人工确认归档结论',p.name,`<div class="alert gray"><p>项目已归档。本操作只补充人工结论，不重新开启流程、不修改专家分数。请结合公示及异议记录审慎判断。</p></div>${objectionRecords(p)}<label class="field"><span>申创结论 *</span><select name="archiveOutcome"><option value="">请选择人工结论</option><option value="success">申创成功</option><option value="failure">申创未通过</option></select></label>${field('archiveReason','人工判断依据 *','textarea','','填写结论依据及异议核验情况')}`,button('取消','close-modal')+primary('确认结论并保留归档','save-archive-conclusion'));
}
// 公示期满逐项目归档；异议和申创结论互相独立，不以异议数阻塞归档。
function completeEligiblePublicity(){
  let changed=false;
  for(const p of db.projects){if(p.stage!=='publicity'||!p.publicity||today()<=p.publicity.end)continue;
    record(p,'公示期满归档','公示期已结束，异议记录随项目归档。申创结论待省厅人工确认，系统不作通过判定。',{actor:'系统',automatic:true});
    p.publicity.completed=true;p.publicity.archivedAt=today();p.publicity.objections??=[];p.archiveConclusion='pending';p.stage='done';changed=true;
  }if(changed)save();return changed;
}
function signatureDialog(p,sh){
  openModal('专家签字并提交',STAGES[p.stage][0],`<div class="alert green"><p>本人客观评分 ${scoreTotal(sh)} 分${sh.result==='fail'?'，含未达标项或低于参考分值':''}。此处不作审批判定，仍可签字提交，由省厅人工形成结论。提交后锁定本人评分与签字。</p></div><div class="signature-methods"><section><h3>手机扫码签字</h3><p>打开二维码，用手机手写签名。</p>${primary(icon('qr-code')+'生成签字二维码','signature-qr')}<div id="signatureQr"></div></section><section><h3>上传签字图片</h3><p>也可上传本人PNG/JPG签字图片，限2MB。</p><label class="upload-btn">选择签字图片<input type="file" id="signatureFile" accept="image/png,image/jpeg"></label></section></div><div id="signaturePreview">${sh.signature?.data?`<img class="signature-preview" src="${sh.signature.data}" alt="专家签字">`:''}</div><p class="helper">前端演示支持同浏览器手机签字预览回传；真实手机跨设备同步待后端集成。签字不出现在回避确认中。</p>`,button('返回评分','close-modal')+primary('签字并提交评分','submit-score'));
}
function createSignatureQR(){
  if(state.role!=='expert'||!canHandle(getProject()))return;const token=crypto.randomUUID(),p=getProject(),url=new URL('signature.html',location.href);url.searchParams.set('token',token);url.searchParams.set('expert',person());url.searchParams.set('project',p.name);
  state.signatureSession={token,project:p.id,expert:state.expert,stage:p.stage,until:Date.now()+10*60*1000};
  const qr=window.qrcode?.(0,'M');if(qr){qr.addData(url.href);qr.make();}document.getElementById('signatureQr').innerHTML=`${qr?qr.createSvgTag({cellSize:3,margin:12}):'<p>二维码库未加载，可使用下方签字链接。</p>'}<p class="helper">10分钟内有效。当前地址仅本机可访问时，请用下方演示入口。</p><a class="btn" href="${esc(url.href)}" target="_blank" rel="noopener">打开手机签字预览 ↗</a>`;
}
function acceptSignature(message){
  const s=state.signatureSession,p=getProject();if(!s||message?.token!==s.token||Date.now()>s.until||state.role!=='expert'||p?.id!==s.project||state.expert!==s.expert||p.stage!==s.stage||!canHandle(p)||document.getElementById('modalTitle').textContent!=='专家签字并提交')return false;
  if(typeof message.data!=='string'||!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(message.data)||message.data.length>2800000)return false;
  const sh=sheetFor(p,p.stage);sh.signature={name:'本人手写签字.png',data:message.data,at:today(),method:'handwritten'};save();document.getElementById('signaturePreview').innerHTML=`<p class="badge green">手写签字已回传，请核对后提交</p><img class="signature-preview" src="${message.data}" alt="专家手写签字">`;state.signatureSession=null;return true;
}
function initializeWorkflowUI(){
  if(window.V2_WORKFLOW_READY)return;window.V2_WORKFLOW_READY=true;
  for(const p of db.projects){if(p.type!=='scenic')continue;p.ruleBindings??={};for(const s of ['meeting','field'])if((p.assigned[s]||[]).length||Object.keys(p.sheets[s]||{}).length)p.ruleBindings[s]??=baseRuleSet(s).id;}
  assignmentModal=assignmentDialog;addExpertModal=expertDialog;saveExpert=saveExpertSimple;expertLibrary=expertLibrarySimple;importExperts=importExpertsSimple;
  const originalRender=render;render=function(){completeEligiblePublicity();originalRender();toggleCorrectionFields();};
  const originalTransition=transition;transition=function(p,stage,...args){bindRules(p,stage);return originalTransition(p,stage,...args);};
  if(typeof BroadcastChannel!=='undefined'){const channel=new BroadcastChannel('tourism-v2-signature');channel.onmessage=e=>acceptSignature(e.data);}
  window.addEventListener('storage',e=>{if(e.key==='tourism-v2-signature-result'&&e.newValue){try{acceptSignature(JSON.parse(e.newValue));}catch{}}});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action;
    if(['open-todo','open-active','open-creation','open-archive'].includes(a)){state.listYear=state.year;state.includePublicity=['open-todo','open-active'].includes(a);state.category='all';state.query='';state.filter=a==='open-todo'?'todo':a==='open-creation'?'creation':'all';navigate(a==='open-archive'?'archive':'projects');}
    if(a==='clear-list-year'){state.listYear=null;render();}
    if(a==='cancel-assignment'){if(state.initialAssignment)cancelInitialAssignment();else{state.assignment=null;closeModal();}}
    if(a==='remove-assigned'){state.assignment?.selected.delete(b.dataset.expert);updateAssignmentSelection();}
    if(a==='previous-detail')previousDetail(b.dataset.key);
    if(a==='previous-materials')previousMaterials(b.dataset.key);
    if(a==='previous-section'){state.previousMaterialSection=Number(b.dataset.section);renderPreviousMaterials(true);}
    if(a==='previous-file'||a==='previous-download'){const p=db.projects.find(p=>p.id===b.dataset.key);if(!p)return;withHistoricalProject(p.id,()=>fileAction(a==='previous-file'?'preview-file':'download-file','attachment-'+b.dataset.group,Number(b.dataset.index)));}
    if(a==='edit-rule')editRule(b.dataset.id);if(a==='add-rule')editRule();if(a==='save-rule')saveRule();if(a==='publish-rules')publishRules();
    if(a==='rules-prev'||a==='rules-next'){state.rulesPage=Math.max(0,(state.rulesPage||0)+(a==='rules-next'?1:-1));render();}
    if(a==='discard-rules'&&state.role==='admin'){delete (db.ruleDrafts||{})[state.rulesStage||'meeting'];save();render();}
    if(a==='rule-versions'){const rows=db.ruleVersions?.[state.rulesStage||'meeting']||[];openModal('评分规则发布记录','已开始阶段使用绑定的历史版本',rows.map(v=>`<div class="history-item"><h3>V${v.version}</h3><p>${esc(v.at)} · ${esc(v.by)}</p></div>`).join('')||empty('当前仅使用正式细则基线V0。'));}
    if(a==='signature-qr')createSignatureQR();
    if(a==='archive-conclusion')archiveConclusionModal();
    if(a==='save-archive-conclusion'){
      const p=getProject(),outcome=read('archiveOutcome'),comment=read('archiveReason');
      if(state.role!=='hall'||p?.archiveConclusion!=='pending'||!p.publicity?.completed)return;
      if(!['success','failure'].includes(outcome))return validationError('请选择人工结论','[name="archiveOutcome"]');
      if(!comment)return validationError('请填写人工判断依据','[name="archiveReason"]');
      confirm('确认归档结论',`<p>${esc(p.name)}：${outcome==='success'?'申创成功':'申创未通过'}。确认后结论只读，异议记录永久保留。</p>`,()=>{if(p.archiveConclusion!=='pending')return;p.archiveConclusion=outcome;p.archiveDecision={outcome,comment,actor:person(),at:new Date().toLocaleString('zh-CN',{hour12:false})};record(p,'省厅人工确认归档结论：'+(outcome==='success'?'申创成功':'申创未通过'),comment);p.stage=outcome==='success'?'done':'failed';save();closeModal();navigate('archive');});
    }
  });
  document.addEventListener('click',e=>{const b=e.target.closest('[data-action]'),past=b?.closest('[data-history-project]');if(!past)return;const action=b.dataset.action;if(!['score-record','stage-records','preview-file','download-file','previous'].includes(action))return;e.stopImmediatePropagation();withHistoricalProject(past.dataset.historyProject,()=>{const p=getProject();if(action==='score-record')scoreRecordModal(b.dataset.stage,b.dataset.expert);else if(action==='stage-records')openModal(STAGES[b.dataset.stage][0]+'评分汇总',p.name,historicalContent(p,scoreTable(p,b.dataset.stage)),'',null,true,true);else if(action==='previous')toast('正在查看往次申请；关闭弹窗可返回本次办理。');else fileAction(action,b.dataset.fileKey,Number(b.dataset.index));});},true);
  document.addEventListener('change',e=>{if(['initialDecision','documentDecision'].includes(e.target.name))toggleCorrectionFields();if(e.target.id==='assignmentCount'){state.assignment.count=Number(e.target.value);updateAssignmentSelection();}if(e.target.id==='rulesStage'){state.rulesStage=e.target.value;state.rulesPage=0;state.rulesQuery='';render();}});
  document.addEventListener('input',e=>{if(e.target.id==='assignmentSearch'){document.querySelectorAll('.expert-candidate').forEach(row=>row.hidden=!row.textContent.includes(e.target.value));}if(e.target.id==='rulesQuery'){state.rulesQuery=e.target.value;state.rulesPage=0;const pos=e.target.selectionStart;render();const input=document.getElementById('rulesQuery');input.focus();input.setSelectionRange(pos,pos);}});
  window.addEventListener('focus',()=>{if(completeEligiblePublicity())render();});setInterval(()=>{if(completeEligiblePublicity())render();},30000);render();
}
window.addEventListener('load',initializeWorkflowUI);
