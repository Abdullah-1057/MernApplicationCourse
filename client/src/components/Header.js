import React from "react";
import { signout, isAutheticated } from "../auth/helper";
import { Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const currentTab = (location, path) => {
  if (location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Header = () => {
  const location = useLocation();
  const navigation = useNavigate();
  return (
    <>
      <header>
        <div className="header-area header-transparent">
          <div className="main-header ">
            <div className="header-bottom  header-sticky">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo">
                      <a href="index.html">
                        <img src="assets/img/logo/logo.png" alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10">
                    <div className="menu-wrapper d-flex align-items-center justify-content-end">
                      <div className="main-menu d-none d-lg-block">
                        <nav>
                          <ul id="navigation">
                            <li className="active">
                              <a href="index.html">Home</a>
                            </li>
                            <li>
                              <a href="courses.html">Courses</a>
                            </li>
                            <li>
                              <a href="about.html">About</a>
                            </li>
                            <li>
                              <a href="#">Blog</a>
                              <ul className="submenu">
                                <li>
                                  <a href="blog.html">Blog</a>
                                </li>
                                <li>
                                  <a href="blog_details.html">Blog Details</a>
                                </li>
                                <li>
                                  <a href="elements.html">Element</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="contact.html">Contact</a>
                            </li>
                     
                            {isAutheticated() &&
                              isAutheticated().user.role === 0 && (
                                <li className="nav-item">
                                  <Link
                                    style={currentTab(
                                      location,
                                      "/Userdashboard"
                                    )}
                                    className="nav-link btn button-header"
                                    to="/Userdashboard"
                                  >
                                    Dashboard
                                  </Link>
                                </li>
                              )}
                            {isAutheticated() &&
                              isAutheticated().user.role === 1 && (
                                <li className="nav-item">
                                  <Link
                                    style={currentTab(
                                      location,
                                      "/Admindashboard"
                                    )}
                                    className="nav-link btn button-header"
                                    to="/Admindashboard"
                                  >
                                    A. Dashboard
                                  </Link>
                                </li>
                              )}
                            {!isAutheticated() && (
                              <Fragment>
                                <li className="nav-item">
                                  <Link
                                    style={currentTab(location, "/signup")}
                                    className="nav-link btn button-header"
                                    to="/signup"
                                  >
                                    Signup
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    style={currentTab(location, "/signin")}
                                    className="nav-link btn button-header"
                                    to="/signin"
                                  >
                                    Sign In
                                  </Link>
                                </li>
                              </Fragment>
                            )}
                            {isAutheticated() && (
                              <li className="nav-item">
                                <span
                                  className="nav-link text-danger btn button-header"
                                  onClick={() => {
                                    signout(() => {
                                      navigation("/");
                                    });
                                  }}
                                >
                                  Signout
                                </span>
                              </li>
                            )}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
