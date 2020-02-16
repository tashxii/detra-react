import React, { Component } from "react"
import Modal from "../basics/Modal"
import I18n from "../../libs/common/i18n"
import Avatar from "../basics/Avatar"
import { Table, Tooltip, Popconfirm } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PrizeForm from "./PrizeForm"


class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserDialog: false,
      selectedUser: null,
    }
    this.toggleUserDialog = this.toggleUserDialog.bind(this)
    this.openUserDialog = this.openUserDialog.bind(this)
  }

  componentDidMount() {
    this.props.loadUserList()
  }


  render() {
    // console.log(this.props.usersState && this.props.usersState.users )
    const { users } = this.props.usersState

    return (
      <div>
        Friend List

        <Table
          rowKey={record => record.id}
          columns={this.getUserTableColumns()} 
          dataSource={users} 
        />
        <Modal
          visible={this.state.showUserDialog}
          onCancel={this.toggleUserDialog}
          footer={null}
          destroyOnClose
          width={500}
        >
          <PrizeForm
            loginUser={this.props.loginState.loginUser}
            onGiftButtonClick={this.props.onGiftButtonClick}
            user={this.state.selectedUser}
          />
        </Modal>
      </div>

    )
  }

  getUserTableColumns() {
    return [
      {
        title: I18n.get("名前"),
        dataIndex: "name",
        key: "name",
        render: (name) => {
          return <span style={{color: "coral"}}>{name}</span>
        }
      },
      {
        title: "Avatar",
        key: "avatar",
        render: (user) => (
          <div>
            <Avatar avatar={user.avatar} size={"20px"} /> <span style={{color: "coral"}}>{user.avatar}</span>
          </div>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (user) => (
          <div style={{ float: "left", display: "inline-block" }}>
            <Tooltip title={I18n.get("編集")}>
              <FontAwesomeIcon
                icon="edit"
                size="lg"
                style={{ color: "lightgreen", marginRight: "5px" }}
                onClick={() => this.openUserDialog(user)}
              />
            </Tooltip>

            <Tooltip title={I18n.get("Prize")}>
              <FontAwesomeIcon
                icon="award"
                size="lg"
                style={{ color: "gold", marginRight: "10px" }}
                onClick={() => this.openUserDialog(user)}
              />
            </Tooltip>
            <Tooltip title={I18n.get("削除")}>
              <Popconfirm
                title={I18n.get("削除しますか？")}
                okText={I18n.get("削除")}
                cancelText={I18n.get("キャンセル")}
                onConfirm={() => { this.props.onDeleteUserButtonClick(user) }}
                onCancel={() => { }}
              >
                <FontAwesomeIcon
                  icon="trash-alt"
                  size="lg"
                  style={{ color: "hotpink", marginRight: "5px" }}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        ),
      },
    ]
  }

  openUserDialog(user) {
    this.setState({ selectedUser: user })
    this.toggleUserDialog()
  }
  
  toggleUserDialog() {
    this.setState({
      showUserDialog: !this.state.showUserDialog,
    })
  }
}



export default SettingsForm
