window.onload = () => {
  const isLoggedIn = window.localStorage.getItem('username');

  // Fake verify user
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  if (window.location.href.includes('login.html')) {
    window.location.href = 'dashboard.html';
  }

  return;
};
