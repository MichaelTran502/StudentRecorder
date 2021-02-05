import React, { Fragment } from 'react';
import { Table, Avatar, Popconfirm, Button } from 'antd';

const Students = ({students, deleteStudent}) => {

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
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Fragment>
          <Popconfirm
            placement='topRight'
            title={`Are you sure you want to delete ${record.studentId}`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteStudent(record.studentId)}
            onCancel={e => e.stopPropagation()}
          >
            <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
          </Popconfirm>
          <Button style={{marginLeft: '5px'}} type='primary'>Edit</Button>
        </Fragment>
      )
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
      />
    </div>
  )
}

export default Students;