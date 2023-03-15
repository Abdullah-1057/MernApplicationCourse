
export const getAssesment = () => {
  return fetch(`http://localhost:8000/api/assesments`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const EnterAssesment = (userId, token, course) => {
  console.log(userId,token,course)
  return fetch(`http://localhost:8000/api/assesmentAns/create/${userId}`, {
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
