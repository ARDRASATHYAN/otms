import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Inputput from './shared/Inputput';
import Button from './shared/Button';
import logo from './shared/logo.png';

// Define Yup validation schema
const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginPage = () => {
    const navigate = useNavigate()
    // Using Formik for form handling
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {

                const response = await axios.post('https://fc.maxence.co.in/v1/token', new URLSearchParams({
                    grant_type: "password",
                    client_id: "XXXDDDDDDFGSDFGDFGSD7",
                    user_type: "B",
                    username: values.username,
                    password: values.password
                }).toString(),
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });

                const token = response.data.access_token;
                localStorage.setItem('token', token);
                console.log('Signin successful:', response.data);
                navigate('/pin')
                setSubmitting(false);

            } catch (error) {
                console.error('Signin failed:', error.response?.data || error.message);
                setErrors({ general: 'Signin failed. Please check your credentials.' });
                setSubmitting(false);
            }
        },
    });



    return (
        <div className="login-container">
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <div className=" logo">

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

                </div>
                <div className="login-heading">
                    <h5 className="login-title">Login to OTMS</h5>
                </div>


                <Inputput formik={formik} name="username" label="Username" type="text" />

                <Inputput formik={formik} name="password" label="Password" type="password" />

                {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}

             
                <Button
                    label="Login"
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

export default LoginPage;
