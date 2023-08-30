import React from 'react';
import {useMyFriendsQuery} from "../../api/apiQuery";
import {User} from "../User/User";
import {Users, UsersContainer} from "../Users";

export const MyFriends = () => {



    return (

            <Users friend={true}/>

    );
};

