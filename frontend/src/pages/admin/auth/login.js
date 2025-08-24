import './login.scss'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/admin/auth/login", {
                email, password
            });
            const user = res.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/admin");
        } catch (error) {
            alert(error.response?.data?.message || "Đăng nhập thất bại");
        }


    };
    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__header">
                    <h1 className="auth__header__title">Đăng nhập</h1>

                </div>
                <div className="auth__body">
                    <form className='auth__body__form' onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <label htmlFor="account" className="form-label">Tài khoản</label>
                            <input type="text" className="form-control" id="account" placeholder="Nhập tài khoản của bạn" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu của bạn" required value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3 text-end">
                            <button
                                type="button"
                                className="btn btn-link text-decoration-none p-0">
                                Quên mật khẩu
                            </button>
                        </div>

                        <button type="submit" className="btn auth__button">
                            Đăng nhập
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Login;