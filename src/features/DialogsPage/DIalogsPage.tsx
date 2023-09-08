import {GlobalStyles} from "app/App";
import {Tabs} from "antd";
import TabPane from "antd/lib/tabs/TabPane";
import styled from "styled-components";
import {AllChatsPage} from "features/DialogsPage/AllChatsPage/AllChatsPage";
import {ActiveChatPage} from "features/DialogsPage/ActiveChatsPage/ActiveChatsPage";
import {authHook} from "app/hook/authHook";


 const Dialogs = () => {


    return (
        <DialogsContainer>
            <GlobalStyles/>
            <ParentContainer>
                <ChatsContainer>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Active Dialogs" key="1">
                            <ActiveChatPage/>
                        </TabPane>
                        <TabPane tab="All Chats" key="2">
                            <AllChatsPage/>
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


export const DialogsPage = authHook()(Dialogs)

export const DialogsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 10px;
  background: white;
  border-radius: 25px;
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