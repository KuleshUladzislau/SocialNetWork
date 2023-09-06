import React, {ChangeEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useLazyGetFriendMessageQuery, useSendFriendMessageMutation} from "../../../api/apiQuery";
import {Message} from "./Message/Message";
import styled from "styled-components";
import {Button, Input, Spin} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {GlobalStyles} from "app/App";
import {useAppDispatch, useAppSelector} from "../../../hook/hooks";
import {friendMessageActions} from "./chatPageSlice";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


export const ChatPage = React.memo(() => {

    const {userId} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const authUser = useAppSelector(state => state.auth.login)
    const totalCount = useAppSelector(state => state.friendsMessages.totalCount)
    const messages = useAppSelector(state => state.friendsMessages.messages)
    const messagesRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    const [pageMessages, setPageMessages] = useState(2);
    const [shouldLoadMoreMessages, setShouldLoadMoreMessages] = useState(false);


    const [
        friendMessage,
        {
            isFetching,
        }
    ] =
        useLazyGetFriendMessageQuery()


    const [sendMessage] = useSendFriendMessageMutation()

    const {
        handleSubmit,
        control,
        reset

    } = useForm({
        defaultValues: {
            message: ''
        }
    })


    useEffect(() => {
        if (userId) {
            friendMessage({userId: Number(userId), page: 1}).then(() => {
                if (messagesRef.current) {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }
            })
        }
        return () => {
            dispatch(friendMessageActions.resetState())
        }

    }, [])



    useEffect(() => {

        if (messagesRef.current) {
            messagesRef.current.addEventListener('scroll', handleScroll);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight - messagesRef.current.scrollTop
        }

        return () => {
            if (messagesRef.current) {
                messagesRef.current.removeEventListener('scroll', handleScroll);
            }

        };


    }, [])


    useLayoutEffect(() => {

        if (messagesRef.current && messages.length < totalCount) {
            messagesRef.current.addEventListener('scroll', handleScroll);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight - messagesRef.current.scrollTop
        }

        return () => {
            if (messagesRef.current) {
                messagesRef.current.removeEventListener('scroll', handleScroll);
            }

        };


    }, [shouldLoadMoreMessages])


    useEffect(() => {
        if (shouldLoadMoreMessages) {
            setPageMessages(pageMessages + 1);
            friendMessage({userId: Number(userId), page: pageMessages})
            setShouldLoadMoreMessages(false);
        }

    }, [shouldLoadMoreMessages]);


    const mapMessages = messages?.map((m) => <MessagesStyle
            alignItems={m.senderName === authUser ? 'flex-end' : 'flex-start'}>
            <Message
                addedAt={m.addedAt}
                body={m.body}
                id={m.id}
                recipientId={m.recipientId}
                senderId={m.senderId}
                senderName={m.senderName}
                translatedBody={m.translatedBody}
                viewed={m.viewed}
                meMessage={m.senderName === authUser}

            />
        </MessagesStyle>
    )


    const onSubmit = (data: { message: string }) => {
        const {message} = data
        sendMessage({userId: Number(userId), body: message})
        reset()
    }


    const handleScroll = () => {

        const scrollTop = messagesRef.current!.scrollTop;

        if (scrollTop === 0) {

            setShouldLoadMoreMessages(true);
        }

    };

    const downHandlerClick = () => {
        navigate('/dialogs')
    }


    return (
        <ChatPageContainer>
            <GlobalStyles/>
            <HeaderChatStyle>
                <Button type='link' onClick={downHandlerClick}>{'< '}Назад</Button>
                <NameFriendStyle>{location.state.name}</NameFriendStyle>
                <PhotoFriend src={location.state.photos}/>
            </HeaderChatStyle>
            <MessageContainer ref={messagesRef}>
                {isFetching && <SpinContainer><Spin/></SpinContainer>}
                {mapMessages}
            </MessageContainer>
            <SendMessageFormStyle onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    render={({field}) =>
                        <Input {...field} autoComplete='off'/>
                    }
                    name='message'

                    control={control}
                />
                <Button type='primary' htmlType='submit'>SEND</Button>
            </SendMessageFormStyle>
        </ChatPageContainer>
    );
})


const ChatPageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  border-radius: 25px;
  background: white;
  box-shadow: 0 0 0.4px rgba(0, 0, 0, 0.2);


`

const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`

const SendMessageFormStyle = styled.form`
  display: flex;
  flex-direction: row;
  border-top: 1px solid rgba(0, 0, 0, 20%);
  padding: 20px;
  margin-top: 20px;
`
const MessageContainer = styled.div`
  height: 80vh;
  padding: 20px;
  overflow: auto;


  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f0f0f0;
  }

  /* Стили ползунка прокрутки в Chrome, Safari и Opera */

  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 4px;
  }

  /* Цвет ползунка прокрутки при наведении в Chrome, Safari и Opera */

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`


type MessagesStyleProps = {
    alignItems: string
}


const MessagesStyle = styled.div<MessagesStyleProps>`
  display: flex;
  flex-direction: column;

  align-items: ${props => props.alignItems};

`

const HeaderChatStyle = styled.div`
  display: flex;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 20%);
  background: white;

`
const NameFriendStyle = styled.div`
  flex: 70%;
  text-align: center;
  font-size: 25px;
  margin-bottom: 10px;
`

const PhotoFriend = styled.img`
  border-radius: 50px;
  height: 60px;
  padding: 5px;
  margin-right: 20px;
`