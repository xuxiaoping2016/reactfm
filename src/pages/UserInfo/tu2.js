import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const Page = () => {
    const ret1 = [
        {
          date: '2018/8/1',
          type: 'download',
          value: 4623,
        },
        {
            date: '2018/8/2',
            type: 'download',
            value: 6145,
        }]
    const ret2 = [
        {
            date: '2018/8/1',
            type: 'register',
            value: 2208,
        },
        {
            date: '2018/8/2',
            type: 'register',
            value: 2016,
    }];
    const ret3 = [{
            date: '2018/8/1',
            type: 'bill',
            value: 182,
        },
        {
            date: '2018/8/2',
            type: 'bill',
            value: 257,
        }
        ];
    const database = {
        'A': ret1,
        'B': ret2,
        'C': ret3
    }


    const [titles, setTitles] = useState([
        {
            title:'A',
            status: true
        },
        {
            title:'B',
            status: true
        },
        {
            title:'C',
            status: true
        }
    ])
      

     const [data, setData] = useState([]);
     const ref = React.useRef();

  const config = {
        title: {
            visible: true,
            text: '多折线图',
        },
        description: {
            visible: true,
            text: '将数据按照某一字段进行分组，用于比对不同类型数据的趋势。',
        },
        padding: 'auto',
        forceFit: true,
        data,
        xField: 'date',
        yField: 'value',
        yAxis: {
            label: {
            // 数值格式化为千分位
            formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        // legend: {
        //     visible: false,
        //     position: 'right-top',
        // },
        seriesField: 'type',
        responsive: true,
    };

    
  React.useEffect(() => {
   let ret = []
   titles.forEach(item => {
       if(item.status){
           ret = ret.concat(database[item.title])
            console.log(ret)
       }
   })
   setData(ret)
   
  }, [titles]);

  useEffect(() => {
    console.log(ref.current, ref.current.legend);
  })

  const handle = (item, index) => {
    let ret = titles.slice();
    ret[index].status = !ret[index].status
    setTitles(ret)
  }
  return (
      <div>
          {titles.map((item,index) => <span key={item.title} style={{'padding':'10px'}} onClick={() => handle(item,index)}>{item.title}</span>)}
          <Line {...config}  chartRef={ref}/>
      </div>
  );
};
export default Page;