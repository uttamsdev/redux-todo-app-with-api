import { useState } from 'react';
import { Modal } from 'antd';
const CustomModal = ({ title, open, setOpen, modalContent, }) => {


  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};
export default CustomModal;