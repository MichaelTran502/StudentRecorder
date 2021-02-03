import React from 'react';
import { Button, Avatar } from 'antd';
import './Footer.css';

const Footer = ({ numberOfStudents, showModal }) => {
  return (
    <div className='footer' style = {{width: '1400px', margin: '0 auto'}}>
      {numberOfStudents ? 
        <Avatar
        style={{backgroundColor: '#f56a00', marginRight: '5px'}}
        size="large">{numberOfStudents}</Avatar> : null}
      <Button type='primary' onClick={showModal}>
        Add new student +
      </Button>
    </div>
  )
}

export default Footer;