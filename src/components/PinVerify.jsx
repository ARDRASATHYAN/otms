import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './login.css';


const validationSchema = Yup.object({
    pin: Yup.string()
      .matches(/^[0-9]{4,6}$/, 'PIN must be 4-6 digits') // Example validation for a 4-6 digit PIN
      .required('PIN is required'),
  });
  
const PinVerify = () => {
    // Using Formik for form handling
    const formik = useFormik({
        initialValues: {
            pin: '',
           
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                // Axios request to your API endpoint
                const response = await axios.post('https://fc.maxence.co.in/v1/bank/validatepin', {
                    pin: values.pin,
                    
                });
                console.log('Signin successful:', response.data);
                setSubmitting(false);
                // You can handle successful login here, e.g., save token or redirect
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
                <div className={`input-container ${formik.values.pin ? 'has-content' : ''}`}>
                    <input
                        type="text"
                        name="pin"
                        value={formik.values.pin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`floating-input mb-2 ${formik.touched.pin && formik.errors.pin ? 'input-error' : ''}`}
                    />
                    <label className="floating-label">Phone Number</label>
                    {formik.touched.pin && formik.errors.pin && (
                        <p className="error-message">{formik.errors.pin}</p>
                    )}
                </div>

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
    )
}


export default PinVerify;