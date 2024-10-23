import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action);
        }
    },
    
})

export const {addTodo} = todoSlice.actions
export default todoSlice.reducer