import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';

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
    // Using Formik for form handling
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
             
                const response = await axios.get('https://fc.maxence.co.in/v1/token', {
                    grant_type:"password",
                    client_id:"XXXDDDDDDFGSDFGDFGSD7",
                    user_type:"B",
                    username: values.username,
                    password: values.password
                });
                const token = response.data.access_token; 
                localStorage.setItem('token', token); 
                console.log('Signin successful:', response.data);
                setSubmitting(false);
                
            } catch (error) {
                console.error('Signin failed:', error.response?.data || error.message);
                setErrors({ general: 'Signin failed. Please check your credentials.' });
                setSubmitting(false);
            }
        },
    });

    // Create ripple effect for button
    const createRipple = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const size = Math.max(button.clientWidth, button.clientHeight);
        ripple.style.width = ripple.style.height = `${size}px`;

        const rect = button.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <div className="MuiBox-root css-1wcjc1k">
                    <span style={{
                        boxSizing: 'border-box',
                        display: 'inline-block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: 'relative',
                        maxWidth: '100%'
                    }}>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                margin: '0 auto',
                            }}
                        />
                    </span>
                </div>
                <div className="MuiBox-root css-1pter2">
                    <h5 className="MuiTypography-root MuiTypography-h5 css-1gsao8">Login to OTMS</h5>
                </div>

                {/* Username input */}
                <div className={`input-container ${formik.values.username ? 'has-content' : ''}`}>
                    <input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`floating-input mb-2 ${formik.touched.username && formik.errors.username ? 'input-error' : ''}`}
                    />
                    <label className="floating-label">username</label>
                    {formik.touched.username && formik.errors.username && (
                        <p className="error-message">{formik.errors.username}</p>
                    )}
                </div>

                {/* Password input */}
                <div className={`input-container ${formik.values.password ? 'has-content' : ''}`}>
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`floating-input mb-2 ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                    />
                    <label className="floating-label">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="error-message">{formik.errors.password}</p>
                    )}
                </div>

                {/* General form error */}
                {formik.errors.general && <p className="error-message">{formik.errors.general}</p>}

                {/* Submit button */}
                <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-yy14r3"
                    type="submit"
                    onClick={(e) => createRipple(e)}
                    disabled={formik.isSubmitting}
                >
                    Login
                </button>

                <p className="MuiTypography-root MuiTypography-body1 css-1mz1i7d">
                    &copy; Maxence Infotech Private Limited
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
