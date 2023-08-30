import React, {ChangeEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';
import userPhoto from "../../common/UserPhoto/userPhoto.png";
import {
    useGetProfileQuery, useGetUsersQuery, useLazyGetFriendMessageQuery, useLazyGetProfileQuery,
    useUploadPhotoMutation
} from "../../api/apiQuery";

import styled from "styled-components";
import {Modal} from "../../common/Modal";
import {EditeProfile} from "../EditProfile/EditeProfile";
import {Button, Collapse, CollapseProps, Spin} from "antd";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {Contacts} from "./Contacts/Contacts";
import Card from "antd/es/card/Card";
import {ProfilePosts} from "../ProfilePosts/ProfilePosts";
import {Link, NavLink} from "react-router-dom";
import {createAsyncThunk} from "@reduxjs/toolkit";
import Upload from "antd/es/upload/Upload";
import {UploadFile} from "antd/lib";
import {UploadChangeParam} from "antd/es/upload";


type ProfileInfoPropsType = {
    userId: number
    authorizedUserId: number
}


export const ProfileInfo = ({userId, authorizedUserId}: ProfileInfoPropsType) => {


    const [activeModal, setActiveModal] = useState(false);
    const [getProfile, {data, isFetching}] = useLazyGetProfileQuery()
    const photos = data && data.photos
    const fullName = data && data.fullName
    const aboutMe = data && data.aboutMe
    const viewAuthorizedUser = authorizedUserId === userId
    const [uploadPhoto] = useUploadPhotoMutation()
    useEffect(() => {
        if (userId !== 0) {
            getProfile({userId})
        }
    }, [userId])


    const onActiveModalHandler = () => {
        setActiveModal(!activeModal)
    }


    const uploadPhotoHandler = (event: UploadChangeParam<UploadFile<Blob>>) => {
        if (event.file) {
            const formData = new FormData();
            formData.append('image', event.file.originFileObj as Blob);

            uploadPhoto(formData);
        }
    };




    return (
        <ProfileContainer>

            <ProfileMain>
                <PhotoImgProfile>
                    <ProfilePhoto src={photos?.small === null ? userPhoto : photos?.large} alt="ProfilePhoto"/>

                    <UploadStyle onChange={uploadPhotoHandler} showUploadList={false}  >
                        <UploadPhoto>Upload Photo</UploadPhoto>
                    </UploadStyle>
                </PhotoImgProfile>
                <ProfileUserInfo>
                    <h3>{fullName}</h3>

                    <EditeProfileStyle>
                        {
                            viewAuthorizedUser &&
                            <Button style={{fontSize: '20px', color: "black"}} type={'link'}
                                    onClick={onActiveModalHandler}>edite
                                profile</Button>
                        }
                    </EditeProfileStyle>
                    {/*<StatusStyle><ProfileStatus authorizedUserId={authorizedUserId} userId={userId}/></StatusStyle>*/}
                </ProfileUserInfo>


            </ProfileMain>
            <AboutMeBlock>
                <div style={{width: '60%'}}>
                    <ProfilePosts/>
                </div>
                <div style={{width: '40%'}}>
                    <Card title='About Me' style={{borderRadius: '25px', marginTop: '20px'}}>
                        {aboutMe}
                    </Card>
                    <Card title='Contacts'
                          style={{borderRadius: '25px', marginTop: '20px'}}>
                        {data && <Contacts contacts={data.contacts}/>}
                    </Card>
                    <ProfileFriendsCard/>
                </div>

            </AboutMeBlock>


            <Modal title='Edite profile' active={activeModal} setActive={onActiveModalHandler}>
                <EditeProfile
                    userId={userId}
                    aboutMe={data ? data.aboutMe : ''}
                    lookingForAJobDescription={data ? data.lookingForAJobDescription : ''}
                    fullName={fullName ? fullName : ''}
                    onClick={setActiveModal}
                    contacts={data?.contacts}
                />
            </Modal>


        </ProfileContainer>
    );
};


const ProfileFriendsCard = () => {


    let randomPage = 1;

    const {
        data: friends
    } = useGetUsersQuery({page: 1, pageSize: 3, term: '', friend: true})

    const [getFriends] = useLazyGetFriendMessageQuery()


    const randomPageMutation = () => {
        randomPage = Math.random()
    }

    const mapedFriends = friends?.items.map(f =>
        <FriendsStyle to={`/profile/${f.id}`}>
            <img src={f.photos.small ? f.photos.small : userPhoto} style={{width: '20px'}}/>
            {f.name.slice(0, 11)}
        </FriendsStyle>
    )

    const title = (
        <Link to="/friends">
            My Friends {friends?.totalCount}
        </Link>
    );

    return (

        <Card title={title}
              style={{borderRadius: '25px', marginTop: '20px'}}>
            <CardContainer>
                {friends && mapedFriends}
            </CardContainer>

        </Card>

    )
}

const FriendsStyle = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;

  & > img {
    width: 70px !important;
    height: 70px;
    border-radius: 50%;
  }
`


const ProfileMain = styled.div`
  display: flex;
  position: relative;
  top: -13px;
  flex-direction: column-reverse;
  height: 45vh;
  width: 100%;
  border-radius: 25px;
  background: linear-gradient(to right,
  #8e44ad 0%,
  #9b59b6 20%,
  #a569bd 40%,
  #b977c4 60%,
  #c87ccf 80%,
  #d182da 100%);
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 10px;

`


const AboutMeBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`


const PhotoImgProfile = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  border-radius: 25px;
  

 
  &:hover button {
    opacity: 1;
  }
 
 
`;



const UploadStyle = styled(Upload)`
  display: flex;
  position: absolute;
  top:-130px;
  left: 130px;
  z-index: 2;
  


`

const ProfilePhoto = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 7px solid white;
  top: -230px;
  left: 30px;
  position: absolute;
  z-index: 1;
`;

const UploadPhoto = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  
 
`


const ProfileUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: white;
  height: 130px;
  border-radius: 25px;
  padding-left: 200px;

  & h3 {
    margin-left: 20px;
    font-size: 24px;
  }

`


const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 25px;


  position: relative;



`


const EditeProfileStyle = styled.div`

`

const StatusStyle = styled.div`
  width: 300px;
  overflow-wrap: break-word;
`







