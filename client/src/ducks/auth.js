import api from '../api';
import assign from 'lodash.assign';
import { push } from 'react-router-redux';

const usersApi = api.usersApi;

const LOGIN_USER_SUCCESS  = 'LOGIN_USER_SUCCESS';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATING_USER       = 'CREATING_USER';

const initialState = {
  isLoggedIn: false,
  email: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATING_USER:
      return {
        ...state,
      };

    case CREATE_USER_SUCCESS:
      return assign({}, state, action.user, { isLoggedIn: true });

    case LOGIN_USER_SUCCESS:
      return assign({}, state, action.user, { isLoggedIn: true });

    default:
      return state;
  }
};

export function createUserSuccess(user) {
  return {type: CREATE_USER_SUCCESS, user};
}

export function loginUserSuccess(user) {
  return {type: LOGIN_USER_SUCCESS, user};
}

export function createUser(user) {
  return dispatch => {
    return usersApi.createUserLocal(user)
      .then(response => {
        dispatch(createUserSuccess(response));
        return response;
      })
      .then(() => {
        return usersApi.getSession();
      })
      .then((session) => {
        dispatch(push('/login'));
      })
      .catch(error => {
        throw (error);
      });
  };
}

export function loginLocal(user) {
  return dispatch => {
    return usersApi.loginLocal(user)
      .then(user => {
        if(user) {
          dispatch(loginUserSuccess(user));
          dispatch(push('/'));
          return user;
        }
      })
      .catch(error => {
        throw (error);
      });
  };
}

export function getSession() {
  return dispatch => {
    return usersApi.getSession()
      .then((session) => {
        if (!session) {
          return null;
        }

        const user = {
          email: session.email
        };

        dispatch(loginUserSuccess(user));
        console.log(session);
        return session;
      })
      .catch(error => {
        throw (error);
      });
  };
}