import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

interface InterfaceNameModal {
  visible: boolean,
  confirm: Function
}

const NameModal = (props: InterfaceNameModal) => {
  const [value, setValue] = useState('')

  return (
    <Modal
      title="提示"
      centered
      visible={props.visible}
      maskClosable={false}
      keyboard={false}
      closable={false}
      footer={null}
      width={500}
    >
      <p>填写姓名开始答题</p>
      <Input placeholder="输入你的姓名"  value={value} onChange={e => setValue(e.target.value)}/>
      <p style={
        {marginTop: '25px'}
      }>
        <Button type="primary" onClick={() => props.confirm(value)}>确认</Button>
      </p>
    </Modal>
  );
}

export default NameModal