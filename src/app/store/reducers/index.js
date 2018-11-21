import { combineReducers } from "redux";
import { createNavReducer } from '../../navigation/ReduxNavigation';
import { createNavigationReducer } from "react-navigation-redux-helpers";
import StackRouter from '../../navigation/StackRouter'

export default combineReducers({
    nav: createNavReducer(),
})
