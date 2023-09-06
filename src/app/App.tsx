import React, {useEffect, useState} from "react";
import {Breadcrumb, Layout, Menu, Spin, theme} from 'antd'
import {UserOutlined} from "@ant-design/icons";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {MyLayout} from "common/components/Layout/Layout";
import {ProfilePage} from "features/ProfilePage/ProfilePage";
import UsersPage from "features/UsersPage/UsersPage";
import {MyFriendsPage} from "features/MyFriendsPage/MyFriendsPage";
import {Dialogs} from "features/DialogsPage/DIalogsPage";
import {ChatPage} from "features/DialogsPage/ChatPage/ChatPage";
import {Login} from "features/Login/Login";
import styled, {createGlobalStyle} from "styled-components";
import {useMeQuery} from "features/Login/auth.api";
import {ResultCode} from "common/enums";


const {Header, Content, Footer, Sider} = Layout;


const App = () => {


    const {data, isFetching} = useMeQuery()
    const navigate = useNavigate()
    // const isAuth = useAppSelector(state => state.auth.isAuth)


    useEffect(() => {
        if (data?.resultCode === ResultCode.Success) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [data])





    if (isFetching) {
        return <Spin/>
    }

    return (

        <Routes>
            <Route path={'/'} element={<MyLayout/>}>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/'} element={<ProfilePage/>}/>
                <Route path={'/profile/:userId'} element={<ProfilePage/>}/>
                <Route path={'/users'} element={<UsersPage/>}/>
                <Route path={'/friends'} element={<MyFriendsPage/>}/>
                <Route path={'/dialogs'} element={<Dialogs/>}/>
                <Route path={'/dialogs/:userId'} element={<ChatPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
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