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
    email: string,
    password: string,
    confirmPassword: string,
    emailTouched: boolean,
    passwordTouched: boolean,
    confirmPasswordTouched: boolean,
}


class SignUpScreen extends React.Component<Props, State> {
    
    dropDownAlertRef = React.createRef<DropdownAlert>();
    passwordInputRef = React.createRef<FormTextInput>();
    confirmPasswordInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        email: "",
        password: "",
        confirmPassword: "",
        emailTouched: false,
        passwordTouched: false,
        confirmPasswordTouched: false,
    };

    handleEmailChange = (email: string) => {
        this.setState({email: email});
        this.getEmailError();
    }
    
    handlePasswordChange = (password: string) => {
        this.setState({password: password});
        this.getPasswordError();
    }

    handleConfirmPasswordChange = (confirmPassword: string) => {
        this.setState({confirmPassword: confirmPassword});
        this.getConfirmPasswordError();
    }

    handleEmailSubmitPress = () => {
        if(this.passwordInputRef.current) {
            this.passwordInputRef.current.focus();
        }
        this.getEmailError();
    }

    handlePasswordSubmitPress = () => {
        if(this.confirmPasswordInputRef.current) {
            this.confirmPasswordInputRef.current.focus();
        }
        this.getPasswordError();
    }

    handleEmailBlur = () => {
        this.setState({emailTouched: true});
    };

    handlePasswordBlur = () => {
        this.setState({passwordTouched: true});
    }

    handleConfirmPasswordBlur = () => {
        this.setState({passwordTouched: true});
    }

    handleSignUpPress = () => {
        this.props.navigation.navigate('ProfileSetup', {user: hardCodedUser});
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
            if (Utils.validatePassword(this.state.password)) {
                return Utils.errorMessage('invalidPasswordFormat');
            }
            if (this.state.confirmPasswordTouched) {
                if (!Utils.passwordsMatch(this.state.password, this.state.confirmPassword)) {
                    return Utils.errorMessage('passwordsDontMatch');
                }
            }
        }
    }

    getConfirmPasswordError = () => {
        if (this.state.passwordTouched) {
            if (!this.state.confirmPassword) {
                return Utils.errorMessage('emptyPassword');
            }
            if (Utils.validatePassword(this.state.confirmPassword)) {
                return Utils.errorMessage('invalidPasswordFormat');
            }
            if (this.state.passwordTouched) {
                if (!Utils.passwordsMatch(this.state.password, this.state.confirmPassword)) {
                    return Utils.errorMessage('passwordsDontMatch');
                }
            }
        }
    }

    render() {
        const emailError = this.getEmailError();
        const passwordError = this.getPasswordError();
        const confirmPasswordError = this.getConfirmPasswordError();

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
                <Text style={styles.login}>Sign Up{'\n'}</Text>
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
                        onSubmitEditing={this.handlePasswordSubmitPress}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        returnKeyType="next"
                        onBlur={this.handlePasswordBlur}
                        error={passwordError}
                    />
                    <FormTextInput
                        ref={this.confirmPasswordInputRef}
                        value={this.state.confirmPassword}
                        onChangeText={this.handleConfirmPasswordChange}
                        placeholder={'Confirm Password'}
                        secureTextEntry={true}
                        returnKeyType="done"
                        onBlur={this.handleConfirmPasswordBlur}
                        error={confirmPasswordError}
                    />
                <Text style={styles.small}>Already have an account?{' '} 
                    <Text style={{fontWeight: "bold"}}
                          onPress={() =>  this.props.navigation.navigate('LogIn', {}) }>
                            Log in.{'\n\n'}
                    </Text>
                </Text>
                <Button 
                    label={'Sign Up'} 
                    onPress={this.handleSignUpPress}
                    disabled={!this.state.email || !Utils.validateEmail(this.state.email) || !Utils.passwordsMatch(this.state.password, this.state.confirmPassword) || !this.state.password}
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
        alignSelf: 'center',
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

export default SignUpScreen;