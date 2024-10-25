import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        //query
        getTodos: builder.query({
            query: (priority) => {
                const params = new URLSearchParams();
                if (priority) {
                    params.append('priority', priority)
                }
                return {
                    method: 'GET',
                    url: '/tasks',
                    params: priority ? params : null
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
        }),

        deleteTodo: builder.mutation({
            query: (id) => {
                return {
                    url: `/task/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['todo']
        }),
        editTodo: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/task/${id}`,
                    method: 'PUT',
                    body: data
                };
            },
            invalidatesTags: ['todo']
        })

    })
})


export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation } = todoApi