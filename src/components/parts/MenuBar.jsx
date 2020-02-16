import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Tooltip } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Avatar from "../basics/Avatar"
import I18n from "../../libs/common/i18n"
import MainPageTemplate from "../templates/MainPageTemplate"
import Modal from "../basics/Modal"
import UserForm from "./UserForm"
import VideoChatForm from "./VideoChatForm"
import styled from "styled-components"

const MenuTab = styled.div`
  border-width: 2px;
  border-color: orange;
  border-style: outset;
  padding: 3px;
`
const MenuLabel = styled.span`
  color: coral;
  margin-right: 20px;
  margin-left: 10px;
`

class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showProfileDialog: false,
      showVideoChatDialog: false,
    }
    this.videoProfile = "480p_4"
    this.channel = "test"
    this.transcode = "interop"
    this.attendeeMode = "video"
    this.baseMode = "avc"
    this.toggleProfileDialog = this.toggleProfileDialog.bind(this)
    this.toggleVideoChatDialog = this.toggleVideoChatDialog.bind(this)
  }

  render() {
    const loginUserName = this.props.loginState.loginUser.name || ""
    const avatarName = this.props.loginState.loginUser.avatar || ""
    return (
      <div>
        <div style={{ marginTop: "2px", color: "coral", backgroundColor: "lightyellow" }}>
          <Row >
            <Col style={{ marginLeft: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("Flight ticket search & book")}>
                <MenuTab onClick={() => this.props.switchMainViewIconClick(MainPageTemplate.View.Flight)}>
                  <FontAwesomeIcon icon="plane-departure" size="2x"
                   />
                  <MenuLabel>{I18n.get("Flight")}</MenuLabel>
                </MenuTab>
              </Tooltip>
            </Col>
            <Col style={{ marginLeft: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("Hotel search & book")}>
                <MenuTab onClick={() => this.props.switchMainViewIconClick(MainPageTemplate.View.Settings)}>
                  <FontAwesomeIcon icon="hotel" size="2x"
                  />
                  <MenuLabel>{I18n.get("Hotel")}</MenuLabel>
                </MenuTab>
              </Tooltip>
            </Col> 
            <Col style={{ marginLeft: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("Payment")}>
                <MenuTab onClick={() => this.props.switchMainViewIconClick(MainPageTemplate.View.Settings)}>
                  <FontAwesomeIcon icon="credit-card" size="2x"
                  />
                  <MenuLabel>{I18n.get("Payment")}</MenuLabel>
                </MenuTab>
              </Tooltip>
            </Col>
            <Col style={{ marginLeft: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("History")}>
                <MenuTab onClick={() => this.props.switchMainViewIconClick(MainPageTemplate.View.Settings)}>
                  <FontAwesomeIcon icon="list-alt" size="2x"
                  />
                  <MenuLabel>{I18n.get("History")}</MenuLabel>
                </MenuTab>
              </Tooltip>
            </Col>
            <Col style={{ float: "right", marginRight: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("ログアウト")}>
                <FontAwesomeIcon icon="door-open" size="2x"
                  onClick={this.props.onLogoutIconClick} />
              </Tooltip>
            </Col >
            <Col style={{ float: "right", marginLeft: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("管理")}>
                <FontAwesomeIcon icon="cogs" size="2x"
                  onClick={() => this.props.switchMainViewIconClick(MainPageTemplate.View.Settings)} />
              </Tooltip>
            </Col>
            <Col style={{ float: "right", marginRight: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <Avatar avatar={avatarName} size="32px" />
            </Col>
            <Col style={{ float: "right", marginRight: "10px", verticalAlign: "middle", display: "inline-block" }}>
              <font size="4">{loginUserName}</font>
            </Col>
            <Col style={{ float: "right", marginRight: "20px", verticalAlign: "middle", display: "inline-block" }}>
              <Tooltip placement="bottom" title={I18n.get("Video Chat")}>
                <FontAwesomeIcon icon="video" size="2x"
                  onClick={this.openVideoChatWindow} 
                  // onClick={this.toggleVideoChatDialog} 
                  />
              </Tooltip>
            </Col >
          </Row >
        </div>
        <Modal
          visible={this.state.showProfileDialog}
          onCancel={this.toggleProfileDialog}
          footer={null}
          destroyOnClose
          width={500}
        >
          <UserForm
            user={this.props.loginState.loginUser}
            onSaveButtonClick={this.props.onUserProfileSaveButtonClick}
            isSavingProcessing={this.props.loginState.isSaveUserProcessing}
          />
        </Modal>

        <Modal
          visible={this.state.showVideoChatDialog}
          onCancel={this.toggleVideoChatDialog}
          footer={null}
          destroyOnClose
          width={900}
          height={600}
        >
          <VideoChatForm
              videoProfile={this.videoProfile}
              channel={this.channel}
              transcode={this.transcode}
              attendeeMode={this.attendeeMode}
              baseMode={this.baseMode}
              appId={this.appId}
              uid={this.uid}          
          />
        </Modal>        
      </div>
    )
  }

  toggleProfileDialog() {
    this.setState({
      showProfileDialog: !this.state.showProfileDialog,
    })
  }
  toggleVideoChatDialog() {
    this.setState({
      showVideoChatDialog: !this.state.showVideoChatDialog,
    })
  }
  openVideoChatWindow() {
    const win = window.open("http://localhost:5000/group-chat", "", "width=700,height=700,top=400,left=1000")
    win.focus()
  }
}

MenuBar.propTypes = {
  loginState: PropTypes.object.isRequired,
  switchMainViewIconClick: PropTypes.func.isRequired,
  onUserProfileSaveButtonClick: PropTypes.func.isRequired,
  onLogoutIconClick: PropTypes.func.isRequired,
}

export default MenuBar
