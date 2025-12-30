const physicalRewardSchema = new mongoose.Schema(
  {
    name: String,
    pointsCost: Number,
    stock: Number,
    image: String,
    description: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("PhysicalReward", physicalRewardSchema);
