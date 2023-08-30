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

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUsersTotalCount:(state, action:PayloadAction<{totalCount:number}>)=>{
            state.totalCount = action.payload.totalCount
        },
        changeUsersPage:(state, action:PayloadAction<{page:number}>)=>{
            state.page = action.payload.page
        },
        changeUsersPageSize:(state, action:PayloadAction<{pageSize:number}>)=>{
            state.pageSize = action.payload.pageSize
        }
    }
})

export default usersSlice.reducer
export const {
    setUsersTotalCount,
    changeUsersPage,
    changeUsersPageSize
} = usersSlice.actions