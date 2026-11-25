'use strict';

const legacyScenicType='scenic-2003';
const brandReportSections=['基本信息','第一部分','第二部分','第三部分','附件'];
const brandField=(key,label,type='text',options={})=>({key,label,type,...options});
const brandNumber=(key,label,options={})=>brandField(key,label,'number',options);
const brandNarrative=(key,label)=>brandField(key,label,'textarea',{wide:true});
const brandChoices=(key,label,choices,type='checkbox')=>brandField(key,label,type,{choices,wide:true});
const brandGroup=(title,...fields)=>({title,fields});
const brandTable=(key,label,columns,options={})=>({key,label,columns,...options});
const brandRange=title=>brandGroup(title,brandField('longitude','经度'),brandField('latitude','纬度'),{inlineAttachment:true});
const brandBasic=(key,label,unit,recommend,level)=>[brandGroup('基本信息',
  brandField(key,label,'text',{required:true}),brandField(unit,'申请单位','text',{required:true}),
  brandField(recommend,'推荐单位','text',{required:true}),{...level,required:true})];
const brandLevels=[['national','国家级'],['provincial','省级']];
const brandCommonAttachments={
  safety:'近3年未发生重大环保事故、旅游安全责任事故和重大负面舆情承诺书',
  land:'县级以上自然资源部门关于总体规划符合国土空间规划的证明',
  planning:'地市级以上人民政府批复的总体规划相关材料',
  operator:'地市级以上人民政府相关职能部门关于统一独立有效运营管理机构的证明材料',
  geology:'县级以上人民政府相关职能部门关于选址无多发性不可规避的自然灾害的证明材料',
  property:'县级以上人民政府相关职能部门关于用于产权出售的房地产项目比例符合要求的证明材料',
  local:'当地文化和旅游行政部门审核意见',
  recommendation:'市级文化和旅游行政部门推荐文件',
  initial:'市级文化和旅游行政部门初审情况'
};
const brandEnvironmentProof=label=>'县级以上人民政府相关职能部门关于'+label+'环境质量符合相关国家标准的证明材料';
const ba=brandCommonAttachments;

const legacyScenicReport={
  nameKey:'legacyScenicName',unitKey:'legacyApplicant',
  parts:[
    brandBasic('legacyScenicName','旅游景区名称','legacyApplicant','legacyRecommendUnit',
      brandField('legacyGrade','申请等级','select',{choices:[['5A','AAAAA级'],['4A','AAAA级'],['3A','AAA级'],['2A','AA级'],['1A','A级']],sample:'4A'})),
    [brandGroup('旅游景区简况',
      {mirror:'legacyScenicName',label:'旅游景区名称'},brandField('legacyAuthority','主管部门'),
      brandChoices('legacyNature','性质',['风景区','文博院馆','寺庙观堂','旅游度假区','自然保护区','主题公园','森林公园','地质公园','游乐园','动植物园','工农业旅游','科教文化','其他']),
      brandField('legacyAddress','通讯地址'),brandField('legacyPostcode','邮编','text',{attrs:'inputmode="numeric" pattern="[0-9]{6}"'}),
      brandField('legacyPhone','电话','tel'),brandField('legacyFax','传真','tel'),brandField('legacyWebsite','网址','url'),
      brandField('legacyPrincipal','负责人'),brandField('legacyPrincipalPhone','负责人电话','tel'))],
    [brandGroup('景区基本数据',brandField('legacyExtent','申报详细范围与面积','text',{sample:'296000 平方米'}),
      brandField('legacyCity','依托城市（镇）名称'),brandNumber('legacyCapacity','日接待最大容量')),
    brandRange('景区范围'),
    brandGroup('景区工作人员情况',...['工作人员数量','管理人员数量','导游（讲解）人员','高级导游（讲解员）人员','保安人员','环卫人员'].map((label,i)=>brandNumber('legacyStaff'+i,label+'（人）',{integer:true}))),
    brandGroup('景区上年经营情况',...['接待游客人数（人）','入境游客数（人）','门票价格（元）','营业收入（元）','利润总额（元）','上缴税费（元）'].map((label,i)=>brandNumber('legacyOperation'+i,label,{min:i===4?null:0}))),
    brandGroup('景区投入情况',brandNumber('legacyInvestment','累计投入（元）'),brandNumber('legacyAnnualInvestment','年均投入（元）')),
    brandGroup('开业时间',brandField('legacyOpenDate','景区开业时间','date'))],
    [brandGroup('旅游资源概述（旅游资源类型种类、特色、数量、品位、组合关系、保护措施等）',brandNarrative('legacyResourceTypes','资源类型多样'),brandNarrative('legacyResourceFeatures','旅游资源特色鲜明')),
    brandGroup('发展概况（行政归属单位、经营管理单位、开业时间、发展过程、累计投入、近三年经营情况等）',brandNarrative('legacyManagement','行政归属单位、经营管理单位'),brandNarrative('legacyPlanning','景区规划'),brandNarrative('legacyProgress','项目建设进度')),
    brandGroup('旅游活动项目（常设和专项旅游活动项目的名称、内容、活动方式、项目建设单位等）',brandNarrative('legacyActivities','旅游活动项目详情'))]
  ],
  attachments:['旅游景区质量等级申创申请书','旅游景区总体规划','自评报告及相关说明材料',ba.safety,
    '旅游景区总览图','旅游景区空间边界相关数据','旅游活动项目列表及分布图',ba.land,
    '无严重违法违规行为记录承诺书',ba.planning,ba.operator,ba.geology,brandEnvironmentProof('景区'),ba.property,
    ba.local,'旅游景区质量等级申创申请（由申报单位填写）',ba.recommendation,ba.initial,'旅游景区质量等级申创初审情况统计表','补充材料说明'],
  optionalAttachments:[10,19]
};

