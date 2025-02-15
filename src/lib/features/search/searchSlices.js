import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allData: [], // Original API data
  filteredData: [], // Search results
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.allData = action.payload;
      state.filteredData = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredData = state.allData.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setData, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
