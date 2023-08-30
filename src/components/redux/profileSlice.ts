import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";


type PostType = {
    id: string
    title: string

    likes: number
}

type InitialState = {
    posts: PostType[]
}

const initialState: InitialState = {
    posts: [
        {id: v1(), title: "I'm fine thanks!", likes: 5,},
        {id: v1(), title: "I'm fine thanks!", likes: 5,},
        {id: v1(), title: "I'm fine thanks!", likes: 5,}
    ]
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<{ title: string }>) => {
            const {title} = action.payload
            state.posts.push({title, likes: 0, id: v1()})
        },
        deletePost: (state, action: PayloadAction<{ id: string }>) => {
            const {posts} = state
            const {id} = action.payload
            const newPosts =
                posts.filter(post => post.id !== id)
            state.posts = newPosts

        }
    }

})

export default profileSlice.reducer
export const {addPost, deletePost} = profileSlice.actions