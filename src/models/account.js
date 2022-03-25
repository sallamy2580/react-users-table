import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const AccountsSchema = new mongoose.Schema(
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
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

AccountsSchema.plugin(mongoosePaginate)

export default mongoose.models.Accounts ||
  mongoose.model('Accounts', AccountsSchema)
