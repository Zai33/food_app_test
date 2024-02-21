import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducers";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
});

export default myReducers;
