
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup,InsertMcq } from "../auth/helper";
import { isAutheticated } from "../auth/helper";
const CreateMcq = () => {
  const { user, token } = isAutheticated();
  const [values, setValues] = useState({
    questionText: "",
    answerOption1: "",
    answerOption2: "",
    answerOption3: "",
    answerOption4: "",
    answer: "",
    error: "",
    success: false,
  });

  const { questionText, answerOption1,answerOption2,answerOption3,answerOption4, answer, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    console.log(values)
    event.preventDefault();
    setValues({ ...values, error: false });
    InsertMcq(user._id,token,{ questionText, answerOption1,answerOption2,answerOption3,answerOption4, answer })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          console.log("hello world")
        } else {
          setValues({
            ...values,
            questionText: "",
            answerOption1: "",
            answerOption2: "",
            answerOption3: "",
            answerOption4: "",
            answer: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };
  const signUpForm = () => {
    return (
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
          <form>
            <div className="login-form">
              <div className="logo-login">
                <a href="index.html">
                  <img src="assets/img/logo/loder.png" alt="" />
                </a>
              </div>
              <h2>Registration Here</h2>

              <div className="form-input">
                <label for="questionText">Full questionText</label>
                <input type="text" name="questionText" placeholder="Enter MCQ" 
                onChange={handleChange("questionText")}
                value={questionText}
                />
              </div>
              <div className="form-input">
                <label for="answerOption1">answerOption1</label>
                <input type="text" name="answerOption1" placeholder="Enter answerOption1" 
                onChange={handleChange("answerOption1")}
                value={answerOption1}
                />
              </div>
              <div className="form-input">
                <label for="answerOption2">answerOption1</label>
                <input type="text" name="answerOption2" placeholder="Enter answerOption2" 
                onChange={handleChange("answerOption2")}
                value={answerOption2}
                />
              </div>
              <div className="form-input">
                <label for="answerOption3">answerOption1</label>
                <input type="text" name="answerOption3" placeholder="Enter answerOption3" 
                onChange={handleChange("answerOption3")}
                value={answerOption3}
                />
              </div>
              <div className="form-input">
                <label for="answerOption4">answerOption4</label>
                <input type="text" name="answerOption4" placeholder="Enter answerOption4" 
                onChange={handleChange("answerOption4")}
                value={answerOption4}
                />
              </div>
              <div className="form-input">
                <label for="answer">answer</label>
                <input type="text" name="answer" placeholder="Enter answer" 
                onChange={handleChange("answer")}
                value={answer}
                />
              </div>

              <div className="form-input pt-30">
                <input type="submit" name="submit" value="Enter" onClick={onSubmit}/>
              </div>
              <a href="signin" className="registration">
                login
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
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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
  return (
    <>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </>
  );
};
export default CreateMcq;


