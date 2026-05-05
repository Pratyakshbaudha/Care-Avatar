import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DonateService from '../../Services/donateListServic';

// Thunks for async actions
export const fetchEvents = createAsyncThunk('events/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }
    const response = await DonateService.getAll();
    console.log("eventlist reducer", response);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
export const fetchEvent = createAsyncThunk('events/fetchAlls', async (_, { rejectWithValue }) => {
  try {
    const response = await DonateService.getAll2();
    console.log("eventlist reducer", response);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createEvent = createAsyncThunk('events/create', async (eventData, { rejectWithValue }) => {
  try {
    const response = await DonateService.create(eventData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateEvent = createAsyncThunk('events/update', async ({ eventId, eventData }, { rejectWithValue }) => {
  try {
    const response = await DonateService.update(eventId, eventData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteEvent = createAsyncThunk('admin/deleteEvent', async (eventId, { rejectWithValue }) => {
  try {
    
    await DonateService.delete(eventId);
    return eventId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const deleteEvent2 = createAsyncThunk('admin/deleteEvent', async (eventId, { rejectWithValue }) => {
  try {
    
    await DonateService.delete2(eventId);
    return eventId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
// Slice
const donateSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
         .addCase(deleteEvent2.fulfilled, (state, action) => {
        console.log("Deleted event ID in reducasaser:", state);
        // state.events = state.events.filter(event => event.id !== action.payload);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        console.log("Deleted event ID in reducasaser:", state);
        // state.events = state.events.filter(event => event.id !== action.payload);
      });
      
  }
});

export default donateSlice.reducer;
