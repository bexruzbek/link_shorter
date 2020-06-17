import React, { useReducer } from 'react';
import axios from 'axios';
import LinkContext from './linkContext';
import linkReducer from './linkReducer';
import { ADD_LINK, CLEAR_LINKS, ERROR_LINK, GET_LINKS } from '../types';

const LinkState = props => {
  const initialState = {
    links: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(linkReducer, initialState);

  //Create Link
  const createLink = async link => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/links/generate', link, config);

      dispatch({
        type: ADD_LINK,
        payload: res.data
      });

    } catch (err) {
      console.error(err);
      dispatch({ type: ERROR_LINK, payload: err.response.data.message });
    }
  };

  //GET Links
  const getLinks = async () => {
    try {
      const res = await axios.get('api/links');

      dispatch({
        type: GET_LINKS,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: ERROR_LINK, payload: err.response.data.message });
    }
  }
  
  //Clear Link
  const clearLinks = () => dispatch({ type: CLEAR_LINKS });
  
  return (
    <LinkContext.Provider
      value={{
        links: state.links,
        createLink,
        clearLinks,
        getLinks
      }}
    >
      {props.children}
    </LinkContext.Provider>
  )
}

export default LinkState;