const leisureReport={
  nameKey:'leisureName',unitKey:'leisureApplicant',
  parts:[
    brandBasic('leisureName','旅游休闲街区名称','leisureApplicant','leisureRecommendUnit',
      brandField('leisureGrade','申请级别','radio',{choices:brandLevels,sample:'provincial'})),
    [brandGroup('街区基本情况',
      brandChoices('leisureLocationFlags','地理位置',['历史文化保护区','中心城区','中心镇区']),
      brandField('leisureOperator','运营管理机构'),brandChoices('leisureOrg','机构类型',['政府机构','事业单位','企业','其他'],'radio'),
      brandField('leisureContact','联系人'),brandNumber('leisureStaff','机构人数（人）',{integer:true}),
      brandChoices('leisureAccessFlags','车辆通行方式',['纯步行','分段步行','限制车辆通行']),
      brandChoices('leisureFunction','功能定位',['综合型','专业型'],'radio'),
      ...[['Area','总占地面积（m²）'],['FloorArea','总建筑面积（m²）'],['Length','主街长（米）'],['Width','主街宽（米）'],
        ['Visits','上年客流量（万人）'],['International','国际客流量比例（%）',100],['Residents','街区内户籍人口数（人）'],
        ['OtherResidents','流动人口数（人）']].map(([key,label,max])=>brandNumber('leisure'+key,label,{max})),
      brandField('leisureHours','80%以上经营单位营业时间'),brandNumber('leisureParking','停车场面积（m²）'),
      brandField('leisurePlanningLevel','规划等级/批准时间','radio',{choices:brandLevels,sample:'provincial'}),
      brandChoices('leisureEmergency','应急系统',['咨询、投诉、救援电话公布','公共广播系统或应急呼叫系统']),
      brandTable('leisureHonors','获得的荣誉',[brandField('name','荣誉称号'),brandField('level','级别'),brandField('date','批准时间','date')],{numbered:true,startsEmpty:true})),
    brandRange('四至范围')],
    [brandGroup('经营情况',
      brandTable('leisureTrade','经营情况',[brandNumber('shops','店铺数量（个）',{integer:true}),
        brandNumber('area','经营面积（%）',{max:100,sample:'15'}),brandNumber('revenue','上年经营额（%）',{max:100,sample:'16'})],
      {fixed:true}),
      brandTable('leisureTradeTotal','经营情况合计',[brandNumber('shops','店铺数量（个）',{integer:true}),brandNumber('area','经营面积（平方米）'),brandNumber('revenue','上年经营额（万元）')],{fixed:true})),
    brandGroup('卫生安全与服务',
      brandChoices('leisureSafety','卫生安全情况',['治安机构或治安联络点','消防、防盗、防暴、救护等设施设备','专职、专业保安人员','医疗服务','警示警告标志']),
      brandNumber('leisureBins','分类垃圾箱数量（个）',{integer:true}),brandNumber('leisureToilets','厕所数量（个）',{integer:true}),
      brandNumber('leisureVisitorToilets','旅游厕所数量（个）',{integer:true}),
      brandChoices('leisureSigns','导览系统',['全景导览图','区域导览牌或导览图','铭牌标识和景物解说牌','店铺统一编号']),
      brandChoices('leisureCulture','文化特色',['非遗展示与活动','创意性和艺术性业态','文化展示','标志性景观']),
      brandChoices('leisureSites','文化景观和空间',['历史建筑','名人故居','博物馆','文化馆','实体书店及图书馆（分馆）','小剧场','美术馆','演艺空间','电影院','公共艺术空间','其他']),
      brandChoices('leisureService','运营与管理措施',['咨询服务处','专门客服人员','包装、快递、寄存服务','残障人士服务','消费退货维权点','定期培训','规范经营']),
      brandNumber('leisureSatisfaction','访客满意度（分）',{max:100}))],
    [brandGroup('街区综合情况',...[
      ['Introduction','旅游休闲街区总体情况介绍'],['Resources','街区文化和旅游资源概述'],['Infrastructure','街区公共服务体系建设情况'],
      ['Activities','街区经营和举办活动情况概述'],['Influence','街区知名度和品牌影响力概述']
    ].map(([key,label])=>brandNarrative('leisure'+key,label)))]
  ],
  attachments:['游客意见评价表','近2年主要经营主体无严重违法违规等行为记录和未发生重大旅游安全责任事故、社会反响强烈的负面舆情事件的承诺书',
    '旅游休闲街区总体规划','自评报告及相关说明材料','县级以上自然资源部门关于旅游休闲街区总体规划符合国土空间规划的证明',
    '地市级以上人民政府相关职能部门关于旅游休闲街区统一独立有效运营管理机构的证明材料',
    '地市级以上人民政府批复的旅游休闲街区总体规划相关材料','旅游休闲街区申请（由申报单位填写）',ba.recommendation,ba.initial,'旅游休闲街区其他补充附件'],
  optionalAttachments:[5,10]
};

