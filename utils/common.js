document.addEventListener('DOMContentLoaded', (e) => {
  const menuToggle = document.querySelector('.menu-toggle');
  const model = document.querySelector('.menu-model');
  const sidebar = document.querySelector('.sidebar');
  const userName = document.querySelector('.user-name');

  const username = window.localStorage.getItem('username');

  menuToggle.addEventListener('click', (e) => {
    model.style.display = 'block';
    sidebar.style.display = 'block';
  });

  model.addEventListener('click', (e) => {
    model.style.display = 'none';
    sidebar.style.display = 'none';
  });

  // set name user for header
  userName.textContent = `Welcome ${capitalizeString(username)}`;
});

// Other
const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);
