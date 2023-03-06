import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log(`MongoDB connected successfully...`);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
