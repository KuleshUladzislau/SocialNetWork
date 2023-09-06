import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import photo from 'common/assets/img/userPhoto.png'
import {useFollowUserMutation, useUnFollowUserMutation} from "features/UsersPage/userPage.api";

export type UserType = {
    name: string
    userId: number
    photos: {
        small:string
        large:string
    }
    status: null | string,
    followed: boolean

}
export const User =(props: UserType) => {
    const {status, userId, followed, photos, name,} = props
    const [followUser] = useFollowUserMutation()
    const [unFollowUser] = useUnFollowUserMutation()


    const followingHandler = ()=>{
        followUser({userId})
    }
    const unFollowingHandler = ()=>{
        unFollowUser({userId})
    }





    return (
        <UserContainer key={userId} >
            <NameStyle>{name}</NameStyle>
            <UserImage>
                <NavLink to={`/profile/${userId}`}>
                    <img alt='Photo' src={photos.small ? photos.small : photo} />
                </NavLink>
            </UserImage>

            {followed ? <Button type='primary' onClick={unFollowingHandler} >UNFOLLOW</Button> : <Button type='primary' onClick={followingHandler}>FOLLOW</Button>}
        </UserContainer>
    )
}


const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 300px;
  border: 1px solid blueviolet;
  border-radius: 20px;
  margin: 20px;

`

const UserImage = styled.div`
  height: 150px;
  
`

const NameStyle = styled.div`
  margin-bottom: 20px;
`