import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        //query
        getTodos: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/tasks'
                }
            },
            providesTags: ['todo']
        }),

        addTodo: builder.mutation({
            query: (data) => {
                return {
                    url: '/task',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['todo']
        })
    })
})


export const { useGetTodosQuery, useAddTodoMutation } = todoApi