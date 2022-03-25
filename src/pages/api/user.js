import nextConnect from 'next-connect'

import {
  createUser,
  deleteUser,
  updateUserByemail,
} from '../../controllers/user.controller'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    // const { name, email, favoriteColor } = req.user
    // res.json({ user: { name, email, favoriteColor } })
    res.json({ user: req.user })
  })
  .post(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    await createUser({ email, password, firstName, lastName })
    res.status(200).json({ success: true, message: 'created new user' })
  })
  .use(async (req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .put(async (req, res) => {
    const { firstName, lastName } = req.body
    const user = await updateUserByemail(req.user.email, {
      firstName,
      lastName,
    })
    res.json({ user })
  })
  .delete(async (req, res) => {
    deleteUser(req)
    req.logOut()
    res.status(204).end()
  })

export default handler
