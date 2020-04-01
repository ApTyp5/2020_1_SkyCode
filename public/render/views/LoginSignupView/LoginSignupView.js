import Component from '../../Component.js';
import LoginField from '../../blocks/loginField/LoginField.js';
import SignupField from '../../blocks/signupField/SignupField.js';
import Header from '../../blocks/header/Header.js';


export default class LoginSignupView extends Component {
    constructor() {
        super('log');
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            LoginField: new LoginField({
                classes: 'login-signup__login',
            }),
            SignupField: new SignupField({
                classes: 'login-signup__signup',
            }),
        });
    }
}