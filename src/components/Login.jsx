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

const LoginPage = ({setToken}) => {
    const navigate = useNavigate();

    

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            
            try {
                const { access_token: token, expires_in,refresh_token, bid, bankname, username } = await login(values);
                const expirationTime = Date.now() + expires_in * 1000;
                // Store token and other details in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('bid', bid);
                localStorage.setItem('bankname', bankname);
                localStorage.setItem('tokenExpiration', expirationTime);

             console.log(token);
             setToken(token)

                
                console.log('Signin successful:', { token,refresh_token, expires_in, bid, bankname, username });
                navigate('/pin');
                setSubmitting(false);
                
            } catch (error) {
                console.error('Signin failed:', error);
                setErrors({ general: 'Signin failed. Please check your credentials.' });
                setSubmitting(false);
            }
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
