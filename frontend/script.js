const formTitle = document.getElementById('form-title');
const toggleForm = document.getElementById('toggle-form');
const submitBtn = document.getElementById('submit-btn');
const authForm = document.getElementById('auth-form');

let isLogin = true;

toggleForm.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Register';
  submitBtn.textContent = isLogin ? 'Login' : 'Register';
  toggleForm.textContent = isLogin ? 'Register' : 'Login';
  document.getElementById('switch-msg').innerHTML = isLogin
    ? `Don't have an account? <span id="toggle-form">Register</span>`
    : `Already have an account? <span id="toggle-form">Login</span>`;
});

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message || 'Success');
  } catch (err) {
    alert('Error occurred');
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
  
    // REGISTER
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const data = await res.json();
        alert(data.message || 'Registration complete!');
      } catch (err) {
        alert('Registration failed');
        console.error(err);
      }
    });
  
    // LOGIN
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const data = await res.json();
  
        if (data.token) {
          alert('Login successful!');
          localStorage.setItem('token', data.token); // Save token for later use
          // Redirect or load another page here if needed
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Login error');
        console.error(err);
      }
    });
  });