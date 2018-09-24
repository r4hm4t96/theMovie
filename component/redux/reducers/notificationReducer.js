import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    notif_count: 0,
    notif_read: true,
    notif_unread:false,
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
                      read:false
                  },
                  {
                      id:6,
                      title:"Announcement 6",
                      read:false
                  }
                ]
});
  
  export function notification(state = initialState, action = {}) {
  
    switch (action.type) {
  
      case types.GET_NOTIFICATIONS_COUNT:
        return state.merge({
          notif_count: action.notif_count,
        });
      case types.SET_NOTIFICATIONS:
        return state.merge({
          notif_read: action.notif_read,
        })
      case types.SET_NOTIFICATIONS:
        return state.merge({
          notif_unread: action.notif_unread,
        })
      default:
        return state;
    }
  }