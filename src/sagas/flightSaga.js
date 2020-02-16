import { takeEvery, call, put } from "redux-saga/effects"
import {
  SEARCH_FLIGHTS_START_EVENT, 
  searchFlightsSuccessEvent,
  searchFlightsFailureEvent,
} from "../actions"
import FlightTravelService from "../libs/services/flightTravelService"

function* handleSearchFlights() {
  yield takeEvery(SEARCH_FLIGHTS_START_EVENT, searchFlights)
}

function* searchFlights(action) {
  const payload = action.payload
  const { flightTickets, error } = yield call(FlightTravelService.searchAsync, 
    payload.origin,
    payload.destination,
    payload.fromDate,
    payload.toDate,
  )
  if (!error) {
    yield put(searchFlightsSuccessEvent(flightTickets))
  } else {
    yield put(searchFlightsFailureEvent(error))
  }
}

export default class FlightSagas {
  static sagaFunctions = () => {
    return [
      handleSearchFlights,
    ]
  }
}
