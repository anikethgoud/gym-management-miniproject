// public/js/schedule.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Schedule JavaScript loaded');

    // Initialize class booking buttons
    const bookingButtons = document.querySelectorAll('.book-class');
    if (bookingButtons.length) {
        bookingButtons.forEach(button => {
            button.addEventListener('click', handleClassBooking);
        });
    }

    // Load available classes on page load
    loadClasses();
});

// Function to load available classes
async function loadClasses() {
    try {
        const response = await fetch('/api/classes');
        const classes = await response.json();
        const classesContainer = document.querySelector('#classes-container');
        
        // Populate the classes container with class information
        classesContainer.innerHTML = classes.map(classInfo => `
            <div class="class" data-class-name="${classInfo.name}" data-class-time="${classInfo.time}" data-trainer="${classInfo.trainer}">
                <h4>${classInfo.name}</h4>
                <p>Time: ${classInfo.time}</p>
                <p>Trainer: ${classInfo.trainer}</p>
                <button class="book-class">Book Class</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading classes:', error);
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
