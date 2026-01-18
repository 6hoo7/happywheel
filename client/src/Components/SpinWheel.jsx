// import { Wheel } from "react-custom-roulette";

// export default function SpinWheel({
//     wheelData,
//     mustSpin,
//     prizeNumber,
//     onSpin,
//     onStop,
// }) {
//     if (!wheelData.length) {
//         return (
//             <div className="w-80 h-80 flex items-center justify-center">
//                 <span className="text-gray-500">Đang tải vòng quay...</span>
//             </div>
//         );
//     }

//     return (
//         <div className="relative flex items-center justify-center rounded-full p-4">
//             <Wheel
//                 mustStartSpinning={mustSpin}
//                 prizeNumber={prizeNumber}
//                 data={wheelData}
//                 onStopSpinning={onStop}
//                 outerBorderColor={["#6366f1", "#ec4899", "#f97316"]}
//                 outerBorderWidth={18}
//                 radiusLineColor="white"
//                 radiusLineWidth={2}
//                 fontSize={15}
//                 textDistance={60}
//                 innerRadius={20}
//                 innerBorderWidth={3}
//                 innerBorderColor="#1e293b"
//             />

//             <button
//                 onClick={onSpin}
//                 disabled={mustSpin}
//                 className="absolute w-20 h-20 rounded-full
//                    bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
//                    text-white font-extrabold text-xl
//                    shadow-[0_0_30px_rgba(168,85,247,0.8)]
//                    hover:scale-105 active:scale-95 transition
//                    disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//                 QUAY
//             </button>
//         </div>
//     );
// }

import React, { useMemo } from "react";

export default function SpinWheel({
    wheelItems = [],
    mustSpin,
    prizeIndex,
    onSpin,
    onStop,
    size = 420,
}) {
    const total = wheelItems.length;

    if (!total) {
        return (
            <div
                className="flex items-center justify-center rounded-full bg-white/50 backdrop-blur shadow"
                style={{ width: size, height: size }}
            >
                <span className="text-gray-700 font-semibold">Đang tải vòng quay...</span>
            </div>
        );
    }

    const sliceDeg = 360 / total;

    const getSliceColor = (type, index) => {
        if (type === "point") return index % 2 === 0 ? "#34d399" : "#22c55e";
        if (type === "physical") return index % 2 === 0 ? "#60a5fa" : "#3b82f6";
        return "#facc15"; // none
    };

    const wheelBackground = useMemo(() => {
        const parts = wheelItems.map((item, i) => {
            const start = i * sliceDeg;
            const end = (i + 1) * sliceDeg;
            return `${getSliceColor(item.type, i)} ${start}deg ${end}deg`;
        });
        return `conic-gradient(${parts.join(",")})`;
    }, [wheelItems, sliceDeg]);

    const rotateDeg = useMemo(() => {
        if (prizeIndex === null || prizeIndex === undefined) return 0;

        const fullSpins = 6 * 360;
        const targetCenter = prizeIndex * sliceDeg + sliceDeg / 2;
        const toTop = -targetCenter - 90; // đưa ô trúng về kim (12h)
        return fullSpins + toTop;
    }, [prizeIndex, sliceDeg]);

    return (
        <div className="relative flex items-center justify-center">
            {/* Kim */}
            <div
                className="absolute -top-3 z-30"
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderBottom: "26px solid #ef4444",
                    filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.25))",
                }}
            />

            {/* Wheel */}
            <div
                className="relative rounded-full overflow-hidden border-[14px] border-white shadow-[0_0_40px_rgba(0,0,0,0.25)]"
                style={{ width: size, height: size }}
            >
                {/* Layer xoay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: wheelBackground,
                        transform: `rotate(${rotateDeg}deg)`,
                        transition: mustSpin
                            ? "transform 5.2s cubic-bezier(0.12, 0.78, 0.14, 1)"
                            : "transform 0.2s ease",
                    }}
                    onTransitionEnd={() => {
                        if (mustSpin && typeof onStop === "function") onStop();
                    }}
                >
                    {/* Text + icon */}
                    {wheelItems.map((item, index) => {
                        const angle = index * sliceDeg + sliceDeg / 2;

                        return (
                            <div
                                key={item._id || index}
                                className="absolute left-1/2 top-1/2"
                                style={{
                                    transform: `rotate(${angle}deg) translate(${size * 0.28}px)`,
                                    transformOrigin: "0 0",
                                }}
                            >
                                <div
                                    className="flex items-center gap-2"
                                    style={{
                                        transform: "rotate(90deg)",
                                        transformOrigin: "left center",
                                    }}
                                >
                                    {/* icon chỉ cho physical */}
                                    {item.type === "physical" && item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-7 h-7 object-contain drop-shadow"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : null}

                                    <span className="text-white font-bold text-sm drop-shadow">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Nút quay */}
                <button
                    onClick={onSpin}
                    disabled={mustSpin}
                    className="absolute left-1/2 top-1/2 z-40 w-20 h-20 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
          text-white font-extrabold text-xl shadow-[0_0_30px_rgba(168,85,247,0.8)]
          hover:scale-105 active:scale-95 transition
          disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    QUAY
                </button>
            </div>
        </div>
    );
}
