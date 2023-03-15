import { API } from "../../backend";
import React from 'react'

  //create a Course
  export const createaCourse = (userId, token, course) => {
    console.log(userId,token,course)
    return fetch(`http://localhost:8000/api/course/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: course
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //get all courses
  export const getCourses = () => {
    return fetch(`${API}/courses`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //delete a course
  
  export const deleteCourse = (courseId, userId, token) => {
    return fetch(`${API}/course/${courseId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //get a course
  
  export const getCourse = courseId => {
    return fetch(`${API}/course/${courseId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //update a course
  
  export const updateCourse = (courseId, userId, token, course) => {
    return fetch(`${API}/course/${courseId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: course
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
