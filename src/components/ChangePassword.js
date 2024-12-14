import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Inputput from './shared/Inputput';
import Button from './shared/Button';
import logo from './shared/logo.png';

//  Yup validation schema
const validationSchema = Yup.object({
  oldpwd: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  newpwd: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const ChangePassword = () => {
  const navigate = useNavigate();

 
  const formik = useFormik({
    initialValues: {
      oldpwd: '',
      newpwd: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const token = localStorage.getItem('token');
      console.log('Submitted values:', values);
      console.log('Token:', token);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/bank/chpwd`,
          {
            mobile: '8943934802',
            oldpwd: values.oldpwd,
            newpwd: values.newpwd,
            DeviceId: '2412341234123',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        console.log('Password change successful:', response);
        setSubmitting(false);

      } catch (error) {
        console.error('Password change failed:', error.response?.data || error.message);
        setErrors({ general: 'Password change failed. Please try again.' });
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
        <h5 className="login-title">Change Password</h5>
      </div>

      <Inputput formik={formik} name="oldpwd" label="Old password" type="password" />
      <Inputput formik={formik} name="newpwd" label="New Password" type="password" />

      {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}

      <Button

        label="Submit"
        type="submit"
        disabled={formik.isSubmitting}
        className="button"
      />

      <p className="company-name">&copy; Maxence Infotech Private Limited</p>
    </form>
    </div>
  );
};

export default ChangePassword;
