// 中文文档 https://www.w3cschool.cn/socket/socket-odxe2egl.html；
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DocumentTitle from "../../components/documentTitle/react-document-title";
import TitleInner from "./innerTitle.tsx";
// import socketIo from 'socket.io-client'
import FixFooter, {NameShow} from '../../components/FixFooter'
import { Button } from "antd";

// const Ch = <Button>cancel</Button>
function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
    // const socket = socketIo('http://localhost:3010');
    // socket.on('connect', function(){
    //   console.log('link success')
    //   socket.emit('add user', {
    //     name:'xuxi'
    //   });
    // });
    // socket.on('user joined', (data) => {
    //     console.log('user joined',data)
    // })
    // return () => {
      
    // }
  // },[])
  
  const Ch = useMemo(() => {
    return (<Button>cancel</Button>)
  },[])
	return (
		<DocumentTitle title="counter">
			<div>
        <div>{count}</div>
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          点击
        </button>
        <TitleInner />
        <NameShow>hello</NameShow>
        <FixFooter children={Ch}>
        </FixFooter>
      </div>
    </DocumentTitle>
  );
}

export default App;
