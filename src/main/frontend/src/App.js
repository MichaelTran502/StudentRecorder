import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllStudents, deleteStudentFromServer, updateStudent } from './services/students';
import Students from './components/Students'
import Footer from './components/Footer';
import { Modal } from 'antd';
import AddStudentForm from './forms/AddStudentForm';
import EditStudentForm from './forms/EditStudentForm';
import { successNotification, errorNotification } from './components/Notification';

const App = () => {

  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Edit Student modal handlers
  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  // Add Student handlers
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

  const deleteStudent = (studentId) => {
    deleteStudentFromServer(studentId)
      .then(() => {
        successNotification('Student deleted', `${studentId} deleted`)
        rerender();
      })
      .catch(error => {
        errorNotification(`${error.error.status}`, `${error.error.message}`)
      })

  }

  const updateStudentFormSubmitter = (student) => {
    updateStudent(student.studentId, student)
      .then(() => {
        successNotification('Student updated', `${student.studentId} updated`)
        rerender();
        handleEditOk();
      }).catch(error => {
        errorNotification(`${error.error.status}`, `${error.error.message}`)
      })
  }

  const editStudent = (student) => {
    showEditModal();
    setSelectedStudent(student);
  }

  return (
    <div className="App">
      <h1>React App</h1>
      <Students students={students} deleteStudent={deleteStudent} editStudent={editStudent}/>
      <Modal title="Add New Student" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AddStudentForm onSuccess={() => {handleCancel(); rerender();}}/>
      </Modal>

      <Modal title='Edit Student' visible={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
        <EditStudentForm selectedStudent={selectedStudent} submitter={updateStudentFormSubmitter}/>
      </Modal>

      <Footer numberOfStudents={students.length} showModal={showModal}/>
    </div>
  );
}

export default App;
