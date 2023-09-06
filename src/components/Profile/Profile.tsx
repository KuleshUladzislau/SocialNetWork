import React from 'react';
import { useAppSelector} from "../hook/hooks";
import { useParams} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import styled from "styled-components";



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