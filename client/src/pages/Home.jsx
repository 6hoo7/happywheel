// import React, { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import SpinWheel from "../Components/SpinWheel";
// import { FaQuestionCircle, FaGift } from "react-icons/fa";
// import { API_URL } from "../configAPI";

// export default function Home() {
//   const [wheelData, setWheelData] = useState([]);
//   const [giftList, setGiftList] = useState([]);

//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const [showGiftForm, setShowGiftForm] = useState(false);
//   const [showRuleForm, setShowRuleForm] = useState(false);

//   const [announcement, setAnnouncement] = useState("");
//   const [userInfo, setUserInfo] = useState({ spins: 0, points: 0 });

//   /* ======================
//      LẤY DATA VÒNG QUAY
//   ====================== */
//   useEffect(() => {
//     const fetchGifts = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/gifts`);
//         const gifts = await res.json();
//         console.log("GIFTS FROM API:", gifts);

//         // map sang data cho wheel
//         const mappedWheelData = gifts.map((g) => ({
//           option: g.name,
//           style: {
//             backgroundColor:
//               g.type === "point" ? "#34d399" : "#60a5fa",
//             textColor: "white",
//           },
//         }));

//         // thêm ô "chúc may mắn"
//         mappedWheelData.push({
//           option: "Chúc may mắn lần sau",
//           style: {
//             backgroundColor: "#facc15",
//             textColor: "#1f2937",
//           },
//         });

//         setGiftList(gifts);
//         setWheelData(mappedWheelData);
//       } catch (err) {
//         console.error("Lỗi load gifts:", err);
//       }
//     };

//     fetchGifts();
//   }, []);

//   /* ======================
//      CLICK QUAY
//   ====================== */
//   const handleSpinClick = async () => {
//     if (mustSpin) return;

//     try {
//       const res = await fetch(`${API_URL}/api/spin`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       // tìm index gift backend trả về
//       const giftIndex = giftList.findIndex(
//         (g) => g._id === data.result.gift
//       );

//       // nếu không trúng → ô cuối
//       const finalIndex =
//         giftIndex === -1 ? wheelData.length - 1 : giftIndex;

//       setPrizeNumber(finalIndex);
//       setAnnouncement(data.result.giftName);
//       setUserInfo(data.user);
//       setMustSpin(true);
//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra khi quay thưởng");
//     }
//   };

//   return (
//     <div>
//       <Navbar announcement={announcement} />

//       <div className="flex flex-col items-center gap-6 pt-12">
//         {/* Thông tin user */}
//         <div className="flex gap-6 text-lg font-semibold">
//           <div>🎯 Lượt quay: {userInfo.spins}</div>
//           <div>⭐ Điểm: {userInfo.points}</div>
//         </div>

//         {/* Container vòng quay */}
//         <div className="relative">
//           {/* Icon thể lệ */}
//           <button
//             onClick={() => setShowRuleForm(true)}
//             className="absolute -top-10 -left-10 p-3 bg-white/60 backdrop-blur
//                        rounded-xl shadow hover:scale-110 transition z-20"
//           >
//             <FaQuestionCircle className="text-green-500" size={26} />
//           </button>

//           {/* Icon quà */}
//           <button
//             onClick={() => setShowGiftForm(true)}
//             className="absolute -top-10 -right-10 p-3 bg-white/60 backdrop-blur
//                        rounded-xl shadow hover:scale-110 transition z-20"
//           >
//             <FaGift className="text-yellow-500" size={26} />
//           </button>

//           <SpinWheel
//             wheelData={wheelData}
//             mustSpin={mustSpin}
//             prizeNumber={prizeNumber}
//             onSpin={handleSpinClick}
//             onStop={() => setMustSpin(false)}
//           />
//         </div>
//       </div>

//       {/* ===== Modal đổi quà ===== */}
//       {showGiftForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-96">
//             <h2 className="text-2xl font-bold mb-4 text-center">🎁 Quà có thể đổi</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {giftList.map((g) => (
//                 <div
//                   key={g._id}
//                   className="border rounded-xl p-3 text-center font-semibold shadow flex flex-col items-center gap-2"
//                 >
//                   {g.type === "physical" && g.image && (
//                     <img
//                       src={g.image}
//                       alt={g.name}
//                       className="w-16 h-16 object-contain"
//                       onError={(e) => {
//                         e.currentTarget.style.display = "none"; 
//                       }}
//                     />
//                   )}

//                   <span>{g.name}</span>

//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={() => setShowGiftForm(false)}
//               className="mt-6 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ===== Modal thể lệ ===== */}
//       {showRuleForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-[420px]">
//             <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
//               📜 Thể lệ trò chơi
//             </h2>
//             <ul className="list-decimal list-inside space-y-2 text-gray-700">
//               <li>Mỗi lượt quay chỉ dùng 1 lần.</li>
//               <li>Kết quả được xác định từ hệ thống.</li>
//               <li>Điểm được cộng ngay khi trúng.</li>
//               <li>Quà vật lý cần xác nhận nhận quà.</li>
//             </ul>
//             <button
//               onClick={() => setShowRuleForm(false)}
//               className="mt-6 w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SpinWheel from "../Components/SpinWheel";
import { FaQuestionCircle, FaGift } from "react-icons/fa";
import { API_URL } from "../configAPI";

export default function Home() {
  const [wheelItems, setWheelItems] = useState([]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);

  const [showGiftForm, setShowGiftForm] = useState(false);
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

        // map về wheelItems
        const mapped = gifts.map((g) => ({
          _id: g._id,
          name: g.name,
          type: g.type,
          image: g.image || "",
        }));

        // thêm ô "chúc may mắn" (UI only)
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
  // CLICK SPIN => call backend
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

      // backend trả về gift id hoặc null
      const giftId = data?.result?.gift || null;

      // tìm index của gift trong wheelItems
      const idx = wheelItems.findIndex((x) => x._id === giftId);

      // nếu không trúng => ô cuối "chúc may mắn"
      const finalIndex = idx === -1 ? wheelItems.length - 1 : idx;

      // set state để wheel quay
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
        {/* Info user */}
        <div className="flex gap-6 text-lg font-semibold text-white drop-shadow">
          <div>🎯 Lượt quay: {userInfo.spins}</div>
          <div>⭐ Điểm: {userInfo.points}</div>
        </div>

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

      {/* Modal đổi quà (bạn chưa cần làm, mình giữ lại cho đỡ mất UI) */}
      {showGiftForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">🎁 Quà</h2>
            <p className="text-gray-600 text-center">
              Bạn chưa cần làm phần này, mình giữ placeholder.
            </p>
            <button
              onClick={() => setShowGiftForm(false)}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

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
