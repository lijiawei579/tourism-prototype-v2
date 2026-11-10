(() => {
  'use strict';
  const systems = {
    CGCS2000: 'CGCS2000（2000国家大地坐标系）· EPSG:4490',
    WGS84: 'WGS84（GPS经纬度）· EPSG:4326',
    'GCJ-02': 'GCJ-02（高德 / 腾讯地图）',
    'BD-09': 'BD-09（百度地图）'
  };
  const pi = Math.PI, a = 6378245, ee = 0.006693421622965943;
  const round = value => Number(value.toFixed(8));
  const outside = ([lng, lat]) => lng < 72.004 || lng > 137.8347 || lat < .8293 || lat > 55.8271;
  function offset(lng, lat) {
    const x=lng-105,y=lat-35;
    let dy=-100+2*x+3*y+.2*y*y+.1*x*y+.2*Math.sqrt(Math.abs(x));
    dy+=(20*Math.sin(6*x*pi)+20*Math.sin(2*x*pi))*2/3;
    dy+=(20*Math.sin(y*pi)+40*Math.sin(y/3*pi))*2/3;
    dy+=(160*Math.sin(y/12*pi)+320*Math.sin(y*pi/30))*2/3;
    let dx=300+x+2*y+.1*x*x+.1*x*y+.1*Math.sqrt(Math.abs(x));
    dx+=(20*Math.sin(6*x*pi)+20*Math.sin(2*x*pi))*2/3;
    dx+=(20*Math.sin(x*pi)+40*Math.sin(x/3*pi))*2/3;
    dx+=(150*Math.sin(x/12*pi)+300*Math.sin(x/30*pi))*2/3;
    const rad=lat*pi/180,magic=1-ee*Math.sin(rad)**2,sqrt=Math.sqrt(magic);
    return [dx*180/(a/sqrt*Math.cos(rad)*pi),dy*180/(a*(1-ee)/(magic*sqrt)*pi)];
  }
  function toGcj(point) {
    if(outside(point))return [...point];
    const d=offset(...point);return [point[0]+d[0],point[1]+d[1]];
  }
  function fromGcj(point) {
    if(outside(point))return [...point];
    let result=[...point];
    for(let i=0;i<12;i++){
      const projected=toGcj(result),delta=[projected[0]-point[0],projected[1]-point[1]];
      result=[result[0]-delta[0],result[1]-delta[1]];
      if(Math.max(...delta.map(Math.abs))<1e-10)break;
    }
    return result;
  }
  function fromBaidu([lng,lat]) {
    const x=lng-.0065,y=lat-.006,z=Math.sqrt(x*x+y*y)-.00002*Math.sin(y*pi*3000/180),theta=Math.atan2(y,x)-.000003*Math.cos(x*pi*3000/180);
    return [z*Math.cos(theta),z*Math.sin(theta)];
  }
  function toBaidu([lng,lat]) {
    const z=Math.sqrt(lng*lng+lat*lat)+.00002*Math.sin(lat*pi*3000/180),theta=Math.atan2(lat,lng)+.000003*Math.cos(lng*pi*3000/180);
    return [z*Math.cos(theta)+.0065,z*Math.sin(theta)+.006];
  }
  function parse(values, sourceCrs='CGCS2000') {
    if(!Array.isArray(values)||values.length!==2)return {error:'请分别填写一个经度和一个纬度。',axis:0};
    if(!Object.hasOwn(systems,sourceCrs))return {error:'请选择支持的坐标标准。',axis:0};
    for(let axis=0;axis<2;axis++){
      const text=String(values[axis]??'').trim(),limit=axis?90:180;
      if(!/^[+-]?(?:\d+(?:\.\d{0,8})?|\.\d{1,8})$/.test(text)||!Number.isFinite(Number(text))||Math.abs(Number(text))>limit)
        return {error:`${axis?'纬度':'经度'}须为${-limit}至${limit}的十进制度，最多8位小数。`,axis};
    }
    const point=values.map(value=>Number(String(value).trim()));
    // No epoch or surveyed transformation parameters are available in the prototype.
    // WGS84 is approximated in the CGCS2000 frame; never claim survey precision.
    const canonical=sourceCrs==='BD-09'?fromGcj(fromBaidu(point)):sourceCrs==='GCJ-02'?fromGcj(point):point;
    if(canonical.some((v,i)=>!Number.isFinite(v)||Math.abs(v)>(i?90:180)))return {error:'转换后坐标超出有效范围，请核对坐标标准和数值。',axis:0};
    return {coordinates:canonical.map(round),crs:'EPSG:4490',sourceCrs,sourceValues:values.map(String),method:sourceCrs==='CGCS2000'?'identity':sourceCrs==='WGS84'?'wgs84-frame-approximation':'map-offset-inverse-and-frame-approximation',approximate:sourceCrs!=='CGCS2000',algorithmVersion:1};
  }
  const options = selected => Object.entries(systems).map(([key,label])=>`<option value="${key}" ${key===selected?'selected':''}>${label}</option>`).join('');
  function hint(result) {
    if(result.error)return result.error;
    return `保存为 CGCS2000（EPSG:4490）：经度 ${result.coordinates[0].toFixed(8)}°，纬度 ${result.coordinates[1].toFixed(8)}°。${result.approximate?'近似转换，用于原型演示；精确成果需测绘转换参数。':''}`;
  }
  const clone=value=>JSON.parse(JSON.stringify(value));
  function toDms(value,axis=0) {
    if(!String(value??'').trim()||!Number.isFinite(Number(value)))return {direction:axis?'N':'E',degree:'',minute:'',second:''};
    const number=Number(value),total=Math.round(Math.abs(number)*3600*1e6),degree=Math.floor(total/3600000000),remainder=total-degree*3600000000,minute=Math.floor(remainder/60000000),second=(remainder-minute*60000000)/1e6;
    return {direction:axis?(number<0?'S':'N'):(number<0?'W':'E'),degree:String(degree),minute:String(minute),second:String(second)};
  }
  function fromDms(value,axis=0) {
    const title=axis?'纬度':'经度',limit=axis?90:180,fail=(message,part)=>({error:`${title}${message}`,axis,part});
    if(!value||!(axis?['N','S']:['E','W']).includes(value.direction))return fail('请选择正确的方向。','direction');
    for(const part of ['degree','minute','second']){
      const text=String(value[part]??'').trim(),valid=part==='second'?/^\d+(?:\.\d{1,6})?$/.test(text):/^\d+$/.test(text);
      if(!valid)return fail(`${{degree:'度',minute:'分',second:'秒'}[part]}${part==='second'?'须为非负数字，最多6位小数。':'须为非负整数。'}`,part);
    }
    const degree=Number(value.degree),minute=Number(value.minute),second=Number(value.second);
    if(degree>limit)return fail(`度须为0至${limit}。`,'degree');
    if(minute>=60)return fail('分须小于60。','minute');
    if(second>=60)return fail('秒须小于60。','second');
    if(degree===limit&&(minute||second))return fail(`达到${limit}度时分、秒必须为0。`,minute?'minute':'second');
    const sign=['W','S'].includes(value.direction)?-1:1;
    return {value:round(sign*(degree+minute/60+second/3600))};
  }
  const dmsEmpty=rows=>rows.every(row=>['degree','minute','second'].every(part=>!String(row[part]??'').trim()));
  function parseInput(input) {
    if(input.format==='dms'&&input.dmsValues){
      const values=[];
      for(let axis=0;axis<2;axis++){const result=fromDms(input.dmsValues[axis],axis);if(result.error)return result;values.push(String(result.value));}
      return parse(values,input.sourceCrs||'CGCS2000');
    }
    return parse(input.sourceValues,input.sourceCrs||'CGCS2000');
  }
  function enhancePair(host,{inputs,format='dms',dmsValues,onChange,formatControl=true,readonly=false}) {
    if(!inputs.every(Boolean)||inputs[0].dataset.cxMounted)return;
    let mode=format,rows=clone(dmsValues||inputs.map((el,axis)=>toDms(el.value,axis)));
    const boxes=inputs.map((input,axis)=>{
      input.dataset.cxMounted='true';
      input.dataset.cxErrorPart=fromDms(rows[axis],axis).part||'';
      const box=document.createElement('div');box.className='cx-angle';box.dataset.cxAxis=axis;
      box.innerHTML=`<select data-cx-part="direction" aria-label="${axis?'纬度方向':'经度方向'}">${(axis?[['N','北纬'],['S','南纬']]:[['E','东经'],['W','西经']]).map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select>${['degree','minute','second'].map((part,index)=>`<span class="cx-unit"><input data-cx-part="${part}" inputmode="${part==='second'?'decimal':'numeric'}" aria-label="${axis?'纬度':'经度'}${['度','分','秒'][index]}" placeholder="${part==='degree'?(axis?'27':'106'):'0'}"><span>${['°','′','″'][index]}</span></span>`).join('')}`;
      input.insertAdjacentElement('afterend',box);
      box.querySelectorAll('[data-cx-part]').forEach(el=>{el.value=rows[axis][el.dataset.cxPart];el.disabled=readonly;});
      const capture=event=>{
        const control=event.target;if(!control.matches('[data-cx-part]')||readonly)return;
        rows[axis][control.dataset.cxPart]=control.value;
        const results=rows.map(fromDms);inputs.forEach((el,i)=>{el.value=results[i].error?'':String(results[i].value);el.dataset.cxErrorPart=results[i].part||'';});
        onChange?.({format:mode,dmsValues:clone(rows),sourceValues:inputs.map(el=>el.value)});
      };
      box.addEventListener('input',capture);box.addEventListener('change',capture);
      return box;
    });
    function display(){inputs.forEach((el,i)=>{el.hidden=mode==='dms';el.dataset.cxFormat=mode;boxes[i].hidden=mode!=='dms';});}
    display();
    if(formatControl){
      const label=document.createElement('label');label.className='cx-system cx-format';label.innerHTML='<span>经纬度录入方式</span><select data-cx-format><option value="dms">度分秒（° ′ ″）</option><option value="decimal">十进制度（°）</option></select><small class="rx-note">度、分为整数，秒支持小数；分、秒均须小于60。坐标标准与录入方式独立选择。</small>';
      const standard=host.querySelector('[data-rx-edit="coordinateCrs"],[data-coordinate-crs]')?.closest('label');if(standard)standard.insertAdjacentElement('afterend',label);else host.prepend(label);const select=label.querySelector('select');select.value=mode;select.disabled=readonly;
      select.addEventListener('change',()=>{
        const valid=mode==='dms'?(dmsEmpty(rows)?{coordinates:['','']}:parseInput({format:mode,dmsValues:rows,sourceCrs:'CGCS2000'})):inputs.every(el=>!el.value.trim())?{coordinates:['','']}:parse(inputs.map(el=>el.value),'CGCS2000');
        if(valid.error){select.value=mode;const target=boxes[valid.axis].querySelector(`[data-cx-part="${valid.part||'degree'}"]`);if(typeof validationError==='function')validationError(valid.error,mode==='dms'?target:inputs[valid.axis]);return;}
        mode=select.value;
        if(mode==='dms'){rows=inputs.map((el,axis)=>toDms(el.value,axis));boxes.forEach((box,axis)=>box.querySelectorAll('[data-cx-part]').forEach(el=>el.value=rows[axis][el.dataset.cxPart]));}
        display();onChange?.({format:mode,dmsValues:clone(rows),sourceValues:inputs.map(el=>el.value)});
      });
    }
  }
  function focusTarget(element,part) {
    if(!element?.hidden||element.dataset.cxFormat!=='dms')return element;
    return element.nextElementSibling?.querySelector(`[data-cx-part="${part||element.dataset.cxErrorPart||'degree'}"]`)||element;
  }
  function controls(input, prefix='data-rx-edit') {
    const crs=input.sourceCrs||'CGCS2000',values=input.sourceValues||['',''];
    const escape=val=>String(val??'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
    return `<section class="cx-fields rx-span"><label>填报坐标标准 *<select ${prefix}="coordinateCrs">${options(crs)}</select></label><div class="cx-pair"><label>经度（°）*<input ${prefix}="coordinateLng" inputmode="decimal" aria-label="资源经度" placeholder="例如 106.21000000" value="${escape(values[0])}"></label><label>纬度（°）*<input ${prefix}="coordinateLat" inputmode="decimal" aria-label="资源纬度" placeholder="例如 27.49000000" value="${escape(values[1])}"></label></div><p class="rx-note">支持度分秒或十进制度。选择原始坐标标准后填写，系统统一转换为CGCS2000保存，并保留原始坐标。</p><p class="cx-result" data-coordinate-result aria-live="polite">${hint(parseInput(input))}</p></section>`;
  }
  function formInput(project) {
    return project.coordinateData?.input||{sourceCrs:'CGCS2000',sourceValues:[project.values.longitude??'',project.values.latitude??'']};
  }
  function mount(root,project,readonly) {
    const lng=root?.querySelector('[data-field="longitude"]'),lat=root?.querySelector('[data-field="latitude"]');if(!lng||!lat)return;
    const host=lng.closest('.form-grid');if(!host||host.querySelector('[data-coordinate-crs]'))return;
    const input=formInput(project),result=parseInput(input);
    const group=document.createElement('label');group.className='field cx-system';group.innerHTML=`<span>填报坐标标准 *</span><select data-coordinate-crs ${readonly?'disabled':''}>${options(readonly?'CGCS2000':input.sourceCrs)}</select>`;host.prepend(group);
    if(!readonly){lng.value=input.sourceValues[0];lat.value=input.sourceValues[1];}
    for(const control of [lng,lat]){control.inputMode='decimal';control.placeholder=control===lng?'例如 106.21000000':'例如 27.49000000';}
    const note=document.createElement('p');note.className='cx-result';note.dataset.coordinateResult='';note.textContent=readonly?'坐标统一以CGCS2000（EPSG:4490）展示。':hint(result);host.append(note);
    group.querySelector('select').addEventListener('change',()=>capture(project,lng,group.querySelector('select').value));
    enhancePair(host,{inputs:[lng,lat],format:readonly?'dms':input.format||'dms',dmsValues:readonly?undefined:input.dmsValues,readonly,onChange:meta=>capture(project,lng,undefined,meta)});
  }
  function capture(project,element,crs,meta) {
    const root=element.closest('#applyForm'),input=JSON.parse(JSON.stringify(formInput(project)));
    if(!root||state.role!=='city'||!(project.stage==='draft'||project.correction))return;
    input.sourceCrs=crs||root.querySelector('[data-coordinate-crs]')?.value||input.sourceCrs;
    if(meta)Object.assign(input,meta);
    input.sourceValues=[root.querySelector('[data-field="longitude"]').value,root.querySelector('[data-field="latitude"]').value];
    const result=parseInput(input);project.coordinateData={input,normalized:result.error?null:result};
    [project.values.longitude,project.values.latitude]=result.coordinates||['',''];
    root.querySelector('[data-coordinate-result]').textContent=hint(result);
    project.savedAt=new Date().toLocaleTimeString('zh-CN',{hour12:false});save();
    const status=document.getElementById('savedStatus');if(status)status.textContent='已暂存 '+project.savedAt;
  }
  function issues(project) {
    const input=formInput(project);if(input.format==='dms'&&input.dmsValues?dmsEmpty(input.dmsValues):input.sourceValues.every(v=>!String(v).trim()))return [];
    const result=parseInput(input);return result.error?[{key:result.axis?'latitude':'longitude',message:result.error}]:[];
  }
  window.V2_COORDINATES={systems,parse,parseInput,options,hint,controls,mount,capture,issues,toGcj,toBaidu,toDms,fromDms,dmsEmpty,enhancePair,focusTarget};
})();
