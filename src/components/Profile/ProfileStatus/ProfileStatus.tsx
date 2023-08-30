import React, {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {useAppSelector} from "../../hook/hooks";

import {useChangeProfileStatusMutation, useGetProfileStatusQuery} from "../../api/apiQuery";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";

type ProfileStatusPropsType = {
    userId: number
    authorizedUserId: number
}

export const ProfileStatus = ({userId, authorizedUserId}: ProfileStatusPropsType) => {


    const [activeRequest, setActiveRequest] = useState(false)
    const status = useGetProfileStatusQuery({userId}, {skip: !activeRequest})?.currentData
    const [changeStatus] = useChangeProfileStatusMutation()
    const viewChangeStatus = userId === authorizedUserId


    useEffect(() => {
        if (userId !== 0) {
            setActiveRequest(true)
        }

    }, [authorizedUserId])


    const onChangeHandler = (title: string) => {
        changeStatus({status: title})
    }

    return viewChangeStatus
        ? <EditableSpan title={status ? status as any : 'changeStatus'} onChange={onChangeHandler}/>
        : <h3>{status as any}</h3>
}