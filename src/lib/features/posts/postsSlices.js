import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  riskAnalysis: {
    low: 0,
    medium: 0,
    high: 0,
  },
  languageAnalysis: {
    russian: 0,
    arabic: 0,
    english: 0,
    others: 0,
  },
  instagramMentions: [],
  twitterMentions: [],
  facebookMentions: [],
  telegramMentions: [],
  darkWebXSSMentions: [],
  darkWebFacebookMentions: [],
  darkWebStealerMentions: [],
  postsMentions: [],
  allPosts: [],
  searchExploitMentions: [],
  searchXss: [],
  boardreader: [],
  breachforum: [],
  vkPosts: [],
  threads: [],
  darkWebPosts: [],
};

const updateRiskAnalysis = (state, newMentions) => {
  if (!Array.isArray(newMentions)) return;

  newMentions.forEach((mention) => {
    if (mention.risk === 'low') state.riskAnalysis.low += 1;
    if (mention.risk === 'medium') state.riskAnalysis.medium += 1;
    if (mention.risk === 'high') state.riskAnalysis.high += 1;
  });
};

const updateLanguageAnalysis = (state, newMentions) => {
  if (!Array.isArray(newMentions)) return;

  newMentions.forEach((mention) => {
    if (mention.language === 'russian') state.languageAnalysis.russian += 1;
    if (mention.language === 'arabic') state.languageAnalysis.arabic += 1;
    if (mention.language === 'english') state.languageAnalysis.english += 1;
    if (mention.language === 'others') state.languageAnalysis.others += 1;
  });
};

const updateAllPosts = (state, newMentions) => {
  state.allPosts = [...state.allPosts, ...newMentions];
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
      state.languageAnalysis = {
        russian: 0,
        arabic: 0,
        english: 0,
        others: 0,
      };
      state.instagramMentions = [];
      state.twitterMentions = [];
      state.facebookMentions = [];
      state.telegramMentions = [];
      state.darkWebXSSMentions = [];
      state.darkWebFacebookMentions = [];
      state.darkWebStealerMentions = [];
      state.postsMentions = [];
      state.allPosts = [];
      state.searchExploitMentions = [];
      state.searchXss = [];
      state.boardreader = [];
      state.breachforum = [];
      state.vkPosts = [];
      state.threads = [];
      state.darkWebPosts = [];
    },
    setInstagramMentions(state, action) {
      state.instagramMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setTwitterMentions(state, action) {
      state.twitterMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setFacebookMentions(state, action) {
      state.facebookMentions = [...state.facebookMentions, ...action.payload];
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setTelegramMentions(state, action) {
      state.telegramMentions = action.payload;
      updateRiskAnalysis(state, action.payload || []);
      updateLanguageAnalysis(state, action.payload || []);
      updateAllPosts(state, action.payload || []);
      // console.log('state: ', action.payload);
    },
    setDarkWebXSSMentions(state, action) {
      state.darkWebXSSMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setDarkWebFacebookMentions(state, action) {
      state.darkWebFacebookMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setDarkWebStealerMentions(state, action) {
      state.darkWebStealerMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setPostsMentions(state, action) {
      state.postsMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setSearchExploitMentions(state, action) {
      state.searchExploitMentions = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setSearchXss(state, action) {
      state.searchXss = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setBoardreader(state, action) {
      state.boardreader = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setBreachforum(state, action) {
      state.breachforum = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setVkPosts(state, action) {
      state.vkPosts = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setThreads(state, action) {
      state.threads = action.payload;
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
    },
    setDarkWebPosts(state, action) {
      // console.log('from darkweb action: ', action.payload);

      state.darkWebPosts = [...state.darkWebPosts, ...action.payload];
      updateRiskAnalysis(state, action.payload);
      updateLanguageAnalysis(state, action.payload);
      updateAllPosts(state, action.payload);
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
  reset,
  setPostsMentions,
  setSearchExploitMentions,
  setSearchXss,
  setBoardreader,
  setBreachforum,
  setVkPosts,
  setThreads,
  setDarkWebPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
