'use strict';
// V3.0: role navigation and task projections; existing workflow records stay unchanged.
const RW_MENUS={
  hall:[['home','工作台','layout-dashboard'],['projects','申创项目','folder'],['publicity','公示管理','megaphone'],['archive','项目档案','archive'],['experts','专家库','users-round']],
  city:[['home','工作台','layout-dashboard'],['projects','我的申报','folder']],
  expert:[['home','工作台','layout-dashboard'],['projects','我的评审','clipboard-list']],
  admin:[['home','工作台','layout-dashboard'],['settings','年度申报设置','settings-2'],['rules','评审配置','list-checks']]
};
const rwArchived=p=>['done','failed'].includes(p.stage);
const rwPendingConclusion=p=>publicityArchivable(p);
const rwScope=p=>(!state.listYear||p.statisticsYear===state.listYear)&&(state.category==='all'||p.type===state.category);
function rwTask(p){
  if(state.role==='hall'){
    if(rwArchived(p)||p.correction)return '';
    if(p.stage==='creation')return p.creationStatus==='requested'?'指派现场评审专家':'';
    if(p.stage==='publicity')return p.publicity?'':'配置公示';
    if(['document','meeting','field'].includes(p.stage)){
      const s=summary(p,p.stage);return !s.total?'指派专家':s.completed.length===s.total?'汇总评审意见':'';
    }
    return {initial:'审查申报材料','document-summary':'汇总资料审核意见',hall:'办理综合复审',committee:'上传上会材料'}[p.stage]||'';
  }
  if(state.role==='city'){
    if(rwArchived(p))return '';
    if(p.correction)return '补充申报材料';
    if(p.stage==='draft')return '继续填报';
    if(p.stage==='creation'&&!p.creationPlan?.length)return '上传创建方案';
    return '';
  }
  return state.role==='expert'&&canHandle(p)?p.stage==='document'?'审核申报资料':isLegacyScenic(p)?'提交现场评审':'进入评分':'';
}
function rwExpertTasks(){
  return visibleProjects().flatMap(p=>['document','meeting','field'].flatMap(stage=>{
    const value=stage==='document'?p.reviews?.[state.expert]:p.sheets?.[stage]?.[state.expert];
    const submitted=stage==='document'?!!value?.at:!!value?.submitted;
    const assigned=(p.assigned?.[stage]||[]).includes(state.expert);
    const current=p.stage===stage&&assigned;
    const earlier=assigned&&stagePath(p).indexOf(stage)<stagePath(p).indexOf(p.stage);
    const reassigned=(p.assignmentHistory||[]).some(h=>h.stage===stage&&[...(h.old||[]),...(h.ids||[])].includes(state.expert));
    if(!submitted&&!current&&!earlier&&!reassigned)return [];
    const pending=current&&!submitted&&!p.correction&&!p.avoidance?.[state.expert]?.conflict;
    return [{p,stage,value,submitted,pending,status:submitted?'已提交':!current?'可查阅过程':p.correction?'等待补充材料':p.avoidance?.[state.expert]?.conflict?'已申请回避':'待处理'}];
  })).sort((a,b)=>String(b.value?.at||b.p.date).localeCompare(String(a.value?.at||a.p.date)));
}
function rwTabs(items,active){return `<div class="rw-tabs" role="group" aria-label="事项分类">${items.map(([id,label,count])=>`<button class="rw-tab ${active===id?'active':''}" data-rw-tab="${id}" aria-pressed="${active===id}">${label}${count===undefined?'':`<span>${count}</span>`}</button>`).join('')}</div>`;}
function rwDefaultTab(){return state.role==='hall'?'todo':state.role==='expert'?'pending':'all';}
function rwTab(){return state.rwTab||rwDefaultTab();}
function rwProjectRows(){
  const tab=rwTab();let rows=visibleProjects();
  if(state.view==='archive')rows=rows.filter(p=>rwArchived(p)&&(tab==='all'||tab===p.stage));
  else if(state.role==='hall')rows=rows.filter(p=>!rwArchived(p)&&p.stage!=='publicity'&&(tab!=='todo'||!!rwTask(p))&&(tab!=='handled'||hasParticipated(p)));
  else rows=rows.filter(p=>tab==='all'||tab==='draft'&&p.stage==='draft'||tab==='correction'&&!!p.correction||tab==='active'&&!rwArchived(p)&&p.stage!=='draft'&&!p.correction||tab==='archived'&&rwArchived(p));
  return rows.filter(p=>(!state.listYear||p.statisticsYear===state.listYear)&&(state.category==='all'||p.type===state.category)&&(state.filter==='all'||state.filter==='todo'&&!!rwTask(p)||state.filter==='handled'&&hasParticipated(p)||state.filter===p.stage)&&(!state.query||(p.name+p.id+p.unit+p.region).includes(state.query))).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
}
function rwSearch(){return `<label class="search">${icon('search')}<input id="projectSearch" placeholder="搜索名称、编号或申报单位" value="${esc(state.query)}"></label>`;}
function rwProjectTable(rows){return rows.length?`<div class="table-wrap"><table class="project-table"><thead><tr><th>申创项目</th><th>申创时间 / 市州</th><th>当前环节</th><th>办理状态</th><th>我的事项</th><th>操作</th></tr></thead><tbody>${rows.map(p=>{const task=rwTask(p);return `<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.id)}</small></td><td>${p.stage==='draft'?'尚未提交':esc(p.date)}<small>${esc(p.region)} · ${p.applicationYear}年度申报</small></td><td>${esc(STAGES[p.stage][0])}</td><td>${badge(stageLabel(p),rwPendingConclusion(p)?'amber':p.stage==='failed'?'red':rwArchived(p)?'green':'gray')}</td><td>${task?`<span class="rw-task">${icon('circle-alert')}${esc(task)}</span>`:'<span class="muted">可查看</span>'}</td><td><button class="btn small ${task?'primary':''}" data-open-project="${p.id}">${task||'查看项目'} ${icon('arrow-right')}</button></td></tr>`;}).join('')}</tbody></table></div>`:empty('暂无符合条件的项目，可切换分类或清除筛选。');}
function rwProjectList(){
  if(state.role==='expert')return rwExpertList();
  const archive=state.view==='archive',tab=rwTab(),all=visibleProjects().filter(rwScope),rows=rwProjectRows();
  const items=archive?[['all','全部档案'],['done','申创成功'],['failed','申创未通过']]:state.role==='hall'?[['todo','待我处理',all.filter(p=>!rwArchived(p)&&p.stage!=='publicity'&&rwTask(p)).length],['all','全部在办'],['handled','我已办理']]:[['all','全部申报'],['draft','草稿'],['correction','待补充'],['active','办理中'],['archived','已归档']];
  return pageHead(archive?'项目档案':state.role==='city'?'我的申报':'申创项目',archive?'仅展示已办结项目，结论、申报材料和评审过程只读保留。':'围绕同一份申报办理；当前任务明确标注，其他项目可只读查看。',state.role==='city'?newApplicationButton():'')+rwTabs(items,tab)+categoryChips()+`<section class="panel"><div class="filters">${rwSearch()}<select id="projectFilter" aria-label="筛选流程环节"><option value="all">全部环节</option>${Object.entries(STAGES).filter(([k])=>archive?['done','failed'].includes(k):state.role==='hall'?!['done','failed','publicity'].includes(k):true).map(([k,v])=>`<option value="${k}" ${state.filter===k?'selected':''}>${v[0]}</option>`).join('')}</select>${state.listYear?`<span class="badge">${state.listYear}年度 ${button('清除年度','clear-list-year')}</span>`:''}<span id="rowCount" class="muted">${rows.length} 个项目</span></div><div id="projectRows">${rwProjectTable(rows)}</div><div class="sort-note">按申创时间由近到远排列。${state.role==='hall'?'公示事项在“公示管理”，办结后在“项目档案”。':'同一份申报的材料与流转记录保存在项目内。'}</div></section>`;
}
function rwExpertList(){
  const tab=rwTab(),all=rwExpertTasks().filter(t=>rwScope(t.p)),rows=all.filter(t=>(tab==='all'||tab==='pending'&&t.pending||tab==='submitted'&&t.submitted)&&(state.filter==='all'||t.stage===state.filter)&&(!state.query||(t.p.name+t.p.id+t.p.unit).includes(state.query)));
  return pageHead('我的评审','每个项目按资料审核、会议评审、现场评审分别记录。已提交即可查阅，不必等项目归档。')+rwTabs([['pending','待处理',all.filter(t=>t.pending).length],['submitted','已提交',all.filter(t=>t.submitted).length],['all','全部参与']],tab)+categoryChips()+`<section class="panel"><div class="filters">${rwSearch()}<select id="projectFilter" aria-label="评审阶段"><option value="all">全部评审阶段</option>${['document','meeting','field'].map(k=>`<option value="${k}" ${state.filter===k?'selected':''}>${STAGES[k][0]}</option>`).join('')}</select><span id="rowCount" class="muted">${rows.length} 项评审</span></div><div id="projectRows">${rows.length?`<div class="table-wrap"><table><thead><tr><th>申创项目</th><th>评审阶段</th><th>本人状态</th><th>提交时间</th><th>操作</th></tr></thead><tbody>${rows.map(t=>`<tr><td><strong>${esc(t.p.name)}</strong><small>${esc(t.p.id)}</small></td><td>${STAGES[t.stage][0]}</td><td>${badge(t.status,t.pending?'amber':t.submitted?'green':'gray')}</td><td>${esc(t.value?.at||'—')}</td><td>${t.submitted?button('查看提交记录','rw-record',`data-project="${t.p.id}" data-stage="${t.stage}"`):`<button class="btn small ${t.pending?'primary':''}" data-open-project="${t.p.id}">${t.pending?'进入办理':'查看项目'}</button>`}</td></tr>`).join('')}</tbody></table></div>`:empty('暂无该分类的评审任务。')}</div></section>`;
}
function rwPublicityList(){
  if(state.role!=='hall')return empty('当前角色无公示管理权限。');
  const tab=state.rwPublicityTab||'pending',all=visibleProjects().filter(p=>(p.stage==='publicity'||p.publicity?.completed)&&rwScope(p)),matches=p=>tab==='pending'?['pending','scheduled'].includes(publicityPhase(p)):tab==='active'?publicityPhase(p)==='active':tab==='ended'?['ended','archived'].includes(publicityPhase(p)):true,rows=all.filter(matches).sort((a,b)=>Number(publicityArchivable(b))-Number(publicityArchivable(a))||String(b.publicity?.start||b.date).localeCompare(String(a.publicity?.start||a.date))),bulk=tab==='ended',eligible=rows.filter(publicityArchivable),selected=eligible.filter(p=>state.selected.has(p.id));
  const labels={pending:'待发布',scheduled:'待开始',active:'公示中',ended:'期满待归档',archived:'已归档'};
  return pageHead('公示管理','公示中仅登记异议；公示期满后，批量选择通过或不通过并归档。')+rwTabs([['pending','待发布',all.filter(p=>['pending','scheduled'].includes(publicityPhase(p))).length],['active','公示中',all.filter(p=>publicityPhase(p)==='active').length],['ended','已结束',all.filter(p=>['ended','archived'].includes(publicityPhase(p))).length],['all','全部']],tab)+categoryChips()+`<section class="panel"><div class="table-wrap"><table><thead><tr>${tab==='pending'?'<th>选择</th>':bulk?`<th><input type="checkbox" data-publicity-select-all aria-label="全选期满待归档项目" ${eligible.length&&selected.length===eligible.length?'checked':''} ${eligible.length?'':'disabled'}></th>`:''}<th>项目名称</th><th>公示状态</th><th>公示期</th><th>异议</th><th>${bulk?'归档结论':'操作'}</th></tr></thead><tbody>${rows.map(p=>{const phase=publicityPhase(p);return `<tr>${tab==='pending'?`<td>${phase==='pending'?`<input type="checkbox" data-publicity-select="${p.id}" aria-label="选择${esc(p.name)}" ${state.selected.has(p.id)?'checked':''}>`:'—'}</td>`:bulk?`<td>${publicityArchivable(p)?`<input type="checkbox" data-publicity-archive-select="${p.id}" aria-label="选择${esc(p.name)}" ${state.selected.has(p.id)?'checked':''}>`:'—'}</td>`:''}<td><strong>${esc(p.name)}</strong><small>${esc(p.id)}</small></td><td>${badge(labels[phase],phase==='ended'?'amber':phase==='active'?'blue':'gray')}</td><td>${p.publicity?`${esc(p.publicity.start)} 至 ${esc(p.publicity.end)}`:'待配置'}</td><td>${p.publicity?.objections?.length||0} 条</td><td>${phase==='active'?button('登记异议','publicity-batch',`data-project="${p.id}"`):phase==='archived'?`${badge(p.archiveConclusion==='failure'||p.stage==='failed'?'不通过':'通过',p.stage==='failed'?'red':'green')} ${button('查看档案','open-p',`data-project="${p.id}"`)}`:phase==='ended'?'<span class="muted">勾选后批量办理</span>':phase==='scheduled'?'<span class="muted">等待公示开始</span>':button('查看材料','open-p',`data-project="${p.id}"`)}</td></tr>`;}).join('')}</tbody></table></div>${!rows.length?empty('暂无该分类的公示项目。'):''}${state.listYear?`<div class="rw-hint">${state.listYear}年度${button('清除年度','clear-list-year')}</div>`:''}${tab==='pending'?`<div class="publicity-actions"><span id="selectedCount" class="muted">已选择 ${state.selected.size} 个项目</span>${primary('批量配置公示','configure-publicity')}</div>`:bulk?`<div class="publicity-actions"><span class="muted">已选择 ${selected.length} 个待归档项目</span><div class="actions">${button('批量不通过并归档','publicity-fail',selected.length?'':'disabled')}${primary('批量通过并归档','publicity-pass',selected.length?'':'disabled')}</div></div>`:''}</section>`;
}
function rwCard(label,count,section,tab,description){return `<button class="stat stat-link" data-rw-open="${section}" data-rw-target="${tab}"><span>${label}</span><strong>${count}</strong><p>${description} →</p></button>`;}
function rwDashboard(){
  const all=visibleProjects().filter(p=>p.statisticsYear===state.year),active=all.filter(p=>!rwArchived(p));
  const header=pageHead(`你好，${esc(person())}`,`${ROLES[state.role][0]} · 按职责处理当前事项`,state.role==='city'?newApplicationButton():'','工作台 / WORKSPACE');
  let cards='',body='';
  if(state.role==='admin'){
    const year=new Date().getFullYear(),period=annualConfig(year)?.categoryPeriods?.scenic,tables=typeof scCatalog==='function'?scCatalog():[];
    cards=rwCard('本年度申报设置',period?.start&&period.end?'已配置':'待配置','settings','',`${year}年度景区质量等级申创`)+rwCard('评审配置',tables.length,'rules','', '先建题表，再分组配置题目');
    body=`<section class="panel rw-admin-summary"><div class="panel-head"><h2>${year}年度申报时间</h2></div><p>旅游景区质量等级申创</p><strong>${period?.start&&period.end?`${esc(period.start)} 至 ${esc(period.end)}`:'尚未配置'}</strong><div class="footer">${button('查看与编辑','rw-settings')}</div></section>`;
  }else if(state.role==='expert'){
    const tasks=rwExpertTasks().filter(t=>t.p.statisticsYear===state.year);
    cards=rwCard('待处理评审',tasks.filter(t=>t.pending).length,'projects','pending','查看本人当前任务')+rwCard('已提交记录',tasks.filter(t=>t.submitted).length,'projects','submitted','本人各阶段意见与分数，只读')+rwCard('全部参与',tasks.length,'projects','all','按项目和评审阶段查阅');
  }else if(state.role==='hall'){
    cards=rwCard('待我处理',active.filter(p=>p.stage!=='publicity'&&rwTask(p)).length,'projects','todo','审查、指派和意见汇总')+rwCard('待发布公示',all.filter(p=>p.stage==='publicity'&&!p.publicity).length,'publicity','pending','选择项目并批量配置')+rwCard('公示期满待归档',all.filter(rwPendingConclusion).length,'publicity','ended','批量通过或不通过并归档')+rwCard('全部在办项目',active.filter(p=>p.stage!=='publicity').length,'projects','all','查看当前流转情况');
  }else{
    cards=rwCard('草稿',all.filter(p=>p.stage==='draft').length,'projects','draft','继续填写或补充')+rwCard('待补充材料',all.filter(p=>p.correction).length,'projects','correction','查看退回要求')+rwCard('办理中',active.filter(p=>p.stage!=='draft'&&!p.correction).length,'projects','active','查看进度与创建事项')+rwCard('已归档',all.filter(rwArchived).length,'projects','archived','查看本次结论');
  }
  if(['hall','city'].includes(state.role))body=`<section class="panel"><div class="panel-head"><div><h2>申创业务链路</h2><p>按办理年度统计当前环节，点击进入对应项目。</p></div><div class="actions"><select id="dashboardCategory" aria-label="申创类别">${D.categories.filter(c=>c.enabled).map(c=>`<option value="${c.id}" ${state.flowCategory===c.id?'selected':''}>${c.name}</option>`).join('')}</select>${rwYearSelect()}</div></div>${pipeline({type:state.flowCategory||'scenic',stage:'draft'},true)}</section>`;
  else if(state.role==='expert')body=`<section class="panel"><div class="panel-head"><h2>评审年度</h2>${rwYearSelect()}</div><p class="rw-hint">资料审核意见、会议评分和现场评分分别提交、分别留存，已提交记录始终只读。</p></section>`;
  return header+`<div class="stats rw-stats">${cards}</div><div class="stack">${body}${announcementPanel()}</div>`;
}
function rwYearSelect(){return `<select id="dashboardYear" aria-label="统计年度">${[...new Set([new Date().getFullYear(),2026,2025])].map(y=>`<option value="${y}" ${state.year===y?'selected':''}>${y}年度</option>`).join('')}</select>`;}
function rwGo(section,tab,annual=false){
  state.category='all';state.query='';state.filter='all';state.listYear=annual?state.year:null;state.selected.clear();
  if(section==='publicity')state.rwPublicityTab=tab||'pending';else state.rwTab=tab||(section==='archive'?'all':rwDefaultTab());
  navigate(section);
}
function rwInit(){
  if(window.V2_ROLE_WORKSPACE)return;window.V2_ROLE_WORKSPACE={version:'V3.0',task:rwTask,expertTasks:rwExpertTasks};
  const priorVisible=visibleProjects;visibleProjects=()=>state.role==='admin'?[]:priorVisible();
  const priorCanHandle=canHandle;canHandle=p=>state.role==='hall'&&rwPendingConclusion(p)||priorCanHandle(p);
  const priorFilter=filterProjectRows;filterProjectRows=rows=>state.filter==='todo'?priorFilter(rows.filter(p=>!!rwTask(p))):priorFilter(rows);
  dashboard=rwDashboard;projectList=rwProjectList;publicityList=rwPublicityList;
  updateList=()=>{if(!['projects','archive'].includes(state.view))return;const root=document.getElementById('main');if(state.role==='expert'){const pos=document.getElementById('projectSearch')?.selectionStart;root.innerHTML=rwExpertList();const input=document.getElementById('projectSearch');input?.focus();if(pos!==undefined)input?.setSelectionRange(pos,pos);}else{const rows=rwProjectRows();document.getElementById('projectRows').innerHTML=rwProjectTable(rows);document.getElementById('rowCount').textContent=rows.length+' 个项目';}icons();};
  const priorRender=render;render=()=>{
    if(state.view==='project'&&getProject()?.stage==='publicity'&&state.role==='hall')state.origin='publicity';
    if(state.view==='archive'&&['city','expert'].includes(state.role)){state.view='projects';state.rwTab=state.role==='city'?'archived':'submitted';history.replaceState(null,'','#projects');}
    const allowed=RW_MENUS[state.role].some(([id])=>id===state.view)||state.role!=='admin'&&state.view==='project'||state.role==='city'&&['new','apply'].includes(state.view);
    if(!allowed){state.view='home';history.replaceState(null,'','#home');}
    if(state.rwRole!==state.role){state.rwRole=state.role;state.rwTab=rwDefaultTab();state.rwPublicityTab='pending';}
    // Legacy workflow submissions return to lists. Derive a valid tab without discarding deliberate filters.
    if(state.view==='archive'&&!['done','failed','all'].includes(state.rwTab))state.rwTab='all';
    if(state.view==='projects'&&state.role==='hall'&&!['todo','all','handled'].includes(state.rwTab))state.rwTab='todo';
    priorRender();
    if(state.view==='project'&&getProject()?.stage==='publicity'&&state.role==='hall')state.origin='publicity';
    document.title='旅游品牌申创管理系统 · V3.0';document.querySelector('.version').textContent='V3.0';
    document.querySelector('.guide-header small').textContent='V3.0 · PRODUCT NOTES';
    const menu=RW_MENUS[state.role];document.getElementById('nav').innerHTML=menu.map(([id,name,i])=>`<button class="nav-btn ${state.view===id||state.view==='project'&&(id===state.origin||['city','expert'].includes(state.role)&&id==='projects')?'active':''}" data-nav="${id}">${icon(i)}${name}${id==='publicity'&&state.role==='hall'&&visibleProjects().some(rwPendingConclusion)?`<span class="count">${visibleProjects().filter(rwPendingConclusion).length}</span>`:''}</button>`).join('');
    const title=menu.find(([id])=>id===state.view)?.[1];if(title)document.querySelector('#breadcrumb strong').textContent=title;
    if(state.view==='rules'&&!state.scTable&&state.qbTab!=='bank')document.querySelector('#main .page-head h1')?.replaceChildren(document.createTextNode('评审配置'));
    document.querySelectorAll('[data-action="back-list"]').forEach(b=>{b.innerHTML=icon('arrow-left')+'返回'+(state.role==='expert'?'我的评审':state.role==='city'?'我的申报':state.origin==='archive'?'项目档案':state.origin==='publicity'?'公示管理':'申创项目');});
    icons();
  };
  document.addEventListener('click',event=>{
    const el=event.target.closest('button,a');if(!el||el.disabled)return;
    const action=el.dataset.action;
    if(action==='help'){event.stopImmediatePropagation();openModal('V3.0版本说明','四类旅游品牌申报表单更新版','<p>省厅：申创项目、公示管理、项目档案、专家库。</p><p>市州：新建申报时分别选择旅游景区质量等级申创（2025新国标）与2003老国标。旅游度假区、旅游休闲街区和温泉度假地沿用各自的评审流程。</p><p>老国标项目的现场评审由专家上传评审表、填写建议并签字，省厅综合判定。</p><p>专家：我的评审，按项目与评审阶段查看待处理和已提交记录。</p><p>管理员：年度申报设置、评审配置。各角色首页均保留公告。</p><p>本版继续保留OCR演示、模拟上传及坐标录入。AI检索与智能助手本期不开发；正式鉴权、文件服务等仍待后端集成。</p>');return;}
    if(el.dataset.nav){event.stopImmediatePropagation();rwGo(el.dataset.nav);return;}
    if(el.dataset.rwOpen){event.stopImmediatePropagation();rwGo(el.dataset.rwOpen,el.dataset.rwTarget,true);return;}
    if(el.dataset.rwTab){event.stopImmediatePropagation();state.selected.clear();state.filter='all';if(state.view==='publicity')state.rwPublicityTab=el.dataset.rwTab;else state.rwTab=el.dataset.rwTab;render();return;}
    if(el.dataset.flowStage&&state.view==='home'){
      event.stopImmediatePropagation();state.listYear=state.year;state.category=el.dataset.flowCategory;state.filter=el.dataset.flowStage;state.query='';state.selected.clear();
      if(state.role==='hall'&&state.filter==='publicity'){state.rwPublicityTab='all';navigate('publicity');}
      else {state.rwTab=state.filter==='done'?(state.role==='city'?'archived':'all'):'all';navigate(state.filter==='done'&&state.role==='hall'?'archive':'projects');}return;
    }
    if(action==='rw-settings'){event.stopImmediatePropagation();rwGo('settings');return;}
    if(action==='nav-projects'||['open-todo','open-active','open-creation','open-archive'].includes(action)){
      event.stopImmediatePropagation();const archive=action==='open-archive';rwGo(archive&&state.role==='hall'?'archive':'projects',archive?(state.role==='city'?'archived':state.role==='expert'?'submitted':'all'):action==='open-todo'?rwDefaultTab():'all',action!=='nav-projects');if(action==='open-creation'){state.filter='creation';render();}return;
    }
    if(action==='rw-record'){
      event.stopImmediatePropagation();const task=rwExpertTasks().find(t=>t.p.id===el.dataset.project&&t.stage===el.dataset.stage&&t.submitted);if(!task)return;
      state.project=task.p.id;
      if(task.stage!=='document'){scoreRecordModal(task.stage,state.expert);return;}
      if(task.p.type==='resort'||isHotSpring(task.p)||materialCheckCategory(task.p)){documentReviewRecord(task.p,state.expert);return;}
      openModal('本人资料审核记录',task.p.name,`<div class="alert gray"><p>已提交，只读。${esc(task.value.at)}</p></div><h3>审核意见</h3><p class="remark-text">${esc(task.value.comment||'无补充意见')}</p><p>结论：${esc(({complete:'资料完整',supplement:'建议补充材料'})[task.value.decision]||task.value.decision||'已提交')}</p>`,button('查看申报材料','materials-modal')+button('关闭','close-modal'));return;
    }
  },true);
  render();
}
window.addEventListener('load',rwInit);
