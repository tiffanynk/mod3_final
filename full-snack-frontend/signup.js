const baseURL = 'http://localhost:3000';
const usersURL = `${baseURL}/users`;

const register = document.querySelector('.register');
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

register.addEventListener('submit', createNewUser);

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});


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

        window.location.href = 'login.html'
    })
    .catch(error => {
        console.error(error.message)
        const regErrorMessage = document.querySelector('.reg-error-message');

        regErrorMessage.textContent = error.message;
        regErrorMessage.classList.remove('hidden');
    });

    event.target.reset()
}
