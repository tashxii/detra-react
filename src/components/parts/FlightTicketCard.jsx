import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col, Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import I18n from "../../libs/common/i18n"

import styled from "styled-components"
const PriceText = styled.div`
    display:inline-block;
    text-align: center;
    font-size: 20px;
    color: coral;
    padding: 5px;
`

const AirportText = styled.div`
    display:inline-block;
    text-align: center;
    font-size: 16px;
    color: rosybrown;
    padding: 5px;
`

const Text = styled.span`
    display:inline-block;
    text-align: center;
    font-size: 12px;
    color: rosybrown;
    padding: 5px;
`

// const Div = styled.div`
//   ${props => (props.parent ? parent : (props.center ? center : ""))}"
// `
// const parent = { height: "90vh", width: "90vw", position: "relative" }
// const center = { textAlign: "center", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }

const GoingArrow = styled.div`
    display:inline-block;
    height:5px;
    width:10px;
    background-color: gray;
    position:relative;
    top:5px;
    &:before {
        position:absolute;
        content:"";
        width:0;
        height:0;
        border:7px solid transparent;
        border-left:7px solid gray;
        left:10px;
        top:-4px;
  }
`
const Block = styled.div`
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    color: coral;
    border: solid 2px #6091d3;
    border-radius: 5px;
`

// this.departureOrigin = departureOrigin
// this.departureDestination = departureDestination
// this.departureFlightDateTime = departureFlightDateTime
// this.departurePrice = departurePrice
// this.returnOrigin = returnOrigin
// this.returnDestination = returnDestination
// this.returnFlightDateTime = returnFlightDateTime
// this.returnPrice = returnPrice

class FlightTicketCard extends Component {
  render() {
    const ticket = this.props.flightTicket
    return (
        <Block>
            <Col>
            <Row>
                <Row>
                    <div style={{ display:"inline-block"}}>
                        <FontAwesomeIcon icon="plane" size="1x" rotation={0}/>
                            <AirportText>
                                {ticket.departureOrigin}
                            </AirportText>
                            <Text>{ticket.departureFlightDateTime}</Text>
                            <div>
                                <GoingArrow/>
                                <Text>$ {ticket.departurePrice}</Text>
                            </div>
                            <AirportText>
                                {ticket.departureDestination}
                            </AirportText>               
                    </div>
                </Row>
                <Row>
                <div style={{ display:"inline-block"}}>
                    <FontAwesomeIcon icon="plane" size="1x" rotation={180}/>
                        <AirportText>
                            {ticket.returnOrigin}
                        </AirportText>
                        <Text>{ticket.returnFlightDateTime}</Text>
                        <div>
                            <GoingArrow/>
                            <Text>$ {ticket.returnPrice}</Text>
                        </div>
                        <AirportText>
                            {ticket.returnDestination}
                        </AirportText>
                    </div>
                </Row>
            </Row>
            <Row>
            <div style={{ display:"inline-block"}}>
                <div>
                    <PriceText>
                        $ {ticket.totalPrice}
                    </PriceText>
                </div>
                <div style={{marginTop: "20px"}}>
                    <Button
                        type="primary"
                    >
                        {I18n.get("Book")}
                    </Button>
                </div>
            </div>
            </Row>
            </Col>
        </Block>
    )
  }
}

FlightTicketCard.propTypes = {
  flightTicket: PropTypes.object.isRequired,
}

export default FlightTicketCard
