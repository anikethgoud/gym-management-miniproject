// public/js/register.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Registration JavaScript loaded');

    // Initialize the registration form submission handler
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Function to handle user registration
async function handleRegister(event) {
    event.preventDefault(); // Prevent form submission

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = '/login.html'; // Redirect to login
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
    }
}
