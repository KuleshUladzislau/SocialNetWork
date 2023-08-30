import React, {useState} from 'react';
import styled from "styled-components";
import {useGetDialogsQuery, useMyFriendsQuery} from "../api/apiQuery";
import {FriendsChats} from "./FriendsChats/FriendsChats";
import {GlobalStyles} from "../../App";
import {ActiveChatPage} from "./FriendsChats/ActiveChatPage/ActiveChatPage";
import {Tabs} from "antd";
import TabPane from "antd/lib/tabs/TabPane";


export const Dialogs = () => {


    return (
        <DialogsContainer>
            <GlobalStyles/>
            <ParentContainer>
                <ChatsContainer>
                        <Tabs defaultActiveKey="1" centered  >
                            <TabPane tab="Active Dialogs" key="1" >
                                <ActiveChatPage  />
                            </TabPane>
                            <TabPane tab="All Chats" key="2">
                                <AllChats/>
                            </TabPane>
                            <TabPane tab={'Spam'} key="3">
                                <div>spam</div>
                            </TabPane>
                        </Tabs>
                </ChatsContainer>
            </ParentContainer>
        </DialogsContainer>
    );
};

export const DialogsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
  background: white;
`;
export const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
  
  
 
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f0f0f0;
  }

 

  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 4px;
  }

  

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;


export const ParentContainer = styled.div`
  height: 80vh;
  width: 100%;
`;






const AllChats = () => {
    const {data, isFetching} = useMyFriendsQuery({friend: true})

    const chats = data?.items.map(user => {
        return <FriendsChats id={user.id} name={user.name} photos={user.photos}/>
    })

    return (
        <>{chats}</>
    )
}
