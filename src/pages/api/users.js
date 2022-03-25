import nextConnect from 'next-connect'

import {
  createUser,
  findUserByemail,
  getAllUsers,
} from '../../controllers/user.controller'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    // For demo purpose only. You will never have an endpoint which returns all users.
    // Remove this in production
    const users = await getAllUsers(req)
    res.json({ users })
  })
  .post(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send('Missing fields')
    }
    // Here you check if the email has already been used
    const emailExisted = await findUserByemail(email)
    if (emailExisted) {
      return res.status(409).send('The email has already been used')
    }

    const user = await createUser({ email, password, firstName, lastName })
    return req.logIn(user, (err) => {
      if (err) throw err
      // Log the signed up user in
      res.status(201).json({
        user,
      })
    })
  })

export default handler
