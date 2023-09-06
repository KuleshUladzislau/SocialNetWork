import {useAppDispatch, useAppSelector} from "components/hook/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "app/hook/useDebounse";
import {Input} from "antd";
import styled from "styled-components";
import {userPageSelector} from "features/UsersPage/usersPage.selectors";
import {useGetUsersQuery} from "features/UsersPage/userPage.api";
import {usersActions} from "features/UsersPage/usersSlice";
import {Users} from "features/UsersPage/Users/Users";

export const UsersPage = () => {
    const dispatch = useAppDispatch()
    const {page,pageSize,totalCount} = useAppSelector(userPageSelector)

    const [nameUser, setSearchNameUser] = useState('')
    const debouncedValue = useDebounce(nameUser, 500)



    const {
        data
    } = useGetUsersQuery({page, pageSize, term: debouncedValue})

    useEffect(() => {
        if (data) {
            dispatch(usersActions.setUsersTotalCount({totalCount: data.totalCount}))
        }
    }, [data])





    const onChangeSearchUserHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let userName = e.currentTarget.value
        setSearchNameUser(userName)
    }

    const onChangePageHandler = (page: number, pageSize: number) => {
        dispatch(usersActions.changeUsersPage({page}))
        dispatch(usersActions.changeUsersPageSize({pageSize}))
    }

    return (

        <UserPageContainer>
            <FormContainer>
                <h2>Search new friends</h2>
                <Input value={nameUser} placeholder='write name...' onChange={onChangeSearchUserHandler}/>
            </FormContainer>
            <UsersContainer>
                <Users
                    users={data?.items}
                    page={page}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    changePageSettings={onChangePageHandler}

                />
            </UsersContainer>


        </UserPageContainer>
    );
}

export default UsersPage

export const UsersContainer = styled.div`

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 20px;

`
export const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  border: 1px solid red;

`


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: center;
  align-items: center;

`