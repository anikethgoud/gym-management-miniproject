// public/js/main.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JavaScript loaded');

    // Initialize the login form submission handler
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize the registration form submission handler
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Load user profile on profile page
    const profileContainer = document.querySelector('#profile-container');
    if (profileContainer) {
        loadUserProfile();
    }

    // Initialize class booking buttons on schedule page
    const bookingButtons = document.querySelectorAll('.book-class');
    if (bookingButtons.length) {
        bookingButtons.forEach(button => {
            button.addEventListener('click', handleClassBooking);
        });
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

// Function to load user profile
async function loadUserProfile() {
    try {
        const response = await fetch('/api/profile');
        const userProfile = await response.json();
        document.querySelector('#profile-container').innerHTML = `
            <h3>Welcome, ${userProfile.name}</h3>
            <p>Email: ${userProfile.email}</p>
            <!-- Additional profile details can be added here -->
        `;
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Function to handle class booking
async function handleClassBooking(event) {
    const classElement = event.target.closest('.class');
    const className = classElement.dataset.className;
    const classTime = classElement.dataset.classTime;
    const trainer = classElement.dataset.trainer;

    try {
        const response = await fetch('/api/book-class', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ className, classTime, trainer }),
        });

        const result = await response.json();
        alert(result.message); // Show confirmation
    } catch (error) {
        console.error('Error booking class:', error);
        alert('Failed to book class. Please try again.');
    }
}
