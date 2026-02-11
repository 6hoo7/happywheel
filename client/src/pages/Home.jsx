import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SpinWheel from "../Components/SpinWheel";
import { FaQuestionCircle } from "react-icons/fa";
import { API_URL } from "../configAPI";

export default function Home() {
  const [wheelItems, setWheelItems] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [userInfo, setUserInfo] = useState({ spins: 0, points: 0 });

  // ======================
  // LOAD GIFTS => UI wheel
  // ======================
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/gifts`);
        const gifts = await res.json();

        const mapped = gifts.map((g) => ({
          _id: g._id,
          name: g.name,
          type: g.type,
          image: g.image || "",
        }));

        // thêm ô "chúc may mắn"
        mapped.push({
          _id: "none",
          name: "Chúc may mắn lần sau",
          type: "none",
          image: "",
        });

        setWheelItems(mapped);
      } catch (err) {
        console.error("Lỗi load gifts:", err);
      }
    };

    fetchGifts();
  }, []);

  // ======================
  // CLICK SPIN
  // ======================
  const handleSpinClick = async () => {
    if (mustSpin) return;

    try {
      const res = await fetch(`${API_URL}/api/spin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Quay thất bại");
        return;
      }

      const giftId = data?.result?.gift || null;
      const idx = wheelItems.findIndex((x) => x._id === giftId);

      const finalIndex =
        idx === -1 ? wheelItems.length - 1 : idx;

      setPrizeIndex(finalIndex);
      setAnnouncement(data.result.giftName);
      setUserInfo(data.user);
      setMustSpin(true);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi quay thưởng");
    }
  };

  return (
    <div>
      <Navbar announcement={announcement} />

      <div className="flex flex-col items-center gap-6 pt-12">

        {/* Thông tin user */}
        <div
          className="flex gap-6 px-8 py-4 rounded-2xl
          bg-white/70 backdrop-blur-md
          shadow-xl border border-white/40
          text-lg font-bold text-gray-700"
        >
          <div className="flex items-center gap-2">
            🎯 <span>Lượt quay:</span>
            <span className="text-indigo-600">
              {userInfo.spins}
            </span>
          </div>

          <div className="flex items-center gap-2">
            ⭐ <span>Điểm:</span>
            <span className="text-yellow-500">
              {userInfo.points}
            </span>
          </div>
        </div>

        {/* Container vòng quay */}
        <div className="relative">

          {/* Icon thể lệ */}
          <button
            onClick={() => setShowRuleForm(true)}
            className="absolute -top-10 -left-10 p-3 bg-white/60 backdrop-blur
                       rounded-xl shadow hover:scale-110 transition z-20"
          >
            <FaQuestionCircle
              className="text-green-500"
              size={26}
            />
          </button>

          <div className="relative flex items-center justify-center">
            {/* Glow */}
            <div
              className="absolute w-[420px] h-[420px]
              rounded-full
              bg-gradient-to-tr from-purple-400 via-pink-400 to-yellow-300
              blur-3xl opacity-30 animate-pulse"
            />

            <SpinWheel
              wheelItems={wheelItems}
              mustSpin={mustSpin}
              prizeIndex={prizeIndex}
              onSpin={handleSpinClick}
              onStop={() => setMustSpin(false)}
              size={420}
            />
          </div>
        </div>
      </div>

      {/* Modal thể lệ */}
      {showRuleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px]">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
              📜 Thể lệ trò chơi
            </h2>

            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Mỗi lượt quay chỉ dùng 1 lần.</li>
              <li>Kết quả được xác định từ hệ thống.</li>
              <li>Điểm được cộng ngay khi trúng.</li>
              <li>Quà vật lý cần xác nhận nhận quà.</li>
            </ul>

            <button
              onClick={() => setShowRuleForm(false)}
              className="mt-6 w-full py-2 bg-black text-white rounded-xl hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
