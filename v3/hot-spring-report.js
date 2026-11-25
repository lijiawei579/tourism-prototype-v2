'use strict';

const hotSpringRules=window.V2_HOT_SPRING_RULES;
const hotSpringGrades={gold:'金汤级',silver:'银汤级'};
const hotSpringKinds={first:'首次申报',review:'定期复评',upgrade:'升级'};
const hotSpringReference={gold:700,silver:600};
const isHotSpring=p=>p?.type==='hot-spring';

function hotSpringFormField(key,label,type='text',attributes='',required=true){
  return `<div class="field"><label for="${key}">${label}${required?' *':''}</label><input id="${key}" data-field="${key}" type="${type}" ${attributes}></div>`;
}
function hotSpringSelect(key,label,choices,required=true){
  return `<div class="field"><label for="${key}">${label}${required?' *':''}</label><select id="${key}" data-field="${key}"><option value="">请选择</option>${Object.entries(choices).map(([id,name])=>`<option value="${id}">${name}</option>`).join('')}</select></div>`;
}

const hotSpringSections=['申报基本情况','自查与签章','附件'];
const hotSpringForms=[
  '<h3>一、基本情况</h3><div class="form-grid">'+[
    hotSpringSelect('hotKind','申报业务',hotSpringKinds),
    hotSpringSelect('hotGrade','申报等级',hotSpringGrades),
    hotSpringSelect('hotCurrentGrade','现有等级（复评、升级时填）',hotSpringGrades,false),
    hotSpringFormField('hotName','申报单位名称（中文）'),hotSpringFormField('hotNameEn','申报单位名称（英文）'),
    hotSpringFormField('hotLegal','法人代表姓名（中文）'),hotSpringFormField('hotLegalEn','法人代表姓名（英文）'),
    hotSpringFormField('hotManager','总经理姓名（中文）'),hotSpringFormField('hotManagerEn','总经理姓名（英文）'),
    hotSpringFormField('hotAddress','地址'),hotSpringFormField('hotPostcode','邮政编码','text','inputmode="numeric" pattern="[0-9]{6}"'),
    hotSpringFormField('hotTelephone','固定电话','tel'),hotSpringFormField('hotMobile','手机','tel'),
    hotSpringFormField('hotEmail','电子邮箱','email')
  ].join('')+'</div>',
  '<h3>二、必备条件自查</h3><div class="form-grid">'+
  hotSpringSelect('hotSelfRequired','必备条件自查结果',{gold:'达到金汤级',silver:'达到银汤级',fail:'未达到'})+
  '</div><h3>三、一般条件自查</h3><div class="form-grid">'+[
    hotSpringFormField('hotSelfScore','附录 B 自评分（满分800分）','number','min="0" max="800" step="any"'),
    hotSpringFormField('hotSelfSurvey','附录 C 总体游客满意度（满分100分）','number','min="0" max="100" step="any"'),
    hotSpringSelect('hotSelfGrade','自评结果',{gold:'符合金汤级',silver:'符合银汤级',fail:'未符合'}),
    hotSpringFormField('hotSigned','申请日期','date')
  ].join('')+'</div><p class="helper">法人代表确认自查结果真实，签章后的申请书和自查材料随附件提交。评定机构的意见在办理环节记录。</p>'
];
const hotSpringAttachments=[
  ['温泉度假地等级评定申请书','','附录 D，法人代表与申请单位签章。'],
  ['温泉度假地经营相关证照','','营业执照、消防合格证、卫生许可证等。'],
  ['温泉泉质检测报告','','提供泉质检测报告及相关证明。'],
  ['温泉度假地管理机构设置及基本情况','','包括组织设置和管理职责。'],
  ['温泉度假地经营场所的基本信息表及图片资料','','上传基本信息表及相关图片。'],
  ['温泉度假地服务质量和安全保证体系文件及运行情况','','提供体系文件及运行记录。'],
  ['温泉度假地自查评定表及情况说明','','复评与升级同时提供复评申请和自查材料。']
];
window.V2_DATA.forms['hot-spring']=hotSpringForms;
window.V2_DATA.attachments['hot-spring']=hotSpringAttachments;
Object.assign(window.V2_DATA.categories.find(c=>c.id==='hot-spring'),{
  enabled:true,status:'已开放',subtitle:'金汤级、银汤级温泉度假地评定'
});

function hotSpringApplicationIssue(p){
  const {hotKind:kind,hotGrade:target,hotCurrentGrade:current}=p.values;
  if(kind==='review'&&(!current||current!==target))return {step:0,selector:'#hotCurrentGrade',message:'复评申报等级应与现有等级一致。'};
  if(kind==='upgrade'&&current!=='silver')return {step:0,selector:'#hotCurrentGrade',message:'银汤级可申请升级，请选择现有银汤级。'};
  if(kind==='upgrade'&&target!=='gold')return {step:0,selector:'#hotGrade',message:'升级申报请选择金汤级。'};
  if(kind==='upgrade'&&p.hotHistorySource?.awardedYear>=p.applicationYear)return {step:0,selector:'#hotKind',message:'银汤级评定次年可申报金汤级升级。'};
  return null;
}
