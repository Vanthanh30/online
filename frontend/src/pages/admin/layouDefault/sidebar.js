import './layoutDefault.scss';
import { IoIosSettings } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaUserFriends, FaRegListAlt } from "react-icons/fa";
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <ul className="sidebar__menu">
                    <li className="sidebar__item--active">
                        <a href="/">
                            <div className="icon"><MdDashboard /></div>
                            <span>Dashboard</span>
                        </a></li>
                    <li className="sidebar__item">
                        <a href="/courses">
                            <div className="icon"><FaRegListAlt /></div>
                            <span>Khóa học</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/users">
                            <div className="icon"><FaUserFriends /></div>
                            <span>Tài khoản</span>
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
                            <div className="icon"><IoIosSettings /></div>
                            <span>Cài đặt </span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/logout">
                            <div className="icon"><FiLogOut /></div>
                            <span>Đăng xuất </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;