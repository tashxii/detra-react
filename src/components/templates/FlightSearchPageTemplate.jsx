import React, { Component } from "react"
import FlightSearchForm from "../parts/FlightSearchForm"

class FlightSearchPageTemplate extends Component {
  render() {
    return (
      <FlightSearchForm {...this.props} />
    )
  }
}

export default FlightSearchPageTemplate
