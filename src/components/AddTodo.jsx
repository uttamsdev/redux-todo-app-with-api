import { Button, Input, message } from "antd"
import { useEffect, useState } from "react"
import CustomSelect from "./Select";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../redux/features/todoSlice";
import { getRandomUID } from "../lib/getRandomId";
import TextArea from "antd/es/input/TextArea";
import { useAddTodoMutation } from "../redux/query/todoQuery";

const AddTodo = ({ setOpen, data }) => {
  const [addTodo, { data: resData, isLoading, isError, isSuccess }] = useAddTodoMutation();
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleAddTodo = async () => {
    setOpen(false);
    const postData = {
      title: title,
      priority: priority,
      description: description,
      isCompleted: false,
    }
    await addTodo(postData)
    if (isSuccess) {
      message.success('Todo Successfully Added');
    }
    if (isError) {
      message.error('Failed to add');
    }
  }

  const handleEdit = () => {
    setOpen(false);
    dispatch(editTodo({ id: data.id, title: title, priority: priority, description: description }))
    message.success('Todo Successfully Edited');
  }

  useEffect(() => {
    setTitle(data?.title);
    setPriority(data?.priority);
    setDescription(data?.description)
  }, [data])
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <label>Title</label>
          <Input onChange={(e) => setTitle(e.target.value)} value={title} name="title" placeholder="Title" />
        </div>
        <div>
          <label>Select Priority</label>
          <CustomSelect defaultValue={data?.priority || ''} setValue={setPriority} />
        </div>
        <div>
          <label>Description</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />

        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4">
        <Button onClick={() => setOpen(false)} variant="outlined" color="default">Cancel</Button>
        <Button type="primary" color="" onClick={data ? handleEdit : handleAddTodo}>{data ? 'Update' : 'Add'}</Button>
      </div>
    </div>
  )
}

export default AddTodo