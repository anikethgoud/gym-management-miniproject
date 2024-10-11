// public/js/login.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Login JavaScript loaded');

    // Initialize the login form submission handler
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Function to handle user login
async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = '/profile.html'; // Redirect to profile
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please try again.');
    }
}
