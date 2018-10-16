import * as actionTypes from 'store/actions/actionTypes';
import {updateObject} from 'utils/utility';

let initialState = {
  products: [],
  isLoading: false,
  hasError: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      let loadingState = {...state};
      loadingState.isLoading = true;
      return updateObject(state, loadingState);

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      let successState = {...state};
      successState.isLoading = false;
      successState.products = action.value;
      return updateObject(state, successState);

    case actionTypes.FETCH_PRODUCTS_FAIL:
      let errorState = {...state};
      errorState.isLoading = false;
      errorState.hasError = true;
      return updateObject(state, errorState);

    default:
      return state;
  }
}

export default reducer;