function destinationReport(hot){
  const label=hot?'温泉度假地':'旅游度假区',prefix=hot?'hot':'resort';
  const nameKey=hot?'hotName':'resortApplyName',unitKey=hot?'hotApplicant':'applicantUnit';
  const key=(resortKey,suffix)=>hot?'hot'+suffix:resortKey;
  const field=(suffix,title,type,opts)=>brandField(prefix+suffix,title,type,opts);
  const num=(suffix,title,opts)=>brandNumber(prefix+suffix,title,opts);
  const basic=brandBasic(nameKey,label+'名称',unitKey,hot?'hotRecommendUnit':'recommendUnit',
    hot?brandField('hotGrade','申请级别','select',{choices:Object.entries(hotSpringGrades),sample:'silver'}):
      field('Grade','申请级别','radio',{choices:brandLevels,sample:'provincial'}));
  if(hot)basic.push(brandGroup('申报业务',
    field('Kind','申报业务','select',{choices:Object.entries(hotSpringKinds),required:true,sample:'first'}),
    field('CurrentGrade','现有等级（复评、升级时填）','select',{choices:Object.entries(hotSpringGrades),sample:''})));
  const environment=brandGroup('度假环境与质量',
    ...[
      ['AirQuality','空气质量','全年环境空气污染物基本项目浓度符合 GB 3095-2012 的二类区标准'],
      ['NoiseQuality','噪音质量','住宿客房声环境质量达到 GB 3096-2008 的1类标准'],
      ['WaterQuality','地表水质量','与人体接触的地表水质量达到 GB 3838-2002 的Ⅱ类标准'],
      ['SoilQuality','土壤质量','土壤质量符合 GB 15618 和 GB 36600 要求']
    ].map(([suffix,title,standard])=>field(suffix,title,'select',{choices:[standard,'未达到所列标准','待检测']})),
    brandChoices(prefix+'Months','年适宜度假时长',Array.from({length:12},(_,i)=>(i+1)+'月')));
  const resources=brandChoices(prefix+'ResourceType','主要度假产品所依托的资源',
    ['滨海','温泉','河湖','冰雪','山林','乡村田园','主题娱乐','主题文化','古城古镇','其他']);
  const products=brandTable(prefix+'Products','核心度假产品',[
    brandField('name','产品名称','text',{sample:hot?'温泉体验':'滨水休闲体验'}),
    brandField('size','规模','text',{sample:'2个活动区'}),
    brandField('resource','主要依托资源','text',{sample:hot?'温泉':'山林、河湖'}),
    brandField('description','产品描述','textarea'),brandField('theme','所属主题','text',{sample:hot?'温泉康养':'自然休闲'})]);
  const rooms=brandTable(prefix+'Lodging','高质量度假住宿设施名称及规模',[
    brandField('name','名称','text',{sample:'山水度假酒店'}),brandNumber('rooms','规模（间）',{integer:true,sample:'120'}),
    brandField('quality','品质','select',{choices:['符合 GB/T 14308-2010 中四星级及以上要求','优秀的地方品牌特色住宿设施','其他']}),
    ...(hot?[brandNumber('meetingRooms','会议室数量（个）',{integer:true,sample:'2'}),brandNumber('meetingCapacity','会议室容纳人数（人）',{integer:true}),brandNumber('beds','床位数（个）',{integer:true,sample:'220'})]:[]),
    brandField('activity','该住宿设施配套活动','textarea')]);
  const range=brandRange('空间范围'),totalRooms=brandNumber(key('roomCount','RoomCount'),'总客房数（间）',{integer:true,sample:'120'});
  const base=brandGroup('基本信息',{mirror:nameKey,label:label+'名称'},
    brandField(key('website','Website'),'网址','url'),brandField(key('managementOrg','ManagementOrg'),'管理机构'),
    field('NoticeDate','省级'+label+'公告时间','date'),brandField(key('principal','Principal'),'主要负责人'),
    brandField(key('principalPhone','PrincipalPhone'),'主要负责人手机','tel'),field('Contact','联系人'),field('ContactPhone','联系人手机','tel'),
    brandField(key('postalAddress','Address'),'通讯地址','textarea'),brandField(key('officialAccount','OfficialAccount'),'公众号'),
    field('App','APP'),field('MiniProgram','小程序'),num('Area','面积（平方公里）',{sample:hot?'0.3':'3.5'}));
  const operation=brandGroup('上年经营情况',...[
    ['Visitors','年游客规模（万人天）'],['Revenue','年旅游总收入（万元）'],['InboundVisitors','年境外游客规模（万人天）'],
    ['InboundRevenue','年境外游客总收入（万元）'],['OvernightVisitors','年过夜游客规模（万人天）'],['OvernightDays','过夜游客平均停留天数（天）'],
    ['NonlocalOvernight','年过夜游客中省外游客的比例（%）',100],['Investment','新增旅游投资额（万元）'],
    ['Marketing','市场营销投入（万元）'],['Complaints','旅游投诉总量（件）'],['ResolvedComplaints','旅游投诉办结量（件）']
  ].map(([suffix,title,max])=>num(suffix,title,{max})));
  const organization=brandGroup('管理机构情况',
    brandChoices(prefix+'OrganizationNature','管理机构性质',['行政单位','参公事业单位','事业单位','国有企业','集体企业','民营企业','合资企业','其他企业','社会','其他']),
    brandChoices(prefix+'OrganizationDuty','管理机构职能',[
      '负责'+label+'内规划建设管理工作','负责'+label+'内旅游资源开发、行业监督管理等工作','负责'+label+'内社会、民生领域','负责招商引资工作','其他']));
  const staff=brandGroup('从业人员情况',brandNumber(key('managementStaff','ManagementStaff'),'管理机构人员数量（人）',{integer:true}),
    num('Staff',label+'从业人员数（人）',{integer:true}),num('PropertyArea',label+'内用于产权出售的房地产项目总建筑面积（万平方米）'),
    num('ManagedArea','通过托管等方式对游客开放的设施总建筑面积（万平方米）'),
    num('ReceptionArea',label+'内旅游接待设施总建筑面积（对游客开放的设施）（万平方米）'));
  const narratives=brandGroup('综合说明',...[
    label+'发展概况（规划定位、发展历程等）',
    '度假资源与环境（度假资源的品质、独特性、规模、类型；度假自然环境；建成环境的效果、主题氛围和形象等）',
    '度假产品（度假产品体系和类型；核心度假产品；文旅融合产品；住宿、餐饮、购物的设施与服务；各类休闲娱乐活动数量、类型、配套服务等。需有论证说明，包括横向对比过程）',
    '度假公共服务（旅游交通服务；咨询/导向/标识/解说等旅游信息服务；旅游设施、公共文化、无障碍环境及其他公共服务）',
    '运营管理（规划编制与实施；管理体制、资源环境管理、运营监测投诉、安全生产；人才队伍、智慧化建设等）',
    '市场管理与影响（市场秩序、规模结构、市场营销、投诉处理、品牌美誉度、游客满意度）',
    '生态文明与社会效益（生态保护、绿色低碳、环境教育；文化传承；就业情况；产业、社区带动效果）'
  ].map((title,i)=>brandNarrative(hot?'hotNarrative'+i:'narrative'+i,title)));

  return {nameKey,unitKey,parts:[
    basic,[base,...(hot?[]:[range]),environment,
      brandGroup('度假资源与产品',...(hot?[products,resources]:[resources,products])),
      brandGroup('度假设施情况',...(hot?[rooms,totalRooms,num('BedCount','总床位数（个）',{integer:true,sample:'220'})]:[totalRooms,rooms])),
      ...(hot?[range]:[])],
    [operation,organization,staff],[narratives]
  ],attachments:[
    hot?'温泉度假地认定申请书':'国家级旅游度假区认定申请书',label+'总体规划','自评报告及相关说明材料',ba.safety,'总览图',
    ...(hot?['用水许可及相关证明（取水证、采矿证、排污证、消防证、营业执照、特种设备许可证等证明）']:[]),
    (hot?label:'度假区')+'空间边界相关数据','度假产品列表及分布图',ba.land,
    hot?'无严重违法违规行为记录、安全生产承诺书':'无严重违法违规行为记录承诺书',
    ba.planning,ba.operator,ba.geology,brandEnvironmentProof('度假'),ba.property,
    ba.local,label+'申请（由申报单位填写）',ba.recommendation,ba.initial,label+'初审情况统计表'
  ],optionalAttachments:hot?[1,10,14,19]:[]};
}

