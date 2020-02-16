import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import LoginForm from "../parts/LoginForm"
import styled from "styled-components"

class LoginPageTemplate extends Component {
  render() {
    if (this.props.loginState.loginUser) {
      return <Redirect to="/main" />
    }
    return (
      <Div parent style={{
        background: "url('/images/main-backgroud.jpg') no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        width: "100%",
        height: "100%",
      }}>
        <Div center>
          <LoginForm {...this.props} />
        </Div>
      </Div>
    )
  }
}

const Div = styled.div`
  ${props => (props.parent ? parent : (props.center ? center : ""))}"
`
const parent = { height: "90vh", width: "90vw", position: "relative" }
const center = { textAlign: "center", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }

LoginPageTemplate.propTypes = {
  loginState: PropTypes.object.isRequired,
}

export default LoginPageTemplate
