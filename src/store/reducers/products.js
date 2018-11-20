import * as actionTypes from 'store/actions/actionTypes';
import {updateObject} from 'utils/utility';

let initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  hasError: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return (() => {
        let loadingState = {...state};
        loadingState.isLoading = true;
        return updateObject(state, loadingState);
      })();

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return (() => {
        let successState = {...state};
        successState.isLoading = false;
        successState.products = action.value;
        return updateObject(state, successState);
      })();

    case actionTypes.FETCH_PRODUCTS_FAIL:
      return (() => {
        let errorState = {...state};
        errorState.isLoading = false;
        errorState.hasError = true;
        return updateObject(state, errorState);
      })();

    case actionTypes.FETCH_PRODUCT_BY_ID_START:
      return (() => {
        let loadingState = {...state};
        loadingState.isLoading = true;
        return updateObject(state, loadingState);
      })();

    case actionTypes.FETCH_PRODUCT_BY_ID_SUCCESS:
      return (() => {
        let successState = {...state};
        successState.isLoading = false;
        successState.selectedProduct = action.value;
        return updateObject(state, successState);
      })();

    case actionTypes.FETCH_PRODUCT_BY_ID_FAIL:
      return (() => {
        let errorState = {...state};
        errorState.isLoading = false;
        errorState.hasError = true;
        return updateObject(state, errorState);
      })();
    
    case actionTypes.CLEAR_SELECTED_PRODUCT:
        let newState = {...state};
        console.log('[INFO]' + newState);
        newState.selectedProduct = {};
        return updateObject(state, newState);

    default:
      return state;
  }
}

export default reducer;