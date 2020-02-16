import React, { Component } from "react"
import FlightSearchPageTemplate from "../templates/FlightSearchPageTemplate"

class FlightSearchPage extends Component {
  render() {
    return (
      <FlightSearchPageTemplate {...this.props} />
    )
  }
}

export default FlightSearchPage