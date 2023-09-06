
import {UsersContainer} from "features/UsersPage/UsersPage";
import {Pagination} from "antd";
import React from "react";
import {User} from "features/UsersPage/User/User";

type UserType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}


type Users = {
    users?: UserType[],
    page: number
    pageSize: number
    totalCount: number
    changePageSettings:(page:number,pageSize:number)=>void

}

export const Users = (props: Users) => {


    const
        {
            page,
            pageSize,
            totalCount,
            users,
            changePageSettings,

        }
            = props

    const mapedUsers = users?.map(u => {

        return <User
            key={u.id}
            userId={u.id}
            followed={u.followed}
            status={u.status}
            name={u.name}
            photos={u.photos}

        />
    })



    const onChangePageHandler = (page: number, pageSize: number) => {
        changePageSettings(page,pageSize)
    }


    return (
        <>

            <UsersContainer>
                {mapedUsers}
            </UsersContainer>
            <Pagination
                current={page}
                pageSize={pageSize}
                onChange={onChangePageHandler}
                total={totalCount}
                pageSizeOptions={['5', '10', '15', '20', '25']}
            />
        </>
    );
};
