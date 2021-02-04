package com.tran.FullStack.services;

import com.tran.FullStack.dao.StudentServiceDao;
import com.tran.FullStack.models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentServiceDao studentServiceDao;

    @Autowired
    public StudentService(StudentServiceDao studentServiceDao) {
        this.studentServiceDao = studentServiceDao;
    }

    public List<Student> getAllStudents() {
        return studentServiceDao.selectAllStudents();
    }

    public void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    public void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        studentServiceDao.insertNewStudent(newStudentId, student);
    }
}
