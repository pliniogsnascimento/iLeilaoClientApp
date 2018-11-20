import * as actionTypes from './actionTypes';
import axios from 'services/axiosLeilao';

export const createBidStart = () => {
  return {
    type: actionTypes.CREATE_BID_START
  }
}

export const createBidSuccess = () => {
  return {
    type: actionTypes.CREATE_BID_SUCCESS
  }
}

export const createBidFail = () => {
  return {
    type: actionTypes.CREATE_BID_FAIL
  }
}

export const createBid = (productId, bid) => {
  return dispatch => {
    dispatch(createBidStart());
    axios.post('api/v1/produtos' + productId + '/lances', bid)
      .then(response => {
        dispatch(createBidSuccess(response.data));
      }).catch(err => {
        dispatch(createBidFail());
      });
  }
}