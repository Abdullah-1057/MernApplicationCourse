import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createaCourse } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AdminForm = () => {
  // console.log(courseData)
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
    loading: false,
    error: "",
    createdCourse: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    error,
    createdCourse,
    getaRedirect,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(token);
    setValues({ ...values, error: "", loading: true });
    createaCourse(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          createdCourse: data.name,
        });
      }
    });
  };

  // const handleChange = (name) => (event) => {
  //   const value = name === "photo" ? event.target.files[0] : event.target.value;
  //   formData.set(name, value);
  //   setValues({ ...values, [name]: value });
  // };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, formData: new FormData() });
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCourse ? "" : "none" }}
    >
      <h4>{createdCourse} created successfully</h4>
    </div>
  );

  const createCourseForm = () => (
    <>
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
              <img src="assets/img/logo/loder.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <main className="login-body" data-vide-bg="assets/img/login-bg.mp4">
        <form className="form-default" action="login-bg.mp4" method="POST">
          <div className="login-form">
            <div className="logo-login">
              <a href="index.html">
                <img src="assets/img/logo/loder.png" alt="" />
              </a>
            </div>
            <h2>Enter Here</h2>
            <div className="form-group ">
              <label className="btn btn-block btn-success">
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image"
                  className="py-2 my-2"
                />
              </label>
            </div>
            <div className="form-input">
              <label for="name">Name</label>
              <input
                type="name"
                name="name"
                placeholder="name"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-input">
              <label for="name">Desccription</label>
              <input
                type="text"
                name="description"
                placeholder="description"
                onChange={handleChange("description")}
                value={description}
              />
            </div>
            <div className="form-input">
              <label for="name">Price</label>
              <input
                type="number"
                name="price"
                placeholder="price"
                onChange={handleChange("price")}
                value={price}
              />
            </div>
            
            <div className="form-input pt-30">
              <input
                type="submit"
                name="submit"
                value="Enter"
                onClick={onSubmit}
              />
            </div>
          </div>
        </form>
      </main>

      <script src="./assets/js/vendor/modernizr-3.5.0.min.js"></script>
      <script src="./assets/js/vendor/jquery-1.12.4.min.js"></script>
      <script src="./assets/js/popper.min.js"></script>
      <script src="./assets/js/bootstrap.min.js"></script>
      <script src="./assets/js/jquery.slicknav.min.js"></script>

      <script src="./assets/js/jquery.vide.js"></script>

      <script src="./assets/js/owl.carousel.min.js"></script>
      <script src="./assets/js/slick.min.js"></script>
      <script src="./assets/js/wow.min.js"></script>
      <script src="./assets/js/animated.headline.js"></script>
      <script src="./assets/js/jquery.magnific-popup.js"></script>

      <script src="./assets/js/gijgo.min.js"></script>
      <script src="./assets/js/jquery.nice-select.min.js"></script>
      <script src="./assets/js/jquery.sticky.js"></script>
      <script src="./assets/js/jquery.barfiller.js"></script>

      <script src="./assets/js/jquery.counterup.min.js"></script>
      <script src="./assets/js/waypoints.min.js"></script>
      <script src="./assets/js/jquery.countdown.min.js"></script>
      <script src="./assets/js/hover-direction-snake.min.js"></script>

      <script src="./assets/js/contact.js"></script>
      <script src="./assets/js/jquery.form.js"></script>
      <script src="./assets/js/jquery.validate.min.js"></script>
      <script src="./assets/js/mail-script.js"></script>
      <script src="./assets/js/jquery.ajaxchimp.min.js"></script>

      <script src="./assets/js/plugins.js"></script>
      <script src="./assets/js/main.js"></script>
    </>
  );

  return (
    <div className="row bg-dark text-white rounded">
      <div className="col-md-8 offset-md-2">
        {successMessage()}
        {createCourseForm()}
      </div>
    </div>
  );
};

export default AdminForm;
