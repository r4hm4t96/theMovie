import {combineReducers,createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RdcNotification from './reducers/RdcNotification';

export const rootReducer = combineReducers({
    notification: RdcNotification,
})

// Connect our store to the reducers
export default createStore(rootReducer, applyMiddleware(thunk));