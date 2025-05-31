import mongoose from "mongoose";
const { Schema } = mongoose;

const statusSchema = new Schema(
  {
    statusName: { type: String, required: true },
    statusDescription: { type: String, required: true },
    time: { type: String },
  },
  { _id: false }
);

const reportSchema = new Schema(
  {
    userId: { type: String, required: true },
    photoUrl: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    latDetail: { type: Number, required: true },
    lonDetail: { type: Number, required: true },
    regency: { type: String, required: true },
    status: { type: [statusSchema], default: [] },
    saved: { type: [String], default: [] },
    province: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema, "Reports");
