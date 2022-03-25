import Account from '../models/account'
import dbConnect from '../utils/mongodb'

export async function getAllAccounts(page, limit) {
  await dbConnect()
  // For demo purpose only. You are not likely to have to return all users.
  return Account.paginate(
    {},
    {
      page,
      limit,
    }
  )
}

// eslint-disable-next-line import/no-unused-modules
export async function createAccount({ firstName, lastName, email }) {
  await dbConnect()
  const doc = new Account({ firstName, lastName, email })
  const acc = await doc.save()

  return acc
}
