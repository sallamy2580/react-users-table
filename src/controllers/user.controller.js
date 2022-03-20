import crypto from 'crypto';

import dbConnect from '../utils/mongodb'
import User from '../models/user'

dbConnect()

export async function getAllUsers() {
  // For demo purpose only. You are not likely to have to return all users.
  return User.findAll({});
}

export async function createUser({ email, password, first_name, last_name }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  const doc = new User({
    createdAt: Date.now(),
    email,
    first_name,
    last_name,
    hash,
    salt,
  });

  // Here you should insert the user into the database
  const user = await doc.save()
  return user
}

export async function findUserByemail(email) {
  // Here you find the user based on id/email in the database
  // const user = await db.findUserById(id)
  const user = User.findOne({ email });
  return user
}

export const findOne = (e) => User.findOne(e)

export async function updateUserByemail(email, update) {
  // Here you update the user based on id/email in the database
  // const user = await db.updateUserById(id, update)
  const doc = User.find({ email });
  Object.assign(doc, update);
  const user = await doc.save()
  return user;
}

export async function deleteUser(email) {
  // Here you should delete the user in the database
  // await db.deleteUser(req.user)
  await User.remove({ email })
}

export async function checkUserEmailExist(email) {
  // Here you find the user based on id/email in the database
  // const user = await db.findUserById(id)
  const user = await User.findOne({ email })
  return user
}

// Compare the password of an already fetched user (using `findUserByemail`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
