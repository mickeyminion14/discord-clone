import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    channelId: null,
    channelName: null,
    sidebarOpen: false,
  },
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },

    setSidebar: (state, action) => {
      state.sidebarOpen = action.payload.sidebarOpen;
    },
  },
});

export const { setChannelInfo, setSidebar } = appSlice.actions;

export const selectChannelId = (state: any) => state.app.channelId;

export const selectChannelName = (state: any) => state.app.channelName;
export const selectSidebarOpen = (state: any) => state.app.sidebarOpen;
export default appSlice.reducer;
