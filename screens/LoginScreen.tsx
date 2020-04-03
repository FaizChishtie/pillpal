import * as React from 'react';
import {Image, StyleSheet, View, Text, Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import DropdownAlert from 'react-native-dropdownalert';

import Utils from '../utils/utils';
import User from '../utils/profile';

const hardCodedUser = new User();

interface Props {
    navigation: {
      navigate: (arg0: string, arg1: {} ) => {}
    }
  }

interface State {
    email: string;
    password: string;
    emailTouched: boolean,
    passwordTouched: boolean,
}


class LoginScreen extends React.Component<Props, State> {
    
    dropDownAlertRef = React.createRef<DropdownAlert>();
    passwordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        email: "",
        password: "",
        emailTouched: false,
        passwordTouched: false,
    };

    handleEmailChange = (email: string) => {
        this.setState({email: email});
        this.getEmailError();
    }
    
    handlePasswordChange = (password: string) => {
        this.setState({password: password});
    }

    handleEmailSubmitPress = () => {
        if(this.passwordInputRef.current) {
            this.passwordInputRef.current.focus();
        }
        this.getEmailError();
    }

    handleEmailBlur = () => {
        this.setState({emailTouched: true});
    };

    handlePasswordBlur = () => {
        this.setState({passwordTouched: true});
    }

    handleLoginPress = () => {
        if (this.state.email != hardCodedUser.email || this.state.password != hardCodedUser.password){
            this.dropDownAlertRef.alertWithType('error', 'Authentication Failed', 'Email and/or password is incorrect.');
            Keyboard.dismiss();
            this.setState({
                email: "",
                password: "",
                emailTouched: false,
                passwordTouched: false,
            });
        } else {
            this.props.navigation.navigate('Home', {user: hardCodedUser});
            this.dropDownAlertRef.alertWithType('success', 'Logged In', 'Welcome back ' + hardCodedUser.name.first + '!');
        }

    }

    getEmailError = () => {
        if (this.state.emailTouched) {
            if (!this.state.email) {
                return Utils.errorMessage('emptyEmail');
            }
            if (!Utils.validateEmail(this.state.email)) {
                return Utils.errorMessage('invalidEmailFormat');
            }
        }
    }

    getPasswordError = () => {
        if (this.state.passwordTouched) {
            if (!this.state.password) {
                return Utils.errorMessage('emptyPassword');
            }
            // if (Utils.validateEmail(this.state.email)) {
            //     return Utils.errorMessage('invalidPasswordFormat');
            // }
        }
    }

    render() {
        const emailError = this.getEmailError();
        const passwordError = this.getPasswordError();

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: 'white' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.splashtext}>PillPal</Text>
                <View style={styles.form}>
                <Text style={styles.login}>Log In{'\n'}</Text>
                    <FormTextInput
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        placeholder={'Email'}
                        onSubmitEditing={this.handleEmailSubmitPress}
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onBlur={this.handleEmailBlur}
                        error={emailError}
                    />
                    <FormTextInput
                        ref={this.passwordInputRef}
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        returnKeyType="done"
                        onBlur={this.handlePasswordBlur}
                        onSubmitEditing={()=> Keyboard.dismiss()}
                        blurOnSubmit={false}
                        error={passwordError}
                    />
                <Text style={styles.small}>Don't have an account yet?{' '} 
                    <Text style={{fontWeight: "bold"}}
                          onPress={() =>  this.props.navigation.navigate('SignUp', {}) }>
                            Sign up.{'\n\n'}
                    </Text>
                </Text>
                <Button 
                    label={'Login'} 
                    onPress={this.handleLoginPress}
                    disabled={!this.state.email || !Utils.validateEmail(this.state.email) || !this.state.password}
                />
                </View>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        flex: 1,
        width: '40%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    },
    splashtext: {
        color: '#66afe7',
        fontSize: 25,
        fontWeight: "bold",
        marginTop: -100,
        marginBottom:2,
    },
    login: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom:2,
    },
    small: {
        color: '#66afe7',
        fontSize: 14,
        marginBottom: 2,
        textAlign:'center',
    }
});

export default LoginScreen;