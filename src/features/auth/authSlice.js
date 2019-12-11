import { createSlice } from 'redux-starter-kit'
import betterFetch from 'betterFetch'

export const initialState = {}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state, action) {
      state.authorizing = "LOADING"
    },
    authSuccess(state, action) {
      const { details } = action.payload
      state.me = details
      state.authorized = true
      state.authorizing = "SUCCESS"
    },
    authFailure(state, action) {
      state.authorizing = {
        status: "FAILED",
        error: action.payload
      }
    },
    loginStart(state, action) {
      state.loggingIn = "LOADING"
    },
    loginSuccess(state, action) {
      const { details } = action.payload
      state.me = details
      state.authorized = true
      state.loggingIn = "SUCCESS"
    },
    loginFailure(state, action) {
      state.loggingIn = {
        status: "FAILED",
        error: action.payload
      }
    },
    logoutStart(state, action) {},
    logoutSuccess(state, action) {},
    logoutFailure(state, action) {},
  },
})

export function authorize(cookie) {
  return dispatch => {
    dispatch(authStart())
    return betterFetch('/api/user/auth', cookie ? { headers: { cookie } } : undefined )
      .then(res => dispatch(authSuccess({ res })))
      .catch(err => dispatch(authFailure({ err })))
  }
}

export function login({ username, password, keepCookie = false}) {
  return dispatch => {
    dispatch(loginStart())
    return betterFetch('/api/user/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      keepCookie
    })
      .then(res => dispatch(loginSuccess({ res })))
      .catch(err => dispatch(loginFailure({ err })))
  }
}

export function logout(cookie) {
  const options = {
    method: 'delete'
  }
  if(cookie) options.headers = { cookie }
  return dispatch => {
    dispatch(logoutStart())
    return betterFetch('/api/user/logout', options)
      .then(res => dispatch(logoutSuccess({ res })))
      .catch(err => dispatch(logoutFailure({ err })))
  }
}

export const {
  // auth actions
  authStart,
  authSuccess,
  authFailure,
  // login actions
  loginStart,
  loginSuccess,
  loginFailure,
  // logout actions
  logoutStart,
  logoutSuccess,
  logoutFailure,

} = auth.actions

export default auth.reducer
