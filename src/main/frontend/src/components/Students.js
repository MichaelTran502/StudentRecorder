import React from 'react';

const Students = ({students}) => {

  // Return all student details

  return (
    <div>
      {students.map(student => 
        <div key={student.studentId}>
          {student.firstName}
        </div>
        )}
    
    </div>
  )
}

export default Students;