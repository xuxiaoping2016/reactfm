import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';

const TargetIput = () => {
    const ref = useRef(null);
    useEffect(()=>{
        const cName = '.'+(ref.current as any).className;
        var clipboard = new ClipboardJS(cName);
        const fn = function(e: any,status:string) {
            console.log(e,status);
        };
        clipboard.on('success', e => fn(e,'success'));

        clipboard.on('error', e => fn(e,'error'));

        return () => {
            clipboard.destroy();
        }
    },[])

    const onChange = () => {

    }


    const copyContent = (id:number) => {
        const clipboard = new ClipboardJS(`#${id}`, {
            text: function(trigger) {
                return trigger.getAttribute('aria-label') || 'default text ';
            }
        });
        clipboard.destroy();
    }
    return (
        <div>
            <input id="foo" type="text" value="hello" onChange={onChange}/>
            <button className="btn" ref={ref} data-clipboard-action="copy" data-clipboard-target="#foo">Copy</button>

            <button id="#1234" onClick={() => copyContent(1234)} data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
                Copy to clipboard 1234
            </button>
            <button id="#5678" onClick={() => copyContent(5678)} data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
                Copy to clipboard 5678
            </button>
        </div>
    )
}

export default TargetIput;