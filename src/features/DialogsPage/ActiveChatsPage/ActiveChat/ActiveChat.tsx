import styled from "styled-components";
import userPhoto from '/common/assets/img/userPhoto.png'
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