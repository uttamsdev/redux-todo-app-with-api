import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './features/todoSlice'
import { todoApi } from "./query/todoQuery";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
})