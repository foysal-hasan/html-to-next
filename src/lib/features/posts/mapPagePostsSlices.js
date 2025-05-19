// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   posts: [],
//   telegramMentions: [],
//   facebookMentions: [],
//   instagramMentions: [],
//   twitterMentions: [],
//   vkMentions: [],
//   blueSkyMentions: [],
// };

// const mapPagePostsSlice = createSlice({
//   name: 'mapPagePosts',
//   initialState,
//   reducers: {
//     setMapPagePosts: (state, action) => {
//       state.posts = [...action.payload, ...state.posts];
//     },

//     setTelegramMentions: (state, action) => {
//       state.telegramMentions = [...action.payload,...state.telegramMentions];
//       state.posts = [...action.payload, ...state.posts];
//     },

//     setFacebookMentions: (state, action) => {
//       state.facebookMentions = [...action.payload,...state.facebookMentions];
//       state.posts = [...action.payload,...state.posts];
//     },

//     setInstagramMentions: (state, action) => {
//       state.instagramMentions = [...action.payload,...state.instagramMentions];
//       state.posts = [...action.payload,...state.posts];
//     },

//     setTwitterMentions: (state, action) => {
//       state.twitterMentions = [...action.payload,...state.twitterMentions];
//       state.posts = [...action.payload,...state.posts];
//     },

//     setVkMentions: (state, action) => {
//       state.vkMentions = [...action.payload,...state.vkMentions];
//       state.posts = [...action.payload,...state.posts];
//     },

//     setBlueSkyMentions: (state, action) => {
//       state.blueSkyMentions = [...action.payload,...state.blueSkyMentions];
//       state.posts = [...action.payload,...state.posts];
//     },



//     resetMapPagePosts: (state) => {

//       console.log('resetMapPagePosts');
//       state.posts = []
//       state.telegramMentions = []
//       state.facebookMentions = []
//       state.instagramMentions = []
//       state.twitterMentions = []
//       state.vkMentions = []
//       state.blueSkyMentions = []

//     },
//   },
// });


// export const { 
//   setMapPagePosts, 
//   setTelegramMentions, 
//   setFacebookMentions, 
//   setInstagramMentions, 
//   setTwitterMentions, 
//   resetMapPagePosts,
//   setVkMentions,
//   setBlueSkyMentions,
// } = mapPagePostsSlice.actions;
// export default mapPagePostsSlice.reducer;


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
    // Replace existing data instead of appending
    setMapPagePosts: (state, action) => {
      state.posts = [...state.posts,...action.payload];
    },
    setTelegramMentions: (state, action) => {
      state.telegramMentions = [...state.telegramMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];
    },
    setFacebookMentions: (state, action) => {
      state.facebookMentions = [...state.facebookMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];
    },
    setInstagramMentions: (state, action) => {
      state.instagramMentions = [...state.instagramMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];

    },
    setTwitterMentions: (state, action) => {
      state.twitterMentions = [...state.twitterMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];

    },
    setVkMentions: (state, action) => {
      state.vkMentions = [...state.vkMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];
    },
    setBlueSkyMentions: (state, action) => {
      state.blueSkyMentions = [...state.blueSkyMentions,...action.payload];
      state.posts = [...state.posts, ...action.payload];
    },

    resetMapPagePosts: (state) => {
      // console.log('RESETTING ALL POSTS');
      state.posts = [];
      state.telegramMentions = [];
      state.facebookMentions = [];
      state.instagramMentions = [];
      state.twitterMentions = [];
      state.vkMentions = [];
      state.blueSkyMentions = [];
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
