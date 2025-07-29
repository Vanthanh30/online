import React from "react";
import './home_pages.scss';
import { Fade } from "react-slideshow-image";
import { FaClock } from "react-icons/fa";
import 'react-slideshow-image/dist/styles.css';

function HomePage() {
    const slideImages = [
        {
            url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?auto=format&fit=crop&w=1500&q=80',
            caption: 'First Slide'
        },
        {
            url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?auto=format&fit=crop&w=1536&q=80',
            caption: 'Second Slide'
        },
        {
            url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?auto=format&fit=crop&w=1500&q=80',
            caption: 'Third Slide'
        },
    ];

    return (
        <div className="homepage container-fluid py-4">
            {/* Slider */}
            <div className="homepage__slider mb-4">
                <Fade>
                    {slideImages.map((image, index) => (
                        <div key={index} className="homepage__slide">
                            <div className="homepage__slide-image" style={{ backgroundImage: `url(${image.url})` }} />
                        </div>
                    ))}
                </Fade>
            </div>

            {/* Khóa học mới */}
            <h5 className="homepage__section-title">Khóa học mới</h5>
            <div className="row">
                {Array(4).fill(0).map((_, index) => (
                    <div key={index} className="col-6 col-md-3 mt-3">
                        <div className="homepage__card rounded shadow-sm">
                            <div className="homepage__card-image">
                                <img src="https://i.pravatar.cc/100" alt="Course" className="img-fluid w-100" />
                            </div>
                            <div className="homepage__card-content p-2">
                                <h4 className="homepage__card-title">JavaScript</h4>
                                <div className="homepage__card-price d-flex justify-content-between">
                                    <span className="text-muted text-decoration-line-through">1.299.000đ</span>
                                    <span className="text-danger fw-bold">8.999.000đ</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src="https://i.pravatar.cc/100" alt="Teacher" className="rounded-circle" width={32} height={32} />
                                        <span className="homepage__card-teacher">ABC</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 text-muted">
                                        <FaClock />
                                        <span>123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Thông tin nổi bật */}
            <h5 className="homepage__section-title mt-5">Thông tin nổi bật</h5>
            <div className="row">
                {Array(4).fill(0).map((_, index) => (
                    <div key={index} className="col-6 col-md-3 mt-3">
                        <div className="homepage__card rounded shadow-sm">
                            <div className="homepage__card-image">
                                <img src="https://i.pravatar.cc/100" alt="Highlight" className="img-fluid w-100" />
                            </div>
                            <div className="homepage__card-content p-2">
                                <h4 className="homepage__card-title">JavaScript</h4>
                                <div className="homepage__card-price d-flex justify-content-between">
                                    <span className="text-muted text-decoration-line-through">1.299.000đ</span>
                                    <span className="text-danger fw-bold">8.999.000đ</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src="https://i.pravatar.cc/100" alt="Teacher" className="rounded-circle" width={32} height={32} />
                                        <span className="homepage__card-teacher">ABC</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 text-muted">
                                        <FaClock />
                                        <span>123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
