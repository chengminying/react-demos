import { combineReducers } from "redux";

import { user } from "./redux/user.redux";
import { userListReducer } from "./redux/userlist.redux";
import { chatReducer } from "./redux/chat.redux";



export default combineReducers({
    user,
    userListReducer,
    chatReducer,
});