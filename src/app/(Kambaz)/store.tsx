import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer"
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/[cid]/Assignments/reducer"
const store = configureStore({
 reducer: { 
    reducer,
    modulesReducer,
    accountReducer,
    assignmentReducer,
  },
});
export default store;