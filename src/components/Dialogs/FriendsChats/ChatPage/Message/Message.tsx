import React from 'react';
import styled from "styled-components";
import {useDeleteMessageMutation} from "../../../../api/apiQuery";



export type Message = {
    addedAt: Date
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
    meMessage: boolean

}
export const Message = (props: Message) => {
    const {body, addedAt, meMessage,id,} = props
    const [deleteMessage,data] = useDeleteMessageMutation()




    const dateObject = new Date(addedAt);
    const formattedYear = dateObject.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',

    });

    const formatHour = dateObject.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })


    const onClickDeleteMessageHandler = () => {
        deleteMessage({messageId:id})
    };
    return (

        <MessageContainer background={meMessage ? 'rgb(126,185,238)' : '#C0C0C0'}
                          position={meMessage ? 'right' : 'left'}>
            <MessageStyle>{body}</MessageStyle>
            {/*<button onClick={onClickDeleteMessageHandler}>x</button>*/}
            <DateStyle>{formatHour}</DateStyle>
        </MessageContainer>

    )
}

type MessageStyle = {
    background: string
    position: string
}

const MessageContainer = styled.div<MessageStyle>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({background}) => `${background}`};
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  flex-grow: 1;
  flex: 20%;
  word-wrap: break-word;
  word-break: break-word;
  min-width: 100px;

 

  &::after {
    content: "";
    position: absolute;
    top: 20px;
    bottom: 0;
    ${({position}) => (position === "left" ? "left: -10px;" : "right: -10px;")}
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent ${({background}) => background} transparent;
    z-index: 1;
  }
`;

const MessageStyle = styled.div`
 
  margin-right: 20px;
  margin-bottom: 20px;

`


const DateStyle = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  
  white-space: nowrap;
  
`