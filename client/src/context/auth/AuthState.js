import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_MSG,
  CLEAR_ERRORS,
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    msg: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load user
  const loadUser = async () => {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    
    try {
      const res = await axios.get('api/auth/login');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });

    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }

  //Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/auth/register', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.message
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  }

  //Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/auth/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();

    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message
      })
    }
  }

  //logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clear message
  const clearMessage = () => dispatch({ type: CLEAR_MSG });

  //Clear errors
  const clearError = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        msg: state.msg,
        register,
        login,
        loadUser,
        logout,
        clearError,
        clearMessage
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState