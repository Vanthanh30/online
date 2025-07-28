import './layoutDefault.scss';
import { FaSearch } from "react-icons/fa";
import Logo from '../../../assets/images/logo.png';
function header() {
    return (
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
                                <button type="submit"><FaSearch className="search-icon" /></button>
                            </form>
                        </div>
                    </div>
                    {/* User Section */}
                    <div className='col-md-3 d-flex justify-content-end align-items-center'>
                        <div className='user__actions'>
                            <button className='btn btn-register'>Đăng kí</button>
                            <button className='btn btn-login'>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
}
export default header;