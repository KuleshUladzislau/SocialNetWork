import {createSlice, PayloadAction} from "@reduxjs/toolkit";




type initialStateType = {
    userId:number
    isAuth:boolean
    login:string
    email:string
}

const initialState:initialStateType ={
    userId:0,
    login:'',
    email:'',
    isAuth:false
}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthorizedUser:(state, action:PayloadAction<initialStateType>)=>{
                return action.payload
        }
    }
})


export const {setAuthorizedUser} = AuthSlice.actions
export default AuthSlice.reducer