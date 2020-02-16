export default class FlightTicket {
    constructor(
      departureOrigin, departureDestination, departureFlightDateTime, departurePrice,
      returnOrigin, returnDestination, returnFlightDateTime, returnPrice,
      totalPrice,
    ) {
      this.departureOrigin = departureOrigin
      this.departureDestination = departureDestination
      this.departureFlightDateTime = departureFlightDateTime
      this.departurePrice = departurePrice
      this.returnOrigin = returnOrigin
      this.returnDestination = returnDestination
      this.returnFlightDateTime = returnFlightDateTime
      this.returnPrice = returnPrice
      this.totalPrice = totalPrice
    }
  }