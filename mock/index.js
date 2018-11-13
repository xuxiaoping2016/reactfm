import Mock from "mockjs";



    
export default {
    
  todos : Mock.mock("http://localhost/api/todos", function(){
    return {
      count:3,
      data:[
        {
          "todo":"dfdsf",
          "action":false,
          "key":1
        },
        {
          "todo":"dfdsf2",
          "action":false,
          "key":2
        },
        {
          "todo":"dfdsf3",
          "action":false,
          "key":3
        },
      ]
    };
  }),


  abc:  Mock.mock("/abc", function(){
    console.log("434fsdfds");
    return {
      "status": 200,
      "data": {
        "aptitudeStatus": 3,
        "aptitudeTime": "2018-10-10 16:46:24",
        "createTime": "2018-10-10 15:26:06",
        "isEnter": 0,
        "isFreeze": 0,
        "supplierId": 2294
      },
      "globalTicket": "6bae455c44b843cea849b9d9312a0d79",
      "message": "操作成功",
      "monitorTrackId": "654b0a60-cc36-42ae-b03e-ef6c859c0d3a",
      "serverTime": 1539163059089
    };
  }),


    
  remove:Mock.mock("http://localhost/api/todos/remove",function(){
    return {
      "status":"200",
      "data":{
        "name": "@cname" 
        // 'birthday': '@date("yyyy-MM-dd")'
      }
    };
  }),

  dd:Mock.mock("/api/ceshi",function(){
    return {
      "status":"200",
      "data":{
        "name": "@cname" 
        // 'birthday': '@date("yyyy-MM-dd")'
      }
    };
  }),

  c:Mock.mock("http://localhost/api/supplier/area/queryAllAreaInfo",function(){
    console.log("......................");
    return {
      "data": {
        "firstAreaInfoVo": [
          {
            "areaCode": "370000",
            "parentCode": "0",
            "areaName": "山东省",
            "levelType": 1,
            "children": [{
              "areaCode": "370100",
              "parentCode": "370000",
              "areaName": "济南市",
              "levelType": 2,
              "children": [{
                "areaCode": "370102",
                "parentCode": "370100",
                "areaName": "历下区",
                "levelType": 3
              },
              {
                "areaCode": "370103",
                "parentCode": "370100",
                "areaName": "市中区",
                "levelType": 3
              },
              {
                "areaCode": "370104",
                "parentCode": "370100",
                "areaName": "槐荫区",
                "levelType": 3
              },
              {
                "areaCode": "370105",
                "parentCode": "370100",
                "areaName": "天桥区",
                "levelType": 3
              },
              {
                "areaCode": "370112",
                "parentCode": "370100",
                "areaName": "历城区",
                "levelType": 3
              },
              {
                "areaCode": "370113",
                "parentCode": "370100",
                "areaName": "长清区",
                "levelType": 3
              },
              {
                "areaCode": "370124",
                "parentCode": "370100",
                "areaName": "平阴县",
                "levelType": 3
              },
              {
                "areaCode": "370125",
                "parentCode": "370100",
                "areaName": "济阳县",
                "levelType": 3
              },
              {
                "areaCode": "370126",
                "parentCode": "370100",
                "areaName": "商河县",
                "levelType": 3
              },
              {
                "areaCode": "370181",
                "parentCode": "370100",
                "areaName": "章丘市",
                "levelType": 3
              },
              {
                "areaCode": "370182",
                "parentCode": "370100",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370200",
              "parentCode": "370000",
              "areaName": "青岛市",
              "levelType": 2,
              "children": [{
                "areaCode": "370202",
                "parentCode": "370200",
                "areaName": "市南区",
                "levelType": 3
              },
              {
                "areaCode": "370203",
                "parentCode": "370200",
                "areaName": "市北区",
                "levelType": 3
              },
              {
                "areaCode": "370205",
                "parentCode": "370200",
                "areaName": "四方区",
                "levelType": 3
              },
              {
                "areaCode": "370211",
                "parentCode": "370200",
                "areaName": "黄岛区",
                "levelType": 3
              },
              {
                "areaCode": "370212",
                "parentCode": "370200",
                "areaName": "崂山区",
                "levelType": 3
              },
              {
                "areaCode": "370213",
                "parentCode": "370200",
                "areaName": "李沧区",
                "levelType": 3
              },
              {
                "areaCode": "370214",
                "parentCode": "370200",
                "areaName": "城阳区",
                "levelType": 3
              },
              {
                "areaCode": "370251",
                "parentCode": "370200",
                "areaName": "开发区",
                "levelType": 3
              },
              {
                "areaCode": "370281",
                "parentCode": "370200",
                "areaName": "胶州市",
                "levelType": 3
              },
              {
                "areaCode": "370282",
                "parentCode": "370200",
                "areaName": "即墨市",
                "levelType": 3
              },
              {
                "areaCode": "370283",
                "parentCode": "370200",
                "areaName": "平度市",
                "levelType": 3
              },
              {
                "areaCode": "370284",
                "parentCode": "370200",
                "areaName": "胶南市",
                "levelType": 3
              },
              {
                "areaCode": "370285",
                "parentCode": "370200",
                "areaName": "莱西市",
                "levelType": 3
              },
              {
                "areaCode": "370286",
                "parentCode": "370200",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370300",
              "parentCode": "370000",
              "areaName": "淄博市",
              "levelType": 2,
              "children": [{
                "areaCode": "370302",
                "parentCode": "370300",
                "areaName": "淄川区",
                "levelType": 3
              },
              {
                "areaCode": "370303",
                "parentCode": "370300",
                "areaName": "张店区",
                "levelType": 3
              },
              {
                "areaCode": "370304",
                "parentCode": "370300",
                "areaName": "博山区",
                "levelType": 3
              },
              {
                "areaCode": "370305",
                "parentCode": "370300",
                "areaName": "临淄区",
                "levelType": 3
              },
              {
                "areaCode": "370306",
                "parentCode": "370300",
                "areaName": "周村区",
                "levelType": 3
              },
              {
                "areaCode": "370321",
                "parentCode": "370300",
                "areaName": "桓台县",
                "levelType": 3
              },
              {
                "areaCode": "370322",
                "parentCode": "370300",
                "areaName": "高青县",
                "levelType": 3
              },
              {
                "areaCode": "370323",
                "parentCode": "370300",
                "areaName": "沂源县",
                "levelType": 3
              },
              {
                "areaCode": "370324",
                "parentCode": "370300",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370400",
              "parentCode": "370000",
              "areaName": "枣庄市",
              "levelType": 2,
              "children": [{
                "areaCode": "370402",
                "parentCode": "370400",
                "areaName": "市中区",
                "levelType": 3
              },
              {
                "areaCode": "370403",
                "parentCode": "370400",
                "areaName": "薛城区",
                "levelType": 3
              },
              {
                "areaCode": "370404",
                "parentCode": "370400",
                "areaName": "峄城区",
                "levelType": 3
              },
              {
                "areaCode": "370405",
                "parentCode": "370400",
                "areaName": "台儿庄区",
                "levelType": 3
              },
              {
                "areaCode": "370406",
                "parentCode": "370400",
                "areaName": "山亭区",
                "levelType": 3
              },
              {
                "areaCode": "370481",
                "parentCode": "370400",
                "areaName": "滕州市",
                "levelType": 3
              },
              {
                "areaCode": "370482",
                "parentCode": "370400",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370500",
              "parentCode": "370000",
              "areaName": "东营市",
              "levelType": 2,
              "children": [{
                "areaCode": "370502",
                "parentCode": "370500",
                "areaName": "东营区",
                "levelType": 3
              },
              {
                "areaCode": "370503",
                "parentCode": "370500",
                "areaName": "河口区",
                "levelType": 3
              },
              {
                "areaCode": "370521",
                "parentCode": "370500",
                "areaName": "垦利县",
                "levelType": 3
              },
              {
                "areaCode": "370522",
                "parentCode": "370500",
                "areaName": "利津县",
                "levelType": 3
              },
              {
                "areaCode": "370523",
                "parentCode": "370500",
                "areaName": "广饶县",
                "levelType": 3
              },
              {
                "areaCode": "370589",
                "parentCode": "370500",
                "areaName": "西城区",
                "levelType": 3
              },
              {
                "areaCode": "370590",
                "parentCode": "370500",
                "areaName": "东城区",
                "levelType": 3
              },
              {
                "areaCode": "370591",
                "parentCode": "370500",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370600",
              "parentCode": "370000",
              "areaName": "烟台市",
              "levelType": 2,
              "children": [{
                "areaCode": "370602",
                "parentCode": "370600",
                "areaName": "芝罘区",
                "levelType": 3
              },
              {
                "areaCode": "370611",
                "parentCode": "370600",
                "areaName": "福山区",
                "levelType": 3
              },
              {
                "areaCode": "370612",
                "parentCode": "370600",
                "areaName": "牟平区",
                "levelType": 3
              },
              {
                "areaCode": "370613",
                "parentCode": "370600",
                "areaName": "莱山区",
                "levelType": 3
              },
              {
                "areaCode": "370634",
                "parentCode": "370600",
                "areaName": "长岛县",
                "levelType": 3
              },
              {
                "areaCode": "370681",
                "parentCode": "370600",
                "areaName": "龙口市",
                "levelType": 3
              },
              {
                "areaCode": "370682",
                "parentCode": "370600",
                "areaName": "莱阳市",
                "levelType": 3
              },
              {
                "areaCode": "370683",
                "parentCode": "370600",
                "areaName": "莱州市",
                "levelType": 3
              },
              {
                "areaCode": "370684",
                "parentCode": "370600",
                "areaName": "蓬莱市",
                "levelType": 3
              },
              {
                "areaCode": "370685",
                "parentCode": "370600",
                "areaName": "招远市",
                "levelType": 3
              },
              {
                "areaCode": "370686",
                "parentCode": "370600",
                "areaName": "栖霞市",
                "levelType": 3
              },
              {
                "areaCode": "370687",
                "parentCode": "370600",
                "areaName": "海阳市",
                "levelType": 3
              },
              {
                "areaCode": "370688",
                "parentCode": "370600",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370700",
              "parentCode": "370000",
              "areaName": "潍坊市",
              "levelType": 2,
              "children": [{
                "areaCode": "370702",
                "parentCode": "370700",
                "areaName": "潍城区",
                "levelType": 3
              },
              {
                "areaCode": "370703",
                "parentCode": "370700",
                "areaName": "寒亭区",
                "levelType": 3
              },
              {
                "areaCode": "370704",
                "parentCode": "370700",
                "areaName": "坊子区",
                "levelType": 3
              },
              {
                "areaCode": "370705",
                "parentCode": "370700",
                "areaName": "奎文区",
                "levelType": 3
              },
              {
                "areaCode": "370724",
                "parentCode": "370700",
                "areaName": "临朐县",
                "levelType": 3
              },
              {
                "areaCode": "370725",
                "parentCode": "370700",
                "areaName": "昌乐县",
                "levelType": 3
              },
              {
                "areaCode": "370751",
                "parentCode": "370700",
                "areaName": "开发区",
                "levelType": 3
              },
              {
                "areaCode": "370781",
                "parentCode": "370700",
                "areaName": "青州市",
                "levelType": 3
              },
              {
                "areaCode": "370782",
                "parentCode": "370700",
                "areaName": "诸城市",
                "levelType": 3
              },
              {
                "areaCode": "370783",
                "parentCode": "370700",
                "areaName": "寿光市",
                "levelType": 3
              },
              {
                "areaCode": "370784",
                "parentCode": "370700",
                "areaName": "安丘市",
                "levelType": 3
              },
              {
                "areaCode": "370785",
                "parentCode": "370700",
                "areaName": "高密市",
                "levelType": 3
              },
              {
                "areaCode": "370786",
                "parentCode": "370700",
                "areaName": "昌邑市",
                "levelType": 3
              },
              {
                "areaCode": "370787",
                "parentCode": "370700",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370800",
              "parentCode": "370000",
              "areaName": "济宁市",
              "levelType": 2,
              "children": [{
                "areaCode": "370802",
                "parentCode": "370800",
                "areaName": "市中区",
                "levelType": 3
              },
              {
                "areaCode": "370811",
                "parentCode": "370800",
                "areaName": "任城区",
                "levelType": 3
              },
              {
                "areaCode": "370826",
                "parentCode": "370800",
                "areaName": "微山县",
                "levelType": 3
              },
              {
                "areaCode": "370827",
                "parentCode": "370800",
                "areaName": "鱼台县",
                "levelType": 3
              },
              {
                "areaCode": "370828",
                "parentCode": "370800",
                "areaName": "金乡县",
                "levelType": 3
              },
              {
                "areaCode": "370829",
                "parentCode": "370800",
                "areaName": "嘉祥县",
                "levelType": 3
              },
              {
                "areaCode": "370830",
                "parentCode": "370800",
                "areaName": "汶上县",
                "levelType": 3
              },
              {
                "areaCode": "370831",
                "parentCode": "370800",
                "areaName": "泗水县",
                "levelType": 3
              },
              {
                "areaCode": "370832",
                "parentCode": "370800",
                "areaName": "梁山县",
                "levelType": 3
              },
              {
                "areaCode": "370881",
                "parentCode": "370800",
                "areaName": "曲阜市",
                "levelType": 3
              },
              {
                "areaCode": "370882",
                "parentCode": "370800",
                "areaName": "兖州市",
                "levelType": 3
              },
              {
                "areaCode": "370883",
                "parentCode": "370800",
                "areaName": "邹城市",
                "levelType": 3
              },
              {
                "areaCode": "370884",
                "parentCode": "370800",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "370900",
              "parentCode": "370000",
              "areaName": "泰安市",
              "levelType": 2,
              "children": [{
                "areaCode": "370902",
                "parentCode": "370900",
                "areaName": "泰山区",
                "levelType": 3
              },
              {
                "areaCode": "370903",
                "parentCode": "370900",
                "areaName": "岱岳区",
                "levelType": 3
              },
              {
                "areaCode": "370921",
                "parentCode": "370900",
                "areaName": "宁阳县",
                "levelType": 3
              },
              {
                "areaCode": "370923",
                "parentCode": "370900",
                "areaName": "东平县",
                "levelType": 3
              },
              {
                "areaCode": "370982",
                "parentCode": "370900",
                "areaName": "新泰市",
                "levelType": 3
              },
              {
                "areaCode": "370983",
                "parentCode": "370900",
                "areaName": "肥城市",
                "levelType": 3
              },
              {
                "areaCode": "370984",
                "parentCode": "370900",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371000",
              "parentCode": "370000",
              "areaName": "威海市",
              "levelType": 2,
              "children": [{
                "areaCode": "371002",
                "parentCode": "371000",
                "areaName": "环翠区",
                "levelType": 3
              },
              {
                "areaCode": "371081",
                "parentCode": "371000",
                "areaName": "文登市",
                "levelType": 3
              },
              {
                "areaCode": "371082",
                "parentCode": "371000",
                "areaName": "荣成市",
                "levelType": 3
              },
              {
                "areaCode": "371083",
                "parentCode": "371000",
                "areaName": "乳山市",
                "levelType": 3
              },
              {
                "areaCode": "371084",
                "parentCode": "371000",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371100",
              "parentCode": "370000",
              "areaName": "日照市",
              "levelType": 2,
              "children": [{
                "areaCode": "371102",
                "parentCode": "371100",
                "areaName": "东港区",
                "levelType": 3
              },
              {
                "areaCode": "371103",
                "parentCode": "371100",
                "areaName": "岚山区",
                "levelType": 3
              },
              {
                "areaCode": "371121",
                "parentCode": "371100",
                "areaName": "五莲县",
                "levelType": 3
              },
              {
                "areaCode": "371122",
                "parentCode": "371100",
                "areaName": "莒县",
                "levelType": 3
              },
              {
                "areaCode": "371123",
                "parentCode": "371100",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371200",
              "parentCode": "370000",
              "areaName": "莱芜市",
              "levelType": 2,
              "children": [{
                "areaCode": "371202",
                "parentCode": "371200",
                "areaName": "莱城区",
                "levelType": 3
              },
              {
                "areaCode": "371203",
                "parentCode": "371200",
                "areaName": "钢城区",
                "levelType": 3
              },
              {
                "areaCode": "371204",
                "parentCode": "371200",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371300",
              "parentCode": "370000",
              "areaName": "临沂市",
              "levelType": 2,
              "children": [{
                "areaCode": "371302",
                "parentCode": "371300",
                "areaName": "兰山区",
                "levelType": 3
              },
              {
                "areaCode": "371311",
                "parentCode": "371300",
                "areaName": "罗庄区",
                "levelType": 3
              },
              {
                "areaCode": "371312",
                "parentCode": "371300",
                "areaName": "河东区",
                "levelType": 3
              },
              {
                "areaCode": "371321",
                "parentCode": "371300",
                "areaName": "沂南县",
                "levelType": 3
              },
              {
                "areaCode": "371322",
                "parentCode": "371300",
                "areaName": "郯城县",
                "levelType": 3
              },
              {
                "areaCode": "371323",
                "parentCode": "371300",
                "areaName": "沂水县",
                "levelType": 3
              },
              {
                "areaCode": "371324",
                "parentCode": "371300",
                "areaName": "苍山县",
                "levelType": 3
              },
              {
                "areaCode": "371325",
                "parentCode": "371300",
                "areaName": "费县",
                "levelType": 3
              },
              {
                "areaCode": "371326",
                "parentCode": "371300",
                "areaName": "平邑县",
                "levelType": 3
              },
              {
                "areaCode": "371327",
                "parentCode": "371300",
                "areaName": "莒南县",
                "levelType": 3
              },
              {
                "areaCode": "371328",
                "parentCode": "371300",
                "areaName": "蒙阴县",
                "levelType": 3
              },
              {
                "areaCode": "371329",
                "parentCode": "371300",
                "areaName": "临沭县",
                "levelType": 3
              },
              {
                "areaCode": "371330",
                "parentCode": "371300",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371400",
              "parentCode": "370000",
              "areaName": "德州市",
              "levelType": 2,
              "children": [{
                "areaCode": "371402",
                "parentCode": "371400",
                "areaName": "德城区",
                "levelType": 3
              },
              {
                "areaCode": "371421",
                "parentCode": "371400",
                "areaName": "陵县",
                "levelType": 3
              },
              {
                "areaCode": "371422",
                "parentCode": "371400",
                "areaName": "宁津县",
                "levelType": 3
              },
              {
                "areaCode": "371423",
                "parentCode": "371400",
                "areaName": "庆云县",
                "levelType": 3
              },
              {
                "areaCode": "371424",
                "parentCode": "371400",
                "areaName": "临邑县",
                "levelType": 3
              },
              {
                "areaCode": "371425",
                "parentCode": "371400",
                "areaName": "齐河县",
                "levelType": 3
              },
              {
                "areaCode": "371426",
                "parentCode": "371400",
                "areaName": "平原县",
                "levelType": 3
              },
              {
                "areaCode": "371427",
                "parentCode": "371400",
                "areaName": "夏津县",
                "levelType": 3
              },
              {
                "areaCode": "371428",
                "parentCode": "371400",
                "areaName": "武城县",
                "levelType": 3
              },
              {
                "areaCode": "371451",
                "parentCode": "371400",
                "areaName": "开发区",
                "levelType": 3
              },
              {
                "areaCode": "371481",
                "parentCode": "371400",
                "areaName": "乐陵市",
                "levelType": 3
              },
              {
                "areaCode": "371482",
                "parentCode": "371400",
                "areaName": "禹城市",
                "levelType": 3
              },
              {
                "areaCode": "371483",
                "parentCode": "371400",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371500",
              "parentCode": "370000",
              "areaName": "聊城市",
              "levelType": 2,
              "children": [{
                "areaCode": "371502",
                "parentCode": "371500",
                "areaName": "东昌府区",
                "levelType": 3
              },
              {
                "areaCode": "371521",
                "parentCode": "371500",
                "areaName": "阳谷县",
                "levelType": 3
              },
              {
                "areaCode": "371522",
                "parentCode": "371500",
                "areaName": "莘县",
                "levelType": 3
              },
              {
                "areaCode": "371523",
                "parentCode": "371500",
                "areaName": "茌平县",
                "levelType": 3
              },
              {
                "areaCode": "371524",
                "parentCode": "371500",
                "areaName": "东阿县",
                "levelType": 3
              },
              {
                "areaCode": "371525",
                "parentCode": "371500",
                "areaName": "冠县",
                "levelType": 3
              },
              {
                "areaCode": "371526",
                "parentCode": "371500",
                "areaName": "高唐县",
                "levelType": 3
              },
              {
                "areaCode": "371581",
                "parentCode": "371500",
                "areaName": "临清市",
                "levelType": 3
              },
              {
                "areaCode": "371582",
                "parentCode": "371500",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371600",
              "parentCode": "370000",
              "areaName": "滨州市",
              "levelType": 2,
              "children": [{
                "areaCode": "371602",
                "parentCode": "371600",
                "areaName": "滨城区",
                "levelType": 3
              },
              {
                "areaCode": "371621",
                "parentCode": "371600",
                "areaName": "惠民县",
                "levelType": 3
              },
              {
                "areaCode": "371622",
                "parentCode": "371600",
                "areaName": "阳信县",
                "levelType": 3
              },
              {
                "areaCode": "371623",
                "parentCode": "371600",
                "areaName": "无棣县",
                "levelType": 3
              },
              {
                "areaCode": "371624",
                "parentCode": "371600",
                "areaName": "沾化县",
                "levelType": 3
              },
              {
                "areaCode": "371625",
                "parentCode": "371600",
                "areaName": "博兴县",
                "levelType": 3
              },
              {
                "areaCode": "371626",
                "parentCode": "371600",
                "areaName": "邹平县",
                "levelType": 3
              },
              {
                "areaCode": "371627",
                "parentCode": "371600",
                "areaName": "其它区",
                "levelType": 3
              }]
            },
            {
              "areaCode": "371700",
              "parentCode": "370000",
              "areaName": "菏泽市",
              "levelType": 2,
              "children": [{
                "areaCode": "371702",
                "parentCode": "371700",
                "areaName": "牡丹区",
                "levelType": 3
              },
              {
                "areaCode": "371721",
                "parentCode": "371700",
                "areaName": "曹县",
                "levelType": 3
              },
              {
                "areaCode": "371722",
                "parentCode": "371700",
                "areaName": "单县",
                "levelType": 3
              },
              {
                "areaCode": "371723",
                "parentCode": "371700",
                "areaName": "成武县",
                "levelType": 3
              },
              {
                "areaCode": "371724",
                "parentCode": "371700",
                "areaName": "巨野县",
                "levelType": 3
              },
              {
                "areaCode": "371725",
                "parentCode": "371700",
                "areaName": "郓城县",
                "levelType": 3
              },
              {
                "areaCode": "371726",
                "parentCode": "371700",
                "areaName": "鄄城县",
                "levelType": 3
              },
              {
                "areaCode": "371727",
                "parentCode": "371700",
                "areaName": "定陶县",
                "levelType": 3
              },
              {
                "areaCode": "371728",
                "parentCode": "371700",
                "areaName": "东明县",
                "levelType": 3
              },
              {
                "areaCode": "371729",
                "parentCode": "371700",
                "areaName": "其它区",
                "levelType": 3
              }]
            }]
          },
        ]
      },
      "message": "响应正常",
      "code": 0
    };
  }),
};