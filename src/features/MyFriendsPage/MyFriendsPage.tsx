import {useAppDispatch, useAppSelector, useDebounce} from "app/hook/useDebounse";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useGetUsersQuery} from "features/UsersPage/userPage.api";
import {FormContainer, UserPageContainer, UsersContainer} from "features/UsersPage/UsersPage";
import {Users} from "features/UsersPage/Users/Users";
import {Input} from "antd";
import {myFriendsActions} from "features/MyFriendsPage/myFriendsSlice";
import {
    selectFriendsPage,
    selectFriendsPageSize,
    selectFriendsPageTotalCount
} from "features/MyFriendsPage/myFriends.selectors";
import {authHook} from "app/hook/authHook";


const MyFriends = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(selectFriendsPage)
    const pageSize = useAppSelector(selectFriendsPageSize)
    const totalCount = useAppSelector(selectFriendsPageTotalCount)
    const [nameFriends, setSearchFriends] = useState('')
    const debouncedValue = useDebounce(nameFriends, 500)
    const {
        data,

    } = useGetUsersQuery({page, pageSize, term: debouncedValue, friend: true})


    useEffect(() => {
        if(data){
            dispatch(myFriendsActions.setFriendsTotalCount({totalCount:data.totalCount}))
        }

    }, [data])

    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchFriends(userName)
    }
    const onChangePageHandler = (page: number, pageSize: number) => {
        dispatch(myFriendsActions.changeFriendsPage({page}))
        dispatch(myFriendsActions.changeFriendsPageSize({pageSize}))
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

export const MyFriendsPage = authHook()(MyFriends)