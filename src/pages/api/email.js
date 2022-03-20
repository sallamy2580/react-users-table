import nextConnect from 'next-connect'
import { checkUserEmailExist } from '../../lib/db'

const handler = nextConnect()

handler
  .post((req, res) => {
    const { email } = req.body
    const exist = checkUserEmailExist(req, { email })
    res.status(200).json({ available: !exist, message: 'email exist' })
  })

export default handler
