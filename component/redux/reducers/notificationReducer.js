import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    notif_count: 0,
    notif_data: [
                  {
                      id:2,
                      title:"Announcement 2",
                      read:false
                  },
                  {
                      id:3,
                      title:"Announcement 3",
                      read:false
                  },
                  {
                      id:4,
                      title:"Announcement 4",
                      read:true
                  },
                  {
                      id:5,
                      title:"Announcement 5",
                      read:true
                  }
                ]
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