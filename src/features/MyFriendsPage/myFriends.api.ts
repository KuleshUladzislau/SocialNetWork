import {axiosBaseQuery} from "common/api/common.api";
import {createApi} from "@reduxjs/toolkit/query/react";


export const myFriendsApi = createApi({
    reducerPath: 'socialNetWork',
    tagTypes: ['Users', 'Profile', 'Dialogs'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    }),
    endpoints: (build) => ({
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
        useMyFriendsQuery

    }
        = myFriendsApi


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






