import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        getTodos: (state) => {
            return state.todos
        },
        editTodo: (state, action) => {
            const editData = state.todos?.find(item => item.id === action.payload.id);
            editData.title = action.payload.title,
                editData.priority = action.payload.priority,
                editData.description = action.payload.description

        },
        handleDeleteTodo: (state, action) => {
            console.log('ac', action.payload);

            // Filter the todos to remove the one with the matching id
            const updatedTodo = state?.todos?.filter(item => item.id !== action.payload.id);

            console.log('updated todo', updatedTodo);

            // Update the state with the filtered todos
            state.todos = updatedTodo;
        }


    },

})

export const { addTodo, getTodos, editTodo, handleDeleteTodo } = todoSlice.actions
export default todoSlice.reducer