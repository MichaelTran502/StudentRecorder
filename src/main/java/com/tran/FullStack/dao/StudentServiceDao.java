package com.tran.FullStack.dao;

import com.tran.FullStack.models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentServiceDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentServiceDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = "" +
                "SELECT " +
                "student_id, " +
                "first_name, " +
                "last_name, " +
                "email, " +
                "gender " +
                "FROM student";
        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String first_name = resultSet.getString("first_name");
            String last_name = resultSet.getString("last_name");
            String email = resultSet.getString("email");

            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(
                    studentId,
                    first_name,
                    last_name,
                    email,
                    gender
            );
        };
    }

    public int insertNewStudent(UUID studentId, Student student) {
        String sql = "" +
                "INSERT INTO STUDENT (" +
                "student_id, " +
                "first_name, " +
                "last_name, " +
                "email, " +
                "gender) " +
                "VALUES (?, ?, ?, ?, ?)";

        return jdbcTemplate.update(
                sql,
                studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase()
        );
    }

    public int deleteStudentById(UUID studentId) {
        String sql = "" +
                "DELETE from student " +
                "where student_id = ?";

        return jdbcTemplate.update(sql, studentId);
    }

    public boolean selectExistsEmail(String email, UUID studentId) {
        String sql = "" +
                "SELECT COUNT(*) FROM " +
                "student " +
                "WHERE student_id <> ? " +
                "AND email = ?";

        int count = 0;

        try {
            count = jdbcTemplate.queryForObject(
                    sql,
                    Integer.class,
                    studentId,
                    email
            );
        } catch(DataAccessException e) {
            System.out.println(e);
        }
        boolean exists = count > 0;

        return exists;
    }

    public int updateEmail(UUID studentId, String email) {
        String sql = "" +
                "UPDATE student " +
                "SET email = ? " +
                "WHERE student_id = ?";

        return jdbcTemplate.update(sql, email, studentId);

    }

    public int updateFirstName(UUID studentId, String firstName) {
        String sql = "" +
                "UPDATE student " +
                "SET first_name = ? " +
                "WHERE student_id = ?";

        return jdbcTemplate.update(sql, firstName, studentId);
    }

    public int updateLastName(UUID studentId, String lastName) {
        String sql = "" +
                "UPDATE student " +
                "SET last_name = ? " +
                "WHERE student_id = ?";

        return jdbcTemplate.update(sql, lastName, studentId);
    }
}
