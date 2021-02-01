import React from 'react';
import { Table, Avatar } from 'antd';

const Students = ({students}) => {

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (text, student) => (
        <Avatar size='large'>
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
        </Avatar>
      )
    },
    {
      title: 'Student Id',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    }
  ];
  

  return (
    <div>
      <Table 
      dataSource={students} 
      columns={columns} 
      rowKey='studentId'
      pagination={false}
      style = {{width: '1400px', margin: '0 auto'}}
      />;
    
    </div>
  )
}

export default Students;