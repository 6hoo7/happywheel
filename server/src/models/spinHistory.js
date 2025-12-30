import mongoose from "mongoose";

const spinSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    gift: { type: mongoose.Schema.Types.ObjectId, ref: "Gift", default: null },

    giftName: String,

    type: {
      type: String,
      enum: ["none", "point", "physical"],
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Spin", spinSchema);