const brandReports={
  [legacyScenicType]:legacyScenicReport,
  'leisure-block':leisureReport,
  resort:destinationReport(false),
  'hot-spring':destinationReport(true)
};
const brandReport=p=>brandReports[p?.type];
const isLegacyScenic=p=>p?.type===legacyScenicType;
const currentScenic=window.V2_DATA.categories.find(category=>category.id==='scenic');
Object.assign(currentScenic,{name:'旅游景区质量等级申创（2025新国标）',subtitle:'GB/T 17775—2024 · 4A 申创流程'});
window.V2_DATA.categories.splice(1,0,{
  id:legacyScenicType,name:'旅游景区质量等级申创（老国标 · 2003）',icon:'landmark',enabled:true,status:'已开放',
  subtitle:'GB/T 17775—2003 · 独立申报表和项目记录'
});

const brandRangeKey='brandRangeFiles';
function brandReportForm(p){
  const report=brandReport(p);
  return report.parts.map((groups,index)=>`<div class="brand-report"><h2>${brandReportSections[index]}</h2>${groups.map(group=>
    `<section class="brand-section">${group.title===brandReportSections[index]?'':`<h3>${esc(group.title)}</h3>`}
      <div class="form-grid">${group.fields.filter(field=>!field.inlineAttachment).map(field=>field.columns?brandTableMarkup(p,field):brandFieldMarkup(field)).join('')}</div>
      ${group.fields.some(field=>field.inlineAttachment)?'<div data-brand-range></div>':''}
    </section>`).join('')}</div>`);
}

