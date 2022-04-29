import jwt from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../resources/user/model'

const userModel = new UserModel()

export const echo = async (req, res) => {
  return res
    .status(201)
    .json(req.body)
    .send()
}

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  if (!email || !password)
    return res.status(400).send({ message: 'Email and password required' })

  var user = { email: email, password: password }
  user = userModel.create(user)
  let token = newToken(user)
  return res.status(201).send({ token: token })
}

export const signin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  if (!email || !password)
    return res.status(400).send({ message: 'Email and password required' })
  let user = userModel.findById()
  if (!user)
    return res.status(401).send({ message: 'Email and password required' })

  if (!checkPassword(user.id, password))
    return res.status(401).send({ message: 'Invalid password' })
}

export const protect = async (req, res, next) => {
  next()
}
