import React from 'react';

function Child({seconds}){
    console.log('Child1 is rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
}

// 判断nextProps是否和prevProps相同，相同返回true，不更新组件；不同false，更新组件；
function areEqual(prevProps, nextProps) { //只有seconds改变才更新组件
    if(prevProps.seconds===nextProps.seconds){
        return true
    }else {
        return false
    }

}

export default React.memo(Child,areEqual);