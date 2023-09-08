import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {MyLayout} from "common/components/Layout/Layout";
import {ProfilePage} from "features/ProfilePage/ProfilePage";
import {MyFriendsPage} from "features/MyFriendsPage/MyFriendsPage";
import {DialogsPage} from "features/DialogsPage/DIalogsPage";
import {ChatPage} from "features/DialogsPage/ChatPage/ChatPage";
import {Login} from "features/Login/Login";
import styled, {createGlobalStyle} from "styled-components";
import { useMeQuery} from "features/Login/auth.api";
import {useAppDispatch, useAppSelector} from "app/hook/useDebounse";
import {UsersPageWithHook} from "features/UsersPage/UsersPage";
import {authActions} from "features/Login/authSlice";
import {ResultCode} from "common/enums";


const App = () => {


    // const {data, isFetching} = useMeQuery()
    const {data} = useMeQuery()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)


    useEffect(() => {

        if (data?.resultCode === ResultCode.Success) {
            const {id, email, login} = data.data
            dispatch(authActions.setAuthorizedUser({userId: id, email, login, isAuth: true}))
            console.log('appRender')
        }

    }, [data])


    //
    // if (isFetching) {
    //     return <Spin/>
    // }


    return (

        <Routes>
            <Route path={'/'} element={<MyLayout/>}>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/'} element={<ProfilePage/>}/>
                <Route path={'/profile/:userId'} element={<ProfilePage/>}/>
                <Route path={'/users'} element={<UsersPageWithHook/>}/>
                <Route path={'/friends'} element={<MyFriendsPage/>}/>
                <Route path={'/dialogs'} element={<DialogsPage/>}/>
                <Route path={'/dialogs/:userId'} element={<ChatPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<div>PageNotFound</div>}/>
            </Route>
        </Routes>


    );
};


export default App
export const Container = styled.div`
  position: relative;
  width: 1080px;
  margin: 0 auto;

`


type GlobalStylesType = {
    overflow?: string
}
export const GlobalStyles = createGlobalStyle<GlobalStylesType>`
  body {
    overflow: ${props => props.overflow || 'hidden'};
    width: 100vw;
  }
`;