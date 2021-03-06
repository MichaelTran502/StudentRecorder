import fetch from 'unfetch';

const url = '/api/students';


const checkStatus = response => {
  if (response.ok) {
      return response;
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      response.json().then(e => {
          error.error = e;
      });
      return Promise.reject(error);
  }
}

export const getAllStudents = () => {
  return fetch(url).then(checkStatus);
  
}

export const addNewStudent = (student) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })
  .then(checkStatus);
}

export const deleteStudentFromServer = (studentId) => {
  return fetch(`api/students/${studentId}`, {
    method: 'DELETE'
  })
  .then(checkStatus);
}

export const updateStudent = (studentId, student) => {
  return fetch(`api/students/${studentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  })
  .then(checkStatus);
}
