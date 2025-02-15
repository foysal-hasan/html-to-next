import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  normalizedPosts: [],
  risksForPosts: [],
  riskAnalysis: {
    low: 0,
    medium: 0,
    high: 0,
  }
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setNormalizedPosts(state, action) {
      state.normalizedPosts = action.payload;
    },
    setRisksForPosts(state, action) {
      // console.log('from risks = ', action.payload);
      
      const posts = state?.normalizedPosts?.map(post => {
        const risk = action?.payload?.find(risk => risk.id == post.id);
        return {
          ...post,
          risk: risk ? risk.risk : null
        };
      });

      // Compute risk counts
      const riskCounts = { low: 0, medium: 0, high: 0 };
      action.payload.forEach(({ risk }) => {
        if (risk in riskCounts) {
          riskCounts[risk]++;
        }
      });

      state.posts = posts;
      state.risksForPosts = [...state.risksForPosts, ...action.payload];
      state.riskAnalysis = riskCounts;
    },
    
  }
});

export const { setPosts, setNormalizedPosts, setRisksForPosts } = postsSlice.actions;

export default postsSlice.reducer;