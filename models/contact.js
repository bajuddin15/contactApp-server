import mongoose from "mongoose";
const schema = mongoose.Schema;

const contactSchema = new schema(
  {
    name: {
      type: String,
      requred: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    website: { type: String },
    linkedIn: { type: String },
    twitter: { type: String },
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
