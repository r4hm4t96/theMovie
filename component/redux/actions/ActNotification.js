// export const ADD_BADGE = 'ADD_BADGE';
// export const DEL_BADGE = 'DEL_BADGE';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';


export const getNotifications = (data) => ({
    type: GET_NOTIFICATIONS,
    data
})

export const setNotifications = (data) => ({
    type: SET_NOTIFICATIONS,
    data
})