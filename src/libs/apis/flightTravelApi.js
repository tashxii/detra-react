import TravelApiCommon from "./travelApiCommon"


export default class FlightTravelApi {
  
  static search = async (request) => {
    return TravelApiCommon.post(`/flightsearch`, request)
  }

  // TODO: book
  // TODO: rate 

}
