package com.tran.FullStack.dao;

import com.tran.FullStack.models.Student;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentServiceDao {

    public List<Student> selectAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(),
                        "James",
                        "Bond",
                        "jamesbond@gmail.com",
                        Student.Gender.MALE),
                new Student(UUID.randomUUID(),
                        "Elisa",
                        "Tamara",
                        "elisatamara@gmail.com",
                        Student.Gender.FEMALE)
        );
    }
}
