import './layoutDefault.scss';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Logo from '../../../assets/images/logo.png';
function Header() {
    const languages = [
        {
            code: 'vn',
            name: 'Tiếng Việt',
            flag: 'https://flagcdn.com/w40/vn.png',
        },
        {
            code: 'us',
            name: 'English',
            flag: 'https://flagcdn.com/w40/us.png',
        },
    ];
    const [selected, setSelected] = useState(languages[0]);
    const [open, setOpen] = useState(false);

    const handleSelect = (lang) => {
        setSelected(lang);
        setOpen(false);
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
                        <div className='col-md-5'>
                            <div className='search'>
                                <form className='search__form'>
                                    <input type="text" placeholder="Tìm kiếm khóa học" />
                                    <button type="submit" ><FaSearch className="search-icon" /></button>
                                </form>
                            </div>
                        </div>
                        {/* <div className='col-md-2 d-flex justify-content-end align-items-center'>
                          
                        </div> */}


                        {/* User Section */}
                        <div className='col-md-4 d-flex justify-content-end align-items-center'>
                            <div className=' language-selector  '>
                                <div className='language-selected' onClick={() => setOpen(!open)}>
                                    <img src={selected.flag} alt={selected.name} />
                                    <span>{selected.name}</span>
                                </div>
                                {open && (
                                    <ul className='language-dropdown'>
                                        {languages.map((lang) => (
                                            <li key={lang.code} onClick={() => handleSelect(lang)}>
                                                <img src={lang.flag} alt={lang.name} />
                                                <span>{lang.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className='user_info'>
                                <img src="https://i.pravatar.cc/100" alt="User Avatar" className="user-avatar" />
                                <span className="user-name">Admin</span>

                            </div>
                        </div>
                    </div>
                </div>

            </header>

        </>

    )
}
export default Header;