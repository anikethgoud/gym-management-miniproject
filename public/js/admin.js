// public/js/admin.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin JavaScript loaded');

    // Load users and memberships on admin page load
    loadUsers();
    loadMemberships();
});

// Function to load users
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const usersContainer = document.querySelector('#users-container');
        
        // Populate the users container with user information
        usersContainer.innerHTML = users.map(user => `
            <div class="user">
                <h4>${user.name} (${user.email})</h4>
                <button class="delete-user" data-user-id="${user._id}">Delete User</button>
            </div>
        `).join('');

        // Initialize delete user buttons
        const deleteButtons = document.querySelectorAll('.delete-user');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteUser);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Function to load memberships
async function loadMemberships() {
    try {
        const response = await fetch('/api/memberships');
        const memberships = await response.json();
        const membershipsContainer = document.querySelector('#memberships-container');
        
        // Populate the memberships container with membership information
        membershipsContainer.innerHTML = memberships.map(membership => `
            <div class="membership">
                <h4>${membership.type} - $${membership.price}</h4>
                <button class="delete-membership" data-membership-id="${membership._id}">Delete Membership</button>
            </div>
        `).join('');

        // Initialize delete membership buttons
        const deleteButtons = document.querySelectorAll('.delete-membership');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteMembership);
        });
    } catch (error) {
        console.error('Error loading memberships:', error);
    }
}

// Function to handle deleting a user
async function handleDeleteUser(event) {
    const userId = event.target.dataset.userId;

    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message); // Show confirmation
        loadUsers(); // Reload users after deletion
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
    }
}

// Function to handle deleting a membership
async function handleDeleteMembership(event) {
    const membershipId = event.target.dataset.membershipId;

    try {
        const response = await fetch(`/api/memberships/${membershipId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message); // Show confirmation
        loadMemberships(); // Reload memberships after deletion
    } catch (error) {
        console.error('Error deleting membership:', error);
        alert('Failed to delete membership. Please try again.');
    }
}
