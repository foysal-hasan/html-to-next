import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlices'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer
    }
  })
}