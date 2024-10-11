// profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data from server
    fetch('/api/profile')
      .then(response => {
        if (!response.ok) {
          throw new Error('User not logged in');
        }
        return response.json();
      })
      .then(data => {
        // Populate user details
        document.getElementById('user-name').innerText = data.name;
        document.getElementById('user-email').innerText = data.email;
  
        // Populate booked classes
        const bookedClassesList = document.getElementById('booked-classes');
        data.bookedClasses.forEach(classInfo => {
          const li = document.createElement('li');
          li.innerText = `${classInfo.className} - ${classInfo.time} with ${classInfo.trainer}`;
          bookedClassesList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        alert('You need to log in to view your profile.');
        window.location.href = '/login.html'; // Redirect to login if not logged in
      });
  });
  