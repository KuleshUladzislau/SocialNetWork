import React, {ChangeEvent, useEffect, useState} from 'react';
import {FormContainer, UserPageContainer, UsersContainer, UsersPage} from "../UsersPage";
import {useAppDispatch, useAppSelector, useDebounce} from "../../hook/hooks";
import {useGetUsersQuery} from "../../api/apiQuery";
import {Input, Pagination} from "antd";
import {Users} from "../Users/Users";
import {changeFriendsPage, changeFriendsPageSize, setFriendsTotalCount} from "./myFriendsSlice";
import {User} from "../User/User";

export const MyFriends = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(state => state.myFriends.page)
    const pageSize = useAppSelector(state => state.myFriends.pageSize)
    const totalCount = useAppSelector(state => state.myFriends.totalCount)
    const [nameFriends, setSearchFriends] = useState('')
    const debouncedValue = useDebounce(nameFriends, 500)
    const {
        data
    } = useGetUsersQuery({page, pageSize, term: debouncedValue, friend: true})


    useEffect(() => {
        if(data){
            dispatch(setFriendsTotalCount({totalCount:data.totalCount}))
        }

    }, [data])

    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchFriends(userName)
    }
    const onChangePageHandler = (page: number, pageSize: number) => {
        dispatch(changeFriendsPage({page}))
        dispatch(changeFriendsPageSize({pageSize}))
    }



    return (

        <UserPageContainer>
            <FormContainer>
                <h2>Search new friends</h2>
                <Input value={nameFriends} placeholder='write name...' onChange={onChangeSearchUserHandler}/>
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
};

