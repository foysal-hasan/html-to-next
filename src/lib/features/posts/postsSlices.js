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
  darkWebStealerMentions: []
};

const updateRiskAnalysis = (state) => {
  const totalMentions = [
    ...state.instagramMentions,
    ...state.twitterMentions,
    ...state.facebookMentions,
    ...state.telegramMentions,
    ...state.darkWebXSSMentions,
    ...state.darkWebFacebookMentions,
    ...state.darkWebStealerMentions
  ].length;

  state.riskAnalysis.low = totalMentions * 0.1;
  state.riskAnalysis.medium = totalMentions * 0.3;
  state.riskAnalysis.high = totalMentions * 0.6;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setRiskAnalysis(state, action) {
      state.riskAnalysis = action.payload;
    },
    setInstagramMentions(state, action) {
      state.instagramMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setTwitterMentions(state, action) {
      state.twitterMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setFacebookMentions(state, action) {
      state.facebookMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setTelegramMentions(state, action) {
      state.telegramMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setDarkWebXSSMentions(state, action) {
      state.darkWebXSSMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setDarkWebFacebookMentions(state, action) {
      state.darkWebFacebookMentions = action.payload;
      updateRiskAnalysis(state);
    },
    setDarkWebStealerMentions(state, action) {
      state.darkWebStealerMentions = action.payload;
      updateRiskAnalysis(state);
    }
  }
});

export const { 
  setRiskAnalysis,
  setInstagramMentions, 
  setTwitterMentions, 
  setFacebookMentions, 
  setTelegramMentions, 
  setDarkWebXSSMentions, 
  setDarkWebFacebookMentions, 
  setDarkWebStealerMentions 
} = postsSlice.actions;

export default postsSlice.reducer;
