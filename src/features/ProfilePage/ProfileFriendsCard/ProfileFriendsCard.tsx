import userPhoto from "common/assets/img/userPhoto.png";
import Card from "antd/es/card/Card";
import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import { useLazyGetUsersForProfilePageQuery} from "features/ProfilePage/profilePage.api";
import {useEffect} from "react";

export const ProfileFriendsCard = () => {


    let randomPage = 1;



    // const {
    //     data: friends
    // } = useGetUsersForProfilePageQuery({page: 1, pageSize: 3, term: '', friend: true})

    const [getFriends, {data: friends}] = useLazyGetUsersForProfilePageQuery()

    useEffect(()=>{
        getFriends({page: 1, pageSize: 3, term: '', friend: true})
    },[])

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

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`