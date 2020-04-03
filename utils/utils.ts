export default class Utils  {

    static errorMessage = (type) => {
        if (type == 'emptyEmail') {
            return 'Email field must not be empty.';
        }
        if (type == 'emptyPassword') {
            return 'Password field must not be empty.';
        }
        if (type == 'invalidEmailFormat') {
            return 'Invalid email format.';
        }
        if (type == 'invalidPasswordFormat') {
            return 'Invalid password format.';
        } 
        if (type == 'passwordsDontMatch') {
            return 'Passwords do not match.';
        }
        if (type == 'passwordInvalid') {
            return 'Password is not strong enough.';
        }
        if (type == 'emptyName') {
            return 'Name must not be empty';
        }
        if (type == 'invalidNameFormat') {
            return 'Invalid name format.'
        }
        return 'Error';
    };

    static validateEmail = (email) => {
        return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    };

    static validateName = (name) => {
        return name.match(/^[A-Za-z]+$/);
    };

    static validatePassword = (password) => {
        return password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
    };

    static passwordsMatch = (password, confirmedPassword) => {
        return password == confirmedPassword;
    };

}



