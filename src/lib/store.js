import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlices'
import searchReducer from './features/search/searchSlices'
import mapPagePostsSlices from './features/posts/mapPagePostsSlices'
import mapSearchReducer from './features/map-search/searchSlices'

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      search: searchReducer,
      mapPagePosts: mapPagePostsSlices,
      mapPageSearch: mapSearchReducer,
    }
  })
}