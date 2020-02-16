export default class User {
  constructor(id, name, avatar, version, address, passphrase) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.version = version
    this.address = address
    this.passphrase = passphrase
    this.numberOfPrizes = "0,0,0"
    this.newPassword = ""
  }

  static createIdToUserMap(users) {
    const result = {}
    users.forEach(user => {
      result[user.id] = user
    })
    return result
  }

  static PrizeType = {
    Leadership: "Leadership",
    Bravely: "Bravely",
    Wiseness: "Wiseness",
  }
}

export class UserCreateRequest {
  constructor(name, password, avatar, address, passphrase, numberOfPrizes) {
    this.name = name
    this.password = password
    this.avatar = avatar
    this.address = address
    this.passphrase = passphrase
    this.numberOfPrizes = numberOfPrizes
  }
}
