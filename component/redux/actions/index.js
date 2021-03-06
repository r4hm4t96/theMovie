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

export function changeNotifRead() {
    return {
      type: types.NOTIFICATIONS_READ, 
      payload
    };
}

export function changeNotifUnread(payload) {
    return {
      type: types.NOTIFICATIONS_UNREAD, 
      payload
    };
}

export function setNotifCount(count) {
    return async function(dispatch, getState) {
        // login logic would go here, and when it's done, we switch app roots
        dispatch(changeNotifCount(count));
    };
}