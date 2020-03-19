import React from "react";
import { Card } from 'antd';
import HooksDemo1 from "./demo1";
import ContextHookDemo from './useContext';
import ReducerHookDemo from './useReducerDemo';
import RefHookDemo from './useRefDemo'
// import MouseTracker from './mouseTracker'
// import MouseTracker2 from './mouseTracker2'
import UseMemoDemo from './useMemo'
import './index.scss';
export default function HooksDemo(){
	// useDocumentTitle('useEffect');
	return (
		<div className="hooks-demo-container">
			<h1>hooks!</h1>
			<Card title="useState 示例" >
				<HooksDemo1 />
			</Card>

			<Card title="useMemo 示例">
				<UseMemoDemo/>
			</Card>

			<Card title="useContext 示例">
				<ContextHookDemo/>
			</Card>
			
			<Card title="useReducer 示例">
				<ReducerHookDemo initialCount={1}/>
			</Card>

			<Card title="useRef 示例">
				<RefHookDemo />
			</Card>

			
			{/* 
            <MouseTracker/>
			<MouseTracker2/> */}
			<br/>
			
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