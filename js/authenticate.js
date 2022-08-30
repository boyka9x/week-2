const user_fake = [{ username: 'john', password: '12345' }];

var parentElement = document.querySelector('#form-login');

// Fake check user existed
parentElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const isValid = user_fake.some((user) => {
    return user.username === username && user.password === password;
  });

  if (isValid) {
    window.localStorage.setItem('username', username);
    location.href = 'dashboard.html';
  } else {
    var formMessage = document.querySelector('.form-message');
    formMessage.innerHTML = 'Incorrect account or password';
  }
});
