import * as actionTypes from './actionTypes';
import axios from 'services/axiosLeilao';

export const loginStarted = () => {
  return {
    type: actionTypes.LOGIN_USER_START
  }
}

export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_USER_FAIL
  }
}

export const loginSuccess = value => {
  console.log('[Info] Login succeeded with ' + JSON.stringify(value));
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    value: value
  }
}

export const login = userAccount => {
  return dispatch => {
    dispatch(loginStarted());
    console.log('[INFO] Login started with ', JSON.stringify(userAccount));
    axios.post('/api/login', userAccount)
      .then(response => {
        dispatch(loginSuccess(response.data));
      }).catch(err => {
        console.log('[ERROR] ' + err)
        dispatch(loginFailed());
      })
  }
}
