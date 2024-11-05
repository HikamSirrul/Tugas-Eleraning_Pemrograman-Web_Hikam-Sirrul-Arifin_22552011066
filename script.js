
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === regUsername || user.email === regEmail);
    if (userExists) {
        alert('Username or email already exists. Please choose another.');
        return;
    }

    users.push({ username: regUsername, email: regEmail, password: regPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert(`User registered: ${regUsername}`);
    window.location.href = 'login.html'; 
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        const loginDate = new Date().toLocaleString(); // Mendapatkan tanggal dan waktu login
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email,
            loginDate: loginDate
        }));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

function displayUserInfo() {
    const userInfoElement = document.getElementById('userInfo');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && userInfoElement) {
        userInfoElement.innerHTML = `
            <h2>Welcome, ${currentUser.username}!</h2>
            <p><strong>Username:</strong> ${currentUser.username}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Last Login:</strong> ${currentUser.loginDate}</p>
        `;
    }
}

window.onload = function() {
    displayUserInfo();
};

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}