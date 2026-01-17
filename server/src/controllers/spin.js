import mongoose from "mongoose";
import User from "../models/user.js";
import Gift from "../models/gift.js";
import Spin from "../models/spinHistory.js";

/**
 * Random gift theo probability
 * @param {Array} gifts
 * @returns gift | null
 */

function randomGift(gifts) {
    const rand = Math.random(); // 0 → 1
    let cumulative = 0;

    for (const gift of gifts) {
        cumulative += gift.probability;
        if (rand <= cumulative) {
            return gift; // trúng
        }
    }

    return null; // trượt → chúc may mắn
}

export const spinWheel = async (req, res) => {
    const userId = req.user.id;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1️⃣ Lấy user
        const user = await User.findById(userId).session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Kiểm tra lượt quay
        if (user.spins <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Hết lượt quay" });
        }

        // 3️⃣ Lấy danh sách quà hợp lệ
        const gifts = await Gift.find({
            isActive: true,
            $or: [
                { type: "point" },
                { type: "physical", quantity: { $gt: 0 } }
            ]
        })
            .select("name type value probability quantity")
            .session(session);

        if (!gifts.length) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Chưa cấu hình phần thưởng" });
        }

        // 4️⃣ Random quà
        const gift = randomGift(gifts);

        // 5️⃣ Data mặc định (chúc may mắn)
        const spinData = {
            user: user._id,
            type: "none",
            gift: null,
            giftName: "Chúc may mắn lần sau",
            value: 0,
        };

        // 6️⃣ Trừ lượt quay
        user.spins -= 1;

        // 7️⃣ Nếu trúng quà
        if (gift) {
            spinData.gift = gift._id;
            spinData.giftName = gift.name;
            spinData.type = gift.type;

            if (gift.type === "point") {
                user.points += gift.value;
                spinData.value = gift.value;
            }

            if (gift.type === "physical") {
                if (gift.quantity <= 0) {
                    throw new Error("Quà đã hết");
                }

                gift.quantity -= 1;
                spinData.value = 1;
                await gift.save({ session });
            }
        }

        // 8️⃣ Lưu lịch sử quay
        const [spin] = await Spin.create([spinData], { session });

        // 9️⃣ Lưu user
        await user.save({ session });

        // 🔟 Commit transaction
        await session.commitTransaction();

        return res.json({
            message: "Quay thành công",
            result: spin,
            user: {
                spins: user.spins,
                points: user.points,
            },
        });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ message: err.message });
    } finally {
        session.endSession();
    }
};
