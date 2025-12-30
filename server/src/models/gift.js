import mongoose from "mongoose";

const giftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["none", "point", "physical"], // điểm thưởng hoặc vật lý
      required: true,
    },
    value: {
      type: Number,
      default: 0, // nếu là "point" → số điểm, nếu là "physical" thì có thể để 0
    },
    image: {
      type: String, // URL ảnh đại diện trên vòng quay
      default: "",
    },
    probability: {
      type: Number,
      required: true, // tỉ lệ trúng (0–1)
      min: 0,
      max: 1,
    },
    quantity: {
      type: Number,
      default: 0, // chỉ áp dụng cho quà vật lý
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gift", giftSchema);
