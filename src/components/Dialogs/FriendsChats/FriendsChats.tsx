import userPhoto from "../../common/UserPhoto/userPhoto.png";
import React, {ChangeEvent, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {GlobalStyles} from "app/App";
import {Input} from "antd";
import {FormContainer} from "../../Users/UsersPage";


type FriendsChats = {
    id: number
    name: string
    photos: {
        small: string
        large: string
    },

}

export const FriendsChats = (props: FriendsChats) => {

    const {name, photos, id} = props
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate(`/dialogs/${id}`,{state:{name,photos:photos.small}})
    }
    const [nameUser, setSearchNameUser] = useState('')
    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchNameUser(userName)
    }

    return (
        <ChatWithFriendStyle onClick={onClickHandler}>

            <ChatWithFriendsContainer>
                <PhotoContainer>
                    <img src={photos.small ? photos.small : userPhoto} alt=""/>
                </PhotoContainer>
                <MessageStyle>
                    <div>{name}</div>
                    <div>message</div>
                </MessageStyle>
            </ChatWithFriendsContainer>
        </ChatWithFriendStyle>
    )
}


export const ChatWithFriendStyle = styled.div`

  height: 60px;
  border-bottom:1px solid  rgba(0, 0, 0,20%);
  width: 100%;

  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }

`

export const ChatWithFriendsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  
  * {
    pointer-events: none;
  }
`


export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  padding: 5px;


  & p {
    font-size: 10px;

  }

  & img {
    height: 50px;
  }

  * {
    pointer-events: none;
  }
`

export const MessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  margin-left: 15px;

  * {
    pointer-events: none;
  }
`