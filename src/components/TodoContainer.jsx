import { Button, Dropdown, Skeleton, Space } from "antd"
import { items } from "../lib/filterItems";
import { DownOutlined } from "@ant-design/icons";
import TodoCard from "./TodoCard";
import React, { useState } from "react";
import CustomModal from "./Modal";
import AddTodo from "./AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, filterTask } from "../redux/features/todoSlice";
import { useGetTodosQuery } from "../redux/query/todoQuery";


const TodoContainer = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(null)
  const { data: todos, isLoading, isError, refetch } = useGetTodosQuery(filter ? filter : null)
  // const todos = useSelector((state) => state.todo.todos);
  // const filteredTodos = useSelector((state) => state.todo.filteredTodos);

  // console.log('filter', filteredTodos)
  // const tasksToDisplay = filteredTodos || todos;

  const dispatch = useDispatch();

  // console.log('todo', todos)
  const handleMenuClick = (e) => {
    setFilter(e.key == 1 ? 'high' : e.key == 2 ? 'medium' : 'low')
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleClearFilter = () => {
    setFilter('')
  }
  return (
    <div>
      <h1 className="mt-10 mb-4 text-xl font-bold text-center">Todo Application With Redux</h1>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-3">
          <Button color="default" variant="solid" onClick={() => setOpen(true)}>
            Add Todo
          </Button>
          <div className="flex items-center gap-2">
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Filter
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Button color="danger" variant="solid" onClick={handleClearFilter}>
              Clear filter
            </Button>
          </div>
        </div>
        {
          isLoading ? <Skeleton active /> :
            isError ? 'something went wrong' :
              todos?.data?.length > 0 ? <div className=" bg-stone-100 min-h-[400px] rounded px-6 py-4 space-y-3">
                {
                  todos?.data?.map((item, i) => <TodoCard item={item} key={i} />)
                }
              </div> : ''
        }
      </div>
      <CustomModal
        setOpen={setOpen}
        open={open}
        title={'Add Todo'}
        modalContent={React.cloneElement(<AddTodo setOpen={setOpen} />, { key: new Date().getTime() })}
      />
    </div>
  )
}

export default TodoContainer