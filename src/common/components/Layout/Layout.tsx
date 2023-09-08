import React from "react";
import { Layout, Menu } from 'antd'
import {UserOutlined} from "@ant-design/icons";
import {NavLink, Outlet} from "react-router-dom";
import styled from "styled-components";
import {createGlobalStyle} from "styled-components";
import {Header as MyHeader } from 'common/components/Header/Header'
import {ProfilePage} from "features/ProfilePage/ProfilePage";
import { UsersPageWithHook} from "features/UsersPage/UsersPage";
import {MyFriendsPage} from "features/MyFriendsPage/MyFriendsPage";
import {useAppSelector} from "app/hook/useDebounse";
import {DialogsPage} from "features/DialogsPage/DIalogsPage";



const {Header, Content, Sider} = Layout;


export const MyLayout = () => {



    const isAuth = useAppSelector(state => state.auth.isAuth)




    const items = [
        {
            key: '1',
            icon: React.createElement(UserOutlined),
            label: 'Profile',
            title: 'Profile',
            path: '/profile',
            component: ProfilePage
        },
        {
            key: '2',
            icon: React.createElement(UserOutlined),
            label: 'Users',
            title: 'Users',
            path: '/users',
            component: UsersPageWithHook
        },
        {
            key: '3',
            icon: React.createElement(UserOutlined),
            label: 'Friends',
            title: 'Friends',
            path: '/friends',
            component: MyFriendsPage
        },
        {
            key: '4',
            icon: React.createElement(UserOutlined),
            label: 'Dialogs',
            title: 'Dialogs',
            path: '/dialogs',
            component: DialogsPage
        },


    ];



    return (

        <Layout >
            {isAuth && <Header style={{height: '60px', background: 'white', position: 'fixed', width: '100%', zIndex: '10'}}>
                <MyHeader/>
            </Header>}
            <Container>
                <Content
                    style={{
                        marginTop: '80px',
                        marginBottom: '20px',


                    }}
                >

                    <Layout style={{
                        minHeight: '100vh',

                        // background: colorBgContainer,
                    }}
                    >
                        {isAuth && <Sider style={{background:'none',}}>

                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{


                                    minHeight: '100vh',
                                    background: `#f5f5f5`,
                                    paddingLeft: '20px',

                                }}
                            >
                                {items.map(item => {
                                    return (
                                        <Menu.Item style={{fontSize: '20px',}}><NavLink
                                            to={item.path}>{item.title}</NavLink></Menu.Item>
                                    )
                                })}
                            </Menu>
                        </Sider>}
                        <Content style={{background: `#f5f5f5`}}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Content>
            </Container>
        </Layout>

    );
};



export const Container = styled.div`
  position: relative;
  width: 1080px;
  margin: 0 auto;
  
`


type GlobalStylesType = {
    overflow?:string
}
export const GlobalStyles = createGlobalStyle<GlobalStylesType>`
  body {
    overflow:${props => props.overflow || 'hidden'}; 
    width: 100vw;
  }
`;