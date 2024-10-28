import React from 'react';



const Inputput = ({ formik, name, label, type = 'text' }) => {
    return (
        <div className={`input-container ${formik.values[name] ? 'has-content' : ''}`}>
            <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
            
                onBlur={formik.handleBlur}
                className={`floating-input mb-2 ${formik.touched[name] && formik.errors[name] ? 'input-error' : ''}`}
            />
            <label className="floating-label">{label}</label>
            {formik.touched[name] && formik.errors[name] && (
                <p className="error-message">{formik.errors[name]}</p>
            )}
        </div>
    );
};



export default Inputput;