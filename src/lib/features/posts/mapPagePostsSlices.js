import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  telegramMentions: [],
  facebookMentions: [],
  instagramMentions: [],
  twitterMentions: [],
  vkMentions: [],
  blueSkyMentions: [],
};

const mapPagePostsSlice = createSlice({
  name: 'mapPagePosts',
  initialState,
  reducers: {
    setMapPagePosts: (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    },

    setTelegramMentions: (state, action) => {
      state.telegramMentions = [...action.payload,...state.telegramMentions];
      state.posts = [...action.payload, ...state.posts];
    },

    setFacebookMentions: (state, action) => {
      state.facebookMentions = [...action.payload,...state.facebookMentions];
      state.posts = [...action.payload,...state.posts];
    },

    setInstagramMentions: (state, action) => {
      state.instagramMentions = [...action.payload,...state.instagramMentions];
      state.posts = [...action.payload,...state.posts];
    },

    setTwitterMentions: (state, action) => {
      state.twitterMentions = [...action.payload,...state.twitterMentions];
      state.posts = [...action.payload,...state.posts];
    },

    setVkMentions: (state, action) => {
      state.vkMentions = [...action.payload,...state.vkMentions];
      state.posts = [...action.payload,...state.posts];
    },

    setBlueSkyMentions: (state, action) => {
      state.blueSkyMentions = [...action.payload,...state.blueSkyMentions];
      state.posts = [...action.payload,...state.posts];
    },



    resetMapPagePosts: (state) => {
      state.posts = [];
      state.telegramMentions = [];
    },
  },
});


export const { 
  setMapPagePosts, 
  setTelegramMentions, 
  setFacebookMentions, 
  setInstagramMentions, 
  setTwitterMentions, 
  resetMapPagePosts,
  setVkMentions,
  setBlueSkyMentions,
} = mapPagePostsSlice.actions;
export default mapPagePostsSlice.reducer;