import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Srinath:<Shree1697>@cluster0.34gkwxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed",error);
    process.exit(1);
  }
};

export default connectDB;
