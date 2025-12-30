// src/pages/AuthSuccess.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../configAPI";

export default function AuthSuccess() {
    const { setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [err, setErr] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                let token = params.get("token");

                // nếu FB thêm hash '#_=_', remove cho đẹp URL (không ảnh hưởng token)
                if (window.location.hash === "#_=_") {
                    window.history.replaceState(null, "", window.location.pathname + window.location.search);
                }

                if (!token) {
                    setErr("Không tìm thấy token trong URL.");
                    return;
                }

                // Lưu token vào context (và localStorage qua context)
                setToken(token);

                // Gọi backend /api/profile để lấy name + picture
                const res = await fetch(`${API_URL}/api/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Status ${res.status}`);
                }

                const json = await res.json();
                if (!json.success) throw new Error(json.message || "Lỗi khi lấy profile");

                const userData = json.data; // { name, picture }
                setUser({ name: userData.name, picture: userData.picture });

                // Redirect về home
                navigate("/", { replace: true });
            } catch (error) {
                console.error(error);
                setErr(error.message || "Đăng nhập thất bại.");
            }
        })();
    }, [navigate, setUser, setToken]);

    if (err) {
        return (
            <div className="p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Lỗi khi xử lý đăng nhập</h2>
                <p>{err}</p>
            </div>
        );
    }

    return (
        <div className="p-6 text-white">
            <h2 className="text-xl font-semibold">Đang xử lý đăng nhập…</h2>
        </div>
    );
}
