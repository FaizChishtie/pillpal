export default class User {
    email = "irenewatson@gmail.com";
    password = "irene1";
    name = { 
        first: 'Irene',
        last: 'Watson',
        middle: 'M.',
    };
    prescriptions = [];
    carePartners = [];
    hasMedication = !(this.prescriptions.length === 0);
}
