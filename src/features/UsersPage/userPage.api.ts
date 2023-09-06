import {ResponseType} from "components/api/api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "common/api";


export const usersApi = createApi({
    reducerPath: 'socialNetWork',
    tagTypes: ['Users', 'Profile', 'Dialogs'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    }),
    endpoints: (build) => ({
        getUsers: build.query<UsersResponseType, { page: number, pageSize: number, term: string, friend?: boolean }>({
            query: ({page, pageSize, term, friend}) => ({
                url: `users?page=${page}&count=${pageSize}`,
                method: 'GET',
                params: {friend, term}
            }),
            providesTags: ['Users']
        }),
        followUser: build.mutation<ResponseType, { userId: number }>({
            query: ({userId}) => ({
                url: `follow/${userId}`,
                method: 'POST'
            }),
            invalidatesTags: ['Users']
        }),
        unFollowUser: build.mutation<ResponseType, { userId: number }>({
            query: ({userId}) => ({
                url: `follow/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        }),
        myFriends: build.query<UsersResponseType, { friend: boolean, term?: string }>({
            query: ({friend, term}) => ({
                url: `users?count=20`,
                method: 'GET',
                params: {friend, term}
            }),
            providesTags: ['Users']
        }),

    })
})

export const
    {
        useUnFollowUserMutation,
        useFollowUserMutation,
        useMyFriendsQuery,
        useGetUsersQuery,

    }
        = usersApi


export type UsersType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}

type UsersResponseType = {
    items: UsersType[],
    totalCount: number
    error: string
}