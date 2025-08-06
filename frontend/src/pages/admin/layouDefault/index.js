import Header from "./header";
import Sidebar from "./sidebar";
import './layoutDefault.scss';
import Main from "./main";
function layoutDefaultAdmin() {
    return (
        <>
            <Header />
            <div className="layout-default d-flex">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-2 g-0 ">
                            <Sidebar />
                        </div>
                        <div className=" main col-10 ">
                            <Main />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default layoutDefaultAdmin;