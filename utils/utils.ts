export default class Utils  {

    static errorMessage = (type) => {
        if (type === 'emptyEmail') {
            return 'Email field must not be empty.';
        }
        if (type === 'emptyPassword') {
            return 'Password field must not be empty.';
        }
        if (type === 'invalidEmailFormat') {
            return 'Email must follow (example@email.com).';
        }
        if (type === 'invalidPasswordFormat') {
            return 'Passwords must contain 7-15 characters with symbols and numbers.';
        } 
        if (type === 'passwordsDontMatch') {
            return 'Passwords do not match.';
        }
        if (type === 'passwordInvalid') {
            return 'Passwords must contain 7-15 characters with symbols and numbers.';
        }
        if (type === 'emptyName') {
            return 'Name must not be empty';
        }
        if (type === 'invalidNameFormat') {
            return 'Name must only consist of characters (no spaces).'
        }
        if (type === 'invalidFullNameFormat') {
            return 'Full name must only contain words and spaces. (Jon Smith)'
        } 
        if (type === 'invalidPhoneNumberFormat') {
            return 'Invalid phone number format.'
        }
        if (type === 'emptyPhone') {
            return 'Phone number field must not be empty.';
        }
        return 'Error';
    };

    static validateEmail = (email) => {
        return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    };

    static validateFullName = (fullName) => {
        return fullName.match(/^[a-zA-Z ]+$/);
    }

    static validatePhoneNumber = (phoneNumber) => {
        return phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    }

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



