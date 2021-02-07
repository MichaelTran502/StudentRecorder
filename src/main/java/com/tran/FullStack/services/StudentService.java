package com.tran.FullStack.services;

import com.tran.FullStack.dao.StudentServiceDao;
import com.tran.FullStack.exceptions.ApiRequestException;
import com.tran.FullStack.models.Student;
import com.tran.FullStack.validators.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentServiceDao studentServiceDao;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentServiceDao studentServiceDao, EmailValidator emailValidator) {
        this.studentServiceDao = studentServiceDao;
        this.emailValidator = emailValidator;
    }

    public List<Student> getAllStudents() {
        return studentServiceDao.selectAllStudents();
    }

    public void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    public void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        if (!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is not a valid email");
        }

        studentServiceDao.insertNewStudent(newStudentId, student);
    }

    public void deleteStudent(UUID studentId) {
        studentServiceDao.deleteStudentById(studentId);
    }

    public void updateStudent(UUID studentId, Student student) {

        // check valid email
        Optional.ofNullable(student.getEmail())
                .ifPresent(email -> {
                    boolean taken = studentServiceDao.selectExistsEmail(email);

                    if (!taken) {
                        studentServiceDao.updateEmail(studentId, email);
                    } else {
                        throw new IllegalStateException("Email already in use: " + student.getEmail());
                    }
                });

        // check valid fist name
        Optional.ofNullable(student.getFirstName())
                .ifPresent(firstName -> {
                    studentServiceDao.updateFirstName(studentId, firstName);
                });
        // check valid last name
        Optional.ofNullable(student.getLastName())
                .ifPresent(lastName -> {
                    studentServiceDao.updateLastName(studentId, lastName);
                });


    }
}
