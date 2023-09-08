import React from 'react';
import styled from "styled-components";
import {useDeleteMessageMutation} from "features/DialogsPage/dialogsPage.api";
import tick from 'features/DialogsPage/assets/tiksImg/tick.png'
import doubleTick from 'features/DialogsPage/assets/tiksImg/2Ticks.png'




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
    const {body, addedAt, meMessage,id,viewed} = props
    const [deleteMessage,data] = useDeleteMessageMutation()

    const isViewed = viewed ? doubleTick : tick


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
            <MessageStyle>
                {body}
            </MessageStyle>
            <div>
                {/*<img style={{width: '15px'}} src={tick} alt=""/>*/}

            </div>
            {/*<button onClick={onClickDeleteMessageHandler}>x</button>*/}
            <DateStyle>
                {formatHour}
                <TicksStyle  src={isViewed} alt=""/>
            </DateStyle>
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5px;
  right: 5px;
  white-space: nowrap;
`

const TicksStyle = styled.img`
  width: 20px;
  margin-bottom: 2px;
  margin-left:5px;
`