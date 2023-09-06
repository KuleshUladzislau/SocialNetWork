
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "common/api";
import {dialogsPageActions, dialogsPageReducer} from "features/DialogsPage/dialogsSlice";


export const dialogsApi = createApi({
    reducerPath: 'dialogsApi',
    tagTypes: ['Users', 'Profile', 'Dialogs'],
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    }),
    endpoints: (build) => ({
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
                        dispatch(dialogsPageActions.setFriendMessages(items))
                        dispatch(dialogsPageActions.setTotalCount({totalCount}))
                    } else {
                        dispatch(dialogsPageActions.setMessageAfterScroll(items))
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
        useDeleteMessageMutation,
        useGetDialogsQuery,
        useSendFriendMessageMutation,
        useGetFriendMessageQuery,
        useLazyGetFriendMessageQuery

    }
    = dialogsApi
type Dialogs = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: { small: string, large: string }
    userName: string
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
type MessageResponseType = {
    error: string[]
    items: Message[]
    totalCount: number
}