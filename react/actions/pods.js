import axios from 'axios';

// eslint-disable-next-line no-multi-spaces
export const FETCH_PODS_BEGIN   = 'FETCH_PODS_BEGIN';
export const FETCH_PODS_SUCCESS = 'FETCH_PODS_SUCCESS';
export const FETCH_PODS_FAILURE = 'FETCH_PODS_FAILURE';

export const fetchPodsBegin = () => ({
  type: FETCH_PODS_BEGIN,
});

export const fetchPodsSuccess = pods => ({
  type: FETCH_PODS_SUCCESS,
  payload: { pods },
});

export const fetchPodsError = error => ({
  type: FETCH_PODS_FAILURE,
  payload: { error },
});

export function fetchPods(context) {
  return dispatch => {
    dispatch(fetchPodsBegin());
    axios.get(getApiPath(context))
      .then(res => dispatch(fetchPodsSuccess(res.data)))
      .catch(error => dispatch(fetchPodsError(error)));
  };
}

export function getApiPath(context) {
  return '/api/context/' + context + '/pods';
}
