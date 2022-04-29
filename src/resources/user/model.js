import bcrypt from 'bcrypt'

const rounds = 100

export class UserModel {
  constructor() {
    this.users = []
  }

  create(user) {
    user.id = this.users.length + 1
    user.password = this.hashPassword(user.password)
    this.users.push(user)
    return user
  }

  findById(id) {
    let matchingUsers = this.users.find(u => (u.id = id))
    return matchingUsers ? matchingUsers[0] : undefined
  }

  checkPassword(id, password) {
    let user = this.findById(id)
    return bcrypt.compare(password, user.password)
  } // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {
    return bcrypt.hash(password, 100)
  } // hint: make use of bcrypt to hash password i.e: bcrypt.hash
}