function brandFieldMarkup(field,inTable=false){
  const {key,label,type,choices,required,sample,wide}=field;
  if(field.mirror)return `<div class="field"><label for="brand-mirror-${field.mirror}">${esc(label)}</label><input id="brand-mirror-${field.mirror}" data-brand-mirror="${field.mirror}" readonly></div>`;
  const title=esc(label),labelText=title+(required?' *':'');
  const options=choices?.map((choice,i)=>Array.isArray(choice)?choice:[type==='select'?choice:String(i),choice]);
  const attributes=`id="${key}" data-field="${key}" aria-label="${title}"${required?' data-required="true"':''}${sample===undefined?'':` data-brand-sample="${esc(sample)}"`}`;
  if(type==='checkbox'||type==='radio')return `<fieldset class="field brand-choices"><legend>${labelText}</legend><div class="choice-grid">${options.map(([value,text])=>
    `<label class="check-line"><input type="${type}" name="${key}" data-group="${key}" data-field="${key}-${esc(value)}" aria-label="${title} · ${esc(text)}"${required?' data-required="true"':''}${sample==null?'':` data-brand-sample="${sample===value}"`}>${esc(text)}</label>`).join('')}</div></fieldset>`;
  let control;
  if(type==='select')control=`<select ${attributes}><option value="">请选择</option>${options.map(([value,text])=>`<option value="${esc(value)}">${esc(text)}</option>`).join('')}</select>`;
  else if(type==='textarea')control=`<textarea ${attributes} rows="${inTable?2:4}"></textarea>`;
  else control=`<input ${attributes} type="${type}" ${type==='number'?`step="${field.integer?'1':'any'}" ${field.min===null?'':`min="${field.min??0}"`} ${field.max==null?'':`max="${field.max}"`}`:field.attrs||''}>`;
  return inTable?control:`<div class="field${wide?' brand-wide':''}"><label for="${key}">${labelText}</label>${control}</div>`;
}

