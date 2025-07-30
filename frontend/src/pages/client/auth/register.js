import './auth.scss';
import React, { useEffect } from 'react';
function RegisterPage({ onClose }) {
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
                    <h1 className="auth__header__title">Đăng ký</h1>
                    <button
                        type="button"
                        className="auth__header__close btn-close"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="auth__body">
                    <form className='auth__body__form'>
                        <div className='mb-1'>
                            <label htmlFor="account" className="form-label">Tên tài khoản</label>
                            <input type="account" className="form-control" id="account" placeholder="Nhập tên tài khoản của bạn" required />
                        </div>
                        <div className='mb-1'>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn" required />
                        </div>
                        <div className='mb-1'>
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu của bạn" required />
                        </div>
                        <div className='mb-1'>
                            <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
                            <input type="password" className="form-control" id="confirm-password" placeholder="Xác nhận mật khẩu của bạn" required />
                        </div>

                        <button type="submit" className="btn auth__button">
                            Đăng kí
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default RegisterPage;