import {useAppDispatch, useAppSelector} from "app/hook/useDebounse";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ResultCode} from 'common/enums/index'
import {authActions} from "features/Login/authSlice";
import {Button} from "antd";
import styled from "styled-components";
import {useLogoutMutation, useMeQuery} from "features/Login/auth.api";

export const Header = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dispath = useAppDispatch()
    const navigate = useNavigate()
    const {data} = useMeQuery()
    const [logout] = useLogoutMutation()
    const userInfo = data?.data


    useEffect(() => {

        if (data?.resultCode === ResultCode.Success) {
            const {id, email, login} = data.data
            dispath(authActions.setAuthorizedUser({userId: id, email, login, isAuth: true}))

        }

    }, [data])


    const onclickHandler = () => {
        logout()
        navigate('/login')
        dispath(authActions.setAuthorizedUser({userId: 0, email: '', login: '', isAuth: false}))
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