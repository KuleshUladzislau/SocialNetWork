import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type FriendMessage = {
    addedAt: Date
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}



const slice = createSlice({
    name:'chatPage',
    initialState:{
        messages:[] as FriendMessage[],
        totalCount:0
    },
    reducers:{
        setFriendMessages:(state, action:PayloadAction<FriendMessage[]>)=>{
            state.messages = action.payload
        },
        setMessageAfterScroll:(state, action:PayloadAction<FriendMessage[]>)=>{
            state.messages.unshift(...action.payload)
        },
        setTotalCount:(state, action:PayloadAction<{totalCount:number}>)=>{
            state.totalCount = action.payload.totalCount
        },
        resetState:(state)=>{
            state.messages = []
        }

    }
})

export const friendMessagesReducer = slice.reducer
export const friendMessageActions = slice.actions

