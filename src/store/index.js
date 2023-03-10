import { createSlice, configureStore } from "@reduxjs/toolkit";

// redux quản lý trạng thái hiển thị popup
const popupState = { popupShow: false, data: {} };
const popupSlice = createSlice({
  name: "popup",
  initialState: popupState,
  reducers: {
    show(state, action) {
      state.popupShow = true;
      state.data = action.payload;
    },
    hide(state) {
      state.popupShow = false;
    },
  },
});

// Redux quản lý trạng thái đăng nhập
const authState = { isLogin: false, name: "" };
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.name = action.payload.name;
      localStorage.setItem("USER", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLogin = false;
      localStorage.setItem("USER", JSON.stringify({}));
    },
  },
});

// Redux quản lý giỏ hàng
const cartState = { data: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addCart(state, action) {
      const { newData, userId } = action.payload;
      state.data.push(newData);
      localStorage.setItem(userId, JSON.stringify(state.data));
    },
    updateCart(state, action) {
      const { newData, userId } = action.payload;
      state.data = newData;
      localStorage.setItem(userId, JSON.stringify(state.data));
    },
    loadCart(state, action) {
      const userId = action.payload;
      const data = localStorage.getItem(userId)
        ? JSON.parse(localStorage.getItem(userId))
        : [];
      state.data = data;
    },
  },
});

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const popupActions = popupSlice.actions;
export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
