import FlightTravelApi from "../apis/flightTravelApi"
import FlightTravelConverter from "./converter/flightTravelConverter"
import ApiErrorConverter from "./converter/apiErrorConverter"
import I18n from "../common/i18n"

export default class FlightTravelService {

  static searchAsync = async (origin, destination, fromDate, toDate) => {
    const request = FlightTravelConverter.convertSearchRequest(origin, destination, fromDate, toDate)
    return await FlightTravelApi.search(request)
    .then((res) => {
      if (res.ok) {
        const flightTickets = []
        res.json.forEach(flightResponse => {
          flightTickets.push(FlightTravelConverter.getFlightTicketBySearchResponse(flightResponse))
        })
        return { flightTickets: flightTickets }
      } else {
        return {
          error: ApiErrorConverter.createByApiError(res, I18n.get("Failed to search flight tickets"))
        }
      }
    })
    .catch((error) => {
      return {
        error: ApiErrorConverter.createSystemError(error)
      }
    })

  }




  // static updateAsync = async (user, prize, note) => {
  //   const request = PrizeBcConverter.convertUpdateRequest(user, prize, note)
  //   return await PrizeBcApi.update(request)
  //     .then((res) => {
  //       if (res.ok) {
  //         return { prize: '' }
  //       } else {
  //         return {
  //           // TODO: Taku
  //           error: ApiErrorConverter.createByApiError(res, I18n.get("ユーザーの更新に失敗しました"))
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       return {
  //         error: ApiErrorConverter.createSystemError(error)
  //       }
  //     })
  // }

  // static getAsync = async (username) => {
  //   return await PrizeBcApi.getAsync(username)
  //     .then((res) => {
  //       if (res.ok) {
  //         return { prize: PrizeBcConverter.getPrizeResponse(res.json) }
  //       } else {          
  //         return { error: ApiErrorConverter.createByApiError(res, I18n.get("失敗しました"))}
  //       }
  //     })
  //     .catch((error) => {
  //       return {
  //         error: ApiErrorConverter.createSystemError(error)
  //       }
  //     })

  // }
}
