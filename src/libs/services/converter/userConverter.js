import User from "../../models/user"

export default class UserConverter {
  static getUserByUserResponse = (response) => {
    return new User(
      response.id,
      response.name,
      response.avatar,
      response.version,
      response.address,
      response.passphrase,
      response.numberOfPrizes,
    )
  }

  static convertLoginRequest = (name, password) => {
    return {
      name: name,
      password: password,
    }
  }

  static convertCreateRequest = (userCreateRequest) => {
    return {
      name: userCreateRequest.name,
      password: userCreateRequest.password,
      avatar: userCreateRequest.avatar,
      address: userCreateRequest.address,
      passphrase: userCreateRequest.passphrase,
    }
  }

  static convertUpdateRequest = (user) => {
    return {
      id: user.id,
      name: user.name,
      password: user.newPassword,
      avatar: user.avatar,
      version: user.version,
      address: user.address,
      passphrase: user.passphrase,
    }
  }
}
