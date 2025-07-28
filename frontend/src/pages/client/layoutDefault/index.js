import Header from './header';
import Footer from './footer';
import './layoutDefault.scss';
import Sidebar from './sidebar';
import Main from './main';
function LayoutDefault() {
    return (
        <>
            <Header />
            <div className="layout-default d-flex">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-2 g-0 ">
                            <Sidebar />
                        </div>
                        <div className="col-10 g-0">
                            <Main />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default LayoutDefault;