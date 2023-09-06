import React, {ChangeEvent, useState} from 'react';
import {ProfilePost} from "features/ProfilePage/ProfilePost/MyPost/ProfilePost";
import {Button, Input} from "antd";
import styled from "styled-components";
import {selectProfilePosts} from "features/ProfilePage/profileSelectors";
import {useAppDispatch, useAppSelector} from "app/hook/useDebounse";
import {profileActions} from "features/ProfilePage/profileSlice";



export const ProfilePosts = () => {

    const [title, setTitle] = useState('')
    const dispatch = useAppDispatch()
    const post = useAppSelector(selectProfilePosts)

    const posts = post.map(p =>
        <ProfilePost
            key={p.id}
            title={p.title}
            id={p.id}
            likes={p.likes}/>
    )

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newText = e.currentTarget.value
        setTitle(newText)
    }
    const onClickHandler = () => {
        if (title.length !== 0) {
            dispatch(profileActions.addPost({title}))
            setTitle('')
        }
    }

    return (
        <ProfilePostContainer>
            <AddPostContainer>
                <Input value={title} onChange={onChangeHandler} placeholder='Anything new?'/>
                <Button style={{width:'50px',fontSize:'10px',marginLeft:'10px'}} onClick={onClickHandler} type='primary'>ADD</Button>
            </AddPostContainer>
            <PostContainer>
                {posts}
            </PostContainer>
        </ProfilePostContainer>
    );
};



const AddPostContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
  padding: 25px;
  border-radius: 25px;  
  background-color: white;
  width: 100%;
`

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  
`

const ProfilePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`

