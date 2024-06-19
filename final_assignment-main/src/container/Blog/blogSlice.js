import { createSlice } from '@reduxjs/toolkit';
import { getListSuggestBlog, getListSuggestBlogSuccess } from './actions';

const initialState = {
  isLoading: false,
  listBlogListen: [],
  listBlogRead: [],
  listBlogSpeak: [],
  listBlogSuggest: [],
  listBlogIpa: [],
  blogDetail: {
    title: '',
    content: '',
  },
  listRelativeBlog: [],
  listComment: []
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    actionEnd: (state) => {
      state.isLoading = false;
    },
    actionStart: (state) => {
      state.isLoading = true;
    },
    getListBlogSuccess: (state, action) => {
      if (action.payload.type === 0) {
        state.listBlogListen = action.payload.listBlog;
      } else if (action.payload.type === 1) {
        state.listBlogRead = action.payload.listBlog;
      } else if (action.payload.type === 2) {
        state.listBlogSpeak = action.payload.listBlog;
      } else {
        state.listBlogIpa = action.payload.listBlog;
      }
    },
    getDetailBlogSuccess: (state, action) => {
      state.blogDetail = action.payload;
    },
    getListRelativeBlogSuccess: (state, action) => {
      state.listRelativeBlog = action.payload
    },
    getListCommentSuccess: (state, action) => {
      state.listComment = action.payload
    },
    getListSuggestBlogSuccess: (state, action) => {
      state.listBlogSuggest = action.payload
    },
  },
});

export const selectIsLoading = (state) => state.blogReducer.isLoading;

export const selectListBlogListen = (state) => state.blogReducer.listBlogListen;

export const selectListBlogSpeak = (state) => state.blogReducer.listBlogSpeak;

export const selectListBlogRead = (state) => state.blogReducer.listBlogRead;

export const selectListBlogIpa = (state) => state.blogReducer.listBlogIpa;

export const selectListBlogSuggest = (state) =>
  state.blogReducer.listBlogSuggest;

export const selectBlogDetail = (state) => state.blogReducer.blogDetail;

export const selectListRelativeBlog = (state) => state.blogReducer.listRelativeBlog;

export const selectListComment = (state) => state.blogReducer.listComment

export default blogSlice.reducer;
