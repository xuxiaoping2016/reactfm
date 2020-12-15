import React, { useEffect } from 'react'
import useModal from './useModal'

const Index = () => {
    const { MyBtn, MyModal } = useModal()
    useEffect(()=>{
        console.log('外部')
    },[MyBtn])
    console.log('waibu')
    return(
        <div>
            <MyBtn>编辑</MyBtn >
            <MyModal  onOk={() => {}}>弹窗内容</MyModal>
        </div>
    )
}

export default Index