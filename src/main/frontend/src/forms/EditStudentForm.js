import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';


const inputBottomMargin = { marginBottom: '10px'};
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const EditStudentForm = ({selectedStudent, submitter}) => {
  return (
    <div>
     <Formik
       initialValues={selectedStudent}
       validate={values => {
         const errors = {};

         if (!values.firstName) {
           errors.firstName = 'First Name Required';
         }

         if (!values.lastName) {
          errors.lastName = 'Last Name Required';
        }

         if (!values.email) {
           errors.email = 'Email Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }

         return errors;
       }}
       onSubmit={(student, { setSubmitting }) => {
          console.log(student);
          submitter(student)
          setSubmitting(false);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         submitForm,
         isValid
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <Input
             name="firstName"
             onChange={handleChange}
             onBlur={handleBlur}
             style={inputBottomMargin}
             value={values.firstName}
           />
           {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
           <Input
             name="lastName"
             onChange={handleChange}
             onBlur={handleBlur}
             style={inputBottomMargin}
             value={values.lastName}
           />
           {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}

           <Input
             name="email"
             type="email"
             onChange={handleChange}
             onBlur={handleBlur}
             style={inputBottomMargin}
             value={values.email}
           />
           {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}

           <Button
            onClick={() => submitForm()} 
            type="submit" 
            disabled={isSubmitting | (touched && !isValid)}>
             Submit
           </Button>
         </form>
       )}
     </Formik>
   </div>
  )
}

export default EditStudentForm;