'use strict';
/* 讲解层与业务事件分离：不修改项目、分数或路由，不劫持单击。 */
(() => {
  const $=id=>document.getElementById(id), escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let enabled=false, active='', entries=[], timer, fingerprint='', detailKey='', focusTarget=null;
  const visible=el=>el instanceof Element && !!el.getClientRects().length && getComputedStyle(el).visibility!=='hidden';
  const modalRoot=()=> $('resourceOverlay')&&!$('resourceOverlay').hidden ? $('resourceOverlay') : !$('overlay').hidden ? $('overlay') : null;
  const modalTitle=()=>modalRoot()?.querySelector('#resourceDialogTitle,#modalTitle')?.textContent||'';
  const inModal=()=>!!modalRoot();
  const all=selector=>{try{return [...document.querySelectorAll(selector)].filter(visible);}catch{return [];}};
  function context(){return {view:state.view,role:state.role,project:state.project,tab:state.tab,stage:getProject()?.stage,section:state.formSection,step:state.formStep,major:state.scoreMajor,scoreTable:state.smRuntimeTable,scoreGroup:state.smRuntimeGroup,configTable:state.scTable,configGroup:state.scGroup,questionTab:state.qbTab,questionSource:state.qbSource,modal:modalTitle(),assistant:state.assistantOpen};}
  function refresh(){
    if(!enabled)return;
    const ctx=context(), key=JSON.stringify(ctx), modal=inModal();
    entries=window.V2_INTERACTIONS.filter(n=>!n.id.startsWith('X')).map(n=>({n,targets:all(n.selector)})).filter(e=>e.targets.length);
    if(ctx.view==='rules')entries=entries.filter(e=>e.n.id.startsWith('Q')||e.n.id.startsWith('G')||e.n.id==='A11');
    if(modal) entries=entries.filter(e=>e.targets.some(el=>modalRoot().contains(el)));
    else entries=entries.filter(e=>e.targets.some(el=>!el.closest('#overlay,#resourceOverlay')));
    // 当前办理优先，其次页面导航，共用身份/帮助放最后。
    const stagePrefix={initial:'I',document:'D',meeting:'S',hall:'H',creation:'C',field:state.role==='expert'?'S':'V',committee:'M',publicity:'B'};
    const primary=ctx.view==='project'&&ctx.tab==='task'?stagePrefix[ctx.stage]:ctx.view==='home'?'W':ctx.view==='publicity'?'B':ctx.view==='apply'||ctx.view==='new'?'A':ctx.view==='experts'?'E':ctx.view==='settings'?'T':ctx.view==='rules'?'Q':ctx.view==='project'?'P':'L';
    const rank=n=>n.id.startsWith(primary)?0:n.id.startsWith('G')?2:1;
    entries.sort((a,b)=>rank(a.n)-rank(b.n));
    const signature=key+entries.map(e=>e.n.id+':'+e.targets.length).join(',');
    if(signature!==fingerprint){
      const contextChanged=key!==detailKey,previous=contextChanged?'':active,oldScroll=$('guideScroll').scrollTop;fingerprint=signature;
      if(contextChanged){$('guideDetail').hidden=true;$('guideDetail').innerHTML='';focusTarget=null;active='';detailKey=key;}
      const current=$('breadcrumb').textContent.split('/').at(-1).trim();
      $('guideContext').textContent=`${ROLES[state.role][0]} · ${modal?modalTitle():current}${ctx.stage&&ctx.view==='project'?' · '+STAGES[ctx.stage][0]:''}`;
      $('guideCards').innerHTML=(modal?'<div class="guide-section">当前弹窗 · 关闭后回到页面讲解</div>':'')+entries.map(({n},i)=>`<article class="guide-card ${n.status==='本期不开发'?'is-deferred ':''}${previous===n.id?'is-active':''}" id="guide-${n.id}" data-note="${n.id}"><div class="guide-card-title"><span class="guide-number">${i+1}</span><div><small class="guide-code">${n.id} · ${escape(n.feature)}</small><h3>${escape(n.title)}${n.status!=='已实现'?`<span class="guide-status">${escape(n.status)}</span>`:''}</h3></div></div><p>${escape(n.rule)}</p><dl><dt>如何操作</dt><dd>${escape(n.trigger)}</dd><dt>操作结果</dt><dd>${escape(n.result)}</dd></dl><details><summary>权限与异常说明</summary><p>${escape(n.roles)}：${escape(n.exception)}</p></details><button class="guide-locate" data-guide-locate="${n.id}">定位左侧 ${i+1} ↗</button></article>`).join('')||'<div class="guide-card"><p>当前为只读或等待状态。请选择页面上的字段、材料或操作按钮查看说明。</p></div>';
      $('guideCount').textContent=`当前 ${entries.length} 个交互节点`;
      $('guideScroll').scrollTop=contextChanged?0:oldScroll;
    }
    draw();
  }
  function schedule(){clearTimeout(timer);timer=setTimeout(refresh,75);}
  function draw(){
    const layer=$('guideMarkerLayer');layer.hidden=!enabled||!$('guideMarkers').checked;if(layer.hidden)return;
    const boundary=layer.getBoundingClientRect();let html='';
    entries.forEach(({n,targets},i)=>{
      const target=targets.find(el=>{const r=el.getBoundingClientRect();return r.bottom>4&&r.top<boundary.bottom&&r.right>0&&r.left<boundary.right;});if(!target)return;
      const r=target.getBoundingClientRect(),x=Math.max(8,Math.min(r.left+6,boundary.right-24)),y=Math.max(8,r.top+6);
      if(y>boundary.bottom-10)return;
      html+=`<span class="guide-marker ${active===n.id?'active':''}" style="left:${x}px;top:${y}px">${i+1}</span>`;
    });
    const selected=visible(focusTarget)?focusTarget:entries.find(e=>e.n.id===active)?.targets.find(visible);
    if(selected){const r=selected.getBoundingClientRect();if(r.bottom>0&&r.top<boundary.bottom)html+=`<span class="guide-outline" style="left:${Math.max(0,r.left-3)}px;top:${r.top-3}px;width:${Math.min(r.width+6,boundary.right-Math.max(0,r.left-3))}px;height:${r.height+6}px"></span>`;}
    layer.innerHTML=html;
  }
  function select(id,scrollNote=false){active=id;document.querySelectorAll('[data-note]').forEach(el=>el.classList.toggle('is-active',el.dataset.note===id));if(scrollNote)$('guide-'+id)?.scrollIntoView({block:'nearest',behavior:'auto'});draw();}
  function toggle(value){
    enabled=value;document.body.classList.toggle('guide-mode',value);$('prototypeGuide').hidden=!value;$('guideToggle').setAttribute('aria-pressed',String(value));$('guideToggle').textContent=value?'退出讲解':'原型讲解';
    if(value){fingerprint='';refresh();}else{$('guideMarkerLayer').hidden=true;$('guideToggle').focus();}
    try{sessionStorage.setItem('v2-guide-enabled',String(value));}catch{}
  }
  function detail(target){
    const el=target.closest('[data-field]'),question=target.closest('article.question'),required=target.closest('.required-item');
    if(!el&&!question&&!required)return;
    let title='',code='',body='';
    if(el){
      const root=el.closest('#applyForm,#submittedForm')||document, label=(el.id?[...root.querySelectorAll('label')].find(l=>l.htmlFor===el.id):null)||el.closest('.field')?.querySelector('label')||el.closest('label');
      title=(el.getAttribute('aria-label')||label?.textContent||'').trim();
      const td=el.closest('td'),tr=td?.closest('tr'),table=tr?.closest('table');
      if(!title&&table){const col=[...tr.cells].indexOf(td),rows=[...table.querySelectorAll('tbody tr')];title=(table.querySelectorAll('thead th')[col]?.textContent||'表格字段')+'（第'+(rows.indexOf(tr)+1)+'行）';}
      const subitem=el.closest('.summer-subitems > div');
      if(subitem)title=[...subitem.querySelectorAll('span,strong')].map(e=>e.textContent.trim()).join(' ')+' · 自评分';
      const scorehead=el.closest('.summer-score-head');if(scorehead)title=scorehead.querySelector('strong').textContent+' · '+title;
      title=title||el.dataset.field;code='字段 · '+el.dataset.field;
      const kind={text:'文本',number:'数字',date:'日期',radio:'单选',checkbox:'复选',textarea:'多行文本','select-one':'下拉选择'}[el.type]||el.tagName.toLowerCase();
      const choices=el.type==='select-one'?[...el.options].map(o=>o.textContent):['radio','checkbox'].includes(el.type)?[...el.closest('.field')?.querySelectorAll('input')||[]].map(i=>i.closest('label')?.textContent.trim()).filter(Boolean):[];
      const range=el.type==='number'?[el.min!==''?'最小值 '+el.min:'',el.max!==''?'最大值 '+el.max:'',el.step!==''?'步长 '+el.step:''].filter(Boolean).join('；'):'';
      body=`<p>${escape(kind)} · ${el.disabled?'只读字段，不可编辑':'当前草稿或补正，可编辑'} · ${el.dataset.required==='true'||title.includes('*')?'星号必填':'按报告书要求填写'}</p>${range?`<p>数值约束：${escape(range)}</p>`:''}${choices.length?`<p>可选内容：${choices.map(escape).join(' / ')}</p>`:''}<p>字段与本项目、申创类别和材料版本关联。${el.disabled?'只允许阅读；提交材料的修订需由厅方退回补正，固定等级及推荐单位字段遵循其独立权限。':'输入自动暂存，正式提交时统一校验完整性。'}完整字段定义见PRD附录A。</p>`;
    }else if(question){
      title=question.querySelector('h3')?.textContent||'题目';code='题目 · '+(question.dataset.smQuestion||question.dataset.scPreviewItem||question.dataset.question||'');
      const choices=[...question.querySelectorAll('.option,.choice-grid label')].map(e=>e.textContent.trim()),inputs=[...question.querySelectorAll('input,textarea,select')],readonly=inputs.length>0&&inputs.every(input=>input.disabled),unscored=question.classList.contains('qb-noscore');
      body=`<p>${readonly?'只读记录，不可修改':unscored?'不计分题表 · 核验填写':'按当前题表绑定版本填写'}${question.querySelector('.sm-question-source')?' · '+escape(question.querySelector('.sm-question-source').textContent):''}</p>${choices.length?`<ul>${choices.map(c=>`<li>${escape(c)}</li>`).join('')}</ul>`:''}<p>${unscored?'本题用于记录核验内容，不生成数值成绩。':'按所示题型与配置选项、数量或数值填写；扣分需有依据。'}达标题是否必须全部达标、整表总分及门槛由题表外层设置，不能仅根据“细则”名称判断。已提交版本、原始答案和分数锁定；题库修改只影响后续发布。AI全文检索本期不开发，入口置灰。</p>`;
    }else{title=required.querySelector('p')?.textContent||'必备条件';code='必备条件核验';body='<p>默认达标，必须人工核验；不达标可提交不通过意见，不能被总分抵消。AI检索本期不开发，由专家人工查证。</p>';}
    $('guideDetail').hidden=false;$('guideDetail').innerHTML=`<article class="guide-card guide-detail-card"><small class="guide-code">${escape(code)}</small><h3>${escape(title)}</h3>${body}</article>`;$('guideScroll').scrollTop=0;
  }
  $('guideToggle').addEventListener('click',()=>toggle(!enabled));
  $('guideClose').addEventListener('click',()=>toggle(false));$('guideExit').addEventListener('click',()=>toggle(false));$('guideMarkers').addEventListener('change',draw);
  $('guideCards').addEventListener('click',e=>{const b=e.target.closest('[data-guide-locate]');if(!b)return;const entry=entries.find(x=>x.n.id===b.dataset.guideLocate),target=entry?.targets.find(visible);if(!target)return;focusTarget=target;target.scrollIntoView({block:'center',inline:'nearest',behavior:'auto'});select(entry.n.id);});
  document.addEventListener('click',e=>{
    if(!enabled||e.target.closest('#prototypeGuide,#guideToggle'))return;
    const hits=entries.map(entry=>({...entry,target:entry.targets.find(t=>t===e.target||t.contains(e.target))})).filter(e=>e.target);
    hits.sort((a,b)=>a.target.contains(b.target)?1:b.target.contains(a.target)?-1:0);
    if(hits[0]){focusTarget=hits[0].target;select(hits[0].n.id,true);}detail(e.target);schedule();
  },true);
  document.addEventListener('focusin',e=>{if(enabled&&!e.target.closest('#prototypeGuide'))detail(e.target);});
  document.addEventListener('pointerdown',e=>{if(enabled&&e.target.matches('[data-field]:disabled'))detail(e.target);},true);
  document.addEventListener('change',schedule);window.addEventListener('hashchange',schedule);window.addEventListener('resize',schedule);document.addEventListener('scroll',()=>{if(enabled)draw();},{capture:true,passive:true});
  const observer=new MutationObserver(schedule);['main','nav','identity','overlay','assistant','resourceOverlay'].forEach(id=>{if($(id))observer.observe($(id),{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});});
  let remembered=false;try{remembered=sessionStorage.getItem('v2-guide-enabled')==='true';}catch{}
  toggle(new URLSearchParams(location.search).get('explain')==='1'||remembered);
})();
