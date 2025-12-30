// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { AuthContext } from "../contexts/AuthContext";

// const Navbar = () => {
//   const { user, signOut } = useContext(AuthContext);

//   return (
//     <nav className="w-full flex justify-end px-6 py-4 bg-transparent absolute top-0 left-0 z-50">
//       {!user ? (
//         <Link
//           to="/login"
//           className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition duration-300"
//         >
//           <FaUser size={18} />
//           Đăng nhập
//         </Link>
//       ) : (
//         <div className="flex items-center gap-3 bg-white/10 p-2 rounded-full pr-4">
//           <button></button>
//           <img src={user.picture} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
//           <div className="flex flex-col mr-2">
//             <span className="text-black font-medium text-sm">{user.name}</span>

//             {/* CHỈ 1 NÚT ĐĂNG XUẤT */}
//             <button
//               onClick={signOut}
//               className="text-xs text-black hover:underline"
//             >
//               Đăng xuất
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaStar, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-end px-6 py-4 bg-transparent absolute top-0 left-0 z-50">
      {!user ? (
        <Link
          to="/login"
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition duration-300"
        >
          <FaUser size={18} />
          Đăng nhập
        </Link>
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-3 py-2 rounded-full hover:bg-white/30 transition"
          >
            <img
              src={user.picture}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-black font-medium text-sm hidden md:block">
              {user.name}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
              {/* Profile */}
              <div className="flex items-center gap-3 p-4 border-b">
                <img
                  src={user.picture}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">Tài khoản cá nhân</p>
                </div>
              </div>
              {/* Profile */}
              <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700"
                >
                  <FaUserCircle />
                  Thông tin cá nhân
              </Link>

              {/* Points */}
              <div className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                <FaStar className="text-yellow-500" />
                <span>
                  Tổng điểm đã nhận:{" "}
                  <b className="text-gray-900">{user.totalPoints || 0}</b>
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
              >
                <FaSignOutAlt />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
