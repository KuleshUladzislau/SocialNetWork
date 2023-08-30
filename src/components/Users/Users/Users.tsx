import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input, Pagination} from "antd";
import {UsersContainer} from "../UsersPage";
import styled from "styled-components";
import {useAppDispatch, useAppSelector, useDebounce} from "../../hook/hooks";
import {useGetUsersQuery} from "../../api/apiQuery";
import {changeUsersPage, changeUsersPageSize, setUsersTotalCount} from "../../redux/usersSlice";
import {User} from "../User/User";

type UserType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}


type Users = {
    users?: UserType[],
    page: number
    pageSize: number
    totalCount: number
    changePageSettings:(page:number,pageSize:number)=>void

}

export const Users = (props: Users) => {


    const
        {
            page,
            pageSize,
            totalCount,
            users,
            changePageSettings,

        }
            = props

    const mapedUsers = users?.map(u => {

        return <User
            key={u.id}
            userId={u.id}
            followed={u.followed}
            status={u.status}
            name={u.name}
            photos={u.photos}

        />
    })



    const onChangePageHandler = (page: number, pageSize: number) => {
        changePageSettings(page,pageSize)
    }


    return (
        <>

            <UsersContainer>
                {mapedUsers}
            </UsersContainer>
            <Pagination
                current={page}
                pageSize={pageSize}
                onChange={onChangePageHandler}
                total={totalCount}
                pageSizeOptions={['5', '10', '15', '20', '25']}
            />
        </>
    );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: center;
  align-items: center;

`