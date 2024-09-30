import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({postId, comment}) => {
    try {
        const {data} = await axios.post(`/comments/${postId}`, {
            postId,
            comment,
        })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllComments = createAsyncThunk(
    'comment/getAllComments',
    async (postId) => {
        try {
            const { data } = await axios.get(`/posts/comments/${postId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Comment
            .addCase(createComment.pending, (state) => {
                state.loading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false
                state.comments.push(action.payload)
            })
            .addCase(createComment.rejected, (state) => {
                state.loading = false
            })
            // Get All Comments
            .addCase(getAllComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(getAllComments.rejected, (state) => {
                state.loading = false
            });
        }
});

export default commentSlice.reducer