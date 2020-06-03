import React, { useState, useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import { data, phoneData} from './data';



const G2Page = () => {
    const ref = useRef();

    const init = () => {
          const chart = new Chart({
            container: ref.current,
            autoFit: true,
            height: 300,
          });
          
          chart.data(phoneData);
          
          chart.line().adjust('stack').position('feature*value').color('phone');

        //   chart.legend({
        //     custom: true,
        //     items:[{
        //         id:'iPhone',
        //         name:<div>fdfdf</div>,
        //         value:'iPhone',
        //         marker:{}
        //     },{
        //         id:'Samsung',
        //         name:"Samsung",
        //         value:'Samsung',
        //         marker:<div>f</div>
        //     },{
        //         id:'Nokia Smartphone',
        //         name:"Nokia Smartphone",
        //         value:'Nokia Smartphone',
        //         marker:<div>f</div>
        //     }]
        //   })

          chart
            .point()
            .adjust('stack')
            .position('feature*value')
            .color('phone')
            .shape('circle');

            chart.on('click', (ev) => {
                const shape = ev.shape;
                console.log(ev)
              });

          chart.render();
    }

    useEffect(() => {
        if(!ref.current) return;
        init();
    },[ref])
    
      
    

      return (
          <div ref={ref}></div>
      )
};
export default G2Page;