import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { Row } from "antd"
import Notification from "../basics/Notification"
import MenuBarContainer from "../../containers/MenuBarContainer"
import FlightSearchContainer from "../../containers/FlightSearchContainer"
import SettingsContainer from "../../containers/SettingsContainer"

class MainPageTemplate extends Component {

  static View = {
    Flight: "flight",
    Hotel: "hotel",
    Payment: "payment",
    History: "history",
    Boards: "boards",
    Settings: "settings",
  }

  componentDidUpdate() {
    const error = this.props.errorState.error
    if (error) {
      Notification.Error(error.summary, `${error.detail} code:${error.code}`)
      this.props.onShowErrorClose()
    }

    // const { boards, error } = yield call(UserService.listAsync)
  }

  render() {
    if (!this.props.loginState.loginUser) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Row>
          <MenuBarContainer />
        </Row>
        <Row>
          {(this.props.mainState.view === MainPageTemplate.View.Flight)
            ? <FlightSearchContainer />
            : <SettingsContainer />}
        </Row>
      </div>
    )
  }
}

MainPageTemplate.propTypes = {
  mainState: PropTypes.object.isRequired,
  loginState: PropTypes.object.isRequired,
  errorState: PropTypes.object.isRequired,
  onShowErrorClose: PropTypes.func.isRequired,
}

export default MainPageTemplate