function brandTableRows(p,table){return p.brandRows?.[table.key]??(table.startsEmpty?[]:['1']);}
function brandTableMarkup(p,table){
  const rowIds=brandTableRows(p,table),title=esc(table.label);
  return `<section class="brand-table brand-wide" aria-label="${title}">
    <div class="attach-head"><h4>${title}</h4>${table.fixed?'':button('新增一行','brand-add-row',`data-brand-table="${table.key}"`)}</div>
    <div class="table-wrap"><table><thead><tr>${table.numbered?'<th>序号</th>':''}${table.columns.map(c=>`<th>${esc(c.label)}</th>`).join('')}${table.fixed?'':'<th class="brand-row-action">操作</th>'}</tr></thead>
    <tbody>${rowIds.map((id,index)=>`<tr>${table.numbered?`<th scope="row">${index+1}</th>`:''}${table.columns.map(c=>
      `<td>${brandFieldMarkup({...c,key:`${table.key}-${id}-${c.key}`},true)}</td>`).join('')}
      ${table.fixed?'':`<td class="brand-row-action">${button('删除','brand-remove-row',`data-brand-table="${table.key}" data-brand-row="${id}" aria-label="删除第 ${index+1} 行"`)}</td>`}</tr>`).join('')||
        `<tr><td colspan="${table.columns.length+2}" class="muted">暂无数据</td></tr>`}</tbody></table></div></section>`;
}

function brandAttachments(p){
  const report=brandReport(p);
  return report.attachments.map((title,index)=>[title,'',report.optionalAttachments.includes(index)?'选传 · 按实际情况提供':'',!report.optionalAttachments.includes(index)]);
}

