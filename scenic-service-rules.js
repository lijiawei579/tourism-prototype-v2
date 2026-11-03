// Generated from the latest user-provided 2025 scoring rules. Do not hand-edit rule text.
window.SCENIC_SERVICE_RULES = {
  "source": "《旅游景区质量等级评分细则（最终版）》细则三：旅游设施与服务质量评分细则",
  "version": "2025年11月",
  "standard": "GB/T 17775—2024",
  "total": 1000,
  "threshold4A": 850,
  "majorCount": 8,
  "questionCount": 345,
  "optionCount": 213,
  "majors": [
    {
      "id": "1",
      "name": "旅游交通",
      "max": 100,
      "questions": [
        {
          "id": "1.Q001",
          "title": "快速交通通达性",
          "note": "快速交通包括航空、高铁、城际铁路、高速公路、快速路等交通方式",
          "max": 7,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.1",
              "name": "可进入性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q001-1",
              "label": "有两种或两种以上快速交通方式直达（连通）景区所在地（县级行政单元）或景区周边交通枢纽",
              "score": 7,
              "note": "快速交通包括航空、高铁、城际铁路、高速公路、快速路等交通方式"
            },
            {
              "key": "1.Q001-2",
              "label": "有一种快速交通方式直达（连通）景区所在地（县级行政单元）或景区周边交通枢纽",
              "score": 5,
              "note": "快速交通包括航空、高铁、城际铁路、高速公路、快速路等交通方式"
            },
            {
              "key": "1.Q001-3",
              "label": "无快速交通方式直达（连通）景区所在地（县级行政单元）或景区周边交通枢纽",
              "score": 3,
              "note": "快速交通包括航空、高铁、城际铁路、高速公路、快速路等交通方式"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q002",
          "title": "外部交通便捷性",
          "note": "通行时间可查询非高峰时段的当地主要交通场站或城镇中心至景区入口的导航时间",
          "max": 8,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.1",
              "name": "可进入性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q002-1",
              "label": "交通非常便捷，主要交通场站或城镇中心至景区入口的距离在 20km 以内，或通行时间在 1 小时内",
              "score": 8,
              "note": "通行时间可查询非高峰时段的当地主要交通场站或城镇中心至景区入口的导航时间"
            },
            {
              "key": "1.Q002-2",
              "label": "交通比较便捷，主要交通场站或城镇中心至景区入口的距离在 50km 以内，或通行时间在 1~2 小时内",
              "score": 7,
              "note": "通行时间可查询非高峰时段的当地主要交通场站或城镇中心至景区入口的导航时间"
            },
            {
              "key": "1.Q002-3",
              "label": "交通便捷性一般，主要交通场站或城镇中心至景区入口的距离在 100km 以内，或通行时间在 2~3 小时内",
              "score": 5,
              "note": "通行时间可查询非高峰时段的当地主要交通场站或城镇中心至景区入口的导航时间"
            },
            {
              "key": "1.Q002-4",
              "label": "交通不够便捷，主要交通场站或城镇中心至景区入口的距离在 100km 以上，或通行时间在 3 小时以上",
              "score": 3,
              "note": "通行时间可查询非高峰时段的当地主要交通场站或城镇中心至景区入口的导航时间"
            }
          ],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "1.Q003",
          "title": "道路等级",
          "note": "连接主干公路或从交通枢纽、旅游集散中心、城镇中心等通往景区主要出入口的道路",
          "max": 5,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q003-1",
              "label": "一级公路为主（双向四车道及以上，单车道路面宽度3.75m，设计速度 80~100km）",
              "score": 5,
              "note": "连接主干公路或从交通枢纽、旅游集散中心、城镇中心等通往景区主要出入口的道路"
            },
            {
              "key": "1.Q003-2",
              "label": "二 级 公 路 为 主（双 向 两 车 道， 单 车 道 路 面 宽 度 3. 5~3.75m，设计速度 40~80km）",
              "score": 4,
              "note": "连接主干公路或从交通枢纽、旅游集散中心、城镇中心等通往景区主要出入口的道路"
            },
            {
              "key": "1.Q003-3",
              "label": "三级公路为主（双向两车道，单车道路面宽度 3.25~3. 5m，设计速度 30~40km）",
              "score": 3,
              "note": "连接主干公路或从交通枢纽、旅游集散中心、城镇中心等通往景区主要出入口的道路"
            }
          ],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "1.Q004",
          "title": "道路设施及维护",
          "note": "通往景区道路平坦、通畅，路面无破损、护坡良好、桥涵完整，指引标志、临时停靠点等道路附属设施完备，管理规范。发现一处不合格扣 1 分",
          "max": 5,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q005",
          "title": "沿线环境",
          "note": "清洁化：路面及两侧干净整洁，无垃圾等废弃物",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q005-met",
              "label": "清洁化：路面及两侧干净整洁，无垃圾等废弃物",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q006",
          "title": "景观化：道路两侧视域范围内绿化良好、林相美观，或景观自然、优美，观赏效果良好",
          "note": "景观化：道路两侧视域范围内绿化良好、林相美观，或景观自然、优美，观赏效果良好",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q006-met",
              "label": "景观化：道路两侧视域范围内绿化良好、林相美观，或景观自然、优美，观赏效果良好",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q007",
          "title": "协调性：道路两侧建筑、设施与环境相协调，无破坏景观环境现象",
          "note": "协调性：道路两侧建筑、设施与环境相协调，无破坏景观环境现象",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q007-met",
              "label": "协调性：道路两侧建筑、设施与环境相协调，无破坏景观环境现象",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q008",
          "title": "体验效果",
          "note": "安全性：道路设施与管护能确保行车安全",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q008-met",
              "label": "安全性：道路设施与管护能确保行车安全",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q009",
          "title": "便捷性：道路具备高效通行能力，方便游客通行",
          "note": "便捷性：道路具备高效通行能力，方便游客通行",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q009-met",
              "label": "便捷性：道路具备高效通行能力，方便游客通行",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q010",
          "title": "舒适性：提供舒适或有特色的行车环境，通行体验质量高",
          "note": "舒适性：提供舒适或有特色的行车环境，通行体验质量高",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q010-met",
              "label": "舒适性：提供舒适或有特色的行车环境，通行体验质量高",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q011",
          "title": "绿色性：符合绿色环保和可持续发展要求",
          "note": "绿色性：符合绿色环保和可持续发展要求",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.2",
              "name": "通往景区道路"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q011-met",
              "label": "绿色性：符合绿色环保和可持续发展要求",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q012",
          "title": "旅游公共交通",
          "note": "包括从交通枢纽、旅游集散中心、城镇中心等地通达景区的公共汽车、地铁、轻轨、游船、火车等公共交通，景区周边 1km 内设有站点",
          "max": 10,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.3",
              "name": "景区交通连接服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q012-1",
              "label": "有便捷直达景区的公共交通和旅游专线，保持日常运营，运营时间满足游客需要",
              "score": 10,
              "note": "包括从交通枢纽、旅游集散中心、城镇中心等地通达景区的公共汽车、地铁、轻轨、游船、火车等公共交通，景区周边 1km 内设有站点"
            },
            {
              "key": "1.Q012-2",
              "label": "有直达景区的公共交通或旅游专线，基本保持日常运营，运营时间基本满足游客需要",
              "score": 8,
              "note": "包括从交通枢纽、旅游集散中心、城镇中心等地通达景区的公共汽车、地铁、轻轨、游船、火车等公共交通，景区周边 1km 内设有站点"
            },
            {
              "key": "1.Q012-3",
              "label": "有直达景区的公共交通或旅游专线，仅旺季和节假日运营",
              "score": 6,
              "note": "包括从交通枢纽、旅游集散中心、城镇中心等地通达景区的公共汽车、地铁、轻轨、游船、火车等公共交通，景区周边 1km 内设有站点"
            },
            {
              "key": "1.Q012-4",
              "label": "有可换乘抵达景区的公共交通，运营时间难以满足游客需求",
              "score": 4,
              "note": "包括从交通枢纽、旅游集散中心、城镇中心等地通达景区的公共汽车、地铁、轻轨、游船、火车等公共交通，景区周边 1km 内设有站点"
            }
          ],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "1.Q013",
          "title": "自驾游配套服务",
          "note": "车辆服务：提供加油与充电服务（1 分），有车辆租赁或车辆检查与维修服务（1 分）",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.3",
              "name": "景区交通连接服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q013-met",
              "label": "车辆服务：提供加油与充电服务（1 分），有车辆租赁或车辆检查与维修服务（1 分）",
              "score": 2,
              "note": "主要检查通往景区道路沿线两侧各 1km 范围内的自驾游设施与配套服务"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q014",
          "title": "游览服务：有停车点、观景台（摄影点）和旅游厕所等服务设施（1 分），提供旅游导览、解说与相关信息服务（1",
          "note": "游览服务：有停车点、观景台（摄影点）和旅游厕所等服务设施（1 分），提供旅游导览、解说与相关信息服务（1 分）",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.3",
              "name": "景区交通连接服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q014-met",
              "label": "游览服务：有停车点、观景台（摄影点）和旅游厕所等服务设施（1 分），提供旅游导览、解说与相关信息服务（1 分）",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q015",
          "title": "其他服务：提供特殊地段（山区坡道、冰雪路段、沙漠戈壁等）车辆避险、应急防护与安全救援服务，或有自驾游驿站",
          "note": "其他服务：提供特殊地段（山区坡道、冰雪路段、沙漠戈壁等）车辆避险、应急防护与安全救援服务，或有自驾游驿站或自驾车营地，或提供休息场所（点）或其他旅游体验项目与活动",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.1",
              "name": "外部交通"
            },
            {
              "id": "1.1.3",
              "name": "景区交通连接服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q015-met",
              "label": "其他服务：提供特殊地段（山区坡道、冰雪路段、沙漠戈壁等）车辆避险、应急防护与安全救援服务，或有自驾游驿站或自驾车营地，或提供休息场所（点）或其他旅游体验项目与活动",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q016",
          "title": "设置位置",
          "note": "在通往景区道路上设置景区导向标志",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.1",
              "name": "交通标志"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q017",
          "title": "设置效果",
          "note": "景区方向标志、距离标志和旅游符号设置规范，位置合理，标志醒目",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.1",
              "name": "交通标志"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "1.Q018",
          "title": "停车位数量",
          "note": "指景区拥有、租用、借用的各类停车场大小车位的总数（租用、借用停车位需提供正式合同或相关证明）",
          "max": 8,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q018-1",
              "label": "500 个以上",
              "score": 8,
              "note": "指景区拥有、租用、借用的各类停车场大小车位的总数（租用、借用停车位需提供正式合同或相关证明）"
            },
            {
              "key": "1.Q018-2",
              "label": "301~500 个",
              "score": 6,
              "note": "指景区拥有、租用、借用的各类停车场大小车位的总数（租用、借用停车位需提供正式合同或相关证明）"
            },
            {
              "key": "1.Q018-3",
              "label": "101~300 个",
              "score": 4,
              "note": "指景区拥有、租用、借用的各类停车场大小车位的总数（租用、借用停车位需提供正式合同或相关证明）"
            },
            {
              "key": "1.Q018-4",
              "label": "100 个及以下",
              "score": 3,
              "note": "指景区拥有、租用、借用的各类停车场大小车位的总数（租用、借用停车位需提供正式合同或相关证明）"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "1.Q019",
          "title": "停车场（码头）设置",
          "note": "位置合理，通达性好或水域畅通",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q019-met",
              "label": "位置合理，通达性好或水域畅通",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q020",
          "title": "景观协调，整体视觉效果较好",
          "note": "景观协调，整体视觉效果较好",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q020-met",
              "label": "景观协调，整体视觉效果较好",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q021",
          "title": "场外引导标志标线清晰，标志规范、醒目、美观",
          "note": "场外引导标志标线清晰，标志规范、醒目、美观",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q021-met",
              "label": "场外引导标志标线清晰，标志规范、醒目、美观",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q022",
          "title": "入口处有剩余停车（船）位数量显示",
          "note": "入口处有剩余停车（船）位数量显示",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q022-met",
              "label": "入口处有剩余停车（船）位数量显示",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "1.Q023",
          "title": "停车场地面",
          "note": "生态化地面：停车场有符合当地生态条件的生态化地面，有绿化（如嵌草）铺装地面或绿化隔离线，或采用生态环保材料修建",
          "max": 5,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.2",
              "name": "停车（船）设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q023-1",
              "label": "生态化地面：停车场有符合当地生态条件的生态化地面，有绿化（如嵌草）铺装地面或绿化隔离线，或采用生态环保材料修建",
              "score": 5,
              "note": ""
            },
            {
              "key": "1.Q023-2",
              "label": "硬化或黑化地面：包括水泥地面、沥青地面、平整硬化铺装地面或硬质夯土地面",
              "score": 4,
              "note": "生态化地面：停车场有符合当地生态条件的生态化地面，有绿化（如嵌草）铺装地面或绿化隔离线，或采用生态环保材料修建"
            },
            {
              "key": "1.Q023-3",
              "label": "泥土地面：要求地面平整，便于停车和行车",
              "score": 2,
              "note": "生态化地面：停车场有符合当地生态条件的生态化地面，有绿化（如嵌草）铺装地面或绿化隔离线，或采用生态环保材料修建"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q024",
          "title": "停车（船）管理",
          "note": "场内有醒目、规范的停车场标牌指引和地面引导线",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q024-met",
              "label": "场内有醒目、规范的停车场标牌指引和地面引导线",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q025",
          "title": "有专人巡视、值管或智能化安全监控系统",
          "note": "有专人巡视、值管或智能化安全监控系统",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q025-met",
              "label": "有专人巡视、值管或智能化安全监控系统",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q026",
          "title": "出入口分设，布局合理，有利于车辆（船舶）疏散",
          "note": "出入口分设，布局合理，有利于车辆（船舶）疏散",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q026-met",
              "label": "出入口分设，布局合理，有利于车辆（船舶）疏散",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q027",
          "title": "大小车分区停车或分设大小车停车场",
          "note": "大小车分区停车或分设大小车停车场。大小车停车位比例不合理扣 1 分",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q027-met",
              "label": "大小车分区停车或分设大小车停车场。大小车停车位比例不合理扣 1 分",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "1.Q028",
          "title": "有专门的自行车、电动车或共享单车等非机动车停放区",
          "note": "有专门的自行车、电动车或共享单车等非机动车停放区",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q028-met",
              "label": "有专门的自行车、电动车或共享单车等非机动车停放区",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q029",
          "title": "分设车辆上、下客区域，做到人车分流",
          "note": "分设车辆上、下客区域，做到人车分流",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q029-met",
              "label": "分设车辆上、下客区域，做到人车分流",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q030",
          "title": "在停车场临近游客中心或景区入口的位置设置无障碍专用停车位，标志规范、醒目，车位旁有轮椅通道，对车位使用有",
          "note": "在停车场临近游客中心或景区入口的位置设置无障碍专用停车位，标志规范、醒目，车位旁有轮椅通道，对车位使用有严格管理",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q030-met",
              "label": "在停车场临近游客中心或景区入口的位置设置无障碍专用停车位，标志规范、醒目，车位旁有轮椅通道，对车位使用有严格管理",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q031",
          "title": "旺季停车管理",
          "note": "安排临时停车场所，有专人疏导和管理，无乱收费现象",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q031-met",
              "label": "安排临时停车场所，有专人疏导和管理，无乱收费现象",
              "score": 2,
              "note": "若自有停车场已经满足高峰期间停车需求，本项不扣分"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q032",
          "title": "景区入口周边 1km 范围内可供使用的停车场能满足游客停车需要",
          "note": "景区入口周边 1km 范围内可供使用的停车场能满足游客停车需要。即到即停得 3 分，排队等候时间在半小时以内得 2 分，排队等候时间在 1 小时以内得 1 分，排队等候时间在 1 小时以上不得分",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q032-met",
              "label": "景区入口周边 1km 范围内可供使用的停车场能满足游客停车需要。即到即停得 3 分，排队等候时间在半小时以内得 2 分，排队等候时间在 1 小时以内得 1 分，排队等候时间在 1 小时以上不得分",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q033",
          "title": "其他配套服务",
          "note": "提供具有信息查询、停车预约、停车诱导、便捷（无感）支付、反向寻车等功能的智慧停车服务，智慧停车的建设和运维符合 GB/T 42442.1《智慧城市 智慧停车 第 1 部分：总体要求》",
          "max": 2,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q033-met",
              "label": "提供具有信息查询、停车预约、停车诱导、便捷（无感）支付、反向寻车等功能的智慧停车服务，智慧停车的建设和运维符合 GB/T 42442.1《智慧城市 智慧停车 第 1 部分：总体要求》",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "1.Q034",
          "title": "新能源汽车充电桩数量完全满足需要得 3 分，基本满足需要得 2 分，仅少量满足需要得 1 分",
          "note": "新能源汽车充电桩数量完全满足需要得 3 分，基本满足需要得 2 分，仅少量满足需要得 1 分",
          "max": 3,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q034-met",
              "label": "新能源汽车充电桩数量完全满足需要得 3 分，基本满足需要得 2 分，仅少量满足需要得 1 分",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "1.Q035",
          "title": "提供车辆清洗、物品寄存、宠物友好、“共享停车 + 免费摆渡”等专项服务，或设置“停车 + 文化”“停车",
          "note": "提供车辆清洗、物品寄存、宠物友好、“共享停车 + 免费摆渡”等专项服务，或设置“停车 + 文化”“停车 +休闲”“停车 + 商业”等配套服务项目。有其中一项即可得分",
          "max": 1,
          "path": [
            {
              "id": "1",
              "name": "旅游交通"
            },
            {
              "id": "1.2",
              "name": "交通标志与停车（船）服务"
            },
            {
              "id": "1.2.3",
              "name": "停车（船）管理与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "1.Q035-met",
              "label": "提供车辆清洗、物品寄存、宠物友好、“共享停车 + 免费摆渡”等专项服务，或设置“停车 + 文化”“停车 +休闲”“停车 + 商业”等配套服务项目。有其中一项即可得分",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "2",
      "name": "游览设施",
      "max": 170,
      "questions": [
        {
          "id": "2.Q001",
          "title": "位置",
          "note": "位置合理、外观醒目，靠近主入口，方便游客直接进入主要游览点。距离景区主入口过远的，3km 以上扣 1 分， 5km 以上扣 2 分，10km 以上扣 3 分",
          "max": 5,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.1",
              "name": "位置与规模"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "2.Q002",
          "title": "规模",
          "note": "规模适度，能满足游客需要，空间利用效能高。如规模过大造成用地和空间浪费，或面积偏小难以满足游客需要，酌情扣 1-2 分",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.1",
              "name": "位置与规模"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q003",
          "title": "购票设施与服务",
          "note": "设置现场购票窗口，窗口数量满足需要，窗口分工明确、合理，购票秩序良好。免费开放的景区本项不扣分",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.2",
              "name": "功能与设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q004",
          "title": "信息咨询设施",
          "note": "配备咨询服务台、宣传展示设施和景区资料，能够通过网页和移动端提供咨询和展示服务，设置旅游咨询电话和自助服务设施，设施设备完好、有效",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.2",
              "name": "功能与设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q005",
          "title": "多媒体展示设施",
          "note": "配备多媒体展示设施，能够正常使用且内容丰富",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.2",
              "name": "功能与设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q006",
          "title": "休息区与配套设施",
          "note": "设置游客休息区，面积和配套的座椅及相关服务设施能满足游客需要",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.2",
              "name": "功能与设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q007",
          "title": "其他服务功能",
          "note": "提供宣传教育、游程导览、讲解安排、文化展示与体验、旅游购物、投诉处理等服务功能。有一项得 1 分",
          "max": 6,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.2",
              "name": "功能与设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q008",
          "title": "资料要求",
          "note": "信息咨询与服务资料（便携印刷品）种类多样，内容丰富，纸质版与电子版齐备，文字准确，制作精美，特色突出，更新及时，易于获取",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.3",
              "name": "景区资料"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q009",
          "title": "免费资料",
          "note": "免费提供纸质景区导览图",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.3",
              "name": "景区资料"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q010",
          "title": "其他资料",
          "note": "备有与景区相关的研究论著、科普读物、画册、音像制品等宣传资料",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.3",
              "name": "景区资料"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q011",
          "title": "服务信息公布",
          "note": "在醒目位置公布景区主要服务项目、营业（活动）时间、讲解人员（公布所有在岗讲解人员的照片、姓名、编号、等级及语种）、收费标准，实时发布景区游览信息及其他重要信息",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.4",
              "name": "信息公布与文明宣传"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q012",
          "title": "文明旅游宣传",
          "note": "倡导文明旅游，宣传保护环境、厉行节约和反对浪费",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.4",
              "name": "信息公布与文明宣传"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q013",
          "title": "服务人员",
          "note": "服务人员配备齐全，业务熟练，服务热情",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.5",
              "name": "人员与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q014",
          "title": "咨询服务",
          "note": "提供线上线下咨询服务，在线反应及时，满足游客咨询服务需要；旅游咨询电话通畅",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.5",
              "name": "人员与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q015",
          "title": "专项服务",
          "note": "提供手机充电、饮用冷热水、物品寄存等不少于 2 项服务",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.5",
              "name": "人员与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q015-met",
              "label": "提供手机充电、饮用冷热水、物品寄存等不少于 2 项服务",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q016",
          "title": "提供快递或邮政纪念及其他邮政文化服务",
          "note": "提供快递或邮政纪念及其他邮政文化服务",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.1",
              "name": "游客中心"
            },
            {
              "id": "2.1.5",
              "name": "人员与服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q016-met",
              "label": "提供快递或邮政纪念及其他邮政文化服务",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q017",
          "title": "平面示意图（全景图、导览图、线路图）",
          "note": "在景区入口处或游客中心，或其他适当位置设置景区全景图；在游客集中区域和交通节点设置导览图或线路图。要求正确标注出入口、主要景点、游客中心和各类公共服务设施（停车场、旅游厕所、医务室或急救室、母婴室等）的位置分布信息，以及咨询、投诉、救援电话等信息。发现一项缺失或一处不合格扣 1 分",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q018",
          "title": "位置标志",
          "note": "用以明确目的地所在位置的标志，包括出入口、主要景点、游客中心等参观游览场所和各类公共服务设施（停车场、旅游厕所、医务室或急救室、母婴室等）的位置信息。要求数量充足、布局合理、位置准确， 标志清晰、规范",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q019",
          "title": "导向标志",
          "note": "用以指示通往景区、景点、游客中心和各类公共设施行进方向的标志。要求数量充足、布局合理、指向和距离准确",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "map-distance"
        },
        {
          "id": "2.Q020",
          "title": "说明类标志",
          "note": "用以向游客提供参观游览信息的标志，包括景区简介、景观（景点）说明、游览须知、科普宣传等标志标牌。要求位置合理、安装牢固、字迹清晰、内容准确",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q021",
          "title": "安全标志",
          "note": "用以传递安全信息的标志，包括禁止标志、警告标志、指令标志、提示标志、消防安全标志、疏散路线标志等。要求位置适宜、提示到位",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q022",
          "title": "其他标志",
          "note": "包括街区导向图（景区周边主要信息导向图）、信息索引标志（室内景区各楼层信息索引标志）、行为指示标志（提示游客良好行为的指示标志）等。要求设置规范、合理",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q023",
          "title": "电子导览",
          "note": "设置电子导览系统，提供景点定位与导航、信息展示、智能讲解、打卡互动、客流监控与引导等服务",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q023-met",
              "label": "设置电子导览系统，提供景点定位与导航、信息展示、智能讲解、打卡互动、客流监控与引导等服务",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q024",
          "title": "电子导览系统准确、直观、便利",
          "note": "电子导览系统准确、直观、便利",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.1",
              "name": "导览系统构成"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q024-met",
              "label": "电子导览系统准确、直观、便利",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q025",
          "title": "导览质量",
          "note": "图案直观，图文清晰，图形符号规范",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q025-met",
              "label": "图案直观，图文清晰，图形符号规范",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q026",
          "title": "造型美观，有艺术感和文化气息",
          "note": "造型美观，有艺术感和文化气息",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q026-met",
              "label": "造型美观，有艺术感和文化气息",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q027",
          "title": "材质良好或采用生态环保材料，做工精致",
          "note": "材质良好或采用生态环保材料，做工精致",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q027-met",
              "label": "材质良好或采用生态环保材料，做工精致",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q028",
          "title": "视觉效果",
          "note": "视觉效果好，与景观环境相协调",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q029",
          "title": "维护保养",
          "note": "维护完好，无脱落、无破损、无锈蚀",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q029-1",
              "label": "维护完好，无脱落、无破损、无锈蚀",
              "score": 3,
              "note": ""
            },
            {
              "key": "2.Q029-2",
              "label": "维护较好，基本无脱落、无破损、无锈蚀",
              "score": 2,
              "note": "维护完好，无脱落、无破损、无锈蚀"
            },
            {
              "key": "2.Q029-3",
              "label": "维护一般，有明显脱落、破损、锈蚀现象",
              "score": 1,
              "note": "维护完好，无脱落、无破损、无锈蚀"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q030",
          "title": "中外文对照",
          "note": "有外文（包括英文及景区所在地主要客源国语言文字）翻译且内容准确，译文精准得5分。无中外文对照不得分；少数民族地区宜标注当地少数民族文字；文图不符或文字错误，发现一处扣 1 分",
          "max": 5,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.2.3",
          "title": "公共信息图形符号",
          "note": "在道路沿线、停车场、出入口、游客中心、售票处与检票处（免费开放景区除外）、购物点、医务室或急救室、旅游厕所、餐饮点等位置设置的信息载体。发现一处不规范扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.2",
              "name": "导览系统"
            },
            {
              "id": "2.2.2",
              "name": "质量与效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q032",
          "title": "进出口设置",
          "note": "游览进出口合理分设，不过分邻近，有利于游客疏散",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.1",
              "name": "游览线路"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q033",
          "title": "游线设置",
          "note": "车行道、绿道、游步道或航道等游览线路设计科学（有效串联景点，呈现景区特色；合理避开生态敏感区与安全隐患区），布局合理（线路设置避免走回头路和多次往返），符合游客游览习惯和需求；安全顺畅，方便通行",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.1",
              "name": "游览线路"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q034",
          "title": "游线景观特色",
          "note": "沿线景观优美，游线能充分展示景区主题和特色",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.1",
              "name": "游览线路"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q035",
          "title": "游览交通方式",
          "note": "为游客提供步行、车行、骑行、水上交通、缆车、电梯、低空飞行、畜力交通等多种选择，各交通方式之间能有效连接",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.2",
              "name": "行游方式与设施配置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q036",
          "title": "游览设施设置",
          "note": "车行道、游步道、观景平台、交通换乘等游览设施设置合理",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.2",
              "name": "行游方式与设施配置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q037",
          "title": "景观效果",
          "note": "游步道景观效果好，有生态特色或文化个性，舒适安全",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.3",
              "name": "游步道"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q038",
          "title": "生态环保",
          "note": "采用当地材料或生态环保型材料，与环境相协调",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.3",
              "name": "游步道"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q039",
          "title": "数量与安全性",
          "note": "游览交通工具数量充足，安全便捷",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.4",
              "name": "游览交通工具"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q040",
          "title": "特色与绿色化",
          "note": "游览交通工具有特色，使用清洁能源，包括新能源汽车、缆车、电瓶车、新能源游船、自行车、电动小火车以及其他特色、绿色交通工具",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.3",
              "name": "游线与游览交通工具"
            },
            {
              "id": "2.3.4",
              "name": "游览交通工具"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q041",
          "title": "布局与位置",
          "note": "旅游厕所布局合理，既方便游客到达使用，又与景观环境相协调，并便于通风、排污",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q042",
          "title": "数量与比例",
          "note": "数量充足，男女厕位比例合理",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q042-met",
              "label": "数量充足，男女厕位比例合理",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q043",
          "title": "高峰期厕位数量能满足需要，或设置潮汐厕所或移动厕所，如因管理等问题导致旺季游客较长时间排队等候的，酌情扣",
          "note": "高峰期厕位数量能满足需要，或设置潮汐厕所或移动厕所，如因管理等问题导致旺季游客较长时间排队等候的，酌情扣分",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q043-met",
              "label": "高峰期厕位数量能满足需要，或设置潮汐厕所或移动厕所，如因管理等问题导致旺季游客较长时间排队等候的，酌情扣分",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q044",
          "title": "无障碍卫生间（或家庭卫生间）",
          "note": "数量充足，设施完备，维护完好，满足特殊人群使用要求",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q045",
          "title": "设施质量",
          "note": "洁具质量：完好，无破损",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q045-met",
              "label": "洁具质量：完好，无破损",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q046",
          "title": "隔板和门：缺失其一不得分",
          "note": "隔板和门：缺失其一不得分；质量较差或维护情况不好的，酌情扣分",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q046-met",
              "label": "隔板和门：缺失其一不得分；质量较差或维护情况不好的，酌情扣分",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q047",
          "title": "其他设施：主要游览场所旅游厕所具备盥洗设施（水龙头）、挂衣钩、皂液、面镜、干手设备、手纸盒、电器设施、排",
          "note": "其他设施：主要游览场所旅游厕所具备盥洗设施（水龙头）、挂衣钩、皂液、面镜、干手设备、手纸盒、电器设施、排气扇等设施设备，维护完好且实用有效",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q047-met",
              "label": "其他设施：主要游览场所旅游厕所具备盥洗设施（水龙头）、挂衣钩、皂液、面镜、干手设备、手纸盒、电器设施、排气扇等设施设备，维护完好且实用有效",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q048",
          "title": "水冲或生态厕所：景区内均为水冲厕所或使用符合环保要求的免水冲生态厕所",
          "note": "水冲或生态厕所：景区内均为水冲厕所或使用符合环保要求的免水冲生态厕所",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q048-met",
              "label": "水冲或生态厕所：景区内均为水冲厕所或使用符合环保要求的免水冲生态厕所",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q049",
          "title": "风貌与氛围",
          "note": "建筑风貌：建筑造型有景观特色，外观、色彩与环境相协调，旅游厕所标志醒目",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q049-met",
              "label": "建筑风貌：建筑造型有景观特色，外观、色彩与环境相协调，旅游厕所标志醒目",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q050",
          "title": "文化气息：旅游厕所装饰与布置能融入景区文化元素",
          "note": "文化气息：旅游厕所装饰与布置能融入景区文化元素",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q050-met",
              "label": "文化气息：旅游厕所装饰与布置能融入景区文化元素",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q051",
          "title": "管理与卫生",
          "note": "管理规范：游客集中场所的旅游厕所有专人管理，管理信息和管理制度有明确展示",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q051-met",
              "label": "管理规范：游客集中场所的旅游厕所有专人管理，管理信息和管理制度有明确展示",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q052",
          "title": "卫生状况：清理及时，洁具洁净，无污垢、无堵塞",
          "note": "卫生状况：清理及时，洁具洁净，无污垢、无堵塞；内外环境整洁，干净卫生，无异味",
          "max": 5,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q052-met",
              "label": "卫生状况：清理及时，洁具洁净，无污垢、无堵塞；内外环境整洁，干净卫生，无异味",
              "score": 5,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q053",
          "title": "质量类别",
          "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）",
          "max": 7,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.1",
              "name": "旅游厕所"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q053-1",
              "label": "Ⅰ类旅游厕所比例≥ 40%",
              "score": 7,
              "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）"
            },
            {
              "key": "2.Q053-2",
              "label": "Ⅰ类旅游厕所比例≥ 30%",
              "score": 6,
              "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）"
            },
            {
              "key": "2.Q053-3",
              "label": "Ⅰ类旅游厕所比例≥ 20%",
              "score": 5,
              "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）"
            },
            {
              "key": "2.Q053-4",
              "label": "Ⅰ类旅游厕所比例＜ 20%",
              "score": 4,
              "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）"
            },
            {
              "key": "2.Q053-5",
              "label": "无Ⅰ类旅游厕所，但均达到Ⅱ类质量要求",
              "score": 3,
              "note": "景区内所有厕所应达到 GB/T 18973 中Ⅱ类质量要求，否则不得分；如 5A 级、 4A 级和 3A 级景区达到Ⅰ类质量要求的旅游厕所比例分别低于 40%、30% 和20%，只能按最低档打分（即 3 分）"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q054",
          "title": "数量与布局",
          "note": "数量适度，能满足游客需要",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.2",
              "name": "垃圾箱"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q054-met",
              "label": "数量适度，能满足游客需要",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q055",
          "title": "布局合理，便于游客投放，且不妨碍游客观赏景观",
          "note": "布局合理，便于游客投放，且不妨碍游客观赏景观",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.2",
              "name": "垃圾箱"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q055-met",
              "label": "布局合理，便于游客投放，且不妨碍游客观赏景观",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q056",
          "title": "分类与造型",
          "note": "垃圾箱（桶）分类设置，分类标志醒目",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.2",
              "name": "垃圾箱"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q056-met",
              "label": "垃圾箱（桶）分类设置，分类标志醒目",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q057",
          "title": "造型美观，与周边环境相协调",
          "note": "造型美观，与周边环境相协调",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.2",
              "name": "垃圾箱"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q057-met",
              "label": "造型美观，与周边环境相协调",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q058",
          "title": "卫生与维护",
          "note": "外部整洁，干净卫生，维护良好",
          "max": 1,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.2",
              "name": "垃圾箱"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q059",
          "title": "数量与布局",
          "note": "数量充足，能满足游客需要",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.3",
              "name": "休息设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q059-met",
              "label": "数量充足，能满足游客需要",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "2.Q060",
          "title": "布局合理，在景区适当节点合理设置，与景观环境相协调，不妨碍游客通行及观赏，不设置在危险地带和难以进入地带",
          "note": "布局合理，在景区适当节点合理设置，与景观环境相协调，不妨碍游客通行及观赏，不设置在危险地带和难以进入地带，未对资源和环境造成负面影响",
          "max": 4,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.3",
              "name": "休息设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q060-met",
              "label": "布局合理，在景区适当节点合理设置，与景观环境相协调，不妨碍游客通行及观赏，不设置在危险地带和难以进入地带，未对资源和环境造成负面影响",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q061",
          "title": "质量与维护",
          "note": "用材合理，美观实用，与环境相协调",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.3",
              "name": "休息设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q061-met",
              "label": "用材合理，美观实用，与环境相协调",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q062",
          "title": "维护良好，无破损、无污垢",
          "note": "维护良好，无破损、无污垢",
          "max": 3,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.3",
              "name": "休息设施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "2.Q062-met",
              "label": "维护良好，无破损、无污垢",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "2.Q063",
          "title": "遮防设施",
          "note": "在游客集中的休息、等候区域提供必要的遮阳、避雨、防风等设施，并与环境相协调",
          "max": 2,
          "path": [
            {
              "id": "2",
              "name": "游览设施"
            },
            {
              "id": "2.4",
              "name": "卫生与休息设施"
            },
            {
              "id": "2.4.3",
              "name": "休息设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "3",
      "name": "游览服务",
      "max": 170,
      "questions": [
        {
          "id": "3.Q001",
          "title": "解说方式的多样性",
          "note": "采用传统与现代解说结合的多种方式，包括说明类标志、音像制品、印刷品、人工讲解、电子讲解等不少于4种解说方式",
          "max": 8,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.1",
              "name": "解说方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q001-1",
              "label": "采用传统与现代解说结合的多种方式，包括说明类标志、音像制品、印刷品、人工讲解、电子讲解等不少于4种解说方式",
              "score": 8,
              "note": ""
            },
            {
              "key": "3.Q001-2",
              "label": "采用传统解说的多种方式，包括说明类标志、印刷品、人工讲解等不少于 3 种传统解说方式",
              "score": 6,
              "note": "采用传统与现代解说结合的多种方式，包括说明类标志、音像制品、印刷品、人工讲解、电子讲解等不少于4种解说方式"
            },
            {
              "key": "3.Q001-3",
              "label": "采用传统解说的简单方式，且少于 3 种解说方式",
              "score": 3,
              "note": "采用传统与现代解说结合的多种方式，包括说明类标志、音像制品、印刷品、人工讲解、电子讲解等不少于4种解说方式"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q002",
          "title": "解说方式的获得性",
          "note": "明示解说方式获取途径",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.1",
              "name": "解说方式"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q003",
          "title": "科学性",
          "note": "科学、准确，符合游客信息获取和导览服务需求。发现一处解说错误扣 1 分",
          "max": 6,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.2",
              "name": "解说内容"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q004",
          "title": "特色性",
          "note": "解说内容有深度，突出景区特色",
          "max": 5,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.2",
              "name": "解说内容"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q005",
          "title": "教育性",
          "note": "解说内容能对景区主要资源价值以及项目活动进行充分说明，具有科普及宣传教育功能",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.2",
              "name": "解说内容"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q006",
          "title": "图文解说设施",
          "note": "景区图文解说设施或媒体设计精美，体现景区主题，材质优良",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.3",
              "name": "解说设施与信息化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q007",
          "title": "多媒体解说设施",
          "note": "提供自助电子导游服务（二维码扫描免费讲解）、语音讲解器租用或无线设备讲解服务，讲解设备携带方便，便于操作，声音清晰",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.3",
              "name": "解说设施与信息化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q008",
          "title": "解说信息化程度",
          "note": "运用新一代信息技术和科技手段，解说信息化程度高。游客可使用手机或景区导览设备，借助景区App、二维码、小程序、无线讲解器、AI 数字人或智能机器人等，便捷获取景点信息和讲解服务。有一种有效方式得 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.3",
              "name": "解说设施与信息化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q009",
          "title": "解说语言规范性",
          "note": "解说语言应中英（或主要客源国语种）对照且规范、精准。发现一处不规范、不正确，扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.4",
              "name": "解说语言与效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q010",
          "title": "解说效果",
          "note": "解说用语应生动、有趣，符合游客信息获取习惯及相应需求，解说效果优良",
          "max": 6,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.1",
              "name": "解说系统"
            },
            {
              "id": "3.1.4",
              "name": "解说语言与效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q011",
          "title": "人员数量",
          "note": "讲解人员数量与游客接待规模和景区性质相适应。景区采用 AI 数字人或机器人讲解，如能满足讲解服务要求，本项不扣分",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.1",
              "name": "讲解人员与语种要求"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "3.Q012",
          "title": "讲解语种",
          "note": "语种能满足游客需要。有英语得3分；增加其他讲解语种（包括其他客源地语言、少数民族语言、方言）得 1 分",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.1",
              "name": "讲解人员与语种要求"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q013",
          "title": "高级讲解员",
          "note": "有专职或兼职高级讲解人员，含可为游客服务的高级馆员和研究员等，须作为正式讲解员公布",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.1",
              "name": "讲解人员与语种要求"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q014",
          "title": "内容科学",
          "note": "讲解词科学、准确，繁简适度，逻辑性强",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.2",
              "name": "讲解词"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q015",
          "title": "文字水平",
          "note": "文字优美，语言生动、有趣，符合游客信息获取习惯及相应需求",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.2",
              "name": "讲解词"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q016",
          "title": "讲解深度",
          "note": "能讲解科学、技术、文化及相关知识， 内涵阐述有深度，或将现代文明成果融入讲解内容",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.2",
              "name": "讲解词"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q017",
          "title": "语言规范",
          "note": "讲解语言规范、精准。普通话水平达标率 100%",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.3",
              "name": "讲解效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q018",
          "title": "讲解清晰度",
          "note": "讲解内容清晰，语言流畅，通俗易懂",
          "max": 5,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.3",
              "name": "讲解效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q019",
          "title": "讲解生动性",
          "note": "音量适度、语速适中、语调有节奏感，讲解生动有趣，能吸引人，讲解效果优良",
          "max": 5,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.3",
              "name": "讲解效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q020",
          "title": "讲解针对性",
          "note": "根据游客特点进行有针对性和个性化的讲解，能满足特殊人群的特殊需求",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.3",
              "name": "讲解效果"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q021",
          "title": "行为规范",
          "note": "服务态度热情，行为规范有度。存在胁迫或恶意诱导消费行为的，本项不得分",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.4",
              "name": "讲解人员管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q022",
          "title": "管理秩序",
          "note": "讲解人员纳入景区统一管理体系，有序承接任务。如有未纳入景区统一管理体系的非正规讲解人员，本项不得分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.4",
              "name": "讲解人员管理"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q022-met",
              "label": "讲解人员纳入景区统一管理体系，有序承接任务。如有未纳入景区统一管理体系的非正规讲解人员，本项不得分",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q023",
          "title": "规范提供专业人员或志愿者讲解",
          "note": "规范提供专业人员或志愿者讲解",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.2",
              "name": "讲解服务"
            },
            {
              "id": "3.2.4",
              "name": "讲解人员管理"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q023-met",
              "label": "规范提供专业人员或志愿者讲解",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q024",
          "title": "规模",
          "note": "购物场所规模适度，与游客购物需求适应",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q025",
          "title": "布局",
          "note": "购物场所布局合理，不破坏主要景观，不妨碍游客游览，不与游客抢占游览道路和观景空间",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q026",
          "title": "外观",
          "note": "场所设计有特色，外观、建筑风格与景观相协调",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q027",
          "title": "商品类型",
          "note": "包括旅游纪念品、土特产品、工艺美术品、 文化艺术品、旅游日用品、景区文创商品等类型，有一类得 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.2",
              "name": "商品与特色"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q028",
          "title": "商品质量",
          "note": "材质精美，工艺精巧，质量合格",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.2",
              "name": "商品与特色"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q029",
          "title": "商品特色",
          "note": "具有本土特色",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.2",
              "name": "商品与特色"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q029-met",
              "label": "具有本土特色",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q030",
          "title": "具有景区自身特色",
          "note": "具有景区自身特色",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.2",
              "name": "商品与特色"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q030-met",
              "label": "具有景区自身特色",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q031",
          "title": "环境整洁",
          "note": "无乱堆乱放现象。发现一处，扣 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.3",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q032",
          "title": "管理规范",
          "note": "对购物场所从业人员进行统一管理（包括资质管理、质量管理、价格管理和计量管理等） ，商品明码标价，价格标签标示规范",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.3",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q033",
          "title": "秩序良好",
          "note": "无乱设摊点，每发现一处，扣 1 分",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.3",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q034",
          "title": "订购服务",
          "note": "为游客提供便利的旅游商品预订、购置及配送服务，有统一的售后服务渠道",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.3",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q035",
          "title": "服务态度",
          "note": "服务热情，耐心解答游客问题",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.3",
              "name": "购物服务"
            },
            {
              "id": "3.3.3",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q036",
          "title": "规模",
          "note": "餐饮设施规模适度，容量与游客餐饮需求适应",
          "max": 1,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q037",
          "title": "布局",
          "note": "餐饮场所布局合理，不破坏主要景观，便于游客就餐",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q038",
          "title": "外观",
          "note": "外观、建筑风格与景观相协调",
          "max": 1,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.1",
              "name": "规模与布局"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q039",
          "title": "餐饮类型",
          "note": "包括经营中餐、西餐、日餐、韩餐、主题餐饮、小吃、快餐或简餐、饮品等业态类型，能满足不同人群需要，每种 1 分",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.2",
              "name": "产品与特色"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q040",
          "title": "餐饮特色",
          "note": "提供地方风味和特色餐饮",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.2",
              "name": "产品与特色"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q041",
          "title": "菜品质价",
          "note": "菜品美味、价格合理并明码标价",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.2",
              "name": "产品与特色"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q042",
          "title": "餐饮卫生",
          "note": "严格执行餐饮卫生制度和标准，就餐场所、厨房、库房等场所整洁卫生，食品生产、餐饮服务和卫生管理到位",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.3",
              "name": "卫生与安全"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q043",
          "title": "餐饮安全",
          "note": "有餐饮从业人员健康证，配备完善的清洗消毒设施，有严格的餐饮安全与消防管理措施",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.3",
              "name": "卫生与安全"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q044",
          "title": "就餐环境",
          "note": "就餐环境与设施整洁舒适，体现文化或主题特色",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.4",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q045",
          "title": "就餐秩序",
          "note": "就餐秩序良好。高峰期就餐秩序混乱，本项不得分",
          "max": 1,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.4",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q046",
          "title": "服务态度",
          "note": "餐饮服务人员态度热情，操作规范，服务周到",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.4",
              "name": "管理与服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q047",
          "title": "宣传提示",
          "note": "餐饮场所有制止餐饮浪费行为的宣传和相关提示",
          "max": 1,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.5",
              "name": "文明用餐"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q048",
          "title": "节约措施",
          "note": "点餐时提醒适量消费，菜单设置套餐时标明建议消费人数，推出半份菜或小份菜，提供剩菜打包服务，有督促或激励游客节约饮食相关措施",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.4",
              "name": "餐饮服务"
            },
            {
              "id": "3.4.5",
              "name": "文明用餐"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q049",
          "title": "服务设施",
          "note": "设施完备性：除设置无障碍机动车停车位、无障碍卫生间（或厕位）、家庭卫生间外（在“1.2.3”和“2.4.1”部分已有打分项），设置无障碍标志，配备无障碍通道或电梯、母婴室等设施，每类得 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.1",
              "name": "无障碍服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q049-met",
              "label": "设施完备性：除设置无障碍机动车停车位、无障碍卫生间（或厕位）、家庭卫生间外（在“1.2.3”和“2.4.1”部分已有打分项），设置无障碍标志，配备无障碍通道或电梯、母婴室等设施，每类得 1 分",
              "score": 3,
              "note": "无障碍设施符合 GB 50763 《无障碍设计规范》和 GB 55019《建筑与市政工程无障碍通用规范》规定"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q050",
          "title": "设施的便利性：能为残疾人、老年人自主安全地在景区通行、出入建筑物以及使用其附属设施、搭乘游览交通工具，获",
          "note": "设施的便利性：能为残疾人、老年人自主安全地在景区通行、出入建筑物以及使用其附属设施、搭乘游览交通工具，获取、使用和交流信息，获得旅游服务等提供便利",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.1",
              "name": "无障碍服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q050-met",
              "label": "设施的便利性：能为残疾人、老年人自主安全地在景区通行、出入建筑物以及使用其附属设施、搭乘游览交通工具，获取、使用和交流信息，获得旅游服务等提供便利",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q051",
          "title": "工具与用品",
          "note": "提供轮椅、拐杖、童车等工具与用品，或提供这些用品的租赁服务，每提供一类得 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.1",
              "name": "无障碍服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q052",
          "title": "个性化接待",
          "note": "采取语音、大字、盲文、手语等不少于 2 种方式提供无障碍信息交流",
          "max": 1,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q052-met",
              "label": "采取语音、大字、盲文、手语等不少于 2 种方式提供无障碍信息交流",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "3.Q053",
          "title": "为老年人、未成年人、残疾人等特殊群体提供个性化接待及购票、代邮等便利服务及其他个性化人文关怀服务",
          "note": "为老年人、未成年人、残疾人等特殊群体提供个性化接待及购票、代邮等便利服务及其他个性化人文关怀服务",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q053-met",
              "label": "为老年人、未成年人、残疾人等特殊群体提供个性化接待及购票、代邮等便利服务及其他个性化人文关怀服务",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "3.Q054",
          "title": "证件认证使用",
          "note": "可认证使用外籍来华人员等各类身份证件",
          "max": 2,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.Q055",
          "title": "服务质量",
          "note": "态度热情，服务及时，针对性强，服务效果好",
          "max": 4,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "3.Q055-1",
              "label": "态度热情，服务及时，针对性强，服务效果好",
              "score": 4,
              "note": ""
            },
            {
              "key": "3.Q055-2",
              "label": "服务态度、及时性、针对性和服务效果较好",
              "score": 3,
              "note": "态度热情，服务及时，针对性强，服务效果好"
            },
            {
              "key": "3.Q055-3",
              "label": "服务态度、及时性、针对性和服务效果一般",
              "score": 2,
              "note": "态度热情，服务及时，针对性强，服务效果好"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.5.3",
          "title": "支付便利服务",
          "note": "提供高效、便捷的支付服务，支持移动支付、境内外银行卡、现金等多种支付方式。每种服务得 1 分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "3.5.4",
          "title": "志愿者服务",
          "note": "志愿服务工作能满足游客需要。仅有志愿服务工作站点，无志愿服务人员，本项不得分",
          "max": 3,
          "path": [
            {
              "id": "3",
              "name": "游览服务"
            },
            {
              "id": "3.5",
              "name": "便利服务"
            },
            {
              "id": "3.5.2",
              "name": "个性化服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "4",
      "name": "旅游安全",
      "max": 90,
      "questions": [
        {
          "id": "4.Q001",
          "title": "安保机构",
          "note": "设有安全保卫机构",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.1",
              "name": "安保机构与制度体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q002",
          "title": "安保人员",
          "note": "数量配备充足，上岗位置分布合理（在游客集中场所、高风险旅游项目地段和有安全隐患的场所相对集中）；景区流动安全保卫人员的数量及专业技能应与景区性质及规模相适应",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.1",
              "name": "安保机构与制度体系"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q002-met",
              "label": "数量配备充足，上岗位置分布合理（在游客集中场所、高风险旅游项目地段和有安全隐患的场所相对集中）；景区流动安全保卫人员的数量及专业技能应与景区性质及规模相适应",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "4.Q003",
          "title": "安保人员持证上岗",
          "note": "安保人员持证上岗",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.1",
              "name": "安保机构与制度体系"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q003-met",
              "label": "安保人员持证上岗",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q004",
          "title": "制度体系",
          "note": "建立完善的安全保卫制度体系。根据现场检查和台账资料酌情打分",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.1",
              "name": "安保机构与制度体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q005",
          "title": "安全巡查",
          "note": "实行安全巡查制度，日常安全巡查管理有效，通过定时巡查、闭园巡查，有效维护景区设施和运营安全秩序",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.1",
              "name": "安保机构与制度体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q006",
          "title": "核定景区承载量",
          "note": "按照主管部门要求，科学核定景区承载量（包括景区承载的日最大游客容量和瞬时最大游客容量）",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q007",
          "title": "公布景区承载量",
          "note": "在景区出入口、游客中心、游客集中场所和主要活动区域等游客密集区使用信息屏（板）、广播，或通过新媒体、公共媒体等渠道公布景区承载量",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q008",
          "title": "景区流量管控",
          "note": "建立景区承载量预报预警机制，制定承载量分级管理和高峰期游客流量控制方案",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q008-met",
              "label": "建立景区承载量预报预警机制，制定承载量分级管理和高峰期游客流量控制方案",
              "score": 1,
              "note": "高峰期景区流量管控或组织疏导不力，导致景区游客过于拥挤，或排队等候时间过长，游客体验质量差或满意度明显降低的，本项不得分"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q009",
          "title": "景区客流疏导、分流措施得力，可适时采用多种方式进行疏导，处置效果好",
          "note": "景区客流疏导、分流措施得力，可适时采用多种方式进行疏导，处置效果好",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q009-met",
              "label": "景区客流疏导、分流措施得力，可适时采用多种方式进行疏导，处置效果好",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q010",
          "title": "高峰期设置舒适排队环境，提供视听、导示、观赏或互动活动，有效缓解游客等待焦虑",
          "note": "高峰期设置舒适排队环境，提供视听、导示、观赏或互动活动，有效缓解游客等待焦虑",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q010-met",
              "label": "高峰期设置舒适排队环境，提供视听、导示、观赏或互动活动，有效缓解游客等待焦虑",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.1.3",
          "title": "安全许可制度",
          "note": "景区交通、游乐等设施及经营性项目运行应按规定取得许可，有关工作人员持证上岗，操作符合规范，定期检测，无安全隐患",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.2",
              "name": "承载量管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q012",
          "title": "游客身份信息安全",
          "note": "实行预约管理和实名制购票的景区，应对游客个人信息严格保密，采取有效措施保障游客身份信息安全。未实行预约管理和实名制购票的景区，本项不扣分",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.4",
              "name": "信息安全制度"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q013",
          "title": "网络和信息安全",
          "note": "景区网络和信息安全制度健全，安全防范措施完善",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.4",
              "name": "信息安全制度"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.1.5",
          "title": "责任保险制度",
          "note": "景区对经营的高空、高速、水上、潜水、探险等高风险旅游项目投保责任保险。无高风险旅游项目的景区，本项不扣分",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.1",
              "name": "安全制度"
            },
            {
              "id": "4.1.4",
              "name": "信息安全制度"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.2.1",
          "title": "安检隔离设施",
          "note": "在景区主要出入口设置安全检查区；设置隔离栏、隔离墩、减速带或升降柱等硬质防冲撞设施",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q016",
          "title": "消防、防盗设施",
          "note": "消防、防盗等设施设备应齐全、完好， 有定期检查记录。发现一处不合格本项不得分",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.2",
              "name": "安保监控设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q017",
          "title": "安全监控系统",
          "note": "安全监控系统完善，监控设备布点合理，系统联网传输技术可靠，监控系统日常运行正常，监视监管到位",
          "max": 4,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.2",
              "name": "安保监控设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q018",
          "title": "监控数据储存",
          "note": "监控数据文件储存格式与保存时间符合当地公安、应急管理等部门要求",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.2",
              "name": "安保监控设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.2.3",
          "title": "安全防护设施",
          "note": "防地质灾害、防拥挤、防溺水、防坠落等防护设施应配备齐全、布局合理、完好有效；经营高空、高速、水上、潜水、探险等高风险旅游项目，应在醒目位置公示有关部门的经营许可或批准文件。发现一处不合格本项不得分，无高风险旅游项目的不扣分",
          "max": 4,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.2",
              "name": "安保监控设施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q020",
          "title": "警示标志设置",
          "note": "安全警示标志齐全、醒目、规范，数量充足，设置及使用应符合 GB 2894 《安全标志及其使用导则》要求。发现一处设置不足或不规范扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.4",
              "name": "安全警示标志"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "4.Q021",
          "title": "特殊地段警示与巡查",
          "note": "危险地段和未向游客开放的场所应设置恰当的隔离设施（安全护栏、水上拉网等）或醒目的警示标志；特殊地段有专人巡查或值守。发现一处不足或无效扣 1 分",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.2",
              "name": "安全设施与标志"
            },
            {
              "id": "4.2.4",
              "name": "安全警示标志"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.3.1",
          "title": "旅游安全提示",
          "note": "提示、提醒游客根据个人健康情况量力而行，谨慎参与高空、高速、水上、潜水、探险等高风险旅游项目，要求游客在专业人士指导下参与技能和安全防范要求较高的运动及游乐活动",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q023",
          "title": "安全宣传教育要求",
          "note": "主动向游客提供安全教育，并提供安全咨询服务",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            },
            {
              "id": "4.3.2",
              "name": "安全宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q024",
          "title": "安全宣传内容",
          "note": "包括景区游览安全说明或须知等，安全信息齐全、完整、规范",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            },
            {
              "id": "4.3.2",
              "name": "安全宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q025",
          "title": "安全宣传方式",
          "note": "通过视频、广播系统、移动终端、宣传牌等方式宣传安全知识和发布安全信息；危险地段、重要节点或高风险旅游项目所在区域应安装安全广播",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            },
            {
              "id": "4.3.2",
              "name": "安全宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q026",
          "title": "安全宣传规范",
          "note": "安全说明或须知等宣传内容的展示应符合国家强制性标准图形显示和中外文对照要求，并置于醒目位置",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            },
            {
              "id": "4.3.2",
              "name": "安全宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q027",
          "title": "特殊人群安全保障",
          "note": "接待老年人、未成年人、残疾人、孕妇等游客应采取相应的安全保障措施",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.3",
              "name": "安全提示与教育"
            },
            {
              "id": "4.3.2",
              "name": "安全宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "4.Q028",
          "title": "应急体系",
          "note": "建立完善的突发事件应急预案体系和应急救援体系，实施风险预警提示制度，及时发布预警信息和风险提示",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.1",
              "name": "特殊情况安全处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q029",
          "title": "培训演练",
          "note": "对直接为游客提供服务的从业人员定期开展应急救助技能培训，并至少每半年组织 1 次应急救援预案演练（否则本项不得分）",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.1",
              "name": "特殊情况安全处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q030",
          "title": "处置效果",
          "note": "反应迅速，组织得力，措施有效，事故应急处置与救援能力强",
          "max": 4,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.1",
              "name": "特殊情况安全处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q031",
          "title": "医务或急救场所",
          "note": "根据景区性质和规模，在景区游客中心或其他必要位置设立专门的医务室或急救室。无医务室或急救室本项不得分",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.2",
              "name": "医疗与急救服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q032",
          "title": "急救设施",
          "note": "在游客主要停留区域和主要游览节点配备应急救援器材与物资设备并维护良好，包括急救箱、急救担架、氧气瓶、自动体外除颤器（AED，5A 级景区必须配备，否则本项不得分），有一项完好设施得 1 分",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.2",
              "name": "医疗与急救服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q033",
          "title": "医疗服务",
          "note": "有专职或兼职医护人员，提供必要的医护与急救服务",
          "max": 3,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.2",
              "name": "医疗与急救服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q033-1",
              "label": "有专职或兼职医护人员，提供必要的医护与急救服务",
              "score": 3,
              "note": ""
            },
            {
              "key": "4.Q033-2",
              "label": "景区无医护服务项目，但与临近医院有医疗合作服务",
              "score": 2,
              "note": "有专职或兼职医护人员，提供必要的医护与急救服务"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q034",
          "title": "呼救设施",
          "note": "配有景区救援电话并向游客公布",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q034-met",
              "label": "配有景区救援电话并向游客公布",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q035",
          "title": "在景区内必要地段和位置配备应急感知报警设备",
          "note": "在景区内必要地段和位置配备应急感知报警设备",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q035-met",
              "label": "在景区内必要地段和位置配备应急感知报警设备",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q036",
          "title": "救援电话与应急感知报警设备能正常使用并及时响应",
          "note": "救援电话与应急感知报警设备能正常使用并及时响应",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "4.Q036-met",
              "label": "救援电话与应急感知报警设备能正常使用并及时响应",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q037",
          "title": "救援设施",
          "note": "根据景区实际需要配置必要救援（护）设施，如开展水上旅游、山地旅游、冰雪旅游、沙漠旅游、森林旅游及其他特种旅游活动所需的救援设施",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q038",
          "title": "救援人员",
          "note": "配备专职或兼职救援人员",
          "max": 1,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "4.Q039",
          "title": "应急救援体系",
          "note": "与当地公安、医疗、消防、救援、应急等部门或单位建立景区应急救援联动、社会公共安全事件联合处置等机制，反应快速，运行有效",
          "max": 2,
          "path": [
            {
              "id": "4",
              "name": "旅游安全"
            },
            {
              "id": "4.4",
              "name": "安全救援与应急处置"
            },
            {
              "id": "4.4.3",
              "name": "救援（护）服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "5",
      "name": "文旅融合",
      "max": 100,
      "questions": [
        {
          "id": "5.Q001",
          "title": "文化类型",
          "note": "文化类型丰富，拥有但不限于自然生态、历史人文、红色教育、科学技术、文学艺术、民族民俗等 2 种或 2 种以上的文化类型",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.1",
              "name": "文化丰富性"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q002",
          "title": "文化内涵",
          "note": "文化内涵包括物质文化和非物质文化方面所蕴含的文化知识及其价值意义，可从历史底蕴、价值观念、精神信仰、物质创造、习俗传统、科技制度、文学艺术等方面，参考景区历史文献或专家评审意见进行衡量",
          "max": 6,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.1",
              "name": "文化丰富性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q002-1",
              "label": "非常丰富：历史传承悠久或底蕴深厚、文化类型多样或覆盖面广、文化知识非常丰富、文化价值很高、文化意义重大",
              "score": 6,
              "note": "文化内涵包括物质文化和非物质文化方面所蕴含的文化知识及其价值意义，可从历史底蕴、价值观念、精神信仰、物质创造、习俗传统、科技制度、文学艺术等方面，参考景区历史文献或专家评审意见进行衡量"
            },
            {
              "key": "5.Q002-2",
              "label": "比较丰富：历史传承较久或底蕴较厚、文化类型较多或覆盖面较广、文化知识比较丰富、文化价值较高、文化意义较大",
              "score": 5,
              "note": "文化内涵包括物质文化和非物质文化方面所蕴含的文化知识及其价值意义，可从历史底蕴、价值观念、精神信仰、物质创造、习俗传统、科技制度、文学艺术等方面，参考景区历史文献或专家评审意见进行衡量"
            },
            {
              "key": "5.Q002-3",
              "label": "相对一般：有一定的历史传承和文化底蕴、文化类型和知识含量、文化价值和文化意义",
              "score": 4,
              "note": "文化内涵包括物质文化和非物质文化方面所蕴含的文化知识及其价值意义，可从历史底蕴、价值观念、精神信仰、物质创造、习俗传统、科技制度、文学艺术等方面，参考景区历史文献或专家评审意见进行衡量"
            },
            {
              "key": "5.Q002-4",
              "label": "比较薄弱：历史传承和文化底蕴、文化类型和知识含量、文化价值和文化意义均相对不足",
              "score": 3,
              "note": "文化内涵包括物质文化和非物质文化方面所蕴含的文化知识及其价值意义，可从历史底蕴、价值观念、精神信仰、物质创造、习俗传统、科技制度、文学艺术等方面，参考景区历史文献或专家评审意见进行衡量"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q003",
          "title": "文化主题",
          "note": "文化脉络清楚，主体文化突出，文化主题鲜明",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.2",
              "name": "主题特色性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q003-1",
              "label": "文化脉络清楚，主体文化突出，文化主题鲜明",
              "score": 3,
              "note": ""
            },
            {
              "key": "5.Q003-2",
              "label": "文化脉络比较清楚，主体文化较为突出，文化主题比较鲜明",
              "score": 2,
              "note": "文化脉络清楚，主体文化突出，文化主题鲜明"
            },
            {
              "key": "5.Q003-3",
              "label": "文化脉络不够清楚，主体文化不够突出，文化主题不够鲜明",
              "score": 1,
              "note": "文化脉络清楚，主体文化突出，文化主题鲜明"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q004",
          "title": "文化特色",
          "note": "文化特色或地域特点突出，或主题文化创意在全国非常独特",
          "max": 6,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.2",
              "name": "主题特色性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q004-1",
              "label": "文化特色或地域特点突出，或主题文化创意在全国非常独特",
              "score": 6,
              "note": ""
            },
            {
              "key": "5.Q004-2",
              "label": "文化特色或地域特点比较突出，或主题文化创意在全省具有独特性",
              "score": 5,
              "note": "文化特色或地域特点突出，或主题文化创意在全国非常独特"
            },
            {
              "key": "5.Q004-3",
              "label": "有一定的文化特色，或主题文化创意在全市（州、地区）比较独特",
              "score": 3,
              "note": "文化特色或地域特点突出，或主题文化创意在全国非常独特"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q005",
          "title": "主题结合程度",
          "note": "文化主题与景区设施、产品和服务结合紧密",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.3",
              "name": "主题贯穿性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q005-1",
              "label": "文化主题与景区设施、产品和服务结合紧密",
              "score": 3,
              "note": ""
            },
            {
              "key": "5.Q005-2",
              "label": "文化主题与景区设施、产品和服务结合比较紧密",
              "score": 2,
              "note": "文化主题与景区设施、产品和服务结合紧密"
            },
            {
              "key": "5.Q005-3",
              "label": "文化主题与景区设施、产品和服务结合一般",
              "score": 1,
              "note": "文化主题与景区设施、产品和服务结合紧密"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q006",
          "title": "主题贯穿环节",
          "note": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的全过程",
          "max": 4,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.1",
              "name": "文化主题"
            },
            {
              "id": "5.1.3",
              "name": "主题贯穿性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q006-1",
              "label": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的全过程",
              "score": 4,
              "note": ""
            },
            {
              "key": "5.Q006-2",
              "label": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的大多数环节",
              "score": 3,
              "note": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的全过程"
            },
            {
              "key": "5.Q006-3",
              "label": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的部分环节",
              "score": 2,
              "note": "文化主题贯穿开发运营、活动组织、宣传推广及游览服务的全过程"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q007",
          "title": "建筑文化氛围",
          "note": "文化元素充分融入景区主要建筑，建筑景观有文化气息",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.1",
              "name": "文化氛围"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q008",
          "title": "设施文化氛围",
          "note": "文化元素充分融入景区游览设施（包括游客中心、标志标牌、游览线路、旅游厕所等），设施文化氛围良好",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.1",
              "name": "文化氛围"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q009",
          "title": "产品文化氛围",
          "note": "文化元素充分融入旅游产品和服务活动，产品服务文化氛围浓厚",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.1",
              "name": "文化氛围"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q010",
          "title": "展示场所",
          "note": "有文化展示场所，包括但不限于博物馆、民俗馆、展览馆、科普馆、演艺馆、文化长廊、非物质文化展示展演（传习）馆等场所，或有展示文化的相关业态",
          "max": 5,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q010-met",
              "label": "有文化展示场所，包括但不限于博物馆、民俗馆、展览馆、科普馆、演艺馆、文化长廊、非物质文化展示展演（传习）馆等场所，或有展示文化的相关业态",
              "score": 5,
              "note": "根据文化展示场所状态与展示方式的多样性、有效性和先进性，以及展示周期评分"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q011",
          "title": "有临时性文化展示场所或活动",
          "note": "有临时性文化展示场所或活动",
          "max": 1,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q011-met",
              "label": "有临时性文化展示场所或活动",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q012",
          "title": "展示形式",
          "note": "景观、实物、图片展示",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q012-met",
              "label": "景观、实物、图片展示",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q013",
          "title": "活动展示与互动式体验，包括科普教育、文化节事、演艺娱乐、非物质文化遗产展示展陈展演、文化体验、体育赛事等",
          "note": "活动展示与互动式体验，包括科普教育、文化节事、演艺娱乐、非物质文化遗产展示展陈展演、文化体验、体育赛事等",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q013-met",
              "label": "活动展示与互动式体验，包括科普教育、文化节事、演艺娱乐、非物质文化遗产展示展陈展演、文化体验、体育赛事等",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q014",
          "title": "科技应用场景与数字化展示，利用新一代信息技术与声光电等科技手段有效展示和活化文化",
          "note": "科技应用场景与数字化展示，利用新一代信息技术与声光电等科技手段有效展示和活化文化",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q014-met",
              "label": "科技应用场景与数字化展示，利用新一代信息技术与声光电等科技手段有效展示和活化文化",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q015",
          "title": "展示效果",
          "note": "文化展示场所形态与展示方式多样，展示内容具有有效性和先进性，并定期更新",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.2",
              "name": "文化展示"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q016",
          "title": "产品丰度",
          "note": "有丰富的文化旅游产品与体验活动（不含旅游演艺和非遗旅游产品）。有一项文化旅游产品或活动得 2 分",
          "max": 6,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.3",
              "name": "文化旅游产品"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q016-met",
              "label": "有丰富的文化旅游产品与体验活动（不含旅游演艺和非遗旅游产品）。有一项文化旅游产品或活动得 2 分",
              "score": 6,
              "note": "根据景区开发和提供给游客消费、体验的文化旅游产品与活动的类型、质量、特色、效果评分"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q017",
          "title": "有旅游演艺产品或非物质文化遗产展示展演项目",
          "note": "有旅游演艺产品或非物质文化遗产展示展演项目。有一项旅游演艺或非物质文化遗产转化的文化旅游产品或活动得 2 分",
          "max": 4,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.3",
              "name": "文化旅游产品"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q017-met",
              "label": "有旅游演艺产品或非物质文化遗产展示展演项目。有一项旅游演艺或非物质文化遗产转化的文化旅游产品或活动得 2 分",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q018",
          "title": "产品特色",
          "note": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比具有明显的特点或突出的优势，地方特色或景区特色强",
          "max": 7,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.3",
              "name": "文化旅游产品"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q018-1",
              "label": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比具有明显的特点或突出的优势，地方特色或景区特色强",
              "score": 7,
              "note": ""
            },
            {
              "key": "5.Q018-2",
              "label": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比具有较为明显的特点或优势，地方特色或景区特色较强",
              "score": 5,
              "note": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比具有明显的特点或突出的优势，地方特色或景区特色强"
            },
            {
              "key": "5.Q018-3",
              "label": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比特点或优势不够明显，地方特色或景区特色一般",
              "score": 3,
              "note": "文化旅游产品或活动在创意设计、功能特性、文化内涵、展现形式、服务方式等方面与其他同类景区相比具有明显的特点或突出的优势，地方特色或景区特色强"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q019",
          "title": "产品品质",
          "note": "文化旅游项目参与互动性强，体验效果好，产品品质高，能很好满足游客情绪价值追求和旅游消费需要",
          "max": 8,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.3",
              "name": "文化旅游产品"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q019-1",
              "label": "文化旅游项目参与互动性强，体验效果好，产品品质高，能很好满足游客情绪价值追求和旅游消费需要",
              "score": 8,
              "note": ""
            },
            {
              "key": "5.Q019-2",
              "label": "文化旅游项目参与互动性较强，体验效果较好，产品品质较高，能较好满足游客情绪价值追求和旅游消费需要",
              "score": 6,
              "note": "文化旅游项目参与互动性强，体验效果好，产品品质高，能很好满足游客情绪价值追求和旅游消费需要"
            },
            {
              "key": "5.Q019-3",
              "label": "文化旅游项目有一定的参与互动性、体验效果和产品品质，能在一定程度上满足游客情绪价值追求和旅游消费需要",
              "score": 4,
              "note": "文化旅游项目参与互动性强，体验效果好，产品品质高，能很好满足游客情绪价值追求和旅游消费需要"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q020",
          "title": "文创水平",
          "note": "文化创意水准较高",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.4",
              "name": "景区文创"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q020-1",
              "label": "文化创意水准较高",
              "score": 2,
              "note": ""
            },
            {
              "key": "5.Q020-2",
              "label": "有一定的文化创意",
              "score": 1,
              "note": "文化创意水准较高"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q021",
          "title": "文创特色",
          "note": "景区文创产品新颖独特，有本地或本景区特色",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.4",
              "name": "景区文创"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q021-1",
              "label": "景区文创产品新颖独特，有本地或本景区特色",
              "score": 2,
              "note": ""
            },
            {
              "key": "5.Q021-2",
              "label": "景区文创产品有一定特色",
              "score": 1,
              "note": "景区文创产品新颖独特，有本地或本景区特色"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q022",
          "title": "文创品牌",
          "note": "有景区独特的文创品牌",
          "max": 1,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.4",
              "name": "景区文创"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q023",
          "title": "文创效应",
          "note": "文创品类丰富，有代表性文创产品，市场反响好",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.2",
              "name": "文化利用"
            },
            {
              "id": "5.2.4",
              "name": "景区文创"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q024",
          "title": "传播活动",
          "note": "景区有持续开展的文化传播活动",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.1",
              "name": "传播效果与景区形象"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q025",
          "title": "传播效果",
          "note": "可结合景区文化传播媒体的阅读量、评论数量、点赞数、分享数及主流媒体对景区的报道等指标评判",
          "max": 4,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.1",
              "name": "传播效果与景区形象"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q025-1",
              "label": "文化传播范围广、受众参与程度深、社会影响大，传播效果显著",
              "score": 4,
              "note": "可结合景区文化传播媒体的阅读量、评论数量、点赞数、分享数及主流媒体对景区的报道等指标评判"
            },
            {
              "key": "5.Q025-2",
              "label": "文化传播范围较广、受众参与程度较深、社会影响较大，传播效果比较显著",
              "score": 3,
              "note": "可结合景区文化传播媒体的阅读量、评论数量、点赞数、分享数及主流媒体对景区的报道等指标评判"
            },
            {
              "key": "5.Q025-3",
              "label": "有一定的文化传播范围、受众参与程度和社会影响，文化传播效果一般",
              "score": 2,
              "note": "可结合景区文化传播媒体的阅读量、评论数量、点赞数、分享数及主流媒体对景区的报道等指标评判"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "5.Q026",
          "title": "景区形象",
          "note": "市场形象鲜明，有明确、稳定的标志（LOGO）和宣传语",
          "max": 1,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.1",
              "name": "传播效果与景区形象"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q026-met",
              "label": "市场形象鲜明，有明确、稳定的标志（LOGO）和宣传语",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q027",
          "title": "产品形象良好",
          "note": "产品形象良好",
          "max": 1,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.1",
              "name": "传播效果与景区形象"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q027-met",
              "label": "产品形象良好",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q028",
          "title": "质量形象良好",
          "note": "质量形象良好",
          "max": 1,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.1",
              "name": "传播效果与景区形象"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "5.Q028-met",
              "label": "质量形象良好",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q029",
          "title": "组织（企业）文化特色",
          "note": "运营主体建立的组织文化具有特色",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.2",
              "name": "组织（企业）文化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q030",
          "title": "价值观念和经营理念",
          "note": "具有科学的价值观念和经营理念",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.2",
              "name": "组织（企业）文化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q031",
          "title": "组织（企业）文化活动",
          "note": "有组织（企业）文化活动，内容丰富，员工参与度高",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.2",
              "name": "组织（企业）文化"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q032",
          "title": "文化认同度",
          "note": "员工对景区熟悉、对景区（组织）文化认同度高",
          "max": 3,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.3",
              "name": "员工认同"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "5.Q033",
          "title": "传播文化意识",
          "note": "员工有景区自豪感，传播景区文化意识强",
          "max": 2,
          "path": [
            {
              "id": "5",
              "name": "文旅融合"
            },
            {
              "id": "5.3",
              "name": "文化建设与传播"
            },
            {
              "id": "5.3.3",
              "name": "员工认同"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "6",
      "name": "智慧旅游",
      "max": 110,
      "questions": [
        {
          "id": "6.Q001",
          "title": "宽带网络",
          "note": "有宽带网络并能满足景区服务与管理需要",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.1",
              "name": "网络信号服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q002",
          "title": "移动通信信号",
          "note": "覆盖游客主要游览区域，包括景区入口、游客中心、各景点等游客聚集区以及缆车、电瓶车、大巴等景区换乘车辆经过处。发现某一区域无信号，扣 1 分",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.1",
              "name": "网络信号服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q003",
          "title": "无线局域网",
          "note": "免费无线局域网覆盖景区游客可游览的主要区域，包括景区入口、游客中心、场馆、各景点等游客聚集区。发现某一区域无信号，扣 1 分",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.1",
              "name": "网络信号服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q004",
          "title": "信号质量",
          "note": "移动通信信号强度、稳定性和传输速率可满足游客需求，无线局域网网速流畅",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.1",
              "name": "网络信号服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q005",
          "title": "网站建设",
          "note": "有可获取景区相关信息的网站，具有面向游客的景区游览信息、景区可达公共交通说明、虚拟旅游、视频展示、少儿或特殊人群专区、电子商务等多种功能（具备 3 种以下功能得 1 分；具备 3 种及以上功能得 2 分；网站设有外文版得 1 分）",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.2",
              "name": "网站与新媒体平台"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q006",
          "title": "新媒体平台",
          "note": "新媒体类型：设立运营正常的景区新媒体信息服务平台，有一种新媒体平台得 1 分",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.2",
              "name": "网站与新媒体平台"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q006-met",
              "label": "新媒体类型：设立运营正常的景区新媒体信息服务平台，有一种新媒体平台得 1 分",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q007",
          "title": "新媒体功能：利用新媒体平台提供资讯发布、信息查询、预约预订、在线购票、导游导览、投诉反馈等服务，内容丰富",
          "note": "新媒体功能：利用新媒体平台提供资讯发布、信息查询、预约预订、在线购票、导游导览、投诉反馈等服务，内容丰富、功能完善",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.2",
              "name": "网站与新媒体平台"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q007-met",
              "label": "新媒体功能：利用新媒体平台提供资讯发布、信息查询、预约预订、在线购票、导游导览、投诉反馈等服务，内容丰富、功能完善",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q008",
          "title": "一站式服务",
          "note": "将景区服务信息综合集成到某个网站或新媒体平台，一次性地完整提供相关信息与游客所需的服务",
          "max": 1,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.2",
              "name": "网站与新媒体平台"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q009",
          "title": "信息发布设施",
          "note": "在景区出入口、游客中心和游客集聚区域布设信息发布设施",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.3",
              "name": "信息发布"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q010",
          "title": "信息发布渠道",
          "note": "通过景区广播、信息展示屏、相关网站、新媒体平台、手机短信、官方 App 或小程序等渠道及时发布景区信息",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.3",
              "name": "信息发布"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q011",
          "title": "信息发布内容",
          "note": "包括景区（点）开放时间、天气状况、空气质量、停车寻车、售票价格、景区介绍、服务设施、旅游活动等服务信息，游客流量、拥挤程度（预计等候时长）、灾情险情、疏散渠道等提示信息，景区服务人员、游客评价等诚信信息，信息发布内容准确、及时、有效",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.3",
              "name": "信息发布"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "6.Q012",
          "title": "自助导览服务",
          "note": "提供自助导览服务，可通过触摸屏、移动应用软件或其他形式手机端，提供景点导航、导览、景点讲解、导购和内容体验等服务",
          "max": 5,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.4",
              "name": "智慧游览服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q013",
          "title": "适老化智慧服务",
          "note": "提供适合老年游览的智慧旅游设施，开发适老版应用程序及功能模块，为老年游客提供个性化的便利服务",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.4",
              "name": "智慧游览服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q014",
          "title": "智能互动服务",
          "note": "利用 AI 智能互动技术（数字人、AI 机器人等）为游客提供智能对话和交互服务",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.4",
              "name": "智慧游览服务"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q015",
          "title": "数字产品与场景",
          "note": "开发数字化旅游产品，提供虚拟现实、沉浸式体验等旅游新场景与新空间",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.5",
              "name": "数字旅游体验"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q016",
          "title": "数字旅游体验质量",
          "note": "数字技术与旅游项目有机结合，故事性与特色性强，沉浸感与体验感好",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.1",
              "name": "智慧服务"
            },
            {
              "id": "6.1.5",
              "name": "数字旅游体验"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q017",
          "title": "电子门禁",
          "note": "有智能化的电子门禁系统",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.1",
              "name": "智能门禁系统"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q018",
          "title": "验证方式",
          "note": "支持纸质或电子二维码、身份证、IC 卡、手持验票机、验单 App 等不少于 2 种验证方式",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.1",
              "name": "智能门禁系统"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q019",
          "title": "安装场所",
          "note": "游客游览的重要节点（景区入口、停车场、游客中心、游步道、主要景点、餐饮点、购物点、事故多发地等场所）和主要游览区域安装监控设备。现场检查发现一处没有监控设备扣 1 分",
          "max": 6,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.2",
              "name": "监控监测设备"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q020",
          "title": "设备功能",
          "note": "能有效支持客流、车流数据采集和环境、安全等相关监测",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.2",
              "name": "监控监测设备"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q021",
          "title": "智能监控",
          "note": "具备智慧化安全监管和自动感知警示（预警）能力",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.2",
              "name": "监控监测设备"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q022",
          "title": "数据采集维护",
          "note": "景区数据规范采集、集中管理、有效维护",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.3",
              "name": "数据管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q023",
          "title": "数据存储利用",
          "note": "依托本地或云端数据中心，安全存储和利用景区数据",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.3",
              "name": "数据管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q024",
          "title": "资源环境管理",
          "note": "围绕景区生态环境、旅游资源、设施设备、商业资源、人力资源等管理和应用需求，具备智慧化资源管理能力",
          "max": 5,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.4",
              "name": "智慧管理系统"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q025",
          "title": "景区运营管理",
          "note": "围绕景区票务、咨询、讲解、车船管理、接待、投诉、环境卫生、业态运营、安全监管与实时客流管控、舆情监测等业务需求，具备智慧化运营管理能力",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.4",
              "name": "智慧管理系统"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q025-met",
              "label": "围绕景区票务、咨询、讲解、车船管理、接待、投诉、环境卫生、业态运营、安全监管与实时客流管控、舆情监测等业务需求，具备智慧化运营管理能力",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "6.Q026",
          "title": "具备集成式、一体化的景区智慧化运营管理系统",
          "note": "具备集成式、一体化的景区智慧化运营管理系统",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.4",
              "name": "智慧管理系统"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q026-met",
              "label": "具备集成式、一体化的景区智慧化运营管理系统",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q027",
          "title": "技术应用创新",
          "note": "能及时将新一代信息技术（包括但不限于新一代移动通信、云计算、物联网、大数据、虚拟现实、人工智能、无人机、机器人等）应用到景区设施配备、产品开发、旅游服务和运营管理中，应用创新能力强",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.2",
              "name": "智慧管理"
            },
            {
              "id": "6.2.4",
              "name": "智慧管理系统"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q028",
          "title": "智慧营销机制",
          "note": "建立数字化的市场营销运行机制",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q029",
          "title": "智慧营销活动",
          "note": "利用网络和新媒体建立智慧营销渠道，开展线上线下营销互动及市场销售活动，包括在全国主流旅游网站、主流旅游在线平台设立页面等",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q029-met",
              "label": "利用网络和新媒体建立智慧营销渠道，开展线上线下营销互动及市场销售活动，包括在全国主流旅游网站、主流旅游在线平台设立页面等",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q030",
          "title": "开展旅游直播，运用自媒体或新媒体平台进行宣传促销，或与自媒体博主合作开展营销活动",
          "note": "开展旅游直播，运用自媒体或新媒体平台进行宣传促销，或与自媒体博主合作开展营销活动",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q030-met",
              "label": "开展旅游直播，运用自媒体或新媒体平台进行宣传促销，或与自媒体博主合作开展营销活动",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q031",
          "title": "在导航电子地图上提供位置服务或在景区信息发布平台提供活动位置信息，用户使用体验良好",
          "note": "在导航电子地图上提供位置服务或在景区信息发布平台提供活动位置信息，用户使用体验良好",
          "max": 2,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q031-met",
              "label": "在导航电子地图上提供位置服务或在景区信息发布平台提供活动位置信息，用户使用体验良好",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q032",
          "title": "新技术营销和精准营销",
          "note": "能运用大数据分析旅游消费需求行为，预测市场发展趋势，采取针对性的营销策略和措施进行精准营销",
          "max": 4,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q032-met",
              "label": "能运用大数据分析旅游消费需求行为，预测市场发展趋势，采取针对性的营销策略和措施进行精准营销",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q033",
          "title": "能运用人工智能技术或人工智能大模型等新技术手段开展景区智能营销",
          "note": "能运用人工智能技术或人工智能大模型等新技术手段开展景区智能营销",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.1",
              "name": "智慧营销机制与方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q033-met",
              "label": "能运用人工智能技术或人工智能大模型等新技术手段开展景区智能营销",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q034",
          "title": "营销效果监测",
          "note": "运用智慧化手段监测营销效果",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.2",
              "name": "智慧营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q034-met",
              "label": "运用智慧化手段监测营销效果",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q035",
          "title": "建立游客意见和建议实时收集与反馈系统",
          "note": "建立游客意见和建议实时收集与反馈系统",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.2",
              "name": "智慧营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q035-met",
              "label": "建立游客意见和建议实时收集与反馈系统",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q036",
          "title": "效果评估与改进",
          "note": "建立市场营销效果评估机制",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.2",
              "name": "智慧营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q036-met",
              "label": "建立市场营销效果评估机制",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "6.Q037",
          "title": "根据监测的市场信息及时制定营销与服务改进措施，并有效实施",
          "note": "根据监测的市场信息及时制定营销与服务改进措施，并有效实施",
          "max": 3,
          "path": [
            {
              "id": "6",
              "name": "智慧旅游"
            },
            {
              "id": "6.3",
              "name": "智慧营销"
            },
            {
              "id": "6.3.2",
              "name": "智慧营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "6.Q037-met",
              "label": "根据监测的市场信息及时制定营销与服务改进措施，并有效实施",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "7",
      "name": "资源与环境保护",
      "max": 150,
      "questions": [
        {
          "id": "7.1.1",
          "title": "空气质量",
          "note": "符合 GB 3095 《环境空气质量标准》规定的一类区环境空气质量要求。以当地旅游旺季的情况为准，现场检查并结合鉴定材料评估。如景区经营性项目排放废气（如汽车尾气、焚烧烟气、餐饮油烟等）对环境空气造成较大污染，本项不得分",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.1",
              "name": "环境质量"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "7.1.2",
          "title": "声环境质量",
          "note": "符合 GB 3096《声环境质量标准》对相应类别声环境功能区的噪声限值要求。核心景区因导游讲解、商业及娱乐活动等噪声过大，导致游客体验质量明显下降，本项不得分",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.1",
              "name": "环境质量"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "7.1.3",
          "title": "地表水质量",
          "note": "景区地表水符合GB 3838《地表水环境质量标准》要求（达到功能类别Ⅴ类及以上标准），或符合当地水功能区划的相关要求",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.1",
              "name": "环境质量"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "7.1.4",
          "title": "污水排放",
          "note": "有完善的排污设施，污水排放符合 GB 8978《污水综合排放标准》规定的综合排放要求",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.1",
              "name": "环境质量"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "7.2.1",
          "title": "卫生状况",
          "note": "环境整洁，氛围优良，无污水、污物，无乱建、乱堆、乱放现象，建筑物及各种设施设备无剥落、无污垢，空气清新、无异味。发现一处不合格扣 1 分",
          "max": 8,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "instrument-check"
        },
        {
          "id": "7.2.2",
          "title": "卫生标准",
          "note": "各类旅游公共场所卫生应符合 GB 37487 《公共场所卫生管理规范》、GB 37488《公共场所卫生指标及限值要求》、 GB 37489.1《公共场所设计卫生规范 第 1 部分：总则》规定，人工游泳场所卫生达到 GB 37489.3 《公共场所设计卫生规范 第 3 部分：人工游泳场所》相关要求，卫生条件符合游客健康旅游需求。发现一处不合格扣 1 分",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q007",
          "title": "垃圾分类",
          "note": "垃圾按 GB/T 19095 《生活垃圾分类标志》要求分类投放",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.2.3",
              "name": "垃圾清扫与处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q008",
          "title": "垃圾清扫",
          "note": "清扫及时，跟踪（流动）清扫",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.2.3",
              "name": "垃圾清扫与处置"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q008-met",
              "label": "清扫及时，跟踪（流动）清扫",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q009",
          "title": "日产日清，不留隔夜垃圾",
          "note": "日产日清，不留隔夜垃圾",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.2.3",
              "name": "垃圾清扫与处置"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q009-met",
              "label": "日产日清，不留隔夜垃圾",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q010",
          "title": "垃圾处理",
          "note": "垃圾的收集、运输和处置符合属地管理的相关规定，能分类处理，不就地焚烧或掩埋",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.2.3",
              "name": "垃圾清扫与处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q011",
          "title": "垃圾回收",
          "note": "有鼓励游客自行带走垃圾的制度或措施",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.2.3",
              "name": "垃圾清扫与处置"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q012",
          "title": "资源保护制度",
          "note": "建立完善的自然资源、文化资源（文物资源、非物质文化遗产等）保护制度，或景区绿色发展制度健全",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.3.1",
              "name": "保护制度"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q013",
          "title": "环境保护制度",
          "note": "严守生态保护红线，生态安全性好；建立完善的环境保护制度与实施、监测机制",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.3.1",
              "name": "保护制度"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q014",
          "title": "费用投入",
          "note": "根据全年用于景区旅游资源与环境保护及维护或景区绿色转型发展的费用占景区全年收入的比例进行评估，要求提供相应财务证明或第三方机构财务审计报告。免门票景区可根据资源保护投入占其综合收入的比例酌情打分",
          "max": 7,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.2",
              "name": "环境卫生"
            },
            {
              "id": "7.3.1",
              "name": "保护制度"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q014-1",
              "label": "投入比例达到景区全年收入的 3% 以上",
              "score": 7,
              "note": "根据全年用于景区旅游资源与环境保护及维护或景区绿色转型发展的费用占景区全年收入的比例进行评估，要求提供相应财务证明或第三方机构财务审计报告。免门票景区可根据资源保护投入占其综合收入的比例酌情打分"
            },
            {
              "key": "7.Q014-2",
              "label": "投入比例达到景区全年收入的 1%~3%",
              "score": 5,
              "note": "根据全年用于景区旅游资源与环境保护及维护或景区绿色转型发展的费用占景区全年收入的比例进行评估，要求提供相应财务证明或第三方机构财务审计报告。免门票景区可根据资源保护投入占其综合收入的比例酌情打分"
            },
            {
              "key": "7.Q014-3",
              "label": "投入比例达到景区全年收入 1% 以下（如投入为“0”则本项不得分）",
              "score": 3,
              "note": "根据全年用于景区旅游资源与环境保护及维护或景区绿色转型发展的费用占景区全年收入的比例进行评估，要求提供相应财务证明或第三方机构财务审计报告。免门票景区可根据资源保护投入占其综合收入的比例酌情打分"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "7.Q015",
          "title": "保护目标",
          "note": "资源保护范围、保护对象明确",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q016",
          "title": "人员职责",
          "note": "保护人员职责明确",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q017",
          "title": "方法手段",
          "note": "资源保护方法和手段科学，采取多种有效措施保护景区的自然资源、文物与文化遗产资源",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q017-met",
              "label": "资源保护方法和手段科学，采取多种有效措施保护景区的自然资源、文物与文化遗产资源",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q018",
          "title": "采用数字化手段对资源建档保护",
          "note": "采用数字化手段对资源建档保护",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q018-met",
              "label": "采用数字化手段对资源建档保护",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q019",
          "title": "开发利用",
          "note": "合理开发利用旅游资源，开发强度不大于资源承载力，无破坏性开发现象",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.4.2",
          "title": "保护效果",
          "note": "全面保持自然资源、文物与文化遗产资源真实性与完整性",
          "max": 10,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.4",
              "name": "资源保护"
            },
            {
              "id": "7.4.1",
              "name": "保护措施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.4.2-1",
              "label": "全面保持自然资源、文物与文化遗产资源真实性与完整性",
              "score": 10,
              "note": ""
            },
            {
              "key": "7.4.2-2",
              "label": "基本保持自然资源、文物与文化遗产资源真实性与完整性",
              "score": 7,
              "note": "全面保持自然资源、文物与文化遗产资源真实性与完整性"
            },
            {
              "key": "7.4.2-3",
              "label": "自然资源、文物与文化遗产资源真实性与完整性保护相对不足",
              "score": 4,
              "note": "全面保持自然资源、文物与文化遗产资源真实性与完整性"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q021",
          "title": "环境氛围",
          "note": "景区环境整洁美观，环境氛围好",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.1",
              "name": "景观环境"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q022",
          "title": "绿化与景观美化效果",
          "note": "绿化覆盖率高（文保单位等有特殊要求，或因特殊自然地理环境而无法实现大面积绿化的，本项不扣分），或景观与环境美化措施多样，美化效果好",
          "max": 6,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.1",
              "name": "景观环境"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "7.Q023",
          "title": "出入口环境",
          "note": "出入口有相应的游客集散场地，面积适宜，设施设置适当；有过度硬化等现象的，扣 1-2 分",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q023-met",
              "label": "出入口有相应的游客集散场地，面积适宜，设施设置适当；有过度硬化等现象的，扣 1-2 分",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "7.Q024",
          "title": "出入口秩序良好，人员和车辆出入有序，且无拉客、宰客、欺客现象",
          "note": "出入口秩序良好，人员和车辆出入有序，且无拉客、宰客、欺客现象",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q024-met",
              "label": "出入口秩序良好，人员和车辆出入有序，且无拉客、宰客、欺客现象",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q025",
          "title": "出入口主体建筑体量、材质、造型、色彩的综合效果良好",
          "note": "出入口主体建筑体量、材质、造型、色彩的综合效果良好",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q025-met",
              "label": "出入口主体建筑体量、材质、造型、色彩的综合效果良好",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q026",
          "title": "建筑设施与布局",
          "note": "建筑与设施（游客中心、场馆、厕所、停车场、观景台、游步道等）布局合理，选址不破坏景观，主体建筑选址对景观有破坏的，每处扣 2 分；非主体建筑选址对景观有破坏的，每处扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q026-met",
              "label": "建筑与设施（游客中心、场馆、厕所、停车场、观景台、游步道等）布局合理，选址不破坏景观，主体建筑选址对景观有破坏的，每处扣 2 分；非主体建筑选址对景观有破坏的，每处扣 1 分",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q027",
          "title": "主体建筑体量适度，建筑风格协调并具有特色，景观效果良好",
          "note": "主体建筑体量适度，建筑风格协调并具有特色，景观效果良好",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q027-met",
              "label": "主体建筑体量适度，建筑风格协调并具有特色，景观效果良好",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q028",
          "title": "建材选用合理，优先选用天然材料或环保、节能、低碳的建筑材料，发现一处采用不合规、不环保的建筑材料，或使用",
          "note": "建材选用合理，优先选用天然材料或环保、节能、低碳的建筑材料，发现一处采用不合规、不环保的建筑材料，或使用明显有碍观赏景观的建筑材料，扣 1 分",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q028-met",
              "label": "建材选用合理，优先选用天然材料或环保、节能、低碳的建筑材料，发现一处采用不合规、不环保的建筑材料，或使用明显有碍观赏景观的建筑材料，扣 1 分",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q029",
          "title": "建筑设施与环境的协调性",
          "note": "建筑设施外观（造型、色调、材料等）与景观环境相协调。发现一处建筑设施外观与整体景观环境不协调扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q029-met",
              "label": "建筑设施外观（造型、色调、材料等）与景观环境相协调。发现一处建筑设施外观与整体景观环境不协调扣 1 分",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q030",
          "title": "配套附属建筑设施选址隐蔽、合理或外观美化，包括锅炉房、配电室、水塔、烟囱、电力电信设施及其用房等",
          "note": "配套附属建筑设施选址隐蔽、合理或外观美化，包括锅炉房、配电室、水塔、烟囱、电力电信设施及其用房等",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q030-met",
              "label": "配套附属建筑设施选址隐蔽、合理或外观美化，包括锅炉房、配电室、水塔、烟囱、电力电信设施及其用房等",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q031",
          "title": "管线设施隐蔽，输电、通信线路等全部采用地下隐蔽方式得 4 分",
          "note": "管线设施隐蔽，输电、通信线路等全部采用地下隐蔽方式得 4 分；架空线路整齐、不破坏视觉效果得 2 分",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q031-met",
              "label": "管线设施隐蔽，输电、通信线路等全部采用地下隐蔽方式得 4 分；架空线路整齐、不破坏视觉效果得 2 分",
              "score": 4,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q032",
          "title": "宣传标语布置得当，用语规范，具有文化性、艺术性、正面导向性，与周围景观相协调",
          "note": "宣传标语布置得当，用语规范，具有文化性、艺术性、正面导向性，与周围景观相协调",
          "max": 1,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q032-met",
              "label": "宣传标语布置得当，用语规范，具有文化性、艺术性、正面导向性，与周围景观相协调",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q033",
          "title": "广告招牌适当，不乱贴、乱放、乱摆小广告，商品广告和商业服务设施招牌与环境相协调，外部广告标志不过分影响观",
          "note": "广告招牌适当，不乱贴、乱放、乱摆小广告，商品广告和商业服务设施招牌与环境相协调，外部广告标志不过分影响观景效果",
          "max": 1,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q033-met",
              "label": "广告招牌适当，不乱贴、乱放、乱摆小广告，商品广告和商业服务设施招牌与环境相协调，外部广告标志不过分影响观景效果",
              "score": 1,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q034",
          "title": "景区周边环境的协调性",
          "note": "景区与周边地带设有隔离带或缓冲区，具有水体、山体等自然缓冲区的，得 3 分；具有绿化、围栏等人工隔离带的，得 2 分",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q034-met",
              "label": "景区与周边地带设有隔离带或缓冲区，具有水体、山体等自然缓冲区的，得 3 分；具有绿化、围栏等人工隔离带的，得 2 分",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q035",
          "title": "景区周边建筑物与景观格调相协调，或景区周边形成优美的天际轮廓线",
          "note": "景区周边建筑物与景观格调相协调，或景区周边形成优美的天际轮廓线",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.2",
              "name": "环境协调性"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "7.Q035-met",
              "label": "景区周边建筑物与景观格调相协调，或景区周边形成优美的天际轮廓线",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q036",
          "title": "污染源控制",
          "note": "景区内无显著污染源（大气、水、土壤、噪声等），景区内各项设施设备、能源利用与污染物排放符合国家环境保护要求，不造成环境污染和其他公害，不破坏旅游资源和游览氛围；景区周边无对景区产生显著影响的污染源。每发现一处污染源，视情节严重程度扣 2~3 分",
          "max": 5,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.3",
              "name": "环境保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q037",
          "title": "节能设施",
          "note": "采用节能低碳的设施设备。发现一处景区内使用造成严重破坏环境的设施设备 ( 包括产生高噪音或有害气体、漏油漏气的车辆、船舶等 )，扣 2 分",
          "max": 4,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.3",
              "name": "环境保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q038",
          "title": "环保用品",
          "note": "采用环保型用品，发现景区内使用有毒有害用品或不可降解的一次性餐具等非环保型用品，本项不得分",
          "max": 3,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.3",
              "name": "环境保护措施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q039",
          "title": "覆盖范围",
          "note": "对游客和员工进行生态文明和环境保护宣传教育，将环境保护教育列为导览必备环节",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.4",
              "name": "环保宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q040",
          "title": "宣教材料",
          "note": "有专门的生态与环保教育宣传材料，或景区宣传导览材料设有专项生态与环保教育内容",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.4",
              "name": "环保宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q041",
          "title": "宣教方式",
          "note": "宣教方式多样，活动丰富，形式创新，效果良好",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.4",
              "name": "环保宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "7.Q042",
          "title": "消费引导",
          "note": "提倡环境责任，倡导低碳出行和绿色消费，鼓励游客参与环保行动",
          "max": 2,
          "path": [
            {
              "id": "7",
              "name": "资源与环境保护"
            },
            {
              "id": "7.5",
              "name": "环境保护"
            },
            {
              "id": "7.5.4",
              "name": "环保宣传教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    },
    {
      "id": "8",
      "name": "综合管理",
      "max": 110,
      "questions": [
        {
          "id": "8.Q001",
          "title": "管理机构",
          "note": "管理机构健全，岗位职责分明",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.1",
              "name": "管理机构与人员"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q002",
          "title": "管理人员",
          "note": "配备合理，中高级管理人员均具备大学专科及以上文化程度",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.1",
              "name": "管理机构与人员"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q002-1",
              "label": "配备合理，中高级管理人员均具备大学专科及以上文化程度",
              "score": 3,
              "note": ""
            },
            {
              "key": "8.Q002-2",
              "label": "配备合理，70% 以上中高级管理人员具备大学专科及以上文化程度",
              "score": 2,
              "note": "配备合理，中高级管理人员均具备大学专科及以上文化程度"
            },
            {
              "key": "8.Q002-3",
              "label": "配备基本合理，具备大学专科及以上文化程度的中高级管理人员占比在 70% 以下",
              "score": 1,
              "note": "配备合理，中高级管理人员均具备大学专科及以上文化程度"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q003",
          "title": "管理制度体系",
          "note": "各项管理制度健全，形成完整的制度体系",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.2",
              "name": "管理制度与实施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q004",
          "title": "标准化管理",
          "note": "建立旅游景区标准化管理体系",
          "max": 1,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.2",
              "name": "管理制度与实施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q005",
          "title": "制度实施",
          "note": "各项规章制度贯彻得力，有一年以上完整执行记录和总结，定期监督检查。记录不完整的，酌情扣分",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.2",
              "name": "管理制度与实施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q006",
          "title": "景区面积",
          "note": "5A 级旅游景区面积原则上不小于 3km2",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.3",
              "name": "面积与规划要求"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q006-1",
              "label": "可游览面积满足游客接待和景区发展需要，游客空间舒适度优良",
              "score": 3,
              "note": "5A 级旅游景区面积原则上不小于 3km2"
            },
            {
              "key": "8.Q006-2",
              "label": "可游览面积基本满足游客接待和景区发展需要，游客空间舒适度较好",
              "score": 2,
              "note": "5A 级旅游景区面积原则上不小于 3km2"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "8.Q007",
          "title": "规划要求",
          "note": "符合国土空间规划及相关规划管控要求，土地利用和项目建设无违法违规行为",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.3",
              "name": "面积与规划要求"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q007-met",
              "label": "符合国土空间规划及相关规划管控要求，土地利用和项目建设无违法违规行为",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q008",
          "title": "景区建设（开发项目）符合景区相关规划要求",
          "note": "景区建设（开发项目）符合景区相关规划要求",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.1",
              "name": "管理机构与制度"
            },
            {
              "id": "8.1.3",
              "name": "面积与规划要求"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q008-met",
              "label": "景区建设（开发项目）符合景区相关规划要求",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.2.1",
          "title": "培训制度",
          "note": "有健全的员工培训制度、培训计划、培训绩效评估和奖惩机制。发现一个缺项或一项落实不到位扣 1 分",
          "max": 4,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q010",
          "title": "培训范围",
          "note": "查看年度计划及实施记录，要求有培训档案",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q010-1",
              "label": "培训对象覆盖景区全部管理、服务人员，有针对社区居民和游客的旅游宣传与培训活动",
              "score": 3,
              "note": "查看年度计划及实施记录，要求有培训档案"
            },
            {
              "key": "8.Q010-2",
              "label": "培训对象覆盖一半以上的管理与服务人员，有针对社区居民和游客的旅游宣传与培训活动",
              "score": 2,
              "note": "查看年度计划及实施记录，要求有培训档案"
            },
            {
              "key": "8.Q010-3",
              "label": "培训对象覆盖少数管理与服务人员",
              "score": 1,
              "note": "查看年度计划及实施记录，要求有培训档案"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q011",
          "title": "培训内容",
          "note": "系统性：包括政策法规、制度规范、旅游知识、景区业务、专业技能、消防安全、应急救援、综合素质等",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q011-met",
              "label": "系统性：包括政策法规、制度规范、旅游知识、景区业务、专业技能、消防安全、应急救援、综合素质等",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q012",
          "title": "针对性：符合景区运营、相关岗位及员工实际需要，内容安排合理、实用、有效",
          "note": "针对性：符合景区运营、相关岗位及员工实际需要，内容安排合理、实用、有效",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q012-met",
              "label": "针对性：符合景区运营、相关岗位及员工实际需要，内容安排合理、实用、有效",
              "score": 3,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q013",
          "title": "拓展性：根据新时代特征和景区与员工发展要求，拓展培训内容，具有时代性和先进性",
          "note": "拓展性：根据新时代特征和景区与员工发展要求，拓展培训内容，具有时代性和先进性",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q013-met",
              "label": "拓展性：根据新时代特征和景区与员工发展要求，拓展培训内容，具有时代性和先进性",
              "score": 2,
              "note": ""
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q014",
          "title": "培训频率与时长",
          "note": "培训频率与时长恰当，满足受训人员知识与技能需要",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "8.Q015",
          "title": "培训效果",
          "note": "培训效果好。抽查员工，考查其业务，被抽查员工的回答流利、准确；上岗人员培训合格率达 100%",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.2",
              "name": "培训实施"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q015-1",
              "label": "培训效果好。抽查员工，考查其业务，被抽查员工的回答流利、准确；上岗人员培训合格率达 100%",
              "score": 3,
              "note": ""
            },
            {
              "key": "8.Q015-2",
              "label": "培训效果较好。抽查员工，考查其业务，被抽查员工的回答基本正确；人员经培训基本合格后上岗",
              "score": 2,
              "note": "培训效果好。抽查员工，考查其业务，被抽查员工的回答流利、准确；上岗人员培训合格率达 100%"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q016",
          "title": "统一着装",
          "note": "员工着岗位服饰，服饰美观有特色",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.3",
              "name": "员工面貌"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q017",
          "title": "服务状态",
          "note": "员工精神面貌良好，服务热情，举止文明，行为规范，能够针对不同客群提供个性化服务",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.2",
              "name": "员工管理"
            },
            {
              "id": "8.2.3",
              "name": "员工面貌"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q018",
          "title": "内容的丰富性",
          "note": "内容丰富，全面展示景区资源价值、产品特色与服务内容",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.1",
              "name": "宣传推广内容"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q018-1",
              "label": "内容丰富，全面展示景区资源价值、产品特色与服务内容",
              "score": 2,
              "note": ""
            },
            {
              "key": "8.Q018-2",
              "label": "内容一般，基本展示景区资源价值、产品与服务内容",
              "score": 1,
              "note": "内容丰富，全面展示景区资源价值、产品特色与服务内容"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q019",
          "title": "内容的真实性",
          "note": "宣传推广信息真实、准确、更新及时",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.1",
              "name": "宣传推广内容"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q020",
          "title": "营销范围",
          "note": "覆盖海内外主要客源地",
          "max": 5,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.2",
              "name": "营销范围与推广方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q020-1",
              "label": "覆盖海内外主要客源地",
              "score": 5,
              "note": ""
            },
            {
              "key": "8.Q020-2",
              "label": "覆盖国内主要客源地",
              "score": 4,
              "note": "覆盖海内外主要客源地"
            },
            {
              "key": "8.Q020-3",
              "label": "仅覆盖省内主要客源地",
              "score": 3,
              "note": "覆盖海内外主要客源地"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q021",
          "title": "推广方式",
          "note": "宣传推广渠道和方式新颖多样，除传统媒体外，能运用新媒体、新技术手段进行宣传推广",
          "max": 4,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.2",
              "name": "营销范围与推广方式"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q021-1",
              "label": "宣传推广渠道和方式新颖多样，除传统媒体外，能运用新媒体、新技术手段进行宣传推广",
              "score": 4,
              "note": ""
            },
            {
              "key": "8.Q021-2",
              "label": "宣传推广渠道和方式相对单一，主要运用传统媒体进行宣传推广",
              "score": 2,
              "note": "宣传推广渠道和方式新颖多样，除传统媒体外，能运用新媒体、新技术手段进行宣传推广"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q022",
          "title": "游客增长率",
          "note": "宣传推广效果好，近两年接待游客总人次平均增长 5%以上",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.3",
              "name": "营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q022-1",
              "label": "宣传推广效果好，近两年接待游客总人次平均增长 5%以上",
              "score": 3,
              "note": ""
            },
            {
              "key": "8.Q022-2",
              "label": "宣传推广效果较好，近两年接待游客总人次平均增长3%~5%",
              "score": 2,
              "note": "宣传推广效果好，近两年接待游客总人次平均增长 5%以上"
            },
            {
              "key": "8.Q022-3",
              "label": "宣传推广效果尚可，近两年接待游客总人次实现正增长，平均增长 3% 以下",
              "score": 1,
              "note": "宣传推广效果好，近两年接待游客总人次平均增长 5%以上"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "8.Q023",
          "title": "市场知名度和美誉度",
          "note": "景区持续保持很高的市场知名度和美誉度",
          "max": 4,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.3",
              "name": "营销管理"
            },
            {
              "id": "8.3.3",
              "name": "营销效果"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q023-1",
              "label": "景区持续保持很高的市场知名度和美誉度",
              "score": 4,
              "note": ""
            },
            {
              "key": "8.Q023-2",
              "label": "景区持续保持较高市场知名度和美誉度",
              "score": 3,
              "note": "景区持续保持很高的市场知名度和美誉度"
            },
            {
              "key": "8.Q023-3",
              "label": "景区有一定的市场知名度和美誉度",
              "score": 2,
              "note": "景区持续保持很高的市场知名度和美誉度"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q024",
          "title": "质量监管人员",
          "note": "有景区服务质量监督管理人员",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.1",
              "name": "质量监管体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q025",
          "title": "质量监管制度",
          "note": "有旅游质量检查与评价制度",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.1",
              "name": "质量监管体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q026",
          "title": "质量改进措施",
          "note": "旅游质量改进与奖惩措施有效",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.1",
              "name": "质量监管体系"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q027",
          "title": "投诉数量及性质",
          "note": "查询有关行政管理部门和景区记录，以及主要第三方平台游客评价情况，了解投诉的数量、类型（环境与设施投诉、服务投诉、价格投诉等）和性质。近两年内发生重大质量投诉（涉及对旅游者人身侵犯和健康损害的投诉，均视为重大质量投诉），此项不得分",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.2",
              "name": "投诉处理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "8.Q028",
          "title": "投诉处理制度",
          "note": "投诉制度健全，公布投诉渠道和投诉处理程序",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.2",
              "name": "投诉处理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q029",
          "title": "投诉渠道",
          "note": "投诉电话、投诉信箱和在线投诉等渠道畅通，每项得 1 分",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.2",
              "name": "投诉处理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q030",
          "title": "投诉受理过程",
          "note": "投诉受理及时，处理妥善，档案记录完整，受理迅速得1 分；服务态度好得 1 分；记录完整细致得 1 分；有回访记录得 1 分",
          "max": 4,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.2",
              "name": "投诉处理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q031",
          "title": "投诉处理效果",
          "note": "依据景区投诉记录了解投诉处理效果，对重大投诉可向投诉人了解反馈意见及其满意度",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.2",
              "name": "投诉处理"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q032",
          "title": "满意度调查",
          "note": "可依据第三方机构满意度调查报告、网络评价数据或景区调查数据评分，要求单次调查问卷发放不少于 200 份，或网络调查问卷不少于 200 人次",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.3",
              "name": "游客满意度"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q032-1",
              "label": "重视游客满意度调查与评价，每年至少调查 2 次，及时公布景区游客满意度，并采取针对性措施提高满意度",
              "score": 3,
              "note": "可依据第三方机构满意度调查报告、网络评价数据或景区调查数据评分，要求单次调查问卷发放不少于 200 份，或网络调查问卷不少于 200 人次"
            },
            {
              "key": "8.Q032-2",
              "label": "关注游客满意度调查与评价，每年至少调查 1 次，及时公布景区游客满意度",
              "score": 2,
              "note": "可依据第三方机构满意度调查报告、网络评价数据或景区调查数据评分，要求单次调查问卷发放不少于 200 份，或网络调查问卷不少于 200 人次"
            },
            {
              "key": "8.Q032-3",
              "label": "近 2 年内调查和公布景区游客满意度在 1 次（含）以下",
              "score": 1,
              "note": "可依据第三方机构满意度调查报告、网络评价数据或景区调查数据评分，要求单次调查问卷发放不少于 200 份，或网络调查问卷不少于 200 人次"
            }
          ],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q033",
          "title": "满意度状况",
          "note": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率达 90%（含）以上",
          "max": 6,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.4",
              "name": "服务质量监督管理"
            },
            {
              "id": "8.4.3",
              "name": "游客满意度"
            }
          ],
          "mode": "official-options",
          "options": [
            {
              "key": "8.Q033-1",
              "label": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率达 90%（含）以上",
              "score": 6,
              "note": ""
            },
            {
              "key": "8.Q033-2",
              "label": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率达 80%（含）以上",
              "score": 5,
              "note": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率达 90%（含）以上"
            },
            {
              "key": "8.Q033-3",
              "label": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率在 80% 以下",
              "score": 4,
              "note": "根据现场问卷调查、网络评论或大数据分析，或委托第三方评价，游客满意率达 90%（含）以上"
            }
          ],
          "subcriteria": [],
          "assistance": "field-measure"
        },
        {
          "id": "8.Q034",
          "title": "弘扬文化",
          "note": "有弘扬社会主义先进文化、革命文化和中华优秀传统文化的宣传或活动",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.1",
              "name": "社会教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q035",
          "title": "爱国主义教育",
          "note": "有爱国主义教育场所或活动",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.1",
              "name": "社会教育"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q036",
          "title": "公益性活动",
          "note": "组织或参加公益性活动",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.2",
              "name": "社会责任"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q037",
          "title": "惠民便民",
          "note": "开展惠民便民旅游活动",
          "max": 3,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.2",
              "name": "社会责任"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q038",
          "title": "带动经济发展",
          "note": "在带动地方经济发展方面效果显著得 2 分；有一定效果得 1 分",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.3",
              "name": "社会贡献"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        },
        {
          "id": "8.Q039",
          "title": "促进就业增收",
          "note": "在促进社会就业和旅游富民增收方面效果显著得 2 分；有一定效果得 1 分",
          "max": 2,
          "path": [
            {
              "id": "8",
              "name": "综合管理"
            },
            {
              "id": "8.5",
              "name": "社会效益"
            },
            {
              "id": "8.5.3",
              "name": "社会贡献"
            }
          ],
          "mode": "score-range",
          "options": [],
          "subcriteria": [],
          "assistance": "field-evidence"
        }
      ]
    }
  ]
};
