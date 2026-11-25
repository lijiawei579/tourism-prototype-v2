'use strict';

const isLeisureBlock=p=>p?.type==='leisure-block';
const leisureSections=['推荐意见','街区基本情况','省级旅游休闲街区申请','当地文旅部门审核意见','附件'];
const leisureStandard='LB/T 082-2021';

function leisureField(key,label,type='text',attributes='',required=true){
  const input=type==='textarea'
    ?`<textarea id="${key}" data-field="${key}" rows="4"></textarea>`
    :`<input id="${key}" data-field="${key}" type="${type}" ${attributes}>`;
  return `<div class="field"><label for="${key}">${label}${required?' *':''}</label>${input}</div>`;
}
function leisureChoice(key,label,choices){
  return `<div class="field"><label for="${key}">${label} *</label><select id="${key}" data-field="${key}">
    <option value="">请选择</option>${choices.map(value=>`<option>${value}</option>`).join('')}</select></div>`;
}
function leisureFlags(key,label,choices){
  return `<fieldset class="resort-check"><legend>${label}</legend><div class="choice-grid">
    ${choices.map((value,i)=>`<label><input type="checkbox" data-field="${key}-${i}">${value}</label>`).join('')}
  </div></fieldset>`;
}

const leisureForm=[
  `<h3>一、推荐意见</h3><div class="form-grid">
    ${leisureField('leisureName','旅游休闲街区名称')}${leisureField('leisureApplicant','申请单位')}
    ${leisureField('leisureRecommendUnit','推荐单位')}${leisureField('leisureRecommendDate','推荐日期','date')}
    ${leisureField('leisureRecommendation','推荐意见','textarea')}
  </div><p class="helper">市州随报告书提交已签章的推荐材料。</p>`,
  `<h3>二、旅游休闲街区基本情况</h3><div class="form-grid">
    ${leisureField('leisureExtent','四至范围','textarea')}
    ${leisureChoice('leisureLocation','地理位置',['历史文化保护区','中心城区','中心镇区'])}
    ${leisureField('leisureOperator','运营管理机构')}
    ${leisureChoice('leisureOrgType','机构类型',['政府机构','事业单位','企业','其他'])}
    ${leisureField('leisureContact','联系人')}${leisureField('leisureStaff','机构人数','number','min="0" step="1"')}
    ${leisureChoice('leisureAccess','车辆通行方式',['纯步行','分段步行','限制车辆通行'])}
    ${leisureField('leisureAccessTime','限制时段及范围','text','',false)}
    ${leisureChoice('leisurePosition','功能定位',['综合型','专业型'])}
    ${leisureField('leisurePositionDetail','专业型具体类型','text','',false)}
    ${[
      ['Area','总占地面积（㎡）'],['FloorArea','总建筑面积（㎡）'],['Length','主街长（米）'],['Width','主街宽（米）'],
      ['Visits','上年客流量（万人次）'],['International','国际客流量占比（%）',100],
      ['Residents','街区内户籍人口数（人）',null,1],['OtherResidents','流动人口数（人）',null,1],
      ['Parking','停车场面积（㎡）']
    ].map(([key,label,max,step])=>leisureField('leisure'+key,label,'number',`min="0" step="${step||'any'}"${max?' max="'+max+'"':''}`)).join('')}
    ${leisureField('leisureHours','80%以上经营单位营业时间')}
    ${leisureChoice('leisurePlanning','规划等级',['省级','国家级'])}
    ${leisureField('leisurePlanningDate','规划批准时间','date')}
    ${leisureField('leisureHonors','荣誉称号及批准时间','textarea','',false)}
  </div>${leisureFlags('leisureEmergency','应急系统',['咨询、投诉、救援电话公布','公共广播系统或应急呼叫系统'])}
  <h3>经营情况</h3><div class="table-wrap"><table><thead><tr><th>业态</th><th>店铺数量（个）</th><th>经营面积</th><th>上年营业额</th></tr></thead><tbody>
  ${['合计','文化创意类','观光景点类','餐饮类','购物类','文化体育类','休闲娱乐类'].map((name,i)=>
    `<tr><th>${name}</th>${['店铺数量','经营面积'+(i?'占比（%）':'（㎡）'),'上年营业额'+(i?'占比（%）':'（万元）')].map((label,j)=>
      `<td><input class="input" type="number" min="0" step="${j?'any':'1'}" ${i&&j?'max="100"':''} aria-label="${name} · ${label}" data-field="leisureTrade-${i}-${j}" data-required="true"></td>`).join('')}</tr>`).join('')}
  </tbody></table></div>
  ${leisureFlags('leisureService','运营与管理措施',['咨询服务处','专门客服人员','包装、快递、寄存服务','残障人士服务','消费退货维权点','定期培训','规范经营'])}
  ${leisureFlags('leisureSafety','卫生安全情况',['治安机构或治安联络点','消防、防盗、防暴、救护设施设备','专业保安人员','医疗服务','警示警告标志'])}
  <div class="form-grid">${[['Satisfaction','访客满意度（分）'],['Bins','分类垃圾箱数量'],['Toilets','厕所数量'],['VisitorToilets','旅游厕所数量']].map(([key,label])=>leisureField('leisure'+key,label,'number',key==='Satisfaction'?'min="0" step="any"':'min="0" step="1"')).join('')}</div>
  ${leisureFlags('leisureSigns','导览系统',['全景导览图','区域导览牌或导览图','铭牌标识和景物解说牌','店铺统一编号'])}
  ${leisureFlags('leisureCulture','文化特色',['非遗展示与活动','创意性和艺术性业态','文化展示','标志性景观'])}
  ${leisureFlags('leisureSites','文化景观和空间',['历史建筑','名人故居','博物馆','文化馆','实体书店及图书馆（分馆）','小剧场','美术馆','演艺空间','电影院','公共艺术空间','其他'])}
  <h3>旅游休闲街区总体情况介绍</h3>${[
    ['Resources','街区文化和旅游资源概述'],['Infrastructure','街区公共服务体系建设情况'],
    ['Activities','街区经营和举办活动情况概述'],['Influence','街区知名度和品牌影响力概述']
  ].map(([key,label])=>leisureField('leisure'+key,label,'textarea')).join('')}`,
  `<h3>三、省级旅游休闲街区申请</h3><p>申请单位确认自愿申报省级旅游休闲街区，并对提交材料的真实性负责。</p><div class="form-grid">
    ${leisureField('leisureApplicantSigner','街区管理机构负责人')}${leisureField('leisureApplicationDate','签章日期','date')}
  </div><p class="helper">负责人签字及街区管理机构公章随签章页上传。</p>`,
  `<h3>四、当地文化和旅游行政部门审核意见</h3><div class="form-grid">
    ${leisureField('leisureLocalOffice','县级文化和旅游行政部门')}${leisureField('leisureLocalSigner','县级部门负责人')}
    ${leisureField('leisureLocalDate','审核签章日期','date')}${leisureField('leisureLocalOpinion','已出具的审核意见','textarea')}
  </div><p class="helper">由市州随申报提交县级审核意见和签章页。</p>`
];
const leisureAttachments=[
  ['红线范围图','','按实际比例制作，范围清晰。'],
  ['总览图','','按实际比例制作，展示街区总体布局。'],
  ['街区业态列表及分布图','','上传业态清单及对应分布图。'],
  ['县级以上自然资源部门关于土地使用符合法律法规有关规定的相关材料','','上传主管部门出具的相关材料。'],
  ['管理机构关于近2年主要经营主体无严重违法违规等行为记录和未发生重大旅游安全责任事故、社会反响强烈的负面舆情事件的承诺书','','上传管理机构签章承诺书。'],
  ['认定申请报告书签章页','','包括已签章的推荐意见、街区申请及当地文化和旅游行政部门审核意见。']
];
window.V2_DATA.forms['leisure-block']=leisureForm;
window.V2_DATA.attachments['leisure-block']=leisureAttachments;
Object.assign(window.V2_DATA.categories.find(c=>c.id==='leisure-block'),{
  enabled:true,status:'已开放',subtitle:'按 LB/T 082-2021 申请省级旅游休闲街区认定'
});

function leisureApplicationIssue(project){
  const {leisureAccess,leisureAccessTime,leisurePosition,leisurePositionDetail}=project.values;
  if(leisureAccess==='限制车辆通行'&&!leisureAccessTime?.trim())return {step:1,selector:'#leisureAccessTime',message:'请填写限制车辆通行的时段及范围。'};
  if(leisurePosition==='专业型'&&!leisurePositionDetail?.trim())return {step:1,selector:'#leisurePositionDetail',message:'请填写专业型街区的具体类型。'};
  return null;
}
