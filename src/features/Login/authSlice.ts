import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type initialStateType = {
    userId: number
    isAuth: boolean
    login: string
    email: string
}



const AuthSlice = createSlice({
    name: 'auth',
    initialState:{
        userId: 0,
        login: '',
        email: '',
        isAuth: false
    },
    reducers: {
        setAuthorizedUser: (state, action: PayloadAction<initialStateType>) => {
            return action.payload
        }
    }
})


export const authActions = AuthSlice.actions
export const authReducer = AuthSlice.reducer