import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        provider: {
            type: String,
            enum: ["google", "facebook"],
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            sparse: true,
        },
        name: {
            type: String,
            required: true,
        },
        picture: String,
        spins: { type: Number, default: 36 },
        points: { type: Number, default: 0 },
        // history: [
        //     {
        //         giftId: { type: mongoose.Schema.Types.ObjectId, ref: "Gift" },
        //         giftName: String,
        //         type: String, // "point" hoặc "physical"
        //         value: Number, // điểm hoặc giá trị quà
        //         date: { type: Date, default: Date.now },
        //         isClaimed: { type: Boolean, default: false }, // nếu là quà vật lý
        //     },
        // ],
    },
    { timestamps: true, versionKey: false }
);

// 🔹 Tạo compound index: provider + providerId là duy nhất
userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
