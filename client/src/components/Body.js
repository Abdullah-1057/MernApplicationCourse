import React from "react";

const MyBody = () => {
  return (
    <>
      <section className="slider-area ">
        <div className="slider-active">
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-12">
                  <div className="hero__caption">
                    <h1 data-animation="fadeInLeft" data-delay="0.2s">
                      Online learning
                      <br /> platform
                    </h1>
                    <p data-animation="fadeInLeft" data-delay="0.4s">
                      Build skills with courses, certificates, and degrees
                      online from world-className universities and companies
                    </p>
                    <a
                      href="#"
                      className="btn hero-btn"
                      data-animation="fadeInLeft"
                      data-delay="0.7s"
                    >
                      Join for Free
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="services-area">
        <div className="container">
          <div className="row justify-content-sm-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-30">
                <div className="features-icon">
                  <img src="assets/img/icon/icon1.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>60+ UX courses</h3>
                  <p>The automated process all your website tasks.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-30">
                <div className="features-icon">
                  <img src="assets/img/icon/icon2.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>Expert instructors</h3>
                  <p>The automated process all your website tasks.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="single-services mb-30">
                <div className="features-icon">
                  <img src="assets/img/icon/icon3.svg" alt="" />
                </div>
                <div className="features-caption">
                  <h3>Life time access</h3>
                  <p>The automated process all your website tasks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyBody;
