import {Me, ResponseType, ProfileType, UsersType, ResultCodes} from "./api";
import {createApi} from '@reduxjs/toolkit/query/react'
import {axiosBaseQuery} from "./apiBaseQuery";
import {friendMessageActions} from "../Dialogs/FriendsChats/ChatPage/chatPageSlice";


export const socialNetWorkApi = createApi({
    reducerPath: 'socialNetWork',
    tagTypes: ['Users', 'Profile', 'Dialogs'],
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
            invalidatesTags: ['Profile', 'Users']

        }),
        me: build.query<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/me',
                method: 'get',
            }),
            providesTags: ['Users']


        }),

        logout: build.mutation<ResponseType<Me>, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',

            }),
            invalidatesTags: ['Users']

        }),

        getCaptcha: build.query<{ url: string }, void>({
            query: () => ({
                url: 'security/get-captcha-url',
                method: 'get'
            }),
        }),
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

        uploadPhoto: build.mutation<ResponseType<{ small: string, large: string }>,  FormData >({

            query: (FormData) => ({
                url: 'profile/photo',
                method: 'PUT',
                data: FormData ,
                headers: {'Content-Type': 'multipart/form-data'},

            }),
            invalidatesTags: ['Profile']
        }),

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
        myFriends: build.query<UsersResponseType, { friend: boolean,term?:string }>({
            query: ({friend,term}) => ({
                url: `users?count=20`,
                method: 'GET',
                params: {friend,term}
            }),
            providesTags: ['Users']
        }),
        getFriendMessage: build.query<MessageResponseType, { userId: number, page?: number, count?: number }>({
            query: ({userId, page, count}) => ({
                url: `dialogs/${userId}/messages`,
                method: 'GET',
                params: {page, count}
            }),
            providesTags: ['Dialogs'],
            async onQueryStarted({page}, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    const {totalCount, items} = data
                    if (page === 1) {
                        dispatch(friendMessageActions.setFriendMessages(items))
                        dispatch(friendMessageActions.setTotalCount({totalCount}))
                    } else {
                        dispatch(friendMessageActions.setMessageAfterScroll(items))
                    }
                } catch (err) {


                }
            },
        }),
        sendFriendMessage: build.mutation<MessageResponseType, { userId: number, body: string }>({
            query: ({userId, body}) => ({
                url: `dialogs/${userId}/messages`,
                method: 'POST',
                data: {body}
            }),
            invalidatesTags: ['Dialogs']
        }),


        getDialogs: build.query<Dialogs[], void>({
            query: (userId) => ({
                url: `dialogs`,
                method: 'GET'
            })
        }),

        deleteMessage: build.mutation<any, { messageId: string }>({
            query: ({messageId}) => ({
                url: `dialogs/messages/${messageId}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Dialogs']
        }),


    })
})


export const
    {
        useGetUsersQuery,
        useGetProfileQuery,
        useLoginMutation,
        useMeQuery,
        useLogoutMutation,
        useUploadPhotoMutation,
        useUpdateProfileInfoMutation,
        useGetProfileStatusQuery,
        useChangeProfileStatusMutation,
        useFollowUserMutation,
        useUnFollowUserMutation,
        useLazyGetCaptchaQuery,
        useMyFriendsQuery,
        useLazyGetFriendMessageQuery,
        useSendFriendMessageMutation,
        useLazyGetProfileQuery,
        useGetDialogsQuery,
        useDeleteMessageMutation,
        useLazyMyFriendsQuery

    }
        = socialNetWorkApi


type UpdateProfileInfo = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    aboutMe: string

}

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
    resultCode: ResultCodes
}
type UsersResponseType = {
    items: UsersType[],
    totalCount: number
    error: string
}

type MessageResponseType = {
    error: string[]
    items: Message[]
    totalCount: number
}

type Message = {
    addedAt: Date
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}

type Dialogs = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: { small: string, large: string }
    userName: string
}