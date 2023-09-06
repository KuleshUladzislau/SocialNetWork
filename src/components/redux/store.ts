// import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
//
// import thunk , {ThunkAction, ThunkDispatch} from "redux-thunk";
// import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
// import {socialNetWorkApi} from '../api/apiQuery'
// import authReducer from './authSlice'
// import profileReducer from '../redux/profileSlice'
// import usersReducer from '../redux/usersSlice'
// import {myFriendsReducer} from '../Users/MyFriends/myFriendsSlice'
// import {friendMessagesReducer} from "../Dialogs/FriendsChats/ChatPage/chatPageSlice";
//
//
// const rootReducer = combineReducers({
//     [socialNetWorkApi.reducerPath]:socialNetWorkApi.reducer,
//     auth:authReducer,
//     profile:profileReducer,
//     users:usersReducer,
//     myFriends:myFriendsReducer,
//     friendsMessages:friendMessagesReducer
//
//
//
// })
//
//
//
//
// export const store = configureStore({
//     reducer:rootReducer,
//     middleware:(getDefaultMiddleware)=>[
//         ...getDefaultMiddleware(),
//         socialNetWorkApi.middleware,
//
//
//     ],
// })
//
//
//
//
//
//
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = ThunkDispatch<RootState, unknown,AnyAction>
//
//

import React from 'react';

const Store = () => {

};

export default Store;
