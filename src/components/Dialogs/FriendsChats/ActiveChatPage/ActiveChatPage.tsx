import React from 'react';
import {useAppSelector} from "../../../hook/hooks";
import {useGetDialogsQuery} from "../../../api/apiQuery";
import {GlobalStyles} from "../../../../App";
import {ChatsContainer, DialogsContainer, ParentContainer} from "../../Dialogs";
import {ActiveChats} from "../ActiveChats";
import {Simulate} from "react-dom/test-utils";
import dragOver = Simulate.dragOver;
import {Spin} from "antd";

export const ActiveChatPage = () => {

    const userId = useAppSelector(state => state.auth.userId)
    const {data,isFetching} = useGetDialogsQuery()

    const chats = data?.map(chat=>
        <ActiveChats
            key={chat.id}
            photos={chat.photos}
            id={chat.id}
            hasNewMessages={chat.hasNewMessages}
            lastDialogActivityDate={chat.lastDialogActivityDate}
            lastUserActivityDate={chat.lastUserActivityDate}
            newMessagesCount={chat.newMessagesCount}
            userName={chat.userName}


        />)
    if(isFetching){
        return <Spin/>
    }
    return (

                <ChatsContainer>
                    {chats}
                </ChatsContainer>

    );
};

