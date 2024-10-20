// src/Users.js
import React, { useState } from 'react';
import './Users.css';

const Users = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // New state for success message

    const validateMobile = (value) => {
        const mobilePattern = /^[6789]\d{9}$/; // Starts with 6, 7, 8, or 9 and has 10 digits

        if (value.length !== 10) {
            setError('Mobile number must be exactly 10 digits long.');
            return false;
        }

        if (!mobilePattern.test(value)) {
            setError('Mobile number must start with 6, 7, 8, or 9.');
            return false;
        }

        setError(''); // Clear error if valid
        return true;
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10 && /^\d*$/.test(value)) { // Allow only numbers and limit length
            setMobile(value);
            validateMobile(value); // Validate on change
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Final validation before submission
        if (!validateMobile(mobile)) {
            return; // Stop form submission if invalid
        }

        const userData = {
            name,
            mobile
        };

        try {
            const response = await fetch('http://localhost:3005/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('User  data submitted successfully:', data);
            setSuccess(true); // Set success state to true
            setName('');
            setMobile('');
            setError('');
        } catch (error) {
            console.error('Error submitting user data:', error);
            setError('Failed to submit. Please try again.'); // Set error message if submission fails
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {!success && <h2>User Registration</h2>} {/* Only display heading if not successful */}
            {!success ? (
                <>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="form-input"
                                placeholder='Enter Your Name'
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Mobile:
                            <input
                                type="tel"
                                value={mobile}
                                onChange={handleMobileChange}
                                required
                                className={`form-input ${error ? 'error-border' : ''}`} // Add error-border class if there's an error
                                maxLength={10}
                                placeholder='Enter Your Mobile Number'
                            />
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Display error message */}
                    <div className='form-submit-container'>
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </>
            ) : (
                <div className="success-message">
                    🎉 Registration Successful! 🎉
                    <div className="firecracker-animation"></div> {/* Firecracker effect */}
                </div>
            )}
        </form>
    );
};

export default Users;