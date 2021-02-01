import React, { useState, useEffect } from 'react';
import './App.css';
import studentService from './services/students';
import Students from './components/Students'

const App = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    studentService.getAllStudents()
      .then(returnedStudents => {
        console.log(returnedStudents)
        setStudents(returnedStudents);
      })
  }, [])

  return (
    <div className="App">
      <h1>React App</h1>
      <Students students={students}/>
    </div>
  );
}

export default App;
