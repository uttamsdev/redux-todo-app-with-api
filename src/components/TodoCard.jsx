import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import CustomModal from "./Modal"
import React, { useState } from "react"
import AddTodo from "./AddTodo"
import { useDispatch } from "react-redux"
import { editTaskStatus, handleDeleteTodo } from "../redux/features/todoSlice"

const TodoCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const dispatch = useDispatch();


  const handleEdit = (data) => {
    setOpen(true);
    setModalContent(React.cloneElement(<AddTodo setOpen={setOpen} data={data} />, { key: new Date().getTime() }))
  }

  const handleDelete = (item) => {
    dispatch(handleDeleteTodo(item))
    message.success('Deleted todo successful');
  }

  const toggleStatus = () => {
    dispatch(editTaskStatus(item));
    message.success('Status successfully updated.')
  }
  
  return (
    <div className="flex items-center bg-white px-2 py-2 rounded">
      <div className="flex items-center gap-2 flex-1">
        <input onChange={() => toggleStatus()} className="w-3.5 h-3.5" type="checkbox" />
        <span className="text-sm text-gray-800">{item?.title}</span>
      </div>
      <div className="flex items-center gap-1 flex-1">
        <div className={`w-2 h-2 rounded ${item?.priority === 'high' ? 'bg-red-500' : item?.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-600'}`}></div>
        <span className="text-sm text-gray-800">{item?.priority}</span>
      </div>

      <span className={`text-sm flex-1 ${item?.isCompleted ? 'text-green-600' : 'text-red-500'}`}>{item.isCompleted ? 'Completed' : 'Pending'}</span>
      <span className="text-sm text-gray-800 flex-1">{item.description}</span>

      <div className="flex items-center gap-3 ">
        <Button onClick={() => handleEdit(item)} style={{ width: '26px', height: '26px', borderRadius: '4px' }} type="primary" shape="round" icon={<EditOutlined />}></Button>
        <Button onClick={() => handleDelete(item)} style={{ width: '26px', height: '26px', borderRadius: '4px' }} type="primary" danger shape="round" icon={<DeleteOutlined />}></Button>
      </div>
      <CustomModal
        setOpen={setOpen}
        open={open}
        title={'Edit Todo'}
        modalContent={modalContent}
      />
    </div>
  )
}

export default TodoCard