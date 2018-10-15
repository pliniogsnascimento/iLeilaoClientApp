import * as actionTypes from 'store/actions/actionTypes';
import {updateObject} from 'utils/utility';

const initialState = {
  user: null,
  isLoading: false,
  hasError: false,
  successOnRequest: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGIN_USER_START:
      let loginStarted = initialState;
      loginStarted.isLoading = true;
      return updateObject(state, loginStarted);
    
    case actionTypes.LOGIN_USER_SUCCESS:
      let loginSuceeded = initialState;
      loginSuceeded.user = action.value;
      loginSuceeded.successOnRequest = true;
      return updateObject(state, loginSuceeded);

    case actionTypes.LOGIN_USER_FAIL:
      let loginFailed = initialState;
      loginFailed.hasError = true;
      return updateObject(state, loginFailed);

    default:
      return state;
  }
}

export default reducer;
