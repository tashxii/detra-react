import moment from "moment"
import FlightTicket from "../../models/flightTicket"

export default class FlightTravelConverter {
  static convertSearchRequest = (origin, destination, fromDate, toDate) => {
    return {
      origin: origin,
      destination: destination,
      fromDate: fromDate, // TODO: ritu format
      toDate: toDate, // TODO: ritu format
    }
  }

  static getFlightTicketBySearchResponse(response){
    // departureOrigin: "SFO"
    // departureDestination: "BOS"
    // departureBoardingDateTime: "2020-06-02T22:30:00-07:00"
    // departurePrice: "152.62"
    // returnOrigin: "BOS"
    // returnDestination: "SFO"
    // returnBoardingDateTime: "2020-06-08T08:10:00-04:00"
    // returnPrice: "181.42"
    const DATA_FORMAT="YYYY-MM-DD HH:mm"
    console.error(response)
    return new FlightTicket(
      response.departureOrigin,
      response.departureDestination,
      moment(response.departureBoardingDateTime).format(DATA_FORMAT),
      Math.round(Number(response.departurePrice * 100)) / 100,
      response.returnOrigin,
      response.returnDestination,
      moment(response.returnBoardingDateTime).format(DATA_FORMAT),
      Math.round(Number(response.returnPrice * 100)) / 100,
      Math.round((Number(response.departurePrice) + Number(response.returnPrice)) * 100) / 100,
    )
  }
}
