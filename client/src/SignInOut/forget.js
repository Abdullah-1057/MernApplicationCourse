import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signin, authenticate, isAutheticated,forget } from "../auth/helper";

const Forget = () => {
  const [values, setValues] = useState({
    email: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    forget({ email})
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
      console.log(user)
  };



  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return(
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
            <h2>Login Here</h2>
            <div className="form-input">
              <label for="name">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-input pt-30">
              <input
                type="submit"
                name="submit"
                value="Opt code"
                onClick={onSubmit}
              />
            </div>
  
            <a href="/signin" className="forget">
              Login
            </a>
            <a href="/signup" className="registration">
              Registration
            </a>
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
  };
  

  return (
    <>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()} 
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </>
  );
};
export default Forget;

