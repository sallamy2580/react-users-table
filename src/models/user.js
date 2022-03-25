import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: [254, 'First name cannot be more than 50 characters'],
    },
    lastName: {
      type: String,
      required: true,
      maxlength: [254, 'Last name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: [254, 'Email cannot be more than 50 characters'],
    },
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

export default mongoose.models.Users || mongoose.model('Users', UserSchema)
