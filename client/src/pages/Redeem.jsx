import React, { useState, useContext } from "react";
import { FaGift, FaStar } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const giftsData = [
  { id: 1, name: "Voucher 10k", points: 100 },
  { id: 2, name: "Voucher 50k", points: 400 },
  { id: 3, name: "Voucher 100k", points: 800 },
];

const Redeem = () => {
  const { user } = useContext(AuthContext);
  const [points, setPoints] = useState(user?.totalPoints || 500);

  const handleRedeem = (gift) => {
    if (points < gift.points) return;
    setPoints(points - gift.points);
    alert(`🎉 Bạn đã đổi thành công ${gift.name}`);
  };

  return (
    <div className="relative bg-white/60 backdrop-blur rounded-xl shadow z-20
                    pt-20 md:pt-10 px-3 sm:px-4 md:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Tiêu đề */}
        <h1 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2">
          <FaGift className="text-emerald-500" />
          Đổi quà
        </h1>

        {/* Tổng điểm */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 mb-6 
                        flex items-center gap-3">
          <FaStar className="text-yellow-500 text-lg" />
          <span className="text-base sm:text-lg">
            Điểm hiện tại:
            <b className="text-emerald-600 ml-1">{points}</b>
          </span>
        </div>

        {/* Danh sách quà */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {giftsData.map((gift) => {
            const disabled = points < gift.points;

            return (
              <div
                key={gift.id}
                className="bg-white rounded-xl shadow p-4 sm:p-5
                           flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">
                    {gift.name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-1 text-sm sm:text-base">
                    <FaStar className="text-yellow-500" />
                    {gift.points} điểm
                  </p>
                </div>

                <button
                  disabled={disabled}
                  onClick={() => handleRedeem(gift)}
                  className={`mt-4 py-2.5 sm:py-2 rounded-lg font-medium transition
                    ${
                      disabled
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95"
                    }`}
                >
                  Đổi quà
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Redeem;
