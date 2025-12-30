import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { API_URL } from "../configAPI";

const Login = () => {
    return (
        <div>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">
                <h1 className='text-4xl text-white font-bold text-center mb-6'>Đăng nhập</h1>
                <form action="">
                    <div className="relative my-4">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder=" "
                            className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none focus:ring-0 peer"
                        />
                        <label htmlFor="email" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">Email</label>

                    </div>
                    <div className="relative my-4">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder=" "
                            className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none focus:ring-0 peer"
                        />
                        <label htmlFor="password" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">Mật khẩu</label>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember" >Ghi nhớ</label>
                        </div>
                        <Link to='' className="text-blue-500">Quên mật khẩu?</Link>
                    </div>

                    {/* Icon Login Options */}
                    <div className="flex justify-center gap-6 mb-0 mt-6">
                        <button type="button"
                            onClick={() => {
                                window.location.href = `${API_URL}/auth/facebook`;
                            }}
                            className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
                            <FaFacebook size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = `${API_URL}/auth/google/url`;
                                // server sẽ redirect sang Google Auth
                            }}
                            className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                        >
                            <FaGoogle size={20} />
                        </button>
                    </div>
                    <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-color duration-300">Đăng nhập</button>
                    <div className="text-center text-sm text-white">
                        <span className='mt-4'>Tạo mới? <Link to="/register" className="text-blue-500">Tạo tài khoản</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
