import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./SignInOut/login";
import Home from "./Main/Home";
import Register from "./SignInOut/register";
import Forget from "./SignInOut/forget";
import AdminForm from "./AdminCourses/AdminForm";
import MCQs from "./components/Objective/MCQs";
import PostDetailsScreen from "./components/post-details";
import AdminDashBoard from "./AdminDashboard/AdminDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/AdminRoutes";
import UserDashBoard from "./UserDashBoard/userDashboard";
import { isAutheticated } from "./auth/helper";
import CreateMcq from "./MCQs/CreateMcqForm";
import CreateAssesment from "./Assesment/InsertAssesment";
import ViewAssesment from "./Assesment/viewAssesment";
// import Forget from "./Forget";
const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/post-details" element={<PostDetailsScreen />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/mcqs" element={<MCQs />} />
          <Route path="/viewAssesment" element={<ViewAssesment />} />

          {/* <Route path="/adminForm" element={<AdminForm />} /> */}
          <Route
            path="/Admindashboard"
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
          />
          <Route
            path="/adminForm"
            element={
              <AdminRoute>
                <AdminForm />
              </AdminRoute>
            }
          />
          <Route
            path="/Userdashboard"
            element={isAutheticated && <UserDashBoard />}
          />
          <Route
            path="/adminCreateMcqForm"
            element={
              <AdminRoute>
                <CreateMcq />
              </AdminRoute>
            }
          />
          <Route
            path="/adminCreateAssesmentForm"
            element={
              <AdminRoute>
                <CreateAssesment />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MyRoutes;
