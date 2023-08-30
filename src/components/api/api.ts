import axios, {AxiosResponse} from "axios";


const istanse = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '944b303b-0d0e-4deb-a121-e3373db70301'}


})

export type UsersType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}


export type ProfileType = {
    aboutMe:string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:
        {
            github: string
            vk: string
            facebook: string
            instagram: string
            twitter: string
            website: string
            youtube: string
            mainLink: string
        }
    photos: {
        small: string
        large: string
    }


}


export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return istanse.get<Array<UsersType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    onPageChanged(currentPage: number, pageSize: number) {
        return istanse.get<Array<UsersType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => (response.data))
    },
    follow(userId: number) {
        return istanse.post <ResponseType<{}>>(`follow/${userId}`)
    },
    unFollow(userId: number) {
        return istanse.delete<ResponseType<{}>>(`follow/${userId}`)
    }


}

export const profileAPI = {

    getProfile(userId: number) {
        return istanse.get <ProfileType>('profile/' + userId).then(response => response.data)
    },
    getStatus(userId: number) {
        return istanse.get('/profile/status/' + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return istanse.put('/profile/status', {status})

    }
}




export type ResponseType<T = {}> = {
    data: T
    messages: Array<string>
    resultCode: ResultCodes
}


export type Me = {
    id: number
    email: string
    login: string
}

export type LoginMeResponse = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}

export enum ResultCodes {
    Success = 0,
    SomethingWrong = 1,
    Captcha = 10
}


export const authAPI = {
    me() {
        return istanse.get<ResponseType<Me>>('auth/me').then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return istanse.post<LoginMeResponse>('auth/login', {email, password, rememberMe})
            .then(res => res.data)
    },
    logout() {
        return istanse.delete('auth/login')
    }
}

