import React, { useState, useEffect } from "react";
import {Button, Modal} from "antd";

function Example() {
	// 声明一个新的状态变量，我们将其称为 "count"
	const [count, setCount] = useState(0);
	const [open, setOpen] = useState(false);
  
	useEffect(
		() => {
			document.title = `you clicked ${count} times`;
			return () => (document.title = "前端精读");
		},
		[count]
	);

	return (
		<div>
			<p>you clicked {count} times</p>
			<button onClick={() => setCount(count + 1)} style={{marginRight:"10px"}}>click me</button>

			<Button type="primary" onClick={() => {
				setOpen(true);
			}}>
          Open Modal
			</Button>
			<Modal
				visible={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			/>
		</div>
	);
}

export default Example;