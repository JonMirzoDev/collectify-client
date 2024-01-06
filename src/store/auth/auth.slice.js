import { createSlice } from '@reduxjs/toolkit'

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    token: null,
    user: null
  },
  reducers: {
    login: (state, { payload }) => {
      state.isAuth = true
      state.token = payload
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuth = false
    },
    setUser: (state, { payload }) => {
      state.user = payload
    }
  }
})

export const { login, setUser, logout } = authActions
