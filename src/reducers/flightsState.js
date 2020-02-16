import {
  SEARCH_FLIGHTS_START_EVENT,
  SEARCH_FLIGHTS_SUCCESS_EVENT,
  SEARCH_FLIGHTS_FAILURE_EVENT,
} from "../actions"
  
  const initialState = {
    flightTickets: [],
    isSearchingFlight: false,
  }
  
  const flightsState = (state = initialState, action) => {
    const type = action.type
    const payload = action.payload
    switch (type) {
      case SEARCH_FLIGHTS_START_EVENT:
        return { ...state, isSearchingFlight: true }
      case SEARCH_FLIGHTS_SUCCESS_EVENT:
        return { ...state, isSearchingFlight: false, flightTickets: payload.flightTickets }
      case SEARCH_FLIGHTS_FAILURE_EVENT:
        return { ...state, isSearchingFlight: false }
      default:
        return state
    }
  }
  
  export default flightsState
  