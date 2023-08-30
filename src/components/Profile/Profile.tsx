import React, {ReactNode, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hook/hooks";
import {useLocation, useParams} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePosts} from "./ProfilePosts/ProfilePosts";
import users, {UsersPage} from "../Users/UsersPage";
import styled from "styled-components";
import {MyFriends} from "../Users/MyFriends/MyFriends";
import {useGetDialogsQuery, useGetUsersQuery} from "../api/apiQuery";


export const Profile = () => {
    const {userId} = useParams()
    const authorizedUserId = useAppSelector(state => state.auth.userId)
    const currentUserId = userId ? userId : authorizedUserId






    return (
        <Container>
            <ProfileInfo
                userId={Number(currentUserId)}
                authorizedUserId={authorizedUserId}
            />
        </Container>
    );
};




const Container = styled.div`

  body {
    overflow: auto;
  }

`