import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import  { ThunkDispatch} from "redux-thunk";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {profileReducer} from 'features/ProfilePage/profileSlice'
import  {usersPageReducer} from 'features/UsersPage/usersSlice'
import {dialogsPageReducer} from "features/DialogsPage/dialogsSlice";
import {authReducer} from "features/Login/authSlice";
import {myFriendsReducer} from "features/MyFriendsPage/myFriendsSlice";
import {dialogsApi} from "features/DialogsPage/dialogsPage.api";
import {myFriendsApi} from "features/MyFriendsPage/myFriends.api";
import {profileApi} from "features/ProfilePage/profilePage.api";
import {authApi} from "features/Login/auth.api";
import {usersApi} from "features/UsersPage/userPage.api";


const rootReducer = combineReducers({
    [dialogsApi.reducerPath]:dialogsApi.reducer,
    [myFriendsApi.reducerPath]:myFriendsApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [usersApi.reducerPath]:usersApi.reducer,
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
        dialogsApi.middleware,
        myFriendsApi.middleware,
        profileApi.middleware,
        authApi.middleware,
        usersApi.middleware


    ],
})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>


