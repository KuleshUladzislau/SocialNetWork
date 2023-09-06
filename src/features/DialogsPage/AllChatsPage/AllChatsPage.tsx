import React, {ChangeEvent, useState} from "react";
import {useDebounce} from "components/hook/hooks";
import {useMyFriendsQuery} from "components/api/apiQuery";
import {FormContainer} from "components/Users/UsersPage";
import {Input} from "antd";
import styled from "styled-components";
import {FriendsChats} from "features/DialogsPage/FriendsChats/FriendsChats";

export const AllChatsPage = () => {

    const [nameUser, setSearchNameUser] = useState('')
    const debouncedValue = useDebounce(nameUser, 500)


    const {
        data,
        isFetching
    } = useMyFriendsQuery({friend: true, term: debouncedValue})

    const chats = data?.items.map(user => {
        return <FriendsChats id={user.id} name={user.name} photos={user.photos}/>
    })
    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchNameUser(userName)
    }
    return (
        <>
            <SearchContainer>
                <FormContainer>
                    <Input value={nameUser} placeholder='write name...' onChange={onChangeSearchUserHandler}/>
                </FormContainer>
            </SearchContainer>
            {chats}
        </>
    )
}

const SearchContainer = styled.div`
  
  display:flex;
  justify-content:center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom:1px solid  rgba(0, 0, 0,20%);
`