function brandRangeFiles(p,editable){
  const files=p[brandRangeKey]||[];
  return `<section class="attach-group"><div class="attach-head"><div><strong>附件</strong><small>支持所有格式文件，单文件不超过 8 MB</small></div>
    ${editable?upload('选择文件',brandRangeKey):badge(files.length+' 个文件','gray')}</div>
    ${files.length?fileRows(p,brandRangeKey,files,editable):'<p class="file-empty">未上传</p>'}</section>`;
}

function hydrateBrandReport(root,p,readonly){
  root.querySelectorAll('[data-brand-mirror]').forEach(input=>input.value=p.values[input.dataset.brandMirror]||'');
  const range=root.querySelector('[data-brand-range]');
  if(range){
    range.innerHTML=brandRangeFiles(p,!readonly);
    if(root.id==='previousForm'||root.dataset.historyProject)range.dataset.historyProject=p.id;
  }
  if(readonly)root.querySelectorAll('.brand-row-action,[data-brand-table]').forEach(el=>el.hidden=true);
}

function updateBrandRows(p,action,tableKey,rowId){
  if(state.view!=='apply'||state.role!=='city'||!p||p.region!=='黔东南州'||!(p.stage==='draft'||p.correction))return;
  const table=brandReport(p)?.parts[state.formStep]?.flatMap(group=>group.fields).find(field=>field.key===tableKey&&field.columns);
  if(!table||table.fixed)return;
  const rows=brandTableRows(p,table);
  if(action==='brand-add-row'){
    p.brandNextRow=(p.brandNextRow||1)+1;
    rowId=String(p.brandNextRow);
    p.brandRows={...p.brandRows,[tableKey]:[...rows,rowId]};
  }else{
    if(!rows.includes(rowId))return;
    p.brandRows={...p.brandRows,[tableKey]:rows.filter(id=>id!==rowId)};
    for(const column of table.columns)delete p.values[`${tableKey}-${rowId}-${column.key}`];
  }
  p.savedAt=new Date().toLocaleTimeString('zh-CN',{hour12:false});
  save();
  const scroll=window.scrollY;
  render();
  window.scrollTo(0,scroll);
  document.querySelector(action==='brand-add-row'?`[data-field="${tableKey}-${rowId}-${table.columns[0].key}"]`:`[data-action="brand-add-row"][data-brand-table="${tableKey}"]`)?.focus();
}

function openBrandFilePicker(p,key){
  if(state.view!=='apply'||state.role!=='city'||p?.region!=='黔东南州'||!(p.stage==='draft'||p.correction)||!brandReport(p))return;
  const groups=applicationAttachments(p).map(([title],index)=>[`attachment-${index}`,title]);
  groups.push([brandRangeKey,'范围附件']);
  const files=groups.filter(([source])=>source!==key).flatMap(([source,title])=>
    filesFor(p,source).filter(file=>file.data).map(file=>({file,title})));
  openModal('从文件管理选择','本项目已上传附件',files.length?
    `<div class="brand-file-picker">${files.map(({file,title},index)=>`<label class="check-line"><input type="checkbox" data-brand-file="${index}"><span>${esc(file.name)}<small>${esc(title)}</small></span></label>`).join('')}</div>`:
    empty('本项目暂无可引用的文件，请上传新文件。'),
    files.length?button('取消','close-modal')+primary('确认选择','modal-submit'):'',files.length?()=>{
      if(getProject()!==p||state.role!=='city'||state.view!=='apply'||!(p.stage==='draft'||p.correction))return;
      const checked=[...document.querySelectorAll('[data-brand-file]:checked')];
      if(!checked.length)return toast('请至少选择一个附件。');
      const target=filesFor(p,key);
      for(const item of checked){
        const {file}=files[Number(item.dataset.brandFile)];
        if(!target.some(existing=>existing.name===file.name&&existing.data===file.data))target.push({...file});
      }
      save();
      closeModal();
      render();
      toast('文件已添加到当前附件。');
    }:null);
}

function legacyFieldResult(sheet){
  return sheet.result==='pass'?'建议通过':'建议不通过';
}

