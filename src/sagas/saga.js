import { fork } from "redux-saga/effects"
import UserSagas from "./userSagas"
import BoardSagas from "./boardSaga"
import TaskSagas from "./taskSaga"
import WsSaga from "./wsSaga"
import FlightSaga from "./flightSaga"

export default function* rootSaga() {
  let sagaFunctions = []
  sagaFunctions = sagaFunctions.concat(UserSagas.sagaFunctions())
  sagaFunctions = sagaFunctions.concat(BoardSagas.sagaFunctions())
  sagaFunctions = sagaFunctions.concat(TaskSagas.sagaFunctions())
  sagaFunctions = sagaFunctions.concat(WsSaga.sagaFunctions())
  sagaFunctions = sagaFunctions.concat(FlightSaga.sagaFunctions())

  for (let i = 0; i < sagaFunctions.length; i++) {
    yield fork(sagaFunctions[i])
  }
}
