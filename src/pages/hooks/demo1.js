import React, { useState, useEffect } from 'react';
import {Button, Modal} from 'antd'

function Example() {
  // 声明一个新的状态变量，我们将其称为 "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
}

function App() {
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => {
            console.log("fdfd")
            setOpen(true)
        }}>
          Open Modal
        </Button>
        <Modal
          visible={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </React.Fragment>
    );
  }

export default Example;