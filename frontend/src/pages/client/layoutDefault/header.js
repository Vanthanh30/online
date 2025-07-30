import React, { useState } from 'react';
import './layoutDefault.scss';
import { FaSearch } from "react-icons/fa";
import Login from '../auth/login';
import Register from '../auth/register';
import Logo from '../../../assets/images/logo.png';
function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        console.log("Searching for:", query);
    };

    return (
        <>
            <header className="header">
                <div className="header__container-fluid">
                    <div className='row align-items-center d-flex '>
                        {/* Logo Section */}
                        <div className='col-md-3'>
                            <div className='logo'>
                                <a href="/">
                                    <img src={Logo} alt="Logo" />
                                </a>
                            </div>
                        </div>
                        {/* search*/}
                        <div className='col-md-6'>
                            <div className='search'>
                                <form className='search__form'>
                                    <input type="text" placeholder="Tìm kiếm khóa học" />
                                    <button type="submit" onClick={handleSearch}><FaSearch className="search-icon" /></button>
                                </form>
                            </div>
                        </div>
                        {/* User Section */}
                        <div className='col-md-3 d-flex justify-content-end align-items-center'>
                            <div className='user__actions'>
                                <button className='btn btn-register' onClick={() => setShowRegister(true)}>Đăng kí</button>
                                <button className='btn btn-login' onClick={() => setShowLogin(true)}>Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
        </>
    );
}
export default Header;