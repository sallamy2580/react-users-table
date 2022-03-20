const mongoose = require('mongoose');
const { randEmail, randFirstName, randLastName } = require('@ngneat/falso');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const AccountsSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: [254, 'First name cannot be more than 50 characters'],
    },
    last_name: {
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
);

const Account = mongoose.model('Accounts', AccountsSchema);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Array(200)
      .fill()
      .forEach(async () => {
        const doc = Account({
          first_name: randFirstName({ withAccents: false }),
          last_name: randLastName({ withAccents: false }),
          email: randEmail(),
        });
        await doc.save();
      });
  })
  .catch((err) => console.log(err));
