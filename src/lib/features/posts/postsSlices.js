import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  riskAnalysis: {
    low: 0,
    medium: 0,
    high: 0,
  },
  instagramMentions: [],
  twitterMentions: [],
  facebookMentions: [],
  telegramMentions: [],
  darkWebXSSMentions: [],
  darkWebFacebookMentions: [],
  darkWebStealerMentions: [],
};

const updateRiskAnalysis = (state, newMentions) => {
  newMentions.forEach((mention) => {
    if (mention.risk === 'low') state.riskAnalysis.low += 1;
    if (mention.risk === 'medium') state.riskAnalysis.medium += 1;
    if (mention.risk === 'high') state.riskAnalysis.high += 1;
  });
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setRiskAnalysis(state, action) {
      state.riskAnalysis = action.payload;
    },
    resetRiskAnalysis(state) {
      state.riskAnalysis = {
        low: 0,
        medium: 0,
        high: 0,
      };
    },

    reset(state) {
      state.riskAnalysis = {
        low: 0,
        medium: 0,
        high: 0,
      };
      state.instagramMentions = [];
      state.twitterMentions = [];
      state.facebookMentions = [];
      state.telegramMentions = [];
      state.darkWebXSSMentions = [];
      state.darkWebFacebookMentions = [];
      state.darkWebStealerMentions = [];
    },
    setInstagramMentions(state, action) {
      state.instagramMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setTwitterMentions(state, action) {
      state.twitterMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setFacebookMentions(state, action) {
      state.facebookMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setTelegramMentions(state, action) {
      state.telegramMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setDarkWebXSSMentions(state, action) {
      state.darkWebXSSMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setDarkWebFacebookMentions(state, action) {
      state.darkWebFacebookMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
    setDarkWebStealerMentions(state, action) {
      state.darkWebStealerMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
    },
  },
});

export const {
  setRiskAnalysis,
  resetRiskAnalysis,
  setInstagramMentions,
  setTwitterMentions,
  setFacebookMentions,
  setTelegramMentions,
  setDarkWebXSSMentions,
  setDarkWebFacebookMentions,
  setDarkWebStealerMentions,
  reset
} = postsSlice.actions;

export default postsSlice.reducer;
