import {axiosBaseQuery} from "common/api/common.api";
import {createApi} from "@reduxjs/toolkit/query/react";
import {ResultCode} from 'common/enums/index'
import {ResponseType} from "common/types";


export const profileApi = createApi({
    reducerPath: 'profileApi',
    tagTypes: ['Profile'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    }),
    endpoints: (build) => ({
        getProfile: build.query<ProfileType, { userId: number | string }>({
            query: ({userId}) => ({
                url: `profile/${userId}`,
                method: 'GET',
            }),

            providesTags: ['Profile']

        }),
        updateProfileInfo: build.mutation<ProfileType, UpdateProfileInfo>({
            query: (data) => ({
                url: `profile`,
                method: 'PUT',
                data: {...data}
            }),
            invalidatesTags: ['Profile']


        }),
        changeProfileStatus: build.mutation<ResponseType, { status: string }>({
            query: (status) => ({
                url: `profile/status`,
                method: 'PUT',
                data: status
            }),
            invalidatesTags: ['Profile']
        }),

        getProfileStatus: build.query<ResponseProfileStatusType, { userId: number }>({
            query: ({userId}) => ({
                url: `profile/status/${userId}`,
                method: 'GET',
                providesTags: ['Profile']
            }),
            providesTags: ['Profile']
        }),

        uploadPhoto: build.mutation<ResponseType<{ small: string, large: string }>, FormData>({

            query: (FormData) => ({
                url: 'profile/photo',
                method: 'PUT',
                data: FormData,
                headers: {'Content-Type': 'multipart/form-data'},

            }),
            invalidatesTags: ['Profile']
        }),
        getUsersForProfilePage: build.query<UsersResponseType, { page: number, pageSize: number, term: string, friend?: boolean }>({
            query: ({page, pageSize, term, friend}) => ({
                url: `users?page=${page}&count=${pageSize}`,
                method: 'GET',
                params: {friend, term}
            }),

        }),

    })
})


export const
    {
        useLazyGetProfileQuery,
        useUploadPhotoMutation,
        useUpdateProfileInfoMutation,
        useGetUsersForProfilePageQuery

    }
        = profileApi




export type ProfileType = {
    aboutMe:string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:ContactsType
    photos: {
        small: string
        large: string
    }


}

type UpdateProfileInfo = Omit<ProfileType, "photos">



export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type ResponseProfileStatusType = {
    data: string
    messages: Array<string>
    resultCode:typeof ResultCode
}


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