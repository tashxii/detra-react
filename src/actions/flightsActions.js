export const SEARCH_FLIGHTS_START_EVENT = "SEARCH_FLIGHTS_START_EVENT"
export const SEARCH_FLIGHTS_SUCCESS_EVENT = "SEARCH_FLIGHTS_SUCCESS_EVENT"
export const SEARCH_FLIGHTS_FAILURE_EVENT = "SEARCH_FLIGHTS_FAILURE_EVENT"

export const searchFlightsStartEvent = (origin, destination, fromDate, toDate) => ({
  type: SEARCH_FLIGHTS_START_EVENT,
  payload: {
    origin: origin,
    destination: destination,
    fromDate: fromDate,
    toDate: toDate, 
  }
})

export const searchFlightsSuccessEvent = (flightTickets) => ({
  type: SEARCH_FLIGHTS_SUCCESS_EVENT,
  payload: {
    flightTickets: flightTickets,
  }
})

export const searchFlightsFailureEvent = (error) => ({
  type: SEARCH_FLIGHTS_FAILURE_EVENT,
  payload: {
    error,
  }
})
