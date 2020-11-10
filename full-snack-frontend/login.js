const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`;

const login = document.querySelector('.login');

login.addEventListener('submit', loginUser);


function loginUser(event) {
    event.preventDefault()

    const loginFormData = new FormData(event.target);
    const username = loginFormData.get('username');
    const password = loginFormData.get('password');

    const existingUser = {username, password}

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingUser)
    })
    .then(response => response.json())
    .then(result => {
        if (!result.token) {
            const loginErrorMessage = document.querySelector('.login-error-message');
    
            loginErrorMessage.textContent = result.message;
            loginErrorMessage.classList.remove('hidden');
        } else {
            console.log(result)
            localStorage.setItem('token', result.token)
            window.location.href = '/profile.html'
        }
    })
    .catch(error => {
        console.error(error.message)
        const loginErrorMessage = document.querySelector('.login-error-message');

        loginErrorMessage.textContent = error.message;
        loginErrorMessage.classList.remove('hidden');
    })

    event.target.reset()
}