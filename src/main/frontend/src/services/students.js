import axios from 'axios';

const url = '/api/students';

const getAllStudents = () => {
  const request = axios.get(url);
  return request.then(response => response.data);
}

export default { getAllStudents }