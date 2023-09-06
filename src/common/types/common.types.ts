

export type ResponseType<T = {}> = {
    data: T
    messages: Array<string>
    resultCode: number
}