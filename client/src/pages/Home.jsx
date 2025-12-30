import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { FaQuestionCircle, FaGift } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const data = [
  { option: "Voucher 10k", style: { backgroundColor: "#f87171", textColor: "white" } },
  { option: "Voucher 50k", style: { backgroundColor: "#60a5fa", textColor: "white" } },
  { option: "Thêm 100 điểm", style: { backgroundColor: "#34d399", textColor: "white" } },
  { option: "Chúc bạn may mắn", style: { backgroundColor: "#facc15", textColor: "#1f2937" } },
];

export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleSpinClick = () => {
    if (mustSpin) return;
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div>
      <Navbar announcement={announcement} />

      <div className="flex flex-col items-center gap-8 pt-12">
        {/* Container vòng quay */}
        <div className="relative">
          {/* Icon thể lệ */}
          <button
            onClick={() => setShowRuleForm(true)}
            className="absolute -top-10 -left-10 p-3 bg-white/60 backdrop-blur
                       rounded-xl shadow hover:scale-110 transition z-20"
          >
            <FaQuestionCircle className="text-green-500" size={26} />
          </button>

          {/* Icon quà */}
          <button
            onClick={() => setShowGiftForm(true)}
            className="absolute -top-10 -right-10 p-3 bg-white/60 backdrop-blur
                       rounded-xl shadow hover:scale-110 transition z-20"
          >
            <FaGift className="text-yellow-500" size={26} />
          </button>

          {/* Vòng quay */}
          <div className="relative flex items-center justify-center rounded-full p-4">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => setMustSpin(false)}
              outerBorderColor={["#6366f1", "#ec4899", "#f97316"]}
              outerBorderWidth={18}
              radiusLineColor="white"
              radiusLineWidth={2}
              fontSize={15}
              textDistance={60}
              innerRadius={20}
              innerBorderWidth={3}
              innerBorderColor="#1e293b"
            />

            {/* Nút quay – NẰM GIỮA */}
            <button
              onClick={handleSpinClick}
              className="absolute w-20 h-20 rounded-full
                         bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
                         text-white font-extrabold text-xl
                         shadow-[0_0_30px_rgba(168,85,247,0.8)]
                         hover:scale-105 active:scale-95 transition
                         animate-pulse text-center"
            >
              QUAY
            </button>
          </div>
        </div>
      </div>

      {/* ===== Form đổi quà ===== */}
      {showGiftForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h2 className="text-3xl font-bold mb-4 text-center">🎁 Đổi quà</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-3 text-center font-semibold shadow"
                >
                  {item.option}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowGiftForm(false)}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* ===== Form thể lệ ===== */}
      {showRuleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px]">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-600">
              📜 Thể lệ trò chơi
            </h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Mỗi lượt quay nhận 1 phần thưởng ngẫu nhiên.</li>
              <li>Voucher, điểm thưởng hoặc không trúng.</li>
              <li>Phần thưởng được cộng ngay sau khi quay.</li>
              <li>Chúc bạn may mắn 🍀</li>
            </ul>
            <button
              onClick={() => setShowRuleForm(false)}
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
