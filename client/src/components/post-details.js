import React from "react";
import { useLocation } from "react-router-dom";
import Bodyend from "./Bodyend";
import Header from "./Header";
import MyBody from "./Body";
export default function PostDetailsScreen() {
  const { state } = useLocation();
  return (
    <>
      <Header />
      <section className="slider-area ">
        <div className="slider-active">
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="conatiner relative">
                  <section className="about-area2 fix pb-padding">
                    <div className="support-wrapper align-items-center">
                      <div className="right-content2">
                        <div className="right-img">
                          <img src="assets/img/gallery/about2.png" alt="" />
                        </div>
                      </div>
                      <div className="left-content2">
                        <div className="section-tittle section-tittle2 mb-20">
                          <div className="front-text">
                            <h2 className="">
                              <div>{state.courseId}</div>
                              <div>{state.post_name}</div>
                            </h2>
                            <p>
                              <div>{state.post_description}</div>
                            </p>
                            <a href="#" className="btn">
                              <div>Join now for $ {state.post_price}</div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
