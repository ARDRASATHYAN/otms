import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Inputput from './shared/Inputput';
import Button from './shared/Button';


const validationSchema = Yup.object({
  oldpin: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  newpin: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const ValidatPin = () => {
  const navigate = useNavigate();

 
  const formik = useFormik({
    initialValues: {
      oldpin: '',
      newpin: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/bank/chpin`,
          {
            mobile: '9447129862',
            oldpin: values.oldpin,
            newpin: values.newpin,
            DeviceId: '2412341234123',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        console.log('Signin successful:', response);
        setSubmitting(false);

       
       
      } catch (error) {
        console.error('Signin failed:', error.response?.data || error.message);
        setErrors({ general: 'Signin failed. Please check your credentials.' });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container" style={{display:"flex",justifyContent:"center"}} >
      <form className="login-form" onSubmit={formik.handleSubmit}>
        {/* <div className="logo">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '70px',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div> */}
        <div className="login-heading">
          <h5 className="login-title">CHANGE PIN</h5>
        </div>

        <Inputput formik={formik} name="oldpin" label="Old PIN" type="password" />
        <Inputput formik={formik} name="newpin" label="New PIN" type="password" />

        {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}

        <Button
          label="submit"
          type="submit"
          disabled={formik.isSubmitting}
          className="button"
        />

        <p className="company-name">
          &copy; Maxence Infotech Private Limited
        </p>
      </form>
      </div>
   
  );
};

export default ValidatPin;
