import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  email: String,
  phone: String,
  education: Array,
  skills: Array,
  projects: Array,
}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
