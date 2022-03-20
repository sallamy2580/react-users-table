import dbConnect from '../utils/mongodb';
import Account from '../models/account';

export async function getAllAccounts(page, limit) {
  await dbConnect()
  // For demo purpose only. You are not likely to have to return all users.
  return Account.paginate(
    {},
    {
      page,
      limit,
    }
  );
}

export async function createAccount({ first_name, last_name, email }) {
  await dbConnect()
  const doc = new Account({ first_name, last_name, email })
  const acc = await doc.save()

  return acc
}
