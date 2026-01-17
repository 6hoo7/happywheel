import { Wheel } from "react-custom-roulette";

export default function SpinWheel({
    wheelData,
    mustSpin,
    prizeNumber,
    onSpin,
    onStop,
}) {
    if (!wheelData.length) {
        return (
            <div className="w-80 h-80 flex items-center justify-center">
                <span className="text-gray-500">Đang tải vòng quay...</span>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center rounded-full p-4">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelData}
                onStopSpinning={onStop}
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

            <button
                onClick={onSpin}
                disabled={mustSpin}
                className="absolute w-20 h-20 rounded-full
                   bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500
                   text-white font-extrabold text-xl
                   shadow-[0_0_30px_rgba(168,85,247,0.8)]
                   hover:scale-105 active:scale-95 transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
            >
                QUAY
            </button>
        </div>
    );
}
