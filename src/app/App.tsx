import React, {useEffect, useState} from "react";
import {Breadcrumb, Layout, Menu, Spin, theme} from 'antd'
import {UserOutlined} from "@ant-design/icons";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {Header as MyHeader} from 'components/Header/Header'
import {useMeQuery} from "components/api/apiQuery";
import {ResultCodes} from "components/api/api";
import {Profile} from "components/Profile/Profile";
import {UsersPage} from "components/Users/UsersPage";
import {MyFriends} from "components/Users/MyFriends/MyFriends";
import {Login} from "components/login/Login";
import {useAppSelector} from "components/hook/hooks";
import {Dialogs} from "components/Dialogs/Dialogs";
import {ChatPage} from "components/Dialogs/FriendsChats/ChatPage/ChatPage";
import styled from "styled-components";
import {createGlobalStyle} from "styled-components";
import {MyLayout} from "components/Layout/Layout";

const {Header, Content, Footer, Sider} = Layout;


const App = () => {


    const {data, isFetching} = useMeQuery()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)


    // useEffect(() => {
    //     if (data?.resultCode === ResultCodes.Success) {
    //         navigate('/')
    //     } else {
    //         navigate('/login')
    //     }
    // }, [data])





    if (isFetching) {
        return <Spin/>
    }

    return (

        <Routes>
            <Route path={'/'} element={<MyLayout/>}>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/profile/:userId'} element={<Profile/>}/>
                <Route path={'/users'} element={<UsersPage/>}/>
                <Route path={'/friends'} element={<MyFriends/>}/>
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