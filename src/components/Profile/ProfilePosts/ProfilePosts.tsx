import React, {useState} from 'react';
import {Button, Input} from "antd";
import styled from "styled-components";

export const ProfilePosts = () => {
    const [post,setPost] = useState(
        [{id:1,title:"I'm fine thanks!",addedDate:new Date(),likes:5,},
            {id:1,title:"I'm fine thanks!",addedDate:new Date(),likes:5,},
            {id:1,title:"I'm fine thanks!",addedDate:new Date(),likes:5,}]
    )

    const posts = post.map(p=><ProfilePost/>)

    return (
        <div>

            <ProfilePostContainer>
                <Input/>
                <Button type='primary'>ADD POST</Button>
            </ProfilePostContainer>
            <div>
                {
                    post.map(post=>{
                        return(
                            <div>
                                {post.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};


const ProfilePostContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 25px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); /* Добавьте эту строку для тени */
`;