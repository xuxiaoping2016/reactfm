import Mock from 'mockjs'



    
const a =  {
    
    todos : Mock.mock('http://localhost/api/todos', function(){
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
        }
    }),


    abc:  Mock.mock('/abc', function(){
        console.log('434fsdfds');
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


    
    remove:Mock.mock('http://localhost/api/todos/remove',function(){
        return {
            "status":"200",
            "data":{
                "name": "@cname" 
                // 'birthday': '@date("yyyy-MM-dd")'
            }
        }
    })

}