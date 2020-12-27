import todoReducer from './TodoReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    todo: todoReducer
});