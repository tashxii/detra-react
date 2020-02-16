    import React, { Component } from "react"
    import I18n from "../../libs/common/i18n"
    import { Table, DatePicker, Col, Row, Input, Button, Spin } from "antd"
    const { RangePicker } = DatePicker

    //import FlightTicket from "../../libs/models/flightTicket"


class FlightSearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            origin: "",
            destination: "",
            fromDate: "",
            toDate: "",
        }
        this.isDisableSearchButton = this.isDisableSearchButton.bind(this)
        this.searchButtonClick = this.searchButtonClick.bind(this)
        this.handleOriginChange= this.handleOriginChange.bind(this)
        this.handleDestinationChange= this.handleDestinationChange.bind(this)
        this.handleRangeChange= this.handleRangeChange.bind(this)
    }

    render() {
    // console.log(this.props.usersState && this.props.usersState.users )
    const { flightTickets, isSearchingFlight } = this.props.flightsState

    return (
        <div>
        <Spin spinning={isSearchingFlight}>
            <Col>
                <h3>Search Condition:</h3>
                <Row style={{ marginTop: "10px" }}>
                    <Col span={6} style={{ marginRight: "5px" }}>
                        <Input
                        placeholder={I18n.get("Origin Airport")}
                        onChange={(e) => this.handleOriginChange(e)}
                        disabled={isSearchingFlight}
                        allowClear
                        />
                    </Col>
                    <Col span={6} style={{ marginRight: "5px" }}>
                        <Input
                        placeholder={I18n.get("Dest Airport")}
                        onChange={(e) => this.handleDestinationChange(e)}
                        disabled={isSearchingFlight}
                        allowClear
                        />
                    </Col>
                    <Col span={6} style={{ marginRight: "5px" }}>
                        <RangePicker onChange={(dates) => this.handleRangeChange(dates)}/>
                    </Col>
                    <Col span={6} style={{ marginRight: "20px" }}>
                        <Button
                            type="primary"
                            onClick={this.searchButtonClick}
                            disabled={isSearchingFlight || this.isDisableSearchButton()}
                        >
                            {I18n.get("Search")}
                        </Button>
                    </Col>
                </Row>
                <h3 style={{marginTop:"10px"}}>Search Results:</h3>
                 <Row>
                    <Table
                    rowKey={record => record.id}
                    columns={this.getFlightTicketTableColumns()} 
                    dataSource={flightTickets} 
                    />
                </Row>
            </Col>
        </Spin>
        </div>
    )
    }

    getFlightTicketTableColumns() {
    // departureOrigin, departureDestination, departureFlightDateTime, departurePrice,
    // returnOrigin, returnDestination, returnFlightDateTime, returnPrice,
    // totalPrice,

    return [
        {
            title: I18n.get("Origin"),
            dataIndex: "departureOrigin",
            key: "departureOrigin",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
        {
            title: I18n.get("Destination"),
            dataIndex: "departureDestination",
            key: "departureDestination",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
        {
            title: I18n.get("Dept. Time"),
            dataIndex: "departureFlightDateTime",
            key: "departureFlightDateTime",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
        {
            title: I18n.get("Dept. Price"),
            dataIndex: "departurePrice",
            key: "departurePrice",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
        {
            title: I18n.get("Back Time"),
            dataIndex: "returnFlightDateTime",
            key: "returnFlightDateTime",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
        {
            title: I18n.get("Back Price"),
            dataIndex: "returnPrice",
            key: "returnPrice",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },        {
            title: I18n.get("Total Price"),
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (val) => {
                return <span style={{color:"coral"}}>{val}</span>
            }
        },
    ]
    }

    searchButtonClick() {
        this.props.searchButtonClick(
            this.state.origin, this.state.destination, 
            this.state.fromDate, this.state.toDate
        )
    }

    isDisableSearchButton() {
        return (
            this.state.origin === "" || 
            this.state.destination === "" ||
            this.state.fromDate === "" ||
            this.state.toDate === ""
        )
    }

    handleOriginChange(e) {
        this.setState({ "origin": e.target.value })
    }
    handleDestinationChange(e) {
        this.setState({ "destination": e.target.value })
    }
    handleRangeChange(dates) {
        const DATE_FORMAT = "YYYY-MM-DD"
        this.setState({ 
            "fromDate": dates[0].utc().format(DATE_FORMAT), 
            "toDate": dates[1].utc().format(DATE_FORMAT),
        })
    }
}



    export default FlightSearchForm
