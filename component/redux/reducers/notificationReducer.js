import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    notif_count: 3
  });
  
  export function notification(state = initialState, action = {}) {
  
    switch (action.type) {
  
      case types.GET_NOTIFICATIONS_COUNT:
        return state.merge({
          notif_count: action.notif_count,
        });
  
      default:
        return state;
    }
  }