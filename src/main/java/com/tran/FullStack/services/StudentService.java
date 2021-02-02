package com.tran.FullStack.services;

import com.tran.FullStack.dao.StudentServiceDao;
import com.tran.FullStack.models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
