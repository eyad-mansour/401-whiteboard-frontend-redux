import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import cookies from 'react-cookies';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getAllPost = createAsyncThunk(async () => {
  const response = await axios
    .get(`${process.env.REACT_APP_BACKEND}/posts`, {
      headers: {
        Authorization: `Bearer ${cookies.load('token')}`,
      },
    })
    .then((response) => {
      const allPosts = response.data;
      return allPosts;
    })
    .catch((error) => console.error(`Error: ${error}`));
  return response.data;
});

export const deleteOnePost = createAsyncThunk(async (initialState) => {
  const {id, post} = initialState;
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/post/${post.id}/${post.userID}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`,
        },
      }
    );
    return `${response.status}: ${response.statusText}`;
  } catch (error) {
    console.log(error);
  }
});

export const deleteOneComment = createAsyncThunk(async (initialState) => {
  const {id} = initialState;
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/comment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`,
        },
      }
    );
    return `${response.status}: ${response.statusText}`;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

// export const {getAllPost, deleteOnePost, deleteOneComment, addPost} =
//   postsSlice.actions;

// export default postsSlice.reducer;
