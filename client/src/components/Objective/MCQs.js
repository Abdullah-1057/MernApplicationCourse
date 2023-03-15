import React from "react";
import "./App.css";
import { questions } from "./questions";
import { useState } from "react";
import { getMcqs } from "./helper/coreapicalls";
import { useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MCQs() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [mcqs, setMcqs] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate;

  const handleReset = () => {
    <Navigate to="/dashboard" replace={true} />;
  };
  const loadAllMCqs = () => {
    getMcqs().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setMcqs(data);
      }
    });
    // console.log(mcqs);
  };
  // useEffect(() => {
  //   (async () => {
  //     setMcqs(await getMcqs());
  //     console.log(mcqs)
  //   })();
  // },[]);
  useEffect(() => {
    loadAllMCqs();
  }, [setShowScore]);

  const handleClick = (option, answer) => {
    if (option === answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < mcqs.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
          Your score is {score} out of {mcqs.length}
          {/* <button
            onClick={() => {
              <Navigate to="/dashboard" replace={true} />;
            }}
          >
            Main Menu
          </button> */}
          <Link
            className="btn button-header"
            to="/"
          >
            MainMenu
          </Link>
        </section>
      ) : mcqs.length !== 0 ? (
        <Fragment>
          <h1>helo</h1>
          {console.log(mcqs)}

          <section className="question-section">
            <h1>
              Question {currentQuestion + 1}/{mcqs.length}
            </h1>
            <p>{mcqs[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section">
            <button
              onClick={() =>
                handleClick(
                  mcqs[currentQuestion].answerOption1,
                  mcqs[currentQuestion].answer
                )
              }
            >
              {mcqs[currentQuestion].answerOption1}
            </button>
            <button
              onClick={() =>
                handleClick(
                  mcqs[currentQuestion].answerOption2,
                  mcqs[currentQuestion].answer
                )
              }
            >
              {mcqs[currentQuestion].answerOption2}
            </button>
            <button
              onClick={() =>
                handleClick(
                  mcqs[currentQuestion].answerOption3,
                  mcqs[currentQuestion].answer
                )
              }
            >
              {mcqs[currentQuestion].answerOption3}
            </button>
            <button
              onClick={() =>
                handleClick(
                  mcqs[currentQuestion].answerOption4,
                  mcqs[currentQuestion].answer
                )
              }
            >
              {mcqs[currentQuestion].answerOption4}
            </button>
          </section>
        </Fragment>
      ) : (
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
      )}
    </div>
  );
}
