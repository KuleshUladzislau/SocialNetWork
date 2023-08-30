import React from 'react';
import userPhoto from "../../common/UserPhoto/userPhoto.png";
import {ChatWithFriendsContainer, ChatWithFriendStyle, MessageStyle, PhotoContainer} from "./FriendsChats";
import {useNavigate} from "react-router-dom";


type ActiveChats = {
    hasNewMessages:boolean
    id:number
    lastDialogActivityDate:string
    lastUserActivityDate:string
    newMessagesCount:number
    photos: {small: string, large:string}
    userName:string
}

export const ActiveChats = (props:ActiveChats) => {
    const {
        hasNewMessages,
        lastDialogActivityDate,
        lastUserActivityDate,
        newMessagesCount,
        photos,
        id,
        userName
    } = props

    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate(`/dialogs/${id}`,{state:{name:userName,photos:photos.small}})
    }



    return (
        <ChatWithFriendStyle onClick={onClickHandler}>
            <ChatWithFriendsContainer>
                <PhotoContainer>
                    <img src={photos.small ? photos.small : userPhoto} alt=""/>
                </PhotoContainer>
                <MessageStyle>
                    <div>{userName}</div>
                    <div>new message {newMessagesCount}</div>
                </MessageStyle>
            </ChatWithFriendsContainer>
        </ChatWithFriendStyle>
    );
};

