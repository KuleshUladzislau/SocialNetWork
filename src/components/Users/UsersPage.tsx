import React, {ChangeEvent, useEffect, useState,} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from "../hook/hooks";
import {useGetUsersQuery} from "../api/apiQuery";
import styled from "styled-components";
import {Input} from "antd";
import {changeUsersPage, changeUsersPageSize, setUsersTotalCount} from "../redux/usersSlice";
import {Users} from "./Users/Users";



export const UsersPage = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(state => state.users.page)
    const pageSize = useAppSelector(state => state.users.pageSize)
    const totalCount = useAppSelector(state => state.users.totalCount)
    const [nameUser, setSearchNameUser] = useState('')
    const debouncedValue = useDebounce(nameUser, 500)



    const {
        data
    } = useGetUsersQuery({page, pageSize, term: debouncedValue})

    useEffect(() => {
        if (data) {
            dispatch(setUsersTotalCount({totalCount: data.totalCount}))
        }
    }, [data])





    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchNameUser(userName)
    }

    const onChangePageHandler = (page: number, pageSize: number) => {
        dispatch(changeUsersPage({page}))
        dispatch(changeUsersPageSize({pageSize}))
    }

    return (

        <UserPageContainer>
            <FormContainer>
                <h2>Search new friends</h2>
                <Input value={nameUser} placeholder='write name...' onChange={onChangeSearchUserHandler}/>
            </FormContainer>
            <UsersContainer>
                <Users
                    users={data?.items}
                    page={page}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    changePageSettings={onChangePageHandler}

                    />
            </UsersContainer>


        </UserPageContainer>
    );
}

export default UsersPage

export const UsersContainer = styled.div`

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 20px;

`
export const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  border: 1px solid red;

`


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: center;
  align-items: center;

`

