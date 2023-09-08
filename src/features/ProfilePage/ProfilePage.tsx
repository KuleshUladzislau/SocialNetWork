import React from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useAppSelector} from "app/hook/useDebounse";
import {ProfileInfo} from "features/ProfilePage/ProfileInfo/ProfileInfo";
import {authHook} from "app/hook/authHook";




 const Profile = () => {
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


export const ProfilePage = authHook()(Profile)

const Container = styled.div`

  body {
    overflow: auto;
  }

`