const claimSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    source: { type: String, enum: ["spin", "exchange"], required: true },

    gift: { type: mongoose.Schema.Types.ObjectId, ref: "Gift" }, // nếu đến từ quay
    reward: { type: mongoose.Schema.Types.ObjectId, ref: "PhysicalReward" }, // nếu đổi

    address: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "shipping", "delivered", "cancelled"],
      default: "pending",
    },

    spinId: { type: mongoose.Schema.Types.ObjectId, ref: "Spin" },
  },
  { timestamps: true }
);

export default mongoose.model("Claim", claimSchema);
