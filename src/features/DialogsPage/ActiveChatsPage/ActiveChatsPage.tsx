import {useAppSelector} from "app/hook/useDebounse";
import {useGetDialogsQuery} from "features/DialogsPage/dialogsPage.api";
import {ActiveChats} from "features/DialogsPage/ActiveChatsPage/ActiveChat/ActiveChat";
import {ChatsContainer} from "features/DialogsPage/DIalogsPage";
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