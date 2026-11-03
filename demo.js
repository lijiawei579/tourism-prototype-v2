'use strict';
(() => {
  const version=1;
  let ocrSession=null;
  const encoded=text=>btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g,(_,hex)=>String.fromCharCode(parseInt(hex,16))));
  const dataUrl=(type,text)=>`data:${type};base64,${encoded(text)}`;
  function fieldDefault(name,type){
    const values={initialComment:'申报报告书及附件目录完整，无缺项，同意提交专家资料审核。',expertDocumentComment:'已核对各章节与证明材料，资料能够支撑后续评审，请重点核验资源边界及保护措施。',documentComment:'各专家资料审核意见已汇总，材料齐全，同意进入下一环节。',hallComment:'综合专家评审意见及相关核验资料，同意通过本阶段评审。',internalRemark:'复审材料已核对，后续现场评审重点核查申报范围与设施运行情况。',fieldHallComment:'现场评审意见已汇总，相关材料齐全，同意提交上会审定。',scoreComment:'已依据本阶段评分细则完成逐项核验，请按评审意见持续完善创建工作。',avoidComment:'本项目不存在应当回避的情形。',contextNote:'已核验现有申报材料与部门参考资料，相关信息供厅方综合判定。',extensionReason:'为完成剩余创建任务及材料整理，申请适当延长现场创建期限。',objectionNote:'已按指定渠道核对实名异议受理情况。',publicityContact:'省文化和旅游厅实名异议受理渠道（以正式发布通知为准）',expertName:'李文博',expertPhone:'13800000000',expertOrg:'贵州省旅游发展研究机构',expertAccount:`demo_expert_${typeof db==='object'?db.experts.length+1:1}`,expertTitle:'高级工程师',expertDomains:'旅游资源、景区管理',ruleTitle:'新增核验项',ruleNote:'按本项要求核验材料后选择对应分档。',ruleOptions:'符合本项要求 | 1 | 1\n以上条件均不满足 | 0 | 0',measureValue:'30',mapOrigin:'景区主入口',mapDestination:'最近交通枢纽'};
    if(values[name]!==undefined)return values[name];
    if(name.startsWith('photo-desc-'))return '现场环境及设施运行情况，供本阶段评审核对。';
    if(type==='number')return '10';
    if(type==='date')return '2027-12-31';
    if(type==='tel')return '13800000000';
    if(type==='email')return 'demo@example.com';
    if(type==='url')return 'https://example.com';
    return '已根据本项目申报内容完成核对，相关说明和证明材料随项目留存。';
  }
  function formEntries(p){
    const host=document.createElement('div');host.innerHTML=D.forms[p.type].join('');
    return [...host.querySelectorAll('[data-field]')].map(el=>({el,key:el.dataset.field,label:(el.id?host.querySelector(`label[for="${el.id}"]`):null)?.textContent||el.closest('.field')?.querySelector('label')?.textContent||el.closest('label')?.textContent||'填报内容'}));
  }
  function sampleValue(p,key,label,el){
    if(/^(scenicName|scenicBriefName|resortApplyName|resortName|summerName)$/.test(key))return p.name;
    if(/Applicant|RecommendUnit|applicantUnit|ManagementOrg|Authority/i.test(key))return p.unit;
    if(/postcode/i.test(key))return '550000';
    if(/phone|fax|电话|传真/i.test(key+' '+label))return '13800000000';
    if(/website|网址/i.test(key+' '+label))return 'https://example.com';
    if(/address|地址/i.test(key+' '+label))return '贵州省黔东南州申报区域';
    if(/principal|contact|联系人|负责人/i.test(key+' '+label))return '杨雪';
    if(el.tagName==='SELECT')return [...el.options].find(option=>option.value&&!/请选择|选择类别/.test(option.textContent))?.value||el.options[0]?.value||'';
    if(el.type==='date')return '2025-01-01';
    if(el.type==='number'){
      let value=/气温|温度/.test(label)?22:/人数|容量|床位/.test(label)?1000:/比例|率|百分/.test(label)?80:100;
      if(el.min!=='')value=Math.max(Number(el.min),value);if(el.max!=='')value=Math.min(Number(el.max),value);return String(value);
    }
    if(el.type==='email')return 'demo@example.com';
    if(el.type==='url')return 'https://example.com';
    if(/level/i.test(key))return '4A级旅游景区';
    if(/city/i.test(key))return '凯里市';
    return `${label.replace(/\*/g,'').trim()}：已按申报要求整理相关情况，文字、图件及证明资料随本项目提交。`;
  }
  function sampleValues(p){
    const values={},groups=new Set();
    for(const {el,key,label} of formEntries(p)){
      if(el.type==='radio'){const group=el.dataset.group||key;values[key]=!groups.has(group);groups.add(group);}
      else if(el.type==='checkbox')values[key]=true;
      else values[key]=sampleValue(p,key,label,el);
    }
    return values;
  }
  function sampleFile(p,key,title){
    const image=key==='photos'||key.startsWith('evidence-');
    const text=image?`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520"><rect width="900" height="520" fill="#eef4fa"/><path d="M0 400L180 200 350 360 540 150 900 420V520H0Z" fill="#b4c9da"/><circle cx="720" cy="110" r="48" fill="#d5b86b"/><text x="45" y="455" fill="#193c5c" font-size="26">现场照片占位 · 原型演示</text><text x="45" y="490" fill="#475569" font-size="18">非真实现场影像，不作为评审依据</text></svg>`:`原型演示材料\n\n项目：${p.name}\n材料：${title}\n\n此文件为本地生成的模拟附件，仅供演示上传、预览、下载和删除交互。\n不代表真实申报材料、实际评审意见、会议决定或有效签章。\n`;
    const type=image?'image/svg+xml':'text/plain';
    return {name:(image?'现场照片':title.replace(/[\\/:*?"<>|]/g,'-'))+(image?'.svg':'.txt'),type,size:new Blob([text]).size,data:dataUrl(type,text),text:image?'':text,at:new Date().toISOString(),demo:true};
  }
  function initializeProject(p){
    if(p.demoDefaultsVersion===version||!D.forms[p.type])return;
    p.values??={};p.files??={};
    if(p.name==='未命名申报项目')p.name='黔东南州'+cat(p.type).name.replace(/申创$/,'申报项目');
    const defaults=sampleValues(p),entries=formEntries(p),selected=new Set(entries.filter(({el,key})=>el.type==='radio'&&p.values[key]).map(({el})=>el.dataset.group));
    for(const {el,key}of entries){
      if(el.type==='radio'&&selected.has(el.dataset.group)){p.values[key]??=false;continue;}
      if(p.values[key]===undefined||p.values[key]===null||p.values[key]==='')p.values[key]=defaults[key];
    }
    D.attachments[p.type].forEach(([title],index)=>{if(!p.files[index]?.length)p.files[index]=[sampleFile(p,'attachment-'+index,title)];});
    if(p.type==='scenic'&&!p.scenicRangeFiles?.length)p.scenicRangeFiles=[sampleFile(p,'scenicRangeFiles','申报范围说明')];
    p.demoDefaultsVersion=version;
  }
  function initializeData(data){for(const p of data.projects)initializeProject(p);}
  function defaultAnswer(q,stage){
    if(q.summer&&q.mode==='multiple'){
      const options=q.options.filter(option=>option.score>0&&!option.deduction);const score=Math.min(q.max,options.reduce((sum,option)=>sum+option.score,0));
      return {score,options:options.map(option=>option.key),label:options.map(option=>option.label).join('；'),evidence:[],note:score<q.max?'按已选择的对应细则计分，其余项目暂不计分。':'',rectification:score<q.max?'补充其余项目对应证明资料。':''};
    }
    const ranked=(q.options||[]).map((option,index)=>({option,index})).sort((left,right)=>right.option.score-left.option.score),best=ranked[0];
    const score=q.mode==='score-range'?q.max:q.integrity?5+(best?.option.score||0):best?.option.score??q.max;
    return {score,option:String(best?.index??0),integrity:q.integrity?true:undefined,label:best?.option.label||best?.option.description||`按细则计${score}分`,evidence:[],note:score<q.max?'按对应档次核验后计分。':'',rectification:score<q.max?'按该项要求补充证明资料。':''};
  }
  function fillSheet(p,stage,sh){
    if(sh.submitted||sh.demoDefaultsVersion===version||!['meeting','field'].includes(stage))return;
    for(const q of scoreQuestions(p,stage).flatMap(major=>major.questions)){
      const answer=sh.answers[q.id];
      if(answer?.score===undefined)sh.answers[q.id]={...defaultAnswer(q,stage),...answer,score:defaultAnswer(q,stage).score};
      else if(answer.score<q.max&&!answer.note)answer.note='按对应档次核验后计分，佐证需进一步完善。';
    }
    requiredFor(p,stage).forEach((_,index)=>sh.required[index]??='pass');
    sh.comment||=fieldDefault('scoreComment');sh.demoDefaultsVersion=version;
  }
  function prepare(root){
    if(!root)return;
    root.querySelectorAll('#signatureFile').forEach(input=>{if(!root.querySelector('[data-demo-signature]'))input.closest('section').insertAdjacentHTML('beforeend','<button class="btn demo-upload" data-demo-signature>使用演示签字图片</button>');});
  }
  function notice(){return '<div class="demo-notice"><strong>演示模式</strong><span>填报及待办默认值、模拟附件和OCR结果均为内置演示数据，不代表真实材料或识别结果；可修改、删除，正常校验仍生效。</span></div>';}
  async function simulateUpload(key){
    if(key==='import-experts'){
      if(state.role!=='hall')return toast('仅省厅可导入专家。');
      const text=`姓名,电话,单位,账号\n李文博,13800000000,贵州省旅游发展研究机构,demo_import_${db.experts.length+1}`;
      return importExperts({files:[{text:async()=>text}]});
    }
    const p=getProject();if(!p)return;
    if(key.startsWith('ocr'))return startOcr({dataset:{upload:key},files:[{name:key==='ocr-meeting'?'专家会议评分表.pdf':'申报报告书.pdf',size:1024,type:'application/pdf'}]});
    const title=key.startsWith('attachment-')?D.attachments[p.type][Number(key.slice(11))]?.[0]:({scenicRangeFiles:'申报范围说明',creationPlan:'创建方案',committeeFiles:'会议纪要',contextFiles:'部门参考资料',scoreSheet:'现场打分表',report:'现场验收报告'}[key]||'现场证明');
    const file=sampleFile(p,key,title),text=file.text||decodeURIComponent(escape(atob(file.data.split(',')[1])));
    const count=key==='photos'?3:1,files=Array.from({length:count},(_,index)=>new File([text],file.name.replace(/\.(svg|txt)$/,match=>(count>1?'-'+(index+1):'')+match),{type:file.type}));
    await uploadFiles({dataset:{upload:key},files,demo:true});
  }
  function ocrAllowed(p,key){return key==='ocr-application'?state.role==='city'&&p.region==='黔东南州'&&(p.stage==='draft'||!!p.correction):key==='ocr-meeting'&&state.role==='expert'&&p.stage==='meeting'&&canHandle(p)&&!sheetFor(p,p.stage).submitted;}
  async function startOcr(input){
    const p=getProject(),key=input.dataset.upload,file=input.files?.[0];if(!p||!file)return;
    if(!ocrAllowed(p,key))return toast('当前角色或环节不能进行OCR回填。');
    if(file.size>8*1024*1024)return toast('OCR演示文件请控制在8MB以内。');
    const scoring=key==='ocr-meeting',sample=scoring?null:sampleValues(p),rows=scoring?scoreQuestions(p,p.stage).flatMap(major=>major.questions).map(q=>({key:q.id,label:q.title,value:defaultAnswer(q,p.stage).score,current:sheetFor(p,p.stage).answers[q.id]?.score,question:q})):formEntries(p).map(({el,key,label})=>({key,label:label.replace(/\*/g,''),value:sample[key],current:p.values[key],choice:el.type==='radio'||el.type==='checkbox'}));
    ocrSession={project:p.id,role:state.role,expert:state.expert,stage:p.stage,key,filename:file.name,rows};
    openModal(scoring?'评分表OCR核对':'报告书OCR核对','演示识别 · 未调用真实OCR服务',`<div class="alert gray"><div><strong>已上传：${esc(file.name)}</strong><p>以下${rows.length}项为内置演示识别结果，不是对文件正文的实际提取。核对并确认后才回填，不自动提交，不替代专家签字。</p></div></div><div class="radio-group"><label><input type="radio" name="demoOcrMode" value="empty" checked>仅补齐空白项</label><label><input type="radio" name="demoOcrMode" value="replace">覆盖勾选项（保留未勾选项）</label></div><div class="demo-ocr-table table-wrap"><table><thead><tr><th>回填</th><th>字段/评分项</th><th>当前内容</th><th>演示识别结果</th></tr></thead><tbody>${rows.map((row,index)=>`<tr><td><input type="checkbox" data-ocr-choice="${index}" checked aria-label="回填${esc(row.label)}"></td><td>${esc(row.label)}</td><td>${esc(row.current===undefined||row.current===''?'未填写':row.choice?row.current?'选中':'未选中':row.current)}</td><td>${esc(row.choice?row.value?'选中':'未选中':row.value)}${scoring?' 分':''}</td></tr>`).join('')}</tbody></table></div><p class="helper">可取消勾选不需要回填的项；回填前再次校验项目、角色、阶段及评分锁定状态。</p>`,button('取消','demo-cancel-ocr')+primary('确认回填','demo-apply-ocr'),null,true);
  }
  function applyOcr(){
    const session=ocrSession,p=getProject();if(!session||p?.id!==session.project||state.role!==session.role||state.expert!==session.expert||p.stage!==session.stage||!ocrAllowed(p,session.key))return toast('项目或权限已变化，请重新上传识别。');
    const mode=document.querySelector('[name="demoOcrMode"]:checked')?.value||'empty',indices=[...document.querySelectorAll('[data-ocr-choice]:checked')].map(input=>Number(input.dataset.ocrChoice));
    if(!indices.length)return toast('请至少勾选一项回填内容。');
    const scoring=session.key==='ocr-meeting',sh=scoring?sheetFor(p,p.stage):null,selected=new Set(indices.map(index=>session.rows[index].key));let changed=0;
    for(const index of indices){const row=session.rows[index];if(scoring){if(mode==='replace'||sh.answers[row.key]?.score===undefined){sh.answers[row.key]=defaultAnswer(row.question,p.stage);changed++;}}
      else if(mode==='replace'||p.values[row.key]===undefined||p.values[row.key]===''){
        const entry=formEntries(p).find(entry=>entry.key===row.key);
        if(entry?.el.type==='radio'&&row.value){for(const peer of formEntries(p).filter(peer=>peer.el.dataset.group===entry.el.dataset.group))p.values[peer.key]=false;}
        if(entry?.el.type==='radio'&&!row.value&&formEntries(p).some(peer=>peer.el.dataset.group===entry.el.dataset.group&&sampleValues(p)[peer.key]&&selected.has(peer.key))){continue;}
        p.values[row.key]=row.value;changed++;
      }
    }
    if(!scoring){const nameKey=p.type==='scenic'?'scenicName':p.type==='resort'?'resortApplyName':'summerName';if(p.values[nameKey])p.name=p.values[nameKey];p.savedAt=new Date().toLocaleTimeString('zh-CN',{hour12:false});}
    const owner=scoring?sh:p;owner.ocrRecord={source:session.filename,at:new Date().toISOString(),changed,simulated:true};save();ocrSession=null;closeModal();const scroll=window.scrollY;render();window.scrollTo(0,scroll);toast(`OCR演示已确认，回填${changed}项；当前完整内容及未勾选项保留。`);
  }
  function simulateSignature(){
    const p=getProject();if(state.role!=='expert'||!canHandle(p)||document.getElementById('modalTitle').textContent!=='专家签字并提交')return;
    const sh=sheetFor(p,p.stage);if(sh.submitted)return;
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="520" height="180"><rect width="520" height="180" fill="white"/><path d="M40 90Q100 15 80 115T150 60Q190 25 175 120L260 60Q230 150 310 75T410 100" fill="none" stroke="#173556" stroke-width="4"/><text x="40" y="160" fill="#a16207" font-size="20">演示签字图片 · 非本人签名/有效签章</text></svg>';
    sh.signature={name:'演示签字图片.svg',data:dataUrl('image/svg+xml',svg),at:today(),method:'demo',demo:true};save();document.getElementById('signaturePreview').innerHTML=`<p class="helper">已加载演示签字图片，请确认后提交。此图片不具有真实签章效力。</p><img class="signature-preview" src="${sh.signature.data}" alt="演示签字图片">`;
  }
  document.addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.demoUpload){button.disabled=true;try{await simulateUpload(button.dataset.demoUpload);}catch{toast('模拟材料加载失败，请重试。');}finally{button.disabled=false;}}
    if(button.hasAttribute('data-demo-signature'))simulateSignature();
    if(button.dataset.action==='demo-apply-ocr')applyOcr();
    if(button.dataset.action==='demo-cancel-ocr'){ocrSession=null;closeModal();}
  });
  document.addEventListener('change',event=>{
    const input=event.target;
    const branches={initialDecision:['initialComment','请补充缺失的报告书签章页及相关证明材料后重新提交。'],expertDocumentDecision:['expertDocumentComment','现有资料对部分标准的支撑不足，请补充相关证明及说明。'],documentDecision:['documentComment','专家资料意见已汇总，请按要求补充证明材料后交回厅方处理。'],hallDecision:['hallComment','综合现有评审及核验资料，本项目尚未达到本阶段要求，本年度申报不通过。'],fieldDecision:['fieldHallComment','现场核验发现部分创建要求尚未落实，本年度现场评审不通过，申报结束并归档。'],avoidDecision:['avoidComment','本人曾参与本项目相关工作，现申请回避。']};
    const branch=branches[input.name];if(!branch||!input.checked)return;
    const target=document.querySelector(`[name="${branch[0]}"]`);if(!target)return;
    const normal=fieldDefault(branch[0]);if(target.value!==normal&&target.value!==branch[1])return;
    target.value=['supplement','fail','reject','conflict'].includes(input.value)?branch[1]:normal;
    target.dispatchEvent(new Event('input',{bubbles:true}));
  });
  window.V2_DEMO={initializeData,initializeProject,fillSheet,fieldDefault,prepare,notice,startOcr,simulateUpload};
})();
