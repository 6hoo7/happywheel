import Gift from "../models/gift.js";

export const getActiveGifts = async (req, res) => {
    const gifts = await Gift.find({
        isActive: true
    }).select("name type image");

    res.json(gifts);
};
