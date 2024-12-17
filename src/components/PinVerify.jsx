import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';
import Inputput from './shared/Inputput';
import Button from './shared/Button';
import logo from './shared/logo.png';
import { useNavigate } from 'react-router-dom';
import { verifyPin } from '../services/PinverifyService';


const validationSchema = Yup.object({
    pin: Yup.string()
        .matches(/^[0-9]{4,6}$/, 'PIN must be 4-6 digits')
        .required('PIN is required'),
});

const PinVerify = () => {
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    const formik = useFormik({
        initialValues: {
            pin: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            // const token = localStorage.getItem('token');
            

            try {
         
                const token = localStorage.getItem('token');
                console.log('Token:', localStorage.getItem('token'));
               
                const response = await verifyPin(
                    token, 
                   '9447129862', 
                    values.pin,
                   '2412341234123', 
                )
                navigate('/home');  
                console.log('PIN Verification Response:', response);
                console.log('Response status:', response.status);
                if (response.status === 'success') {
                
console.log(navigate,"mavigte")
                    navigate('/home');  
                    // window.location.reload();
                } else {
                    
                    setErrors({ general: 'PIN verification failed. Please check your PIN.' });
                }
            } catch (error) {
                console.error('PIN verification failed:', error.message);
                setErrors({ general: 'PIN verification failed. Please check your PIN or try again later.' });
            }
            setSubmitting(false);
        },
    });

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <div className="logo">
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
                <Inputput formik={formik} name="pin" label="PIN" type="text" />
                {formik.errors.general && (
                    <div className="error-message">
                        <p>{formik.errors.general}</p>
                    </div>
                )}
                <Button
                    label="Verify"
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

export default PinVerify;
