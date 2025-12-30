import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Bạn chưa đăng nhập
        </p>
      </div>
    );
  }

  return (
    <div className="full-screen ">
      <Navbar />

      <div className="pt-32 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[420px]">
          <div className="flex flex-col items-center">
            <img
              src={user.picture}
              alt="avatar"
              className="w-28 h-28 rounded-full shadow-lg object-cover"
            />
            <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500 text-sm">Thông tin tài khoản</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{user.email || "Chưa cập nhật"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tổng điểm</span>
              <span className="font-semibold text-green-600">
                {user.totalPoints || 0} điểm
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">ID người dùng</span>
              <span className="text-xs text-gray-400 truncate">
                {user.id || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
