import { API } from "../../backend";

export const getCourses = () => {
  return fetch(`http://localhost:8000/api/courses`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
