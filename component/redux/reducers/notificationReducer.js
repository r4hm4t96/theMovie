import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash'

const initialState = Immutable({
    notif_count: 0,
    // notif_read: true,
    // notif_unread:false,
    notif_data: [
                  {
                      id:1,
                      title:"Announcement 1",
                      read:false
                  },
                  {
                      id:2,
                      title:"Announcement 2",
                      read:false
                  },
                  {
                      id:3,
                      title:"Announcement 3",
                      read:true
                  },
                  {
                      id:4,
                      title:"Announcement 4",
                      read:false
                  },
                  {
                      id:5,
                      title:"Announcement 5",
                      read:true
                  },
                  {
                      id:6,
                      title:"Announcement 6",
                      read:true
                  },
                ]
  });
  
  export function notification(state = initialState, action) {
  
    switch (action.type) {
  
      case types.GET_NOTIFICATIONS_COUNT:
        return state.merge({
          notif_count: action.notif_count,
        });
      case types.NOTIFICATIONS_READ:
        notif_data = _.filter(notif_data => notif_data.id !== action.payload.id)
        return notif_data;
      case types.NOTIFICATIONS_UNREAD:
        return [...state,action.payload] 
        
      default:
        return state;
    }
  }