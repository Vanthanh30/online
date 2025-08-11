import './layoutDefault.scss';
import { IoHomeSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <ul className="sidebar__menu">
                    <li className="sidebar__item--active">
                        <a href="/">
                            <div className="icon"><IoHomeSharp /></div>
                            <span>Trang chủ</span>
                        </a></li>
                    <li className="sidebar__item">
                        <a href="/courses">
                            <div className="icon"><FaRegListAlt /></div>
                            <span>Khóa học</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/categories">
                            <div className="icon"><MdCategory /></div>
                            <span>Danh mục</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/settings">
                            <div className="icon"><IoMdSettings /></div>
                            <span>Cài đặt</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/logout">
                            <div className="icon"><IoLogOut /></div>
                            <span>Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
