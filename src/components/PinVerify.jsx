import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';
import Inputput from './shared/Inputput';
import Button from './shared/Button';
import logo from './shared/logo.png';

const validationSchema = Yup.object({
    pin: Yup.string()
        .matches(/^[0-9]{4,6}$/, 'PIN must be 4-6 digits')
        .required('PIN is required'),
});

const PinVerify = () => {
    const formik = useFormik({
        initialValues: {
            pin: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const token = localStorage.getItem('token');
            console.log('token', token);


            if (!token) {
                setErrors({ general: 'No token found. Please log in first.' });
                setSubmitting(false);
                return;
            }

            try {
                const response = await axios.post(
                    'https://fc.maxence.co.in/v1/bank/validatepin',
                    new URLSearchParams({
                        mobile: '9447129862',
                        pin: values.pin,
                        DeviceId: '2412341234123',
                    }).toString(),
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                console.log('PIN verification successful:', response.data);
                setSubmitting(false);

            } catch (error) {
                console.error('PIN verification failed:', error.response?.data || error.message);
                setErrors({ general: 'PIN verification failed. Please check your PIN.' });
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
                    <h5 className="login-title">Pin Verify</h5>
                </div>
                <Inputput formik={formik} name="pin" label="pin" type="text" />


                <Button
                    label="verify"
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="button"
                />

                <p className="company-name">
                    &copy; Maxence Infotech Private Limited
                </p>
            </form>
        </div>
    )
}

export default PinVerify;
