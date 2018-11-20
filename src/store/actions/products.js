import * as actionTypes from './actionTypes';
import axios from 'services/axiosLeilao';

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START
  }
}

export const fetchProductsSuccess = value => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    value: value
  }
}

export const fetchProductsFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL
  }
}

export const fetchProductByIdStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_BY_ID_START
  }
}

export const fetchProductByIdSuccess = value => {
  return {
    type: actionTypes.FETCH_PRODUCT_BY_ID_SUCCESS,
    value: value
  }
}

export const fetchProductByIdFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_BY_ID_FAIL
  }
}

export const clearSelectedProduct = () => {
  return {
    type: actionTypes.CLEAR_SELECTED_PRODUCT
  }
}

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    axios.get('api/v1/produtos')
      .then(response => {
        dispatch(fetchProductsSuccess(response.data));
      }).catch(err => {
        dispatch(fetchProductsFailed());
      });
  }
}

export const fetchProductById = id => {
  return dispatch => {
    dispatch(fetchProductByIdStart());
    axios.get('api/v1/produtos/' + id)
      .then(response => {
        console.log(response.data);
        dispatch(fetchProductByIdSuccess(response.data));
      }).catch(err => {
        console.log(err);
        dispatch(fetchProductByIdFailed());
      });
  }
}
