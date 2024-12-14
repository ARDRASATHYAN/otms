import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Inputput from './shared/Inputput';
import Button from './shared/Button';
import logo from './shared/logo.png';
import { login } from '../services/LoginService';


const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginPage = () => {
    const navigate = useNavigate();

    const clearLocalStorage = () => {
        localStorage.clear();
        console.log('All local storage data has been cleared.');
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            clearLocalStorage();
            try {
                const { access_token: token, expires_in: expiresIn, bid, bankname, username } = await login(values);

                // Store token and other details in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('bid', bid);
                localStorage.setItem('bankname', bankname);

                // Calculate expiration time
                const expirationTime = Date.now() + expiresIn * 1000;
                localStorage.setItem('tokenExpiration', expirationTime);

                
                console.log('Signin successful:', { token, expiresIn, bid, bankname, username });
                navigate('/pin');
                setSubmitting(false);
                
            } catch (error) {
                console.error('Signin failed:', error);
                setErrors({ general: 'Signin failed. Please check your credentials.' });
                setSubmitting(false);
            }
        },
    });
// Optional: Use useEffect to handle token expiration
useEffect(() => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (expirationTime && Date.now() >= expirationTime) {
        clearLocalStorage();
        navigate('/'); // Navigate to the login page if the token is expired
    }
}, [navigate]);

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
