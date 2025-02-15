import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlices'
import searchReducer from './features/search/searchSlices'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      search: searchReducer,
    }
  })
}