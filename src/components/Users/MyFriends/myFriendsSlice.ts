import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type initialState = {
    page:number
    pageSize:number
    totalCount:number
}

const initialState : initialState = {
    page:1,
    pageSize:5,
    totalCount:0

}

const slice = createSlice({
    name:'myFriends',
    initialState,
    reducers:{
        setFriendsTotalCount:(state, action:PayloadAction<{totalCount:number}>)=>{
            state.totalCount = action.payload.totalCount
        },
        changeFriendsPage:(state, action:PayloadAction<{page:number}>)=>{
            state.page = action.payload.page
        },
        changeFriendsPageSize:(state, action:PayloadAction<{pageSize:number}>)=>{
            state.pageSize = action.payload.pageSize
        }
    }
})

export const myFriendsReducer = slice.reducer
export const {
    setFriendsTotalCount,
    changeFriendsPage,
    changeFriendsPageSize
} = slice.actions