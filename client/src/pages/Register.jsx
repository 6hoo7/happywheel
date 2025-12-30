// ...existing code...'
import React from 'react'
import { Link } from 'react-router-dom'
// ...existing code...
const Register = () => {
    return (
        <div>
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-blur-sm bg-opacity-30 relative">
                <h1 className='text-4xl text-white font-bold text-center mb-6'>Đăng ký</h1>
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
                    <div className="relative my-4">
                        <input
                            id="confirm password"
                            name="confirm password"
                            type="confirm password"
                            placeholder=" "
                            className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-600 focus:outline-none focus:ring-0 peer"
                        />
                        <label htmlFor="password" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6">Xác nhận mật khẩu</label>
                    </div>
                    <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-color duration-300">Đăng ký</button>
                    <div className="text-center text-sm text-white">
                        <span className='mt-4'>Bạn có chắc tạo tài khoản? <Link to="/Login" className="text-blue-500">Đăng nhập</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
// ...existing code...