function legacyFieldReview(p,sh){
  return `<section class="task-card"><h2>现场评审 · 老国标（2003）</h2>
    <p class="helper">按 GB/T 17775—2003 评审，上传专家填写的现场评审表，并提交本人意见。</p>
    ${button('申报方提交材料','materials-modal')}
    <h3>现场评审表 *</h3>${upload('上传评审表','scoreSheet')}
    ${fileRows(p,'scoreSheet',sh.uploads.scoreSheet||[],true)}
    <h3>现场照片</h3>${upload('上传现场照片','legacyPhotos','accept="image/*"')}
    ${fileRows(p,'legacyPhotos',sh.uploads.legacyPhotos||[],true)}
    <h3>现场验收报告</h3>${upload('上传验收报告','legacyReport')}
    ${fileRows(p,'legacyReport',sh.uploads.legacyReport||[],true)}
    <h3>专家建议</h3><div class="radio-group">
      <label class="check-line"><input type="radio" name="legacyFieldResult" value="pass" ${sh.result==='fail'?'':'checked'}>建议通过</label>
      <label class="check-line"><input type="radio" name="legacyFieldResult" value="fail" ${sh.result==='fail'?'checked':''}>建议不通过</label>
    </div>${field('scoreComment','现场评审意见 *','textarea',sh.comment)}
    <div class="footer">${primary('完成评审，进入签字','legacy-submit-field')}</div></section>`;
}

function submitLegacyFieldReview(p){
  if(!isLegacyScenic(p)||p.stage!=='field'||state.role!=='expert'||!canHandle(p)||!p.avoidance[state.expert])return;
  const sh=sheetFor(p,'field'),comment=read('scoreComment'),result=decision('legacyFieldResult');
  if(!sh.uploads.scoreSheet?.length)return validationError('请上传现场评审表。','[data-upload="scoreSheet"]');
  if(!comment)return validationError('请填写现场评审意见。',fieldSelector('scoreComment'));
  if(!['pass','fail'].includes(result))return validationError('请选择专家建议。',fieldSelector('legacyFieldResult'));
  Object.assign(sh,{comment,result,total:null});
  save();
  signatureDialog(p,sh);
}

function confirmLegacyFieldReview(p){
  if(p.stage!=='field'||state.role!=='expert'||!canHandle(p))return;
  const sh=sheetFor(p,'field');
  if(!sh.signature?.data||!sh.uploads.scoreSheet?.length||!sh.comment.trim()||!['pass','fail'].includes(sh.result))return toast('请核对评审表、建议、意见及签字。');
  sh.submitted=true;
  sh.at=new Date().toLocaleString('zh-CN',{hour12:false});
  record(p,'专家现场评审已提交',sh.comment,{expert:state.expert,internalOnly:true});
  save();
  closeModal();
  navigate('projects');
  toast('现场评审与签字已提交，返回项目列表');
}

function legacyFieldReviewTable(p,stage){
  return `<div class="table-wrap"><table><thead><tr><th>专家</th><th>提交情况</th><th>专家建议</th><th>操作</th></tr></thead>
    <tbody>${summary(p,stage).records.map(row=>`<tr><td>${esc(expertName(row.id))}</td><td>${row.submitted?'已提交':'待提交'}</td>
    <td>${row.submitted?legacyFieldResult(row):'—'}</td><td>${row.submitted?button('查看明细','score-record',`data-stage="${stage}" data-expert="${row.id}"`):'—'}</td></tr>`).join('')}</tbody></table></div>`;
}

function openLegacyFieldReview(p,sh,id){
  const uploads=[['scoreSheet','现场评审表'],['legacyPhotos','现场照片'],['legacyReport','现场验收报告']];
  openModal('现场评审记录 · 老国标（2003）',p.name,`
    <p>${esc(expertName(id))} · ${esc(sh.at)} · ${legacyFieldResult(sh)}</p><p class="remark-text">${esc(sh.comment)}</p>
    ${uploads.filter(([key])=>sh.uploads[key]?.length).map(([key,title])=>`<h3>${title}</h3>${fileRows(p,'resort-record|'+id+'|'+key,sh.uploads[key],false)}`).join('')}
    ${sh.signature?.data?`<h3>专家签字</h3><img class="signature-preview" src="${sh.signature.data}" alt="专家签字">`:''}`,'',null,true,true);
}
