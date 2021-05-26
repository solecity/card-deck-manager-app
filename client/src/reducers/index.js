import { combineReducers } from "redux";

import { login, logout } from "./auth";

export default combineReducers({ login, logout });
