import userPhoto from "../../common/UserPhoto/userPhoto.png";
import React from "react";
import styled from "styled-components";




type ChatWithFriends = {
    id:number
    name:string
    photos:{
        small:string
        large:string
    }
}

export const FriendsChats = (props:ChatWithFriends) => {

    const {name,photos} = props


    return (
        <ChatWithFriendStyle>
            <ChatWithFriendsContainer>
                <PhotoContainer>
                    <img src={photos.small ? photos.small :userPhoto} alt=""/>
                </PhotoContainer>
                <MessageStyle>
                    <div>{name}</div>
                    <div>message</div>
                </MessageStyle>
            </ChatWithFriendsContainer>
        </ChatWithFriendStyle>
    )
}


const ChatWithFriendStyle = styled.div`
  width: 600px;
  height: 60px;
  border: 1px solid red;

  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }

`

const ChatWithFriendsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;

  * {
    pointer-events: none;
  }
`

const PhotoContainer = styled.div`
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

const MessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: 500px;
  margin-left: 15px;

  * {
    pointer-events: none;
  }
`