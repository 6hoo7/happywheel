import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../configAPI";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem("token") || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);

    // signOut: frontend only calls backend endpoint, then clears client state and redirects
    const signOut = async () => {
        try {
            // call backend signout (server clears session/cookies if any)
            await fetch(`${API_URL}/auth/signout`, {
                method: "POST",
                credentials: "include", // include cookies if backend uses them
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
                body: JSON.stringify({}),
            }).catch((err) => {
                // ignore network error but continue clearing client state
                console.warn("Backend signout request failed (ignored):", err);
            });

            // clear client state
            setUser(null);
            setToken(null);
            try {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            } catch (e) {
                console.warn("localStorage clear error", e);
            }

            // redirect to login
            window.location.href = "/login";
        } catch (err) {
            console.error("signOut error:", err);
            // fallback redirect
            window.location.href = "/login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
