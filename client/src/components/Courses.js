import React, { useState, useEffect } from "react";
import { getCourses } from "./helper/coreapicalls";
import ImageHelper from "./helper/ImageHelper";
import Home from "../Main/Home";
import { useNavigate, Redirect, Route } from "react-router-dom";
import AdminForm from "../AdminCourses/AdminForm";
const Courses = () => {
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);

  const loadAllCourse = () => {
    getCourses().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    });
  };

  useEffect(() => {
    loadAllCourse();
  }, []);

  return (
    <>
      <div className="courses-area section-padding40 fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="section-tittle text-center mb-55">
                <h2>Our featured courses</h2>
              </div>
            </div>
          </div>
          <div className="courses-actives row">
            {courses.map((course, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <div className="properties pb-20">
                    <div className="properties__card">
                      <div className="properties__img overlay1">
                        <ImageHelper course={course} />
                      </div>
                      <div className="properties__caption">
                        <p>User Experience</p>
                        <h3>
                          <a href="#">{course.name}</a>
                        </h3>
                        <p>{course.description}</p>
                        <div className="properties__footer d-flex justify-content-between align-items-center">
                          <div className="restaurant-name">
                            <div className="rating">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star-half"></i>
                            </div>
                            <p>
                              <span>(4.5)</span> based on 120
                            </p>
                          </div>
                          <div className="price">
                            <span>${course.price}</span>
                          </div>
                        </div>
                        <button
                          className="border-btn border-btn2"
                          onClick={() => {
                            navigate("/post-details", {
                              state: {
                                courseId: course._id,
                                post_name: course.name,
                                post_description:course.description,
                                post_price:course.price
                              },
                            });
                          }
                        }
                        >
                          Find out more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Courses;
