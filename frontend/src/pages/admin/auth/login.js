import { useNavigate } from 'react-router-dom';
import './login.scss'
function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const fakeUser = {
            username: "admin",
            role: "admin",
            token: "fake-jwt-token"
        };


        localStorage.setItem("user", JSON.stringify(fakeUser));


        navigate("/admin");
    };
    return (
        <>
            <div className="auth">
                <div className="auth__container">
                    <div className="auth__header">
                        <h1 className="auth__header__title">Đăng nhập</h1>
                    </div>
                    <div className="auth__body" onSubmit={handleLogin}>
                        <form className='auth__body__form'>
                            <div className='mb-3'>
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Nhập email của bạn" required />
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
                            <button type="submit" className="btn auth__button">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;