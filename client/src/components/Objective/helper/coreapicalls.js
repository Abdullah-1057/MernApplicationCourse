import { API } from "../../../backend";

export const getMcqs = () => {
  return fetch(`http://localhost:8000/api/mcqs`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
