import React, {useEffect} from 'react';
import {Button, Checkbox, Input} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import styled from "styled-components";
import {ContactsType, useUpdateProfileInfoMutation} from "features/ProfilePage/profilePage.api";



type EditeProfileFormType = {
    fullName: string
    lookingForAJobDescription: string
    lookingForAJob:boolean
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink:string
    aboutMe:string
}

type EditeProfilePropsType = {
    aboutMe:string
    fullName: string
    onClick:(activeModal:boolean)=>void
    lookingForAJobDescription:string
    userId:number
    contacts?:ContactsType
}
export const EditeProfile = (props:EditeProfilePropsType) => {
    const {
        onClick,
        userId,
        fullName,
        lookingForAJobDescription,
        contacts,
        aboutMe
    } = props

    const {
        handleSubmit,
        control,
        setValue
    } =
        useForm<EditeProfileFormType>(
            {
                defaultValues: {
                    lookingForAJobDescription:'',
                    lookingForAJob:false,
                    fullName:'',
                    facebook: '',
                    github: '',
                    instagram: '',
                    twitter: '',
                    youtube: '',
                    vk: '',
                    website: '',
                    mainLink:'',
                    aboutMe: '',
                }
            }
        );

    useEffect(() => {
        if(contacts){
            setValue('vk',contacts.vk)
            setValue('github',contacts.github)
            setValue('facebook',contacts.facebook)
            setValue('twitter',contacts.twitter)
            setValue('instagram',contacts.instagram)
            setValue('youtube',contacts.youtube)
            setValue('website',contacts.website)

        }
        setValue('fullName', fullName);
        setValue('aboutMe', aboutMe);
        setValue('lookingForAJobDescription', lookingForAJobDescription);

    }, [fullName, setValue,aboutMe]);

    const [updateProfileInformation] = useUpdateProfileInfoMutation()

    const onSubmit: SubmitHandler<EditeProfileFormType> = (data) => {
        const {
            lookingForAJobDescription,
            youtube,
            website,
            twitter,
            instagram,
            github,
            lookingForAJob,
            aboutMe,
            vk,
            mainLink,
            facebook,
            fullName
        } = data
        const contacts :ContactsType = {vk,facebook,github,instagram,mainLink,twitter,website,youtube}
        updateProfileInformation({
            userId,
            fullName,
            lookingForAJobDescription,
            lookingForAJob,
            aboutMe,
            contacts
        })
        onClick(false)

    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="fullName">Name:</label>
                        <Input {...field}  />
                    </EditInputContainer>}
                name={'fullName'}
                defaultValue={fullName}
                control={control}
            />

            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="aboutMe">AboutMe:</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'aboutMe'}
                control={control}
            />

            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="lookingForAJobDescription">looking for a job</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'lookingForAJobDescription'}
                control={control}
            />


            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="facebook">facebook</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'facebook'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="website">website</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'website'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="vk">vk</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'vk'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="twitter">twitter</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'twitter'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="instagram">instagram</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'instagram'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="youtube">youtube</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'youtube'}
                control={control}
            />
            <Controller
                render={({field, fieldState: {error}}) =>
                    <EditInputContainer>
                        <label htmlFor="github">github</label>
                        <Input {...field}/>
                    </EditInputContainer>}
                name={'github'}
                control={control}
            />
            <Button style={{marginTop:'20px'}} type='primary' htmlType='submit'>save</Button>
        </FormStyle>
    );
};


const inputEditeProfile = () => {
    return (
        <EditInputContainer>
            <label htmlFor="github">github</label>
            <Input/>
        </EditInputContainer>
    )
}

const EditInputContainer = styled.div`
  
  & input {
    margin-top: 10px;
    margin-bottom: 10px;
  }

`

const FormStyle = styled.form`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  
  & button{
    width: 100px;
    text-align: center;
    margin: 0 auto;
    
  }

`

