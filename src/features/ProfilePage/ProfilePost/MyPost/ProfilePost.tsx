
import styled from "styled-components";
import Card from "antd/es/card/Card";
import React from "react";
import {useAppDispatch} from "app/hook/useDebounse";
import {profileActions} from "features/ProfilePage/profileSlice";

type ProfilePostType = {
    id:string
    title:string
    likes:number
}
export const ProfilePost = (props:ProfilePostType) => {
    const {likes,title,id} = props
    const dispatch = useAppDispatch()
    const deletePostHandler = ()=>{
        dispatch(profileActions.deletePost({id}))
    }
    return (
        <PostContainer>
            <Title>{title}</Title>
            <Likes>Likes: {likes}</Likes>
            <Button onClick={deletePostHandler}>x</Button>
        </PostContainer>
    );
};

const PostContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100px;
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  word-break: break-word;
`;

const Title = styled.p`
  text-align: center;
  width: 300px;
`;

const Likes = styled.p`
  position: absolute;
  bottom: 10px;
  right: 10px;

`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border:none;
  
`;