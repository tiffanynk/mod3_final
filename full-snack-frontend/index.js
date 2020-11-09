const baseURL = 'http://localhost:3000'
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`

const register = document.querySelector('.register');
const login = document.querySelector('.login');

register.addEventListener('submit', createNewUser);
login.addEventListener('submit', loginUser);

function createNewUser(event) {
    event.preventDefault()

    const registrationFormData = new FormData(event.target);
    const username = registrationFormData.get('username');
    const password = registrationFormData.get('password');

    const newUser = {username, password}

    fetch(usersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (response.status >= 400) throw new Error ('Something went wrong!')

        window.location.href = ''
    })
    .catch(error => console.error(error.message));

    event.target.reset()
}

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
    .then(user => console.log(user));

    event.target.reset()
}