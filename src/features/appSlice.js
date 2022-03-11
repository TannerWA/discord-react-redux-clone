import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelID: null,
    channelName: null
  },

  reducers: {
    setChannelInfo: (state, action) => {
      state.channelID = action.payload.channelID;
      state.channelName = action.payload.channelName;
    },
  }
});

export const { setChannelInfo } = appSlice.actions;

export const selectChannelId = (state) => state.app.channelID;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
