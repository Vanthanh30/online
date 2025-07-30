import './auth.scss';
import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
function LoginPage({ onClose }) {
    useEffect(() => {
        // Đóng khi nhấn ESC
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__header">
                    <h1 className="auth__header__title">Đăng nhập</h1>
                    <button
                        type="button"
                        className="auth__header__close btn-close"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="auth__body">
                    <form className='auth__body__form'>
                        <div className='mb-3'>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn" required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu của bạn" required />
                        </div>
                        <div className="mb-3 text-end">
                            <button
                                type="button"
                                className="btn btn-link text-decoration-none p-0">
                                Quên mật khẩu
                            </button>
                        </div>
                        <button type="button" className="btn auth__google mb-3">
                            <FcGoogle className="me-2" /> Đăng nhập bằng Google
                        </button>
                        <button type="submit" className="btn auth__button">
                            Đăng nhập
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default LoginPage;