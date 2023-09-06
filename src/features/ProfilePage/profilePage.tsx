import React from 'react';
import {useParams} from "react-router-dom";

import {ProfileInfo} from "../../components/Profile/ProfileInfo/ProfileInfo";
import styled from "styled-components";
import {useAppSelector} from "app/hook/useDebounse";




export const ProfilePage = () => {
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