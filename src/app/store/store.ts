import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import  { ThunkDispatch} from "redux-thunk";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {socialNetWorkApi} from "components/api/apiQuery";
import {profileReducer} from 'features/ProfilePage/profileSlice'
import  {usersPageReducer} from 'features/UsersPage/usersSlice'
import {dialogsPageReducer} from "features/DialogsPage/dialogsSlice";
import {authReducer} from "features/Login/authSlice";
import {myFriendsReducer} from "features/MyFriendsPage/myFriendsSlice";


const rootReducer = combineReducers({
    [socialNetWorkApi.reducerPath]:socialNetWorkApi.reducer,
    profile:profileReducer,
    users:usersPageReducer,
    dialogsPage:dialogsPageReducer,
    auth:authReducer,
    myFriendsPage:myFriendsReducer
})




export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>[
        ...getDefaultMiddleware(),
        socialNetWorkApi.middleware,


    ],
})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>


