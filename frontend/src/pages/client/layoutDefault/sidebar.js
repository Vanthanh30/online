import './layoutDefault.scss';
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends, FaRegListAlt, FaNewspaper } from "react-icons/fa";
function sidebar() {
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
                        <a href="/chat">
                            <div className="icon"><FaUserFriends /></div>
                            <span>Bạn bè</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a href="/news">
                            <div className="icon"><FaNewspaper /></div>
                            <span>Bản tin</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default sidebar;
