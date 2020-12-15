import React, { useEffect, useState } from 'react'

const Chids =(props) =>{
    const { info2 } = props
    const [expand, setExpand] = useState(false)
    const [data, setData] = useState(info2)
    const handle = () => {
        setExpand(!expand)
    }
    console.log('......')
    useEffect(()=>{
        console.log('22')
        setData(info2)
    },[info2])
    return (
        <div>
            <p onClick={handle}>fdfdf</p>
            <p onClick={() => props.setInfo({
                name:'修改后名称!'
            })}>修改</p>
            <p>{expand ? 1 :2}</p>
            <p>{props.info.name}</p>
            <p>data:{data.name}</p>
        </div>
    )
}

const Index = () =>{
    const [info,setInfo] = useState({name:'原始名称'})

    const [info2,setInfo2] = useState({name:'原始名称'})

    useEffect(()=>{
        setTimeout(() => {
            setInfo2({name:'原始名称222222'})
        }, 2000);
    },[])
    return (
        <div>
            outer
            <Chids setInfo={setInfo} info={info} info2={info2}/>
            <div style={{marginTop:"20px"}}>

            </div>
        </div>
    )
}

export default Index