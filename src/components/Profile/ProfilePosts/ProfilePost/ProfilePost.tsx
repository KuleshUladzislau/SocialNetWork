import React from 'react';
import styled from "styled-components";


type ProfilePostType = {
    id:number
    title:string
    addedDate:Date
    likes:number
}
export const ProfilePost = (props:ProfilePostType) => {
    const {likes,addedDate,title,id} = props
    return (
        <PostContainer>
            <p>{title}</p>
            <p>likes:{likes}</p>
        </PostContainer>
    );
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 25px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); /* Добавьте эту строку для тени */
`;