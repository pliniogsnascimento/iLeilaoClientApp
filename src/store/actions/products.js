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

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsStart());
    axios.get('api/v1/produtos')
      .then(response => {
        dispatch(fetchProductsSuccess(response.data));
      }).catch(err => {
        dispatch(fetchProductsFailed());
      })
  }
}

