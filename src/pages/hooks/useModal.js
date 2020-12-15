import React, { useState} from 'react'
import { Modal,Button } from 'antd'

const useModal = () => {
  const [on, setOn] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)
  const toggle = () => setOn(!on);
  const MyBtn = props => <Button {...props} onClick={toggle} />;
  const MyModal = ({ onOk, ...props }) => (
    <Modal
      {...props}
      visible={on}
      onOk={async () => {
        setConfirmLoading(true)
        onOk && (await onOk());
        toggle();
        setConfirmLoading(false)
      }}
      onCancel={toggle}
    />
  );
  console.log('内部')
  return { MyBtn, MyModal };
};


export default useModal;