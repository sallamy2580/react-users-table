import dbConnect from '../utils/mongodb';
import Account from '../models/account';

dbConnect();

export async function getAllAccounts(page, limit) {
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
  const doc = new Account({ first_name, last_name, email })
  const acc = await doc.save()

  return acc
}
