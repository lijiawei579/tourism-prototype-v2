(() => {
  'use strict';
  const catalog = window.V2_RESOURCE_CATALOG;
  const coords = window.V2_COORDINATES;
  const copy = value => JSON.parse(JSON.stringify(value));
  const html = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const epsilon = 1e-10;
  const crs = 'CGCS2000 · EPSG:4490';
  let session = null;
  let sequence = 0;
  const selectedRows = new Map();
  const button = (label, action, primary = false, attributes = '') => `<button type="button" class="btn ${primary ? 'primary' : ''}" data-rx="${action}" ${attributes}>${label}</button>`;
  const stamp = () => new Date().toISOString();
  const readable = value => value ? new Date(value).toLocaleString('zh-CN', {hour12:false}) : '未生成';
  const newData = () => ({revision:0,started:false,draftRows:copy(catalog.defaults),draftCrs:'CGCS2000',confirmed:null,items:[],audit:[],snapshots:[]});
  const data = project => project.resourceData || newData();
  const editable = project => state.role === 'city' && project.id === getProject()?.id && project.region === '黔东南州' && (project.stage === 'draft' || !!project.correction);
  const authorized = project => project.type === 'scenic' && visibleProjects().some(row => row.id === project.id) && !(project.stage === 'draft' && !['city','hall'].includes(state.role));
  const cross = (first, second, third) => (second[0]-first[0])*(third[1]-first[1])-(second[1]-first[1])*(third[0]-first[0]);
  const equal = (first, second) => Math.abs(first[0]-second[0]) < epsilon && Math.abs(first[1]-second[1]) < epsilon;
  const onSegment = (point, start, end) => Math.abs(cross(start,end,point)) < epsilon && point[0] >= Math.min(start[0],end[0])-epsilon && point[0] <= Math.max(start[0],end[0])+epsilon && point[1] >= Math.min(start[1],end[1])-epsilon && point[1] <= Math.max(start[1],end[1])+epsilon;
  function intersects(first, second, third, fourth) {
    const values = [cross(first,second,third),cross(first,second,fourth),cross(third,fourth,first),cross(third,fourth,second)];
    return values[0]*values[1] < -epsilon*epsilon && values[2]*values[3] < -epsilon*epsilon || onSegment(third,first,second) || onSegment(fourth,first,second) || onSegment(first,third,fourth) || onSegment(second,third,fourth);
  }
  function pointInside(point, polygon) {
    let inside = false;
    for (let index=0, previous=polygon.length-1;index<polygon.length;previous=index++) {
      const start=polygon[index],end=polygon[previous];
      if (onSegment(point,start,end)) return true;
      if ((start[1]>point[1]) !== (end[1]>point[1]) && point[0] < (end[0]-start[0])*(point[1]-start[1])/(end[1]-start[1])+start[0]) inside=!inside;
    }
    return inside;
  }
  function validate(rows,sourceCrs='CGCS2000',dmsRows,format='decimal') {
    const errors = [], vertices = [], sourceRows = [];
    if(format==='dms'&&dmsRows){
      rows=rows.map((row,index)=>{
        if(!dmsRows[index]||coords.dmsEmpty(dmsRows[index])&&index>=3)return row;
        return dmsRows[index].map((value,axis)=>{const result=coords.fromDms(value,axis);if(result.error)errors.push({row:index,axis,part:result.part,message:`第${index+1}点${result.error}`});return result.error?'':String(result.value);});
      });
      if(errors.length)return {errors};
    }
    let last = rows.length-1;
    while (last>=3 && rows[last].every(value=>!String(value).trim())) last--;
    rows.slice(0,last+1).forEach((row,index) => {
      let valid=true;
      row.forEach((value,axis) => {
        const text=String(value).trim(),number=Number(text),limit=axis===0?180:90;
        if (!/^[+-]?(?:\d+(?:\.\d{0,8})?|\.\d{1,8})$/.test(text) || !Number.isFinite(number) || Math.abs(number)>limit) {
          errors.push({row:index,axis,message:`第${index+1}点${axis===0?'经度':'纬度'}须为${-limit}至${limit}的十进制度，最多8位小数。`});valid=false;
        }
      });
      if (valid) {
        const result=coords.parse(row,sourceCrs);
        if(result.error)errors.push({row:index,axis:result.axis,message:`第${index+1}点：${result.error}`});
        else {vertices.push(result.coordinates);sourceRows.push(index);}
      }
    });
    if (errors.length) return {errors};
    if (vertices.length>3 && equal(vertices[0],vertices.at(-1))) {vertices.pop();sourceRows.pop();}
    if (vertices.length<3) errors.push({row:0,message:'至少需要3个不同的完整边界点。'});
    vertices.forEach((point,index) => {
      if (vertices.slice(0,index).some(other=>equal(point,other))) errors.push({row:sourceRows[index],message:'该边界点重复，请删除重复点。'});
    });
    for (let index=0;index<vertices.length;index++) for (let other=index+1;other<vertices.length;other++) {
      if (other===index+1 || index===0 && other===vertices.length-1) continue;
      if (intersects(vertices[index],vertices[(index+1)%vertices.length],vertices[other],vertices[(other+1)%vertices.length])) errors.push({row:sourceRows[other],message:'边界线段自交，请调整边界点顺序。'});
    }
    const origin=vertices[0];
    const area=origin?vertices.reduce((sum,point,index)=>sum+cross(origin,point,vertices[(index+1)%vertices.length]),0):0;
    if (Math.abs(area)<epsilon) errors.push({row:0,message:'边界面积为零或边界点共线，无法生成范围。'});
    return {errors,vertices,geometry:{type:'Polygon',coordinates:[[...vertices,vertices[0]]]},hash:hash(vertices)};
  }
  function hash(vertices) {
    const source=JSON.stringify(vertices.map(point=>point.map(value=>Number(Number(value).toFixed(8)))));
    let result=2166136261;
    for (const character of source) {result^=character.charCodeAt(0);result=Math.imul(result,16777619);}
    return 'B-'+(result>>>0).toString(16);
  }
  function dirty(resourceData) {
    if (!resourceData.started) return false;
    const result=validate(resourceData.draftRows,resourceData.draftCrs||'CGCS2000',resourceData.draftDmsRows,resourceData.draftFormat||'dms');
    return !!result.errors.length || !resourceData.confirmed || result.hash!==resourceData.confirmed.boundaryHash;
  }
  function geometryMatch(geometry, polygon) {
    if (!geometry) return {match:false,warning:'缺少空间几何，未参与空间匹配'};
    if (geometry.type==='Point') {
      if (!Array.isArray(geometry.coordinates) || geometry.coordinates.length!==2 || !geometry.coordinates.every(Number.isFinite)) return {match:false,warning:'无效点坐标，未参与空间匹配'};
      return {match:pointInside(geometry.coordinates,polygon),partial:false};
    }
    const points=geometry.type==='LineString'?geometry.coordinates:geometry.type==='Polygon'?geometry.coordinates?.[0]:null;
    if (!Array.isArray(points) || points.length<2 || points.some(point=>!Array.isArray(point)||point.length!==2||!point.every(Number.isFinite))) return {match:false,warning:'不支持或无效的空间几何，未参与空间匹配'};
    const inside=points.map(point=>pointInside(point,polygon));
    let crossing=false;
    for (let index=0;index<points.length-1;index++) for (let edge=0;edge<polygon.length;edge++) if (intersects(points[index],points[index+1],polygon[edge],polygon[(edge+1)%polygon.length])) crossing=true;
    const contains=geometry.type==='Polygon' && polygon.some(point=>pointInside(point,points));
    return {match:inside.some(Boolean)||crossing||contains,partial:!inside.every(Boolean)};
  }
  function query(vertices, records=catalog.resources) {
    const matched=[],warnings=[],seen=new Set();
    for (const record of records) {
      if (record.authorized===false || record.active===false || seen.has(record.resourceId)) continue;
      seen.add(record.resourceId);
      const match=geometryMatch(record.geometry,vertices);
      if (match.warning) warnings.push(`${record.resourceName}：${match.warning}`);
      if (!match.match) continue;
      const type=catalog.types.find(row=>row[0]===record.mainClassCode&&row[1]===record.subClassCode&&row[3]===record.basicTypeCode);
      if (!type || type[3].includes('UNVERIFIED')) warnings.push(`${record.resourceName}：分类待核对${!type?'，未纳入主类筛选结果':''}`);
      const item=copy(record);
      item.classificationNames=[catalog.mainClasses.find(row=>row[0]===record.mainClassCode)?.[1]||'待核对',type?.[2]||'待核对',type?.[4]||'待核对'];
      item.systemWarnings=[...new Set([...(item.systemWarnings||[]),...(match.partial?['部分位于申报边界内，待核对']:[])])];
      if (type) matched.push(item);
    }
    const names=new Map();
    matched.forEach(item=>{if(names.has(item.resourceName))warnings.push(`${item.resourceName}：存在同名不同资源ID，已分别保留，请核对位置和分类`);else names.set(item.resourceName,item.resourceId);});
    return {matched,warnings};
  }
  function commit(project, change, expected=data(project).revision) {
    if (!editable(project)) {toast('当前角色或项目状态不可修改资源材料。');return false;}
    if (expected!==data(project).revision) {toast('材料已变化，请关闭后重新打开核对。');return false;}
    const before=project.resourceData;
    try {
      const disk=JSON.parse(localStorage.getItem(STORAGE)||'null');
      const stored=disk?.projects?.find(row=>row.id===project.id)?.resourceData;
      if (stored && stored.revision!==expected) {toast('其他页面已更新资源材料，请刷新并核对后重试。');return false;}
      const next=copy(data(project));
      change(next);
      next.revision=expected+1;
      project.resourceData=next;
      localStorage.setItem(STORAGE,JSON.stringify(db));
      return true;
    } catch {
      if (before) project.resourceData=before;else delete project.resourceData;
      toast('资源材料保存失败，原数据未改变。请释放浏览器空间后重试。');
      return false;
    }
  }
  function audit(resourceData,action,before,after) {
    resourceData.audit.push({at:stamp(),actor:person(),action,before:copy(before??null),after:copy(after??null),revision:resourceData.revision+1});
  }
  function typeLabel(item) {
    if(item.classificationNames?.length===3)return item.classificationNames;
    const type=catalog.types.find(row=>row[0]===item.mainClassCode&&row[1]===item.subClassCode&&row[3]===item.basicTypeCode);
    return [catalog.mainClasses.find(row=>row[0]===item.mainClassCode)?.[1]||'待核对',type?.[2]||'待核对',type?.[4]||'待核对'];
  }
  function table(items, interactive=false, selected='') {
    if (!items.length) return '<div class="rx-empty">本次申报资源清单为空，可修改边界重新查询，或补录申报资源。</div>';
    return `<div class="rx-table-scroll"><table class="rx-table"><thead><tr>${['主类','亚类','基本类','资源名称','备注'].map(label=>`<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${items.map(item=>{
      const labels=typeLabel(item);
      return `<tr ${interactive?`tabindex="0" data-rx-row="${html(item.id)}" aria-selected="${selected===item.id}"`:''}><td>${html(item.mainClassCode)} ${html(labels[0])}</td><td>${html(labels[1])}</td><td>${html(labels[2])}</td><td>${html(item.resourceName)}${item.geometry?.type==='Point'?`<small>CGCS2000 · ${item.geometry.coordinates.map(v=>Number(v).toFixed(8)).join(', ')}</small>`:''}${item.sourceType?`<small>${html(item.sourceType)}${item.editedFields?.length?' · 已修改申报副本':''}</small>`:''}</td><td>${html(item.remark)}${(item.systemWarnings||[]).map(note=>`<small class="rx-system-note">${html(note)}</small>`).join('')}</td></tr>`;
    }).join('')}</tbody></table></div>`;
  }
  function status(resourceData, readonly, draft=false) {
    return `${readonly?draft?'暂存草稿 · 尚未提交 · 只读':'已提交材料 · 只读':'本次申报草稿'} · ${resourceData.confirmed?`边界${resourceData.confirmed.vertices.length}点 · 资源${resourceData.items.length}项 · ${readable(resourceData.confirmed.queriedAt)}`:'尚未确认边界'}${dirty(resourceData)?' · 有未确认修改，清单待更新':''}`;
  }
  function coordinateMarkup(resourceData, readonly) {
    const rows=readonly?(resourceData.confirmed?.vertices||[]).map(point=>point.map(String)):resourceData.draftRows;
    return `${readonly?'<p class="rx-note">展示标准：CGCS2000（EPSG:4490）</p>':`<label class="cx-system">填报坐标标准 *<select data-rx-crs>${coords.options(resourceData.draftCrs||'CGCS2000')}</select></label><p class="rx-note">切换标准不改变已输入的数值，请按坐标来源选择。生成边界时统一转换为CGCS2000后预览与查询；其他标准为演示近似转换。</p>`}${readonly?'':`<label class="cx-system">经纬度录入方式<select data-rx-format><option value="dms" ${(resourceData.draftFormat||'dms')==='dms'?'selected':''}>度分秒（° ′ ″）</option><option value="decimal" ${resourceData.draftFormat==='decimal'?'selected':''}>十进制度（°）</option></select><small class="rx-note">度、分为整数，秒最多6位小数；分、秒均须小于60。</small></label>`}<div class="rx-coordinates">${rows.map((row,index)=>`<div class="rx-coordinate" data-rx-coordinate="${index}"><strong>点 ${index+1}</strong><label>经度<input inputmode="decimal" data-rx-axis="0" aria-label="边界点${index+1}经度" value="${html(row[0])}" ${readonly?'readonly':''}></label><label>纬度<input inputmode="decimal" data-rx-axis="1" aria-label="边界点${index+1}纬度" value="${html(row[1])}" ${readonly?'readonly':''}></label>${!readonly?button('删除','delete-point',false,`data-index="${index}" ${rows.length<=3?'disabled':''}`):'<span></span>'}<div class="rx-error" aria-live="polite"></div></div>`).join('')||'<p class="rx-empty">此材料版本未录入边界坐标。</p>'}</div>`;
  }
  function sectionMarkup(zone) {
    const project=zone._rxProject,readonly=zone.dataset.rxReadonly==='true',resourceData=zone._rxSnapshot||data(project);
    const versions=readonly&&(project.resourceData?.snapshots?.length||0)>1?`<label class="rx-list-intro">材料版本 <select class="rx-version-select" data-rx-version>${project.resourceData.snapshots.map(snapshot=>`<option value="${snapshot.materialVersion}" ${zone._rxSnapshot?.materialVersion===snapshot.materialVersion?'selected':''}>正式 V${snapshot.materialVersion} · ${html(readable(snapshot.at))}</option>`).join('')}</select></label>`:'';
    if (zone.dataset.rxZone==='boundary') return `<div class="rx-heading"><div><h3>景区旅游资源概述 · 景区边界</h3><p class="rx-note">按顺序填写经度、纬度，末点自动与首点闭合。存储标准：${crs}；支持度分秒或十进制度录入。</p></div><span class="rx-pill">01 边界 → 02 主类筛选 → 03 资源清单</span></div><div class="rx-banner rx-warning">${readonly?project.stage==='draft'?'本项目尚未正式提交，当前暂存的边界及资源仅供只读查看。':'本版本边界及资源为申报方提交的冻结副本，仅供核验。':'默认三点为演示边界，可直接生成；不代表当前项目实测范围。'}空间查询使用本地演示库，不调用AI、不自动计分。</div>${coordinateMarkup(resourceData,readonly)}<div class="rx-actions">${readonly?(resourceData.confirmed?button('查看边界地图','view-map'):''):button('添加边界点','add-point')+button('生成边界','generate',true)+(resourceData.confirmed?button('查看已确认边界','view-map')+button('放弃本次边界修改','restore-boundary',false,dirty(resourceData)?'':'disabled'):'')}</div><p class="rx-status" aria-live="polite">${html(status(resourceData,readonly,project.stage==='draft'))}</p><p class="rx-note">生成的资源清单展示在本Tab下方，与景区旅游资源概述、边界填写同页；原申报范围附件仍保留在第二个Tab。</p>`;
    const selected=selectedRows.get(project.id)||'';
    const chosen=resourceData.items.some(item=>item.id===selected);
    return `<div class="rx-heading"><div><h3>景区资源清单 <span class="rx-pill">${resourceData.items.length}项</span></h3><p class="rx-note">五列清单仅维护申报副本，不改写资源主库。</p></div>${!readonly?button('修改边界','go-boundary'):''}</div>${versions}<p class="rx-status">${html(status(resourceData,readonly,project.stage==='draft'))}</p>${dirty(resourceData)?'<div class="rx-banner rx-warning">边界有未确认修改，以下仍为上次已确认清单。请重新生成或放弃修改后提交。</div>':''}${!readonly?`<div class="rx-actions">${button('新增资源','add-resource',true)}${button('编辑所选','edit-resource',false,chosen?'':'disabled')}${button('删除所选','delete-resource',false,chosen?'':'disabled')}</div>`:''}${table(resourceData.items,!readonly,selected)}<p class="rx-note">${html(resourceData.confirmed?.classificationVersion||catalog.classificationVersion)}<br>${html(catalog.notice)}</p>${resourceData.confirmed?`<details><summary>查看查询来源及清单变更记录</summary><p class="rx-note">${html(resourceData.confirmed.sourceRevision)}<br>边界版本：${html(resourceData.confirmed.boundaryHash)} · 查询编号：${html(resourceData.confirmed.queryId)} · 清单修订：${resourceData.revision}</p>${(resourceData.confirmed.warnings||[]).map(warning=>`<p class="rx-note">${html(warning)}</p>`).join('')}${resourceData.audit.map(entry=>`<p class="rx-note">${html(readable(entry.at))} · ${html(entry.actor)} · ${html(entry.action)}</p>`).join('')}</details>`:''}`;
  }
  function redraw(zone) {
    if(!zone?.isConnected)return;
    zone.innerHTML=sectionMarkup(zone);
    if(zone.dataset.rxZone==='boundary'){
      const project=zone._rxProject,readonly=zone.dataset.rxReadonly==='true',current=zone._rxSnapshot||data(project);
      zone.querySelectorAll('[data-rx-coordinate]').forEach(row=>{
        const index=Number(row.dataset.rxCoordinate);
        coords.enhancePair(row,{inputs:[...row.querySelectorAll('[data-rx-axis]')],format:readonly?'dms':current.draftFormat||'dms',dmsValues:readonly?undefined:current.draftDmsRows?.[index],formatControl:false,readonly,onChange:meta=>{
          if(!commit(project,next=>{next.started=true;next.draftFormat=meta.format;next.draftDmsRows??=next.draftRows.map(point=>point.map(coords.toDms));next.draftDmsRows[index]=meta.dmsValues;next.draftRows[index]=meta.sourceValues;})){redraw(zone);return;}
          row.querySelector('.rx-error').textContent='';
          zone.querySelector('.rx-status').textContent=status(data(project),false);zone.querySelector('[data-rx="restore-boundary"]')?.removeAttribute('disabled');
        }});
      });
    }
    if(zone.dataset.rxReadonly!=='true')return;
    const project=zone._rxProject,snapshot=zone._rxSnapshot;
    if(zone.dataset.rxZone==='list'&&(snapshot||data(project)).confirmed)zone.querySelector('.rx-heading').insertAdjacentHTML('beforeend',button('查看本版本边界','view-map'));
  }
  function refresh(project) {document.querySelectorAll('[data-rx-zone]').forEach(zone=>{if(zone._rxProject===project&&!zone._rxSnapshot)redraw(zone);});}
  function mount(root,project,readonly) {
    if (!root || !authorized(project)) return;
    root.querySelectorAll('[data-rx-zone]').forEach(zone=>zone.remove());
    for (const kind of ['boundary','list']) {
      const selector='[data-field="scenicResourceOverview"]';
      const field=root.querySelector(selector);
      if (!field || root.querySelector(`[data-rx-zone="${kind}"]`)) continue;
      const zone=document.createElement('section');
      zone.className='rx-section';zone.dataset.rxZone=kind;zone.dataset.rxReadonly=String(readonly||!editable(project));zone._rxProject=project;zone._rxRoot=root;
      if(readonly&&project.stage!=='draft'){const snapshots=project.resourceData?.snapshots||[];zone._rxSnapshot=snapshots.find(snapshot=>snapshot.materialVersion===project.version)||snapshots.at(-1)||null;}
      const anchor=kind==='boundary'?(field.closest('.field')||field):root.querySelector('[data-rx-zone="boundary"]');
      anchor.insertAdjacentElement('afterend',zone);
      redraw(zone);
    }
  }
  function ensureOverlay() {
    let overlay=document.getElementById('resourceOverlay');
    if(!overlay){overlay=document.createElement('div');overlay.id='resourceOverlay';overlay.className='rx-overlay';overlay.hidden=true;document.body.append(overlay);}
    return overlay;
  }
  function show(title,body,footer) {
    const overlay=ensureOverlay();
    overlay.innerHTML=`<section class="rx-dialog" role="dialog" aria-modal="true" aria-labelledby="resourceDialogTitle"><header><div><h2 id="resourceDialogTitle">${html(title)}</h2><small>${html(session.project.name)} · ${crs}</small></div>${button('×','close',false,'aria-label="关闭资源弹窗"')}</header><div class="rx-dialog-body">${body}</div><footer>${footer}</footer></section>`;
    overlay.hidden=false;document.body.style.overflow='hidden';document.body.classList.add('resource-dialog-open');overlay.querySelector('button')?.focus();
  }
  function close() {
    const previous=session;
    ensureOverlay().hidden=true;session=null;document.body.classList.remove('resource-dialog-open');
    if(document.getElementById('overlay').hidden)document.body.style.overflow='';
    previous?.focus?.focus();
  }
  function validSession(requireEdit=true) {
    if(!session || state.role!==session.role || getProject()?.id!==session.project.id || !authorized(session.project) || requireEdit&&(!editable(session.project)||session.readonly)) {toast('项目或权限已变化，请重新打开。');close();return false;}
    if(requireEdit && data(session.project).revision!==session.revision){toast('资源材料已变化，请重新打开核对。');close();return false;}
    return true;
  }
  function begin(project,readonly=false) {
    session={project,role:state.role,revision:data(project).revision,readonly,focus:document.activeElement,step:'map',zoom:1,offset:[0,0]};
  }
  function mapBody() {
    return `<div class="rx-map-frame"><svg class="rx-map" role="img" aria-label="景区边界坐标地图，可缩放和平移" viewBox="0 0 900 360"></svg><div class="rx-map-tools">${button('＋','zoom-in',false,'aria-label="放大地图"')}${button('－','zoom-out',false,'aria-label="缩小地图"')}${button('复位','reset-map')}</div><div class="rx-map-legend">蓝线：输入边界 · 圆点：顶点 · 灰线：经纬网 · 拖动平移 / 滚轮缩放</div></div><p class="rx-note">离线经纬度坐标底图，图形由当前坐标实际计算。统一展示CGCS2000坐标，无道路/影像底图。${session.coordinateInput?.sourceCrs&&session.coordinateInput.sourceCrs!=='CGCS2000'?'已按所选来源进行近似转换；精确成果需测绘转换参数。':''}演示库位置非实测。</p>`;
  }
  function showMap() {
    session.step='map';
    show(session.readonly?'查看已提交边界':'确认景区边界',`${session.readonly?'':'<div class="rx-steps"><span class="active">1 确认边界</span><span>2 选择资源主类</span></div>'}<p>${session.vertices.length}个有效顶点 · 自动闭合 · 边界版本 ${html(hash(session.vertices))}</p>${mapBody()}`,session.readonly?button('关闭','close'):button('返回修改','close')+button('确认边界，查看资源','query',true));
    try{drawMap();}catch{showMapFailure();}
  }
  function showMapFailure() {
    show('边界地图加载失败','<div class="rx-banner rx-warning">无法显示当前边界，尚未确认。可重试或返回修改，原清单不受影响。</div>',button('返回修改','close')+button('重试地图','retry-map',true));
  }
  function drawMap() {
    const svg=document.querySelector('#resourceOverlay .rx-map');
    if(!svg)throw new Error('地图容器未加载');
    const points=session.vertices,minX=Math.min(...points.map(point=>point[0])),maxX=Math.max(...points.map(point=>point[0])),minY=Math.min(...points.map(point=>point[1])),maxY=Math.max(...points.map(point=>point[1]));
    const center=[(minX+maxX)/2,(minY+maxY)/2],longitudeScale=Math.max(.01,Math.cos(center[1]*Math.PI/180));
    const scale=Math.min(700/(Math.max(maxX-minX,.00001)*longitudeScale),250/Math.max(maxY-minY,.00001))*session.zoom;
    const project=point=>[450+(point[0]-center[0])*scale*longitudeScale+session.offset[0],180-(point[1]-center[1])*scale+session.offset[1]];
    const grid=[];
    for(let index=0;index<=6;index++){
      const longitude=minX+(maxX-minX)*index/6,latitude=minY+(maxY-minY)*index/6,x=project([longitude,center[1]])[0],y=project([center[0],latitude])[1];
      grid.push(`<path d="M${x},0V360 M0,${y}H900" stroke="#d8e4e5" stroke-width="1"/><text x="${x+4}" y="16" fill="#6d858c" font-size="10">${longitude.toFixed(5)}°E</text><text x="6" y="${y-4}" fill="#6d858c" font-size="10">${latitude.toFixed(5)}°N</text>`);
    }
    const plotted=points.map(project);
    svg.innerHTML=`<rect width="900" height="360" fill="#f2f7f5"/>${grid.join('')}<polygon points="${plotted.map(point=>point.join(',')).join(' ')}" fill="#4490e62b" stroke="#2874c7" stroke-width="2.5" vector-effect="non-scaling-stroke"/>${plotted.map((point,index)=>`<circle cx="${point[0]}" cy="${point[1]}" r="5" fill="#2477ce" stroke="white" stroke-width="2"/><text x="${point[0]+10}" y="${point[1]-9}" fill="#174d89" font-size="13" font-weight="bold">${index+1}</text>`).join('')}`;
    svg.onpointerdown=event=>{session.drag=[event.clientX,event.clientY,...session.offset];svg.setPointerCapture?.(event.pointerId);};
    svg.onpointermove=event=>{const drag=session?.drag;if(!drag)return;const box=svg.getBoundingClientRect(),factor=900/(box.width||900);session.offset=[drag[2]+(event.clientX-drag[0])*factor,drag[3]+(event.clientY-drag[1])*factor];drawMap();};
    svg.onpointerup=()=>{if(session)session.drag=null;};svg.onpointercancel=()=>{if(session)session.drag=null;};
    svg.onwheel=event=>{event.preventDefault();session.zoom=Math.max(.25,Math.min(16,session.zoom*(event.deltaY<0?1.2:1/1.2)));drawMap();};
  }
  async function runQuery() {
    if(!validSession())return;
    const current=session;
    current.step='loading';
    show('正在查询资源','<div class="rx-loading" role="status">正在按当前边界匹配本地演示资源库…</div>',button('取消','close'));
    await new Promise(resolve=>setTimeout(resolve,180));
    if(session!==current)return;
    if(!validSession())return;
    try {
      current.result=query(current.vertices);
      current.queryId='RQ-'+Date.now()+'-'+(++sequence);current.queriedAt=stamp();
      current.selected??=new Set(current.result.matched.map(item=>item.mainClassCode));
      current.keepRemoved??=true;
      showQuery();
    } catch {
      current.step='error';
      show('资源查询失败','<div class="rx-banner rx-warning">本次查询未完成，不代表边界内没有资源。原有清单未改变，请重试。</div>',button('取消','close')+button('重试查询','query',true));
    }
  }
  function filtered() {return session.result.matched.filter(item=>session.selected.has(item.mainClassCode));}
  function difference() {
    const old=data(session.project).items,next=filtered(),ids=new Set(next.map(item=>item.resourceId));
    const retained=old.filter(item=>item.resourceId&&ids.has(item.resourceId));
    return {added:next.length-retained.length,retained:retained.length,removed:old.filter(item=>!item.resourceId||!ids.has(item.resourceId))};
  }
  function showQuery() {
    const scroll=document.querySelector('#resourceOverlay .rx-dialog-body')?.scrollTop||0,focused=document.activeElement?.dataset.rxClass;
    session.step='query';
    const matched=session.result.matched,items=filtered(),diff=difference();
    const categories=catalog.mainClasses.map(([code,name])=>{
      const count=matched.filter(item=>item.mainClassCode===code).length;
      return `<label class="rx-category"><input type="checkbox" data-rx-class="${code}" ${session.selected.has(code)&&count?'checked':''} ${count?'':'disabled'}>${code} ${html(name)}<b>${count}</b></label>`;
    }).join('');
    show('选择资源主类',`<div class="rx-steps"><span>1 确认边界</span><span class="active">2 选择资源主类</span></div><div class="rx-banner">在库匹配 <strong>${matched.length}</strong> 项 · 当前选择 <strong>${items.length}</strong> 项。此处查询的是演示坐标范围内的样表资源，不是真实景区资源认定。</div><div class="rx-categories">${categories}</div><div class="rx-actions">${button('全选有结果类别','select-all')}${button('清空选择','clear-classes')}</div>${session.result.warnings.length?`<details open><summary>数据质量提示 ${session.result.warnings.length}项</summary>${session.result.warnings.map(note=>`<p class="rx-note">${html(note)}</p>`).join('')}</details>`:''}${matched.length?table(items):'<div class="rx-empty">当前边界内暂无可查询的在库资源。可返回核对边界，或明确生成空清单后手工补录。</div>'}<div class="rx-diff"><span>新增<strong>${diff.added}</strong>项</span><span>保留<strong>${diff.retained}</strong>项</span><span>移出候选<strong>${diff.removed.length}</strong>项</span></div>${diff.removed.length?`<div class="rx-banner"><label><input type="checkbox" data-rx-keep ${session.keepRemoved?'checked':''}> 保留 ${diff.removed.length} 项未再命中的原记录及申报补录，标记“人工保留，待核对”。取消勾选则确认后移除。</label><details><summary>查看这些记录</summary>${diff.removed.map(item=>html(item.resourceName)).join('、')}</details></div>`:''}<p class="rx-note">${html(catalog.notice)}<br>确认生成前不会覆盖原清单；仍命中的人工修改将保留。</p>`,button('取消','close')+button('返回边界预览','back-map')+button(matched.length?'生成资源清单':'生成空清单','generate-list',true,matched.length&&!items.length?'disabled':''));
    document.querySelector('#resourceOverlay .rx-dialog-body').scrollTop=scroll;
    if(focused)document.querySelector(`[data-rx-class="${focused}"]`)?.focus();
  }
  function asItem(record) {
    return {...copy(record),id:'RI-'+record.resourceId,sourceType:'在库匹配',sourceSnapshot:copy(record),editedFields:[],coordinateInput:record.geometry?.type==='Point'?{sourceCrs:'CGCS2000',sourceValues:record.geometry.coordinates.map(value=>Number(value).toFixed(8))}:undefined};
  }
  function makeList() {
    if(!validSession())return;
    const items=filtered();
    if(session.result.matched.length&&!items.length)return toast('请至少选择一个有结果的主类。');
    if(!session.result.matched.length&&!session.emptyAcknowledged){
      session.step='empty';
      show('确认生成空清单','<p>本次边界没有匹配到可用的在库资源，不代表景区没有资源。</p><p>确认后可在当前Tab的资源清单中手工补录。若已有记录，将按上一步的保留选择处理。</p>',button('返回筛选','return-query')+button('确认生成空清单','confirm-empty',true));return;
    }
    const project=session.project,current=session,previous=data(project),diff=difference();
    const oldById=new Map(previous.items.filter(item=>item.resourceId).map(item=>[item.resourceId,item]));
    const next=items.map(record=>{
      const old=oldById.get(record.resourceId);
      if(!old)return asItem(record);
      return {...copy(old),sourceType:'在库匹配',systemWarnings:[...new Set([...(record.systemWarnings||[]),...(old.systemWarnings||[]).filter(note=>note!=='人工保留，待核对')])]};
    });
    if(current.keepRemoved)diff.removed.forEach(item=>next.push({...copy(item),sourceType:'人工保留',systemWarnings:[...new Set([...(item.systemWarnings||[]),'人工保留，待核对'])]}));
    const success=commit(project,nextData=>{
      nextData.started=true;
      nextData.confirmed={vertices:copy(current.vertices),geometry:{type:'Polygon',coordinates:[[...copy(current.vertices),copy(current.vertices[0])]]},crs,boundaryHash:hash(current.vertices),confirmedAt:stamp(),confirmedBy:person(),queriedAt:current.queriedAt,queryId:current.queryId,classificationVersion:catalog.classificationVersion,sourceRevision:catalog.sourceRevision,matchedIds:current.result.matched.map(item=>item.resourceId),selectedMainClassCodes:[...current.selected],warnings:copy(current.result.warnings),emptyAcknowledged:!current.result.matched.length};
      nextData.confirmed.coordinateInput=copy(current.coordinateInput);
      nextData.confirmed.coordinateConversion={targetCrs:'EPSG:4490',approximate:current.coordinateInput.sourceCrs!=='CGCS2000',algorithmVersion:1};
      nextData.draftRows=copy(current.coordinateInput.sourceRows);
      nextData.draftCrs=current.coordinateInput.sourceCrs;
      nextData.draftFormat=current.coordinateInput.format||'dms';nextData.draftDmsRows=copy(current.coordinateInput.dmsRows||current.coordinateInput.sourceRows.map(point=>point.map(coords.toDms)));
      nextData.items=next;
      audit(nextData,'确认边界并生成资源清单',{boundaryHash:previous.confirmed?.boundaryHash,items:previous.items},{boundaryHash:hash(current.vertices),items:next});
    },current.revision);
    if(success){close();selectedRows.delete(project.id);goSection(project,'list');toast(`已生成资源清单，共${next.length}项。`);}
  }
  function goSection(project,target) {
    if(!editable(project))return;
    if(state.view!=='apply'||state.formStep!==2){state.formStep=2;history.replaceState(null,'','#apply/'+project.id+'/2');render();}
    else refresh(project);
    document.querySelector(`#applyForm [data-rx-zone="${target}"]`)?.scrollIntoView({block:'center',behavior:'smooth'});
  }
  function editor(item=null) {
    session.step='editor';session.itemId=item?.id||null;session.original=item?copy(item):null;
    session.editor=item?copy(item):{mainClassCode:'A',subClassCode:'AA',basicTypeCode:'AAA',resourceName:'新增旅游资源',remark:'',sourceType:'申报补录',systemWarnings:[]};
    showEditor();
  }
  function ensureCoordinateInput(value) {
    if(!value.coordinateInput){const point=value.geometry?.type==='Point'?value.geometry.coordinates:catalog.defaults[0];value.coordinateInput={sourceCrs:'CGCS2000',sourceValues:point.map(value=>Number(value).toFixed(8))};}
    value.coordinateInput.format??='dms';value.coordinateInput.dmsValues??=value.coordinateInput.sourceValues.map(coords.toDms);
  }
  function captureCoordinate(input) {
    if(!session?.editor||!input.dataset.rxEdit.startsWith('coordinate'))return false;
    ensureCoordinateInput(session.editor);
    const value=session.editor.coordinateInput,key=input.dataset.rxEdit;
    if(key==='coordinateCrs')value.sourceCrs=input.value;
    else value.sourceValues[key==='coordinateLng'?0:1]=input.value;
    const preview=document.querySelector('#resourceOverlay [data-coordinate-result]');
    if(preview)preview.textContent=coords.hint(coords.parseInput(value));
    return true;
  }
  function showEditor() {
    const value=session.editor;
    ensureCoordinateInput(value);
    const subclasses=[...new Map(catalog.types.filter(row=>row[0]===value.mainClassCode).map(row=>[row[1],row[2]])).entries()];
    const basic=catalog.types.filter(row=>row[0]===value.mainClassCode&&row[1]===value.subClassCode&&!row[3].includes('UNVERIFIED'));
    const old=data(session.project),included=new Set(old.items.map(item=>item.resourceId));
    const candidates=old.confirmed?query(old.confirmed.vertices).matched.filter(item=>!included.has(item.resourceId)&&!item.basicTypeCode.includes('UNVERIFIED')):[];
    show(session.itemId?'编辑资源申报副本':'新增申报资源',`<p class="rx-note">只修改本次申报；不写入资源主库。下级分类来自所附样表，不将未提供的字典伪装成完整标准。</p>${!session.itemId?`<label class="rx-list-intro">从已匹配但未纳入的在库资源选择 <select data-rx-import><option value="">手工补录本次申报资源</option>${candidates.map(item=>`<option value="${html(item.resourceId)}" ${value.resourceId===item.resourceId?'selected':''}>${html(item.resourceName)} · ${html(item.resourceId)}</option>`).join('')}</select></label>`:''}<div class="rx-editor"><label>主类 *<select data-rx-edit="mainClassCode">${catalog.mainClasses.map(([code,name])=>`<option value="${code}" ${value.mainClassCode===code?'selected':''} ${catalog.types.some(row=>row[0]===code)?'':'disabled'}>${code} ${html(name)}${catalog.types.some(row=>row[0]===code)?'':'（三级字典待接入）'}</option>`).join('')}</select></label><label>亚类 *<select data-rx-edit="subClassCode"><option value="">请选择亚类</option>${subclasses.map(([code,name])=>`<option value="${code}" ${value.subClassCode===code?'selected':''}>${code} ${html(name)}</option>`).join('')}</select></label><label>基本类 *<select data-rx-edit="basicTypeCode"><option value="">请选择基本类</option>${basic.map(row=>`<option value="${row[3]}" ${value.basicTypeCode===row[3]?'selected':''}>${row[3]} ${html(row[4])}</option>`).join('')}</select></label><label>资源名称 *<input data-rx-edit="resourceName" maxlength="120" value="${html(value.resourceName)}"></label>${coords.controls(value.coordinateInput)}<label class="rx-span">备注（选填）<textarea data-rx-edit="remark" maxlength="2000">${html(value.remark)}</textarea></label></div>${(value.systemWarnings||[]).length?`<div class="rx-banner rx-warning">系统来源提示（不可删除）：${value.systemWarnings.map(html).join('；')}</div>`:''}<div id="resourceEditorError" class="rx-inline-error" role="alert"></div><p class="rx-note">名称中的括号说明会自动分离到备注，不混在资源名称内。</p>`,button('取消','close')+button('保存资源','save-resource',true));
    const host=document.querySelector('#resourceOverlay .cx-fields');
    coords.enhancePair(host,{inputs:[host.querySelector('[data-rx-edit="coordinateLng"]'),host.querySelector('[data-rx-edit="coordinateLat"]')],format:value.coordinateInput.format,dmsValues:value.coordinateInput.dmsValues,onChange:meta=>{Object.assign(value.coordinateInput,meta);host.querySelector('[data-coordinate-result]').textContent=coords.hint(coords.parseInput(value.coordinateInput));}});
  }
  function splitName(name,remark) {
    const notes=[];
    const clean=name.replace(/[（(]([^（）()]*)[）)]/g,(_,note)=>{if(note.trim())notes.push(note.trim());return '';}).trim();
    return {resourceName:clean,remark:[remark.trim(),...notes].filter(Boolean).join('；')};
  }
  function saveItem(force=false) {
    if(!validSession())return;
    const value=session.editor,error=document.getElementById('resourceEditorError');
    const normalized=splitName(value.resourceName,value.remark);
    const coordinate=coords.parseInput(value.coordinateInput);
    if(coordinate.error){if(error)error.textContent=coordinate.error;validationError(coordinate.error,coords.focusTarget(document.querySelector(`[data-rx-edit="${coordinate.axis?'coordinateLat':'coordinateLng'}"]`),coordinate.part));return;}
    const classification=catalog.types.find(row=>row[0]===value.mainClassCode&&row[1]===value.subClassCode&&row[3]===value.basicTypeCode&&!row[3].includes('UNVERIFIED'));
    if(!classification||!normalized.resourceName||normalized.resourceName.length>120||normalized.remark.length>2000){if(error)error.textContent='请选择完整的三级分类并填写资源名称；名称最多120字，备注最多2000字。';const key=!value.subClassCode?'subClassCode':!classification?'basicTypeCode':!normalized.resourceName||normalized.resourceName.length>120?'resourceName':'remark';validationError(error.textContent,`[data-rx-edit="${key}"]`);return;}
    const previous=data(session.project),other=previous.items.filter(item=>item.id!==session.itemId);
    if(value.resourceId&&other.some(item=>item.resourceId===value.resourceId)){if(error)error.textContent='该主库资源已在清单中，不可重复添加。';validationError(error.textContent,'[data-rx-import]');return;}
    if(!force&&other.some(item=>item.resourceName===normalized.resourceName&&(value.resourceId||item.basicTypeCode===value.basicTypeCode))){
      session.step='duplicate';
      show('核对同名资源','<p>清单中存在同名且同基本类的资源，是否确认为不同资源并继续添加？</p>',button('返回编辑','return-editor')+button('确认为不同资源，继续保存','confirm-duplicate',true));return;
    }
    const classificationNames=[catalog.mainClasses.find(row=>row[0]===value.mainClassCode)[1],classification[2],classification[4]];
    const item={...copy(value),...normalized,classificationNames,id:session.itemId||'MANUAL-'+Date.now()+'-'+(++sequence),sourceType:value.resourceId?'在库匹配':'申报补录',editedFields:session.original?['mainClassCode','subClassCode','basicTypeCode','resourceName','remark'].filter(key=>session.original[key]!==({...value,...normalized})[key]):[]};
    const project=session.project;
    item.geometry={type:'Point',coordinates:coordinate.coordinates};item.crs=coordinate.crs;
    item.coordinateConversion=coordinate;
    if(session.original&&JSON.stringify(session.original.geometry)!==JSON.stringify(item.geometry))item.editedFields.push('geometry');
    if(commit(project,next=>{const index=next.items.findIndex(row=>row.id===item.id);if(index<0)next.items.push(item);else next.items[index]=item;audit(next,index<0?'新增资源':'编辑资源',session.original,item);},session.revision)){selectedRows.set(project.id,item.id);close();refresh(project);toast('资源申报副本已保存。');}
  }
  function snapshot(project,version) {
    if(project.type!=='scenic'||!project.resourceData)return true;
    if(missing(project).length){toast('景区边界有未确认修改，请重新生成清单或放弃修改。');return false;}
    return commit(project,next=>{
      const frozen={materialVersion:version,at:stamp(),revision:next.revision,confirmed:copy(next.confirmed),items:copy(next.items),audit:copy(next.audit),draftRows:copy(next.draftRows),draftCrs:next.draftCrs||'CGCS2000',draftFormat:next.draftFormat||'dms',draftDmsRows:copy(next.draftDmsRows||next.draftRows.map(point=>point.map(coords.toDms))),started:next.started};
      next.snapshots.push(frozen);
    });
  }
  function missing(project) {
    if(project.type!=='scenic'||!project.resourceData?.started)return [];
    return dirty(project.resourceData)?['景区边界与资源清单：请确认有效边界并重新生成清单，或放弃未确认的边界修改。']:[];
  }
  document.addEventListener('input',event=>{
    const input=event.target,zone=input.closest('[data-rx-zone]');
    if(input.matches('[data-rx-axis]')&&zone&&zone.dataset.rxReadonly==='false'){
      const project=zone._rxProject,index=Number(input.closest('[data-rx-coordinate]').dataset.rxCoordinate),axis=Number(input.dataset.rxAxis),value=input.value;
      if(!commit(project,next=>{next.started=true;next.draftRows[index][axis]=value;if(next.draftDmsRows)next.draftDmsRows[index]=next.draftRows[index].map(coords.toDms);})){input.value=data(project).draftRows[index][axis];return;}
      zone.querySelector('.rx-status').textContent=status(data(project),false);
      zone.querySelectorAll('.rx-error').forEach(error=>error.textContent='');
      zone.querySelector('[data-rx="restore-boundary"]')?.removeAttribute('disabled');
    }
    if(input.matches('[data-rx-edit]')&&session&&!captureCoordinate(input))session.editor[input.dataset.rxEdit]=input.value;
  });
  document.addEventListener('change',event=>{
    const input=event.target;
    if(input.matches('[data-rx-format]')){
      const zone=input.closest('[data-rx-zone]'),project=zone._rxProject,current=data(project);
      for(let index=0;index<current.draftRows.length;index++){
        if(current.draftRows[index].every(value=>!String(value).trim())&&(!current.draftDmsRows?.[index]||coords.dmsEmpty(current.draftDmsRows[index])))continue;
        const result=coords.parseInput({sourceCrs:'CGCS2000',sourceValues:current.draftRows[index],format:current.draftFormat||'dms',dmsValues:current.draftDmsRows?.[index]});
        if(result.error){input.value=current.draftFormat||'dms';validationError(result.error,coords.focusTarget(zone.querySelector(`[data-rx-coordinate="${index}"] [data-rx-axis="${result.axis}"]`),result.part));return;}
      }
      if(commit(project,next=>{next.draftFormat=input.value;if(input.value==='dms')next.draftDmsRows=next.draftRows.map(point=>point.map(coords.toDms));}))redraw(zone);
      else input.value=current.draftFormat||'dms';return;
    }
    if(input.matches('[data-rx-crs]')){
      const zone=input.closest('[data-rx-zone]'),project=zone?._rxProject;
      if(!project||!commit(project,next=>{next.draftCrs=input.value;next.started=true;})){if(project)input.value=data(project).draftCrs||'CGCS2000';return;}
      redraw(zone);return;
    }
    if(input.matches('[data-rx-version]')){
      const zone=input.closest('[data-rx-zone]'),version=Number(input.value);
      const snapshot=zone._rxProject.resourceData.snapshots.find(snapshot=>snapshot.materialVersion===version);
      zone._rxRoot.querySelectorAll('[data-rx-zone]').forEach(other=>{if(other._rxProject===zone._rxProject){other._rxSnapshot=snapshot;redraw(other);}});return;
    }
    if(input.matches('[data-rx-class]')&&session&&validSession()){
      if(input.checked)session.selected.add(input.dataset.rxClass);else session.selected.delete(input.dataset.rxClass);
      showQuery();
    }
    if(input.matches('[data-rx-keep]')&&session)session.keepRemoved=input.checked;
    if(input.matches('[data-rx-edit]')&&session){
      if(captureCoordinate(input))return;
      session.editor[input.dataset.rxEdit]=input.value;
      if(input.dataset.rxEdit==='mainClassCode'){session.editor.subClassCode='';session.editor.basicTypeCode='';showEditor();}
      if(input.dataset.rxEdit==='subClassCode'){session.editor.basicTypeCode='';showEditor();}
    }
    if(input.matches('[data-rx-import]')&&session){
      const record=catalog.resources.find(row=>row.resourceId===input.value);
      session.editor=record?asItem(record):{mainClassCode:'A',subClassCode:'AA',basicTypeCode:'AAA',resourceName:'新增旅游资源',remark:'',sourceType:'申报补录',systemWarnings:[]};showEditor();
    }
    if(input.id==='role'&&session)close();
  });
  document.addEventListener('click',event=>{
    const row=event.target.closest?.('[data-rx-row]');
    if(row){const zone=row.closest('[data-rx-zone]');if(zone&&zone.dataset.rxReadonly==='false'){selectedRows.set(zone._rxProject.id,row.dataset.rxRow);zone.querySelectorAll('[data-rx-row]').forEach(other=>other.setAttribute('aria-selected',String(other===row)));zone.querySelector('[data-rx="edit-resource"]').disabled=false;zone.querySelector('[data-rx="delete-resource"]').disabled=false;}return;}
    const target=event.target.closest('[data-rx]');
    if(!target||target.disabled)return;
    event.preventDefault();
    const action=target.dataset.rx,zone=target.closest('[data-rx-zone]');
    if(action==='close'){close();return;}
    if(zone){
      const project=zone._rxProject,readonly=zone.dataset.rxReadonly==='true';
      if(!authorized(project))return;
      if(action==='view-map'){
        const confirmed=(zone._rxSnapshot||data(project)).confirmed;
        if(!confirmed)return;
        begin(project,true);session.vertices=copy(confirmed.vertices);session.coordinateInput=copy(confirmed.coordinateInput||{sourceCrs:'CGCS2000',sourceRows:confirmed.vertices});showMap();return;
      }
      if(readonly||!editable(project))return toast('此材料只能查看。');
      if(action==='go-boundary'){goSection(project,'boundary');return;}
      if(action==='add-point'){if(commit(project,next=>{next.draftRows.push(['','']);next.draftDmsRows?.push(['',''].map(coords.toDms));}))redraw(zone);return;}
      if(action==='delete-point'){
        if(data(project).draftRows.length<=3)return;
        if(commit(project,next=>{next.draftRows.splice(Number(target.dataset.index),1);next.draftDmsRows?.splice(Number(target.dataset.index),1);next.started=true;}))redraw(zone);return;
      }
      if(action==='restore-boundary'){
        if(!data(project).confirmed)return;
        if(commit(project,next=>{next.draftRows=copy(next.confirmed.coordinateInput?.sourceRows||next.confirmed.vertices.map(point=>point.map(String)));next.draftCrs=next.confirmed.coordinateInput?.sourceCrs||'CGCS2000';next.draftFormat=next.confirmed.coordinateInput?.format||'dms';next.draftDmsRows=copy(next.confirmed.coordinateInput?.dmsRows||next.draftRows.map(point=>point.map(coords.toDms)));audit(next,'放弃未确认边界修改',null,next.confirmed.boundaryHash);})){redraw(zone);toast('已恢复上次确认边界，清单未改变。');}return;
      }
      if(action==='generate'){
        const result=validate(data(project).draftRows,data(project).draftCrs||'CGCS2000',data(project).draftDmsRows,data(project).draftFormat||'dms');
        zone.querySelectorAll('.rx-error').forEach(error=>error.textContent='');
        if(result.errors.length){result.errors.forEach(error=>{const host=zone.querySelector(`[data-rx-coordinate="${error.row}"] .rx-error`);if(host)host.textContent=error.message;});coords.focusTarget(zone.querySelector(`[data-rx-coordinate="${result.errors[0].row}"] [data-rx-axis="${result.errors[0].axis||0}"]`),result.errors[0].part)?.focus();return;}
        begin(project);session.vertices=result.vertices;session.coordinateInput={sourceCrs:data(project).draftCrs||'CGCS2000',sourceRows:copy(data(project).draftRows),format:data(project).draftFormat||'dms',dmsRows:copy(data(project).draftDmsRows||data(project).draftRows.map(point=>point.map(coords.toDms)))};showMap();return;
      }
      if(['add-resource','edit-resource','delete-resource'].includes(action)){
        const selected=data(project).items.find(item=>item.id===selectedRows.get(project.id));
        if(action!=='add-resource'&&!selected)return;
        begin(project);
        if(action==='delete-resource'){session.itemId=selected.id;session.step='delete';show('删除申报资源',`<p>确定从本次申报清单移除“${html(selected.resourceName)}”？不会删除主库资源。</p>${data(project).items.length===1?'<div class="rx-banner rx-warning">删除后本次申报资源清单将为空。</div>':''}`,button('取消','close')+button('确认删除','confirm-delete',true));}else editor(action==='edit-resource'?selected:null);
        return;
      }
    }
    if(!session)return;
    if(['zoom-in','zoom-out','reset-map','retry-map'].includes(action)){
      if(!validSession(!session.readonly))return;
      if(action==='reset-map'){session.zoom=1;session.offset=[0,0];}
      if(action==='zoom-in')session.zoom=Math.min(16,session.zoom*1.4);
      if(action==='zoom-out')session.zoom=Math.max(.25,session.zoom/1.4);
      if(action==='retry-map')showMap();else drawMap();return;
    }
    if(!validSession())return;
    if(action==='query')runQuery();
    if(action==='back-map')showMap();
    if(action==='select-all'){session.selected=new Set(session.result.matched.map(item=>item.mainClassCode));showQuery();}
    if(action==='clear-classes'){session.selected.clear();showQuery();}
    if(action==='generate-list')makeList();
    if(action==='return-query')showQuery();
    if(action==='confirm-empty'){session.emptyAcknowledged=true;makeList();}
    if(action==='save-resource')saveItem();
    if(action==='confirm-duplicate')saveItem(true);
    if(action==='return-editor')showEditor();
    if(action==='confirm-delete'){
      const project=session.project,item=data(project).items.find(record=>record.id===session.itemId);
      if(commit(project,next=>{next.items=next.items.filter(record=>record.id!==session.itemId);audit(next,'删除资源',item,null);},session.revision)){selectedRows.delete(project.id);close();refresh(project);toast('已从申报清单移除，资源主库未变。');}
    }
  });
  document.addEventListener('keydown',event=>{
    const row=event.target.closest?.('[data-rx-row]');
    if(row&&['Enter',' '].includes(event.key)){event.preventDefault();row.click();}
    if(!session||ensureOverlay().hidden)return;
    if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();}
    if(event.key==='Tab'){
      const controls=[...ensureOverlay().querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')];
      if(event.shiftKey&&document.activeElement===controls[0]){controls.at(-1)?.focus();event.preventDefault();}
      if(!event.shiftKey&&document.activeElement===controls.at(-1)){controls[0]?.focus();event.preventDefault();}
    }
  },true);
  window.addEventListener('hashchange',()=>{if(session)close();});
  ensureOverlay();
  window.V2_RESOURCES={mount,validate,query,geometryMatch,pointInside,hash,dirty,missing,snapshot,splitName,commit};
})();
