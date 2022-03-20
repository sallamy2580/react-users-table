import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('already connected');
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }
    )
    .then(() => console.log('database started'))
    .catch((err) => console.log(err));

  //
};

export default connectDB;
