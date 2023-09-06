import {createSlice, PayloadAction} from "@reduxjs/toolkit";




const usersSlice = createSlice({
    name:'users',
    initialState:{
        page:1,
        pageSize:5,
        totalCount:0

    },
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
export const usersActions = usersSlice.actions
export const usersPageReducer = usersSlice.reducer