import { configureStore } from "@reduxjs/toolkit"
import { setUserReducer } from "./reducers/setUserReducer"

const store = configureStore({
  reducer: {user: setUserReducer},
})

export default store;
