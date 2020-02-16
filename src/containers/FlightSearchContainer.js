import { connect } from "react-redux"
import FlightSearchPage from "../components/pages/FlightSearchPage"
import { searchFlightsStartEvent } from "../actions"

const mapStateToProps = (state) => ({
  usersState: state.usersState,
  flightsState: state.flightsState,
})

const mapDispatchToProps = (dispatch) => ({
  searchButtonClick(origin, destination, fromDate, toDate) {
    dispatch(searchFlightsStartEvent(origin, destination, fromDate, toDate))
  },
})

const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightSearchPage)

export default FlightContainer
