import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: localStorage.getItem("OCL_user")
    ? JSON.parse(localStorage.getItem("OCL_user"))?._id
    : null,
  name: localStorage.getItem("OCL_user")
    ? JSON.parse(localStorage.getItem("OCL_user"))?.name
    : null,
  email: localStorage.getItem("OCL_user")
    ? JSON.parse(localStorage.getItem("OCL_user"))?.email
    : null,
  profile_pic: null,
  token: localStorage.getItem("OCL_token") || null,
  onlineUser: [],
  socketConnection: null,

  isAuthenticated: false || localStorage.getItem("OCL_token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_pic = action.payload.profile_pic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state._id = null;
      state.name = null;
      state.email = null;
      state.profile_pic = null;
      state.token = null;
      state.socketConnection = null;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } =
  userSlice.actions;

export default userSlice.reducer;
