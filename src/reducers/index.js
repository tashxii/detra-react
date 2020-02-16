import { combineReducers } from "redux"
import loginState from "./loginState"
import mainState from "./mainState"
import boardsState from "./boardsState"
import tasksState from "./tasksState"
import usersState from "./usersState"
import flightsState from "./flightsState"
import errorState from "./errorState"

const appState = combineReducers({
  loginState,
  mainState,
  boardsState,
  tasksState,
  usersState,
  flightsState,
  errorState,
})
export default appState
