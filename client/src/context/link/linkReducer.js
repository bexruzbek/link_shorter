import { ADD_LINK, CLEAR_LINKS, ERROR_LINK, GET_LINKS } from '../types';

export default (state, action) => {
  switch(action.type){
    case ADD_LINK:
      return {
        ...state,
        links: [...state.links, action.payload],
        loading: false
      };
    case GET_LINKS:
      return{
        ...state,
        links: action.payload,
        loading: false
      };
    case CLEAR_LINKS:
      return {
        ...state,
        links: null,
        error: null
      };
    case ERROR_LINK:
      return{
        ...state,
        error: action.payload
      };
    default: 
      return state;
  }
}