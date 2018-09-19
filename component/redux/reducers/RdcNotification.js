import {
    // ADD_BADGE,DEL_BADGE
    SET_NOTIFICATIONS,GET_NOTIFICATIONS} from '../actions/ActNotification'
import _ from 'lodash';

// const defaultData = new Array();

const RdcNotification = (tasks = [],action)=>{
    switch (action.type){
        // case ADD_BADGE:
        //   return [
        //       ...tasks,
        //       {
        //         badgeId: action.badgeId,
        //         dataBadge: action.dataBadge,
        //         completed: false
        //       }
        //   ]
        // case DEL_BADGE:
        // return tasks.map(task =>
        //     (task.badgeId === action.badgeId)
        //     ? {...task, completed: !task.completed}
        //     : task
        // )
        case GET_NOTIFICATIONS:
            return _.uniqBy(tasks.concat(action.data), "id");
        case SET_NOTIFICATIONS:
            var item = action.data;
            var index = _.findIndex(tasks, { id: item.id });
            tasks.splice(index, 1, item);
            return _.uniqBy(tasks, "id");
        
        default:
            return tasks;
    }
}

export default RdcNotification;