import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllStudents } from './services/students';
import Students from './components/Students'
import Footer from './components/Footer';
import { Modal } from 'antd';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './components/Notification';

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
  
  const rerender = () => {
    getAllStudents()
      .then(res => res.json())
      .then(students => {
        console.log(students);
        setStudents(students);
      })
      .catch(error => {
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
      })
  }
  useEffect(() => {
    getAllStudents()
      .then(res => res.json())
      .then(students => {
        console.log(students);
        setStudents(students);
      })
      .catch(error => {
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
      })
  }, []);


  return (
    <div className="App">
      <h1>React App</h1>
      <Students students={students}/>
      <Modal title="Add New Student" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AddStudentForm onSuccess={() => {handleCancel(); rerender();}}/>
      </Modal>
      <Footer numberOfStudents={students.length} showModal={showModal}/>
    </div>
  );
}

export default App;
