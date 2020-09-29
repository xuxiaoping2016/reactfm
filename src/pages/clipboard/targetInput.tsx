import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';

const TargetIput = () => {
    const ref = useRef(null);
    useEffect(()=>{
        const cName = '.'+(ref.current as any).className;
        var clipboard = new ClipboardJS(cName);
        const fn = function(e: any) {
            console.log(e);
        };
        clipboard.on('success', fn);

        clipboard.on('error', fn);

        return () => {
            clipboard.destroy();
        }
    },[])

    const onChange = () => {

    }
    return (
        <div>
            <input id="foo" type="text" value="hello" onChange={onChange}/>
            <button className="btn" ref={ref} data-clipboard-action="copy" data-clipboard-target="#foo">Copy</button>
        </div>
    )
}

export default TargetIput;