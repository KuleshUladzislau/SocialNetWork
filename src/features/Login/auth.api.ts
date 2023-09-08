import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "common/api";
import {ResponseType} from 'common/types/common.types'

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Login'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    }),
    endpoints: (build) => ({

        login: build.mutation<ResponseType, {
            email: string,
            password: string,
            rememberMe: boolean,
            captcha: string | null
        }>({
            query: ({email, password, rememberMe, captcha = ''}) => ({
                url: 'auth/login',
                method: 'POST',
                data: {email, password, rememberMe, captcha}
            }),
            invalidatesTags: ['Login']

        }),
        me: build.query<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/me',
                method: 'get',
            }),
            providesTags: ['Login']


        }),

        logout: build.mutation<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',

            }),
            invalidatesTags: ['Login']

        }),

        getCaptcha: build.query<{ url: string }, void>({
            query: () => ({
                url: 'security/get-captcha-url',
                method: 'get'
            }),

            providesTags:['Login']
        }),


        getCaptchaTest: build.query<{ url: string }, void>({
            query: () => ({
                url: 'security/get-captcha-url',
                method: 'get'
            }),
            providesTags:['Login']
        }),


    })
})

export const
    {
        useLazyGetCaptchaTestQuery,
        useGetCaptchaQuery,
        useLoginMutation,
        useLazyGetCaptchaQuery,
        useMeQuery,
        useLogoutMutation,
        useLazyMeQuery

    }
    = authApi


export type Me = {
    id: number
    email: string
    login: string
}
