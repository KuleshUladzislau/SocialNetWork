import styled from "styled-components";
import {Button, Checkbox, Input} from "antd";
import React, { useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { useLazyGetCaptchaQuery,
    useLoginMutation
} from "features/Login/auth.api";
import {GlobalStyles} from "app/App";

type AuthorizedLoginValue = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


export const Login = () => {
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate()
    const [login, {data: loginData}] = useLoginMutation();
    const [getCaptha, {data}] = useLazyGetCaptchaQuery()


    const {
        handleSubmit,
        control,
        formState: {}

    } =
        useForm(
            {
                defaultValues: {
                    email: '',
                    password: '',
                    captcha: '',
                    rememberMe: false
                },

            }
        );

    const onSubmit: SubmitHandler<AuthorizedLoginValue> = (data) => {
        setLoading(true)
        const {email, password, rememberMe, captcha} = data
        login({email, password, rememberMe, captcha})
            .unwrap()
            .then((data) => {
                if (data.resultCode === 0) {
                    navigate(`/profile`)
                }
                if (data.resultCode === 10) {
                    getCaptha()
                }
            })
            .finally(() => {
                setLoading(false)
            })


    }


    return (

        <LoginContainer>
            <div style={{color: 'gray', textAlign: 'center'}}>
                <p>To log in get registered
                    <Link href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </Link>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
            <FormStyle onSubmit={handleSubmit(onSubmit)}>
                <GlobalStyles overflow='hidden'/>

                <LoginTitleStyle>Login</LoginTitleStyle>

                <LabelStyle htmlFor={'email'}>Email</LabelStyle>
                <Controller
                    render={({field, fieldState: {error}}) =>
                        <div>
                            <Input {...field} />
                            {error && <div style={{color: 'red'}}>{error.message}</div>}
                        </div>}
                    name={'email'}
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    }}
                />

                <LabelStyle htmlFor="password">Password</LabelStyle>
                <Controller
                    render={({field}) => <Input.Password   {...field} />}
                    name={'password'}
                    control={control}
                    rules={{
                        required: true
                    }}
                />


                <div style={{marginTop: '10px', textAlign: 'center', cursor: 'pointer'}}>
                    <LabelStyle htmlFor={'rememberMe'}>Remember Me</LabelStyle>
                    <Controller
                        render={({field}) => <Checkbox id='rememberMe'  {...field} />}
                        name={'rememberMe'}
                        control={control}
                    />
                </div>
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <Button loading={loading} type="primary" htmlType='submit'>login</Button>
                </div>
                {loginData?.messages && <ErrorMessageStyle>{loginData.messages}</ErrorMessageStyle>}
                {data && <FieldContainer>
                    <img src={data?.url} alt='captcha'/>
                    <Controller
                        render={({field}) =>
                            <Input {...field} id="captcha" name="captcha" type='captcha' placeholder="captcha"/>}
                        name={'captcha'}
                        control={control}
                    />

                </FieldContainer>}
            </FormStyle>
        </LoginContainer>


    );
};

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -120px;

`

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  min-height: 300px;
  width: 300px;
  border-radius: 25px;
  background: white;

`

const LabelStyle = styled.label`
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 5px;
  color: cornflowerblue;
  cursor: pointer;
`

const LoginTitleStyle = styled.h2`
  text-align: center;
  font-size: 30px;
  color: cornflowerblue;
`

const ErrorMessageStyle = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
  transition: 0.3ms ease-in-out;

`
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`


const Link = styled.a`
  color: #bd5629;
  text-decoration: none;
`