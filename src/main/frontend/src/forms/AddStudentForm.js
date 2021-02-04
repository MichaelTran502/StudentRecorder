import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../services/students';

const inputBottomMargin = { marginBottom: '10px'};
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddStudentForm = () => {
  return (
    <div>
     <Formik
       initialValues={{ firstName: '', lastName: '', email: '', gender: ''}}
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

         if (!values.gender) {
          errors.gender = 'Gender must be (MALE, male, FEMALE, female)';
        }

         return errors;
       }}
       onSubmit={(student, { setSubmitting }) => {
         addNewStudent(student).then((res) => {
          console.log(JSON.stringify(student));
          setSubmitting(false);
         })
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
             placeholder="First Name e.g Joe"
             style={inputBottomMargin}
             value={values.firstName}
           />
           {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
           <Input
             name="lastName"
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder="Last Name e.g Bloggs"
             style={inputBottomMargin}
             value={values.lastName}
           />
           {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}

           <Input
             name="email"
             type="email"
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder="Email e.g example@gmail.com"
             style={inputBottomMargin}
             value={values.email}
           />
           {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}

           <Input
             name="gender"
             onChange={handleChange}
             onBlur={handleBlur}
             placeholder="Gender e.g (MALE male FEMALE female"
             style={inputBottomMargin}
             value={values.gender}
           />
           {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}

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

export default AddStudentForm;