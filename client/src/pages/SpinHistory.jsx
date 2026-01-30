import React, { useEffect, useState } from "react";
import { FaGift, FaClock } from "react-icons/fa";
import axios from "axios";

/* ✅ THÊM HÀM NÀY */
const mapSpinToUI = (spin) => {
  let reward = "Chúc bạn may mắn lần sau";
  let status = "Không trúng";

  if (spin.type === "point") {
    reward = `+${spin.value} điểm`;
    status = "Đã nhận";
  }

  if (spin.type === "physical") {
    reward = spin.giftName;
    status = spin.isClaimed ? "Đã nhận" : "Chưa nhận";
  }

  return {
    id: spin._id,
    reward,
    status,
    date: new Date(spin.createdAt).toLocaleString("vi-VN"),
  };
};

const SpinHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/spins/history");
        const mapped = res.data.map(mapSpinToUI);
        setHistory(mapped);
      } catch (err) {
        console.error("Lỗi lấy lịch sử quay:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <p className="text-center pt-32 text-gray-500">
        Đang tải lịch sử...
      </p>
    );
  }

  return (
    <div className="relative bg-white/60 backdrop-blur rounded-xl shadow z-20
                    pt-20 md:pt-24 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2">
          <FaClock className="text-emerald-500" />
          Lịch sử quay thưởng
        </h1>

        <div className="rounded-xl shadow-md overflow-hidden bg-white">
          {history.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              Chưa có lịch sử quay
            </p>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row
                         sm:items-center sm:justify-between
                         gap-3 px-4 sm:px-5 py-4
                         border-b last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <FaGift className="text-emerald-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">
                    {item.reward}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.date}
                  </p>
                </div>
              </div>

              <span
                className={`self-start sm:self-auto
                  text-xs px-3 py-1 rounded-full font-medium
                  ${
                    item.status === "Đã nhận"
                      ? "bg-emerald-100 text-emerald-600"
                      : item.status === "Chưa nhận"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinHistory;
