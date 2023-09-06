import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hook/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {useLogoutMutation, useMeQuery} from "../api/apiQuery";

import {Button, Layout} from "antd";
import styled from "styled-components";
import {setAuthorizedUser} from "../redux/authSlice";
import {ResultCodes} from "../api/api";

;

export const Header = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dispath = useAppDispatch()
    const navigate = useNavigate()
    const {data} = useMeQuery()
    const [logout] = useLogoutMutation()
    const userInfo = data?.data


    useEffect(() => {

        if (data?.resultCode === ResultCodes.Success) {
            const {id, email, login} = data.data
            dispath(setAuthorizedUser({userId: id, email, login, isAuth: true}))
            navigate('/profile')
        } else {
            navigate('/login')
        }

    }, [data])


    const onclickHandler = () => {
        logout()
        navigate('/login')
        dispath(setAuthorizedUser({userId: 0, email: '', login: '', isAuth: false}))
    }

    return (
        <HeaderStyle>
            <div style={{color: 'black', marginLeft: '50px'}}>
                {userInfo && <div>{userInfo.login}</div>}
            </div>
            <div>
                {isAuth && <Button type="link" onClick={onclickHandler}>Logout</Button>}
            </div>

        </HeaderStyle>
    );
};

const HeaderStyle = styled.div`
  display: flex;
  width: 1080px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  margin: 0 auto;
`