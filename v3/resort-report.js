'use strict';

const resortRules=window.V2_RESORT_RULES;
const provincialResortReport=(()=>{
  const input=(key,label,type='text',attrs='',required=true)=>`<div class="field"><label for="${key}">${label}${required?' *':''}</label>${type==='textarea'?'<textarea rows="4"':`<input type="${type}"`} id="${key}" data-field="${key}" ${attrs}>${type==='textarea'?'</textarea>':''}</div>`;
  const num=(key,label,max='',min=0)=>input(key,label,'number',`min="${min}" ${max!==''?`max="${max}"`:''} step="any"`);
  const section=(title,body)=>`<h3>${title}</h3><div class="form-grid">${body}</div>`;
  const choices=(key,label,values,multiple=false)=>`<div class="field"><label>${label} *</label><div class="choice-grid">${values.map((value,i)=>`<label class="check-line"><input type="${multiple?'checkbox':'radio'}" name="${key}" data-required="true" data-group="${key}" data-field="${key}-${i}">${value}</label>`).join('')}</div></div>`;
  const reportForms=[
    section('报告书与推荐材料',[
      input('resortApplyName','旅游度假区名称'),input('applicantUnit','申报单位'),input('recommendUnit','推荐单位'),input('reportDate','申报日期','date')
    ].join(''))+
    section('一、推荐意见',input('provincialRecommendation','市（州）文化和旅游行政部门推荐意见','textarea'))+
    '<h3>二、初审情况（随报告书提交）</h3><p class="helper">按已签署的申请报告书录入推荐材料中的初审结果。</p><div class="form-grid">'+[
      choices('provincialPreliminary','第一部分 必备条件是否全部达标',['达标','不达标']),
      num('provincialPreliminaryBasic','第二部分 基础评价（满分100分）',100),
      num('provincialPreliminaryComprehensive','等级综合评价（满分1000分）',1000),
      input('provincialPreliminaryPrincipal','初审负责人')
    ].join('')+'</div>',
    section('三、基本情况 · 1. 基本信息',[
      input('managementOrg','管理机构'),input('principal','主要负责人'),
      input('principalPhone','主要负责人电话','tel'),input('resortContact','联系人'),
      input('resortContactPhone','联系人电话','tel'),input('postalAddress','通讯地址'),
      input('website','网址','url','',false),input('officialAccount','公众号／APP／小程序','text','',false),
      input('resortOpenDate','旅游度假区开放营业时间','date'),input('resortExtent','空间范围','textarea'),
      num('resortArea','面积（km²）'),input('resortAirQuality','空气质量'),
      input('resortNoiseQuality','噪声质量'),input('resortWaterQuality','地表水质量'),
      input('resortSoilQuality','土壤质量'),num('resortSeasonStart','适宜度假开始月份',12,1),
      num('resortSeasonEnd','适宜度假结束月份',12,1),
      choices('resortResourceType','主要依托资源类型',['滨海','温泉','河湖','冰雪','山林','乡村田园','主题娱乐','主题文化','古城古镇','其他'],true),
      input('resortResourceOther','其他资源类型说明','text','',false),input('resortCoreProducts','核心度假产品','textarea'),
      num('roomCount','总客房数（间／套）'),input('resortHighQualityRooms','高质量度假住宿设施名称及规模','textarea')
    ].join('')),
    section('上年经营情况',[
      num('resortVisitors','年游客规模（万人天）'),num('resortRevenue','年旅游总收入（万元）'),
      num('resortInboundVisitors','年境外游客规模（万人天）'),num('resortInboundRevenue','年境外游客总收入（万元）'),
      num('resortOvernightVisitors','年过夜游客规模（万人天）'),num('resortOvernightDays','过夜游客平均停留天数（天）'),
      num('resortNonlocalOvernight','年过夜游客中省外游客的比例（%）',100),num('resortInvestment','资金投入（万元）'),
      num('resortMarketing','市场营销投入（万元）'),num('resortComplaints','旅游投诉总量（件）'),num('resortResolvedComplaints','旅游投诉办结量（件）')
    ].join(''))+
    section('管理机构与从业人员',[
      choices('resortOrganizationNature','管理机构性质',['行政单位','参公事业单位','事业单位','国有企业','集体企业','民营企业','合资企业','其他企业','社会团体','其他']),
      input('resortOrganizationOther','其他机构性质说明','text','',false),
      choices('resortOrganizationDuty','管理机构职能',['负责旅游度假区内规划建设管理工作','负责旅游度假区内旅游资源开发、行业监督管理等工作','负责旅游度假区内社会、民生领域事务工作','负责招商引资工作','其他'],true),
      input('resortDutyOther','其他职能说明','text','',false),
      num('managementStaff','管理机构人员（人）'),num('resortStaff','度假区内单位就业人员（人）'),
      num('resortPrivateStaff','度假区内私营和个体就业人员（人）'),
      input('resortPropertyRatio','用于出售的房地产项目总建筑面积与旅游接待设施总建筑面积的比例','text','placeholder="如 1:2"')
    ].join('')),
    '<h3>三、基本情况 · 2–8. 综合说明</h3>'+resortRules.narratives.map((label,i)=>input('narrative'+i,label,'textarea')).join(''),
    '<h3>四、省级旅游度假区申请</h3><p>根据《旅游度假区等级划分》（GB/T 26358-2022）国家标准及相关细则，本旅游度假区自愿申报省级旅游度假区，并全面填写申请报告书的各项数据，对其真实性负责。</p>'+
    section('申请签署信息',input('resortSignatory','旅游度假区管理机构负责人')+input('resortSignedDate','申请签署日期','date'))+
    section('五、当地文旅行政部门审核意见',input('resortCountyOpinion','县级文旅行政部门审核意见','textarea')+input('resortCityOpinion','市（州）级文旅行政部门审核意见','textarea'))
  ];
  const attachments=resortRules.attachments.map((title,i)=>[title,'',i===1?'请同时提供 JPG（300 DPI）栅格图和 GDB 矢量数据，统一采用 CGCS2000，并标注所有拐点。':'按报告书要求上传相应证明材料。']);
  for(const title of ['推荐意见及初审情况签章页','省级旅游度假区申请签章页','市（州）及县级文旅行政部门审核意见签章页'])attachments.push([title,'','随申请报告提交已签署的材料。']);
  return {forms:reportForms,attachments,sections:['推荐意见与初审情况','基本信息与范围','经营与管理','综合说明','申请及当地意见','附件']};
})();

const usesProvincialResortReport=p=>p?.type==='resort'&&p.resortReportVersion===resortRules.version;
const applicationForms=p=>brandReport(p)?brandReportForm(p):window.V2_DATA.forms[p?.type]||[];
const applicationAttachments=p=>brandReport(p)?brandAttachments(p):window.V2_DATA.attachments[p?.type]||[];
