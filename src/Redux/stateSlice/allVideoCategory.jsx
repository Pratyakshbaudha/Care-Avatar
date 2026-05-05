import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../Services/request";

// Async thunk for fetching video categories
export const fetchVideoCategories = createAsyncThunk(
  "videoCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.get("/fitness/videoCategory");
      console.log("✅ Fetch Success: Video Categories Data", response.videoCategories);
      return response.videoCategories; // ✅ Corrected API response structure
    } catch (error) {
      console.error("❌ Fetch Failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const videoCategorySlice = createSlice({
  name: "videoCategory",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoCategories.pending, (state) => {
        console.log("⏳ Fetching Video Categories...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoCategories.fulfilled, (state, action) => {
        console.log("✅ Fetch Successful, Data Loaded:", action.payload);
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchVideoCategories.rejected, (state, action) => {
        console.error("❌ Fetch Failed, Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videoCategorySlice.reducer;
