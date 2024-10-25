import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filteredTodos: null
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        getTodos: (state) => {
            return state.todos
        },
        editTodo: (state, action) => {
            console.log('action', action.payload)
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
        },

        editTaskStatus: (state, action) => {
            console.log('edit', action.payload)
            const updateData = state.todos.find(item => item.id === action.payload.id);
            updateData.status = !updateData.status
        },

        filterTask: (state, action) => {
            console.log(action.payload);
            if (action.payload) {
                // Apply the filter
                state.filteredTodos = state.todos.filter(item => item.priority === action.payload);
            } else {
                // Reset the filteredTodos if no filter is provided
                state.filteredTodos = null;
            }

            console.log(state.filteredTodos)
        },


    },

})

export const { addTodo, getTodos, editTodo, handleDeleteTodo, editTaskStatus, filterTask } = todoSlice.actions
export default todoSlice.reducer