// public/js/profile.js

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Profile JavaScript loaded');

  // Load user profile on profile page
  loadUserProfile();
});

// Function to load user profile
async function loadUserProfile() {
  try {
      const response = await fetch('/api/profile');
      const userProfile = await response.json();
      document.querySelector('#profile-container').innerHTML = `
          <h3>Welcome, ${userProfile.name}</h3>
          <p>Email: ${userProfile.email}</p>
          <!-- Additional profile details can be added here -->
          <button id="update-profile-button">Update Profile</button>
      `;
      
      // Add event listener for the update profile button
      const updateProfileButton = document.getElementById('update-profile-button');
      if (updateProfileButton) {
          updateProfileButton.addEventListener('click', () => {
              alert('Profile update functionality to be implemented.');
              // Implement the profile update functionality here
          });
      }
  } catch (error) {
      console.error('Error loading profile:', error);
  }
}
