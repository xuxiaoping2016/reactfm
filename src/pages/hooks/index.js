import React from "react";
import HooksDemo1 from "./demo1";
// import useDocumentTitle from './demo2'
// import MouseTracker from './mouseTracker'
// import MouseTracker2 from './mouseTracker2'
import UseMemoDemo from './useMemo'

export default function HooksDemo(){
	// useDocumentTitle('useEffect');
	return (
		<div>
			<h1>hooks!</h1>
			<HooksDemo1 />
			{/* 
            <MouseTracker/>
			<MouseTracker2/> */}
			<br/>
			<UseMemoDemo/>
		</div>
	);
}


/**
 * 
 * 精读《React Hooks》
https://segmentfault.com/a/1190000016979436?utm_source=tag-newest
https://juejin.im/post/5be8d3def265da611a476231

精读《怎么用 React Hooks 造轮子》
https://juejin.im/post/5bf20ce6e51d454a324dd0e6

React hooks实践
https://juejin.im/post/5c4d7122e51d4556940c15cb
 */