import React from 'react';


const Button = ({ label, onClick, type = 'button', disabled = false, className }) => {
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
        <>
            <button
                className={`${className}`}
                type={type}
                onClick={(e) => {
                    createRipple(e);
                    onClick && onClick(e);
                }}
                disabled={disabled}
            >
                {label}
            </button>
        </>
    )
}




export default Button;