// import {
//     // ADD_BADGE,DEL_BADGE,
//     setNotifications,getNotifications} from './ActNotification';
import * as types from './actiontypes';
// import {AsyncStorage} from 'react-native';

// let newBadgeId = 0;

//Action : "add new badge"
// export const addBadge = (inputDataBadge) => {
//     return{
//         type: ADD_BADGE,
//         badgeId: newBadgeId++,
//         dataBadge: inputDataBadge
//     }
// }

// export const setBadge = (taskBadgeId) => {
//     return{
//         type: DEL_BADGE,
//         taskBadgeId: taskBadgeId
//     }
// }

// export function getNotification(dispatch) {
//     return new Promise((resolve, reject) => {
//         AsyncStorage.getItem(DB_LOCAL_USER)
//             .then(dbUser => {
//                 if (dbUser) {
//                     dbUser = JSON.parse(dbUser);
//                         .then(returnData => {
//                             // console.log(res);
//                             dispatch(getNotifications(returnData.data));
//                             return resolve(true);
//                         })
//                         .catch(error => {
//                             console.log(error);
//                             return reject(error);
//                         });
//                 }
//             })
//             .catch(error => reject(error))
//     })
// }

// export function setNotification(dispatch, item) {
//     return new Promise((resolve, reject) => {
//         //nah ini kan ambil dari asyncstorage, ganti ke const aja g ush pake asyncstorage
//         AsyncStorage.getItem(DB_LOCAL_USER)
//             .then(dbUser => {
               
//                     if (item.read) {
//                         this.dataNotif([item.id])
//                             .then(returnData => {
//                                 // console.log(res);
//                                 item.read = false;
//                                 dispatch(setNotifications(item));
//                                 return resolve(true);
//                             })
//                             .catch(error => {
//                                 console.log(error);
//                                 return reject(error);
//                             });
//                     } else {
//                        this.dataNotif([item.id])
//                             .then(returnData => {
//                                 // console.log(res);
//                                 item.read = true;
//                                 dispatch(setNotifications(item));
//                                 return resolve(true);
//                             })
//                             .catch(error => {
//                                 console.log(error);
//                                 return reject(error);
//                             });
//                     }
//             })
//             .catch(error => reject(error))
//     })
// }

export function changeNotifCount(notif_count) {
    return {
      type: types.GET_NOTIFICATIONS_COUNT, 
      notif_count: notif_count
    };
}

export function changeNotifRead(notif_read) {
    return {
      type: types.SET_NOTIFICATIONS, 
      notif_read: notif_read
    };
}

export function changeNotifUnread(notif_unread) {
    return {
      type: types.SET_NOTIFICATIONS, 
      notif_unread: notif_unread
    };
}

export function setNotifCount(count) {
    return async function(dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(changeNotifCount(count));
    };
}

export function setNotifRead(read) {
    return async function(dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(changeNotifRead(read));
    };
}

export function setNotifUnread(unread) {
    return async function(dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(changeNotifUnread(unread));
    };
}