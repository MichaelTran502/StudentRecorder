import React, { useState, useEffect } from 'react';
import './App.css';
import studentService from './services/students';
import Students from './components/Students'
import Footer from './components/Footer';
import { Modal } from 'antd';
import AddStudentForm from './forms/AddStudentForm';

const App = () => {

  const [students, setStudents] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      <Modal title="Add New Student" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AddStudentForm />
      </Modal>
      <Footer numberOfStudents={students.length} showModal={showModal}/>
    </div>
  );
}

export default App;
