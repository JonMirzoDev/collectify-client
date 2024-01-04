import { createSlice } from '@reduxjs/toolkit'

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    token: null,
    user: null
  },
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setToken: (state, { payload }) => {
      state.token = payload
    }
  }
})

export const { setToken, setUser, logout } = authActions
