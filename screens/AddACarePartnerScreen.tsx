import * as React from 'react';
import {Image, StyleSheet, View, Text, Keyboard} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import DropdownAlert from 'react-native-dropdownalert';

import Utils from '../utils/utils';
import User from '../utils/profile';

interface Props {
    navigation: {
      navigate: (arg0: string, arg1: {} ) => {}
    }
  }

interface State {
    name: string,
    email: string,
    phone: string,
    nameTouched: boolean,
    emailTouched: boolean,
    phoneTouched: boolean
}


class AddACarePartnerScreen extends React.Component<Props, State> {
    
    dropDownAlertRef = React.createRef<DropdownAlert>();
    emailInputRef = React.createRef<FormTextInput>();
    phoneInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        name: "",
        email: "",
        phone: "",
        nameTouched: false,
        emailTouched: false,
        phoneTouched: false,
    };

    handleNameChange = (name: string) => {
        this.setState({name: name});
        this.getNameError();
    }

    handleEmailChange = (email: string) => {
        this.setState({email: email});
        this.getEmailError();
    }

    handlePhoneChanged = (phone: string) => {
        this.setState({phone: phone});
        this.getPhoneNumberError();
    }
    
    handleNameSubmitPress = () => {
        if(this.emailInputRef.current) {
            this.emailInputRef.current.focus();
        }
        this.getNameError();
    }

    handleEmailSubmitPress = () => {
        if(this.phoneInputRef.current) {
            this.phoneInputRef.current.focus();
        }
        this.getEmailError();
    }

    handleNameBlur = () => {
        this.setState({nameTouched: true});
    };

    handleEmailBlur = () => {
        this.setState({emailTouched: true});
    }

    handlePhoneBlur = () => {
        this.setState({phoneTouched: true});
    }

    handleCompletePress = () => {
        this.props.navigation.navigate('Profile', {});
    }

    handleCancelPress = () => {
        this.props.navigation.navigate('Profile', {});
    }

    getNameError = () => {
        if (this.state.nameTouched) {
            if (!this.state.name) {
                return Utils.errorMessage('emptyName');
            }
            if (!Utils.validateFullName(this.state.name)) {
                return Utils.errorMessage('invalidFullNameFormat');
            }
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

    getPhoneNumberError = () => {
        if (this.state.phoneTouched) {
            if (!this.state.phone) {
                return Utils.errorMessage('emptyPhone');
            }
            if (!Utils.validatePhoneNumber(this.state.phone)) {
                return Utils.errorMessage('invalidPhoneNumberFormat');
            }
        }
    }

    render() {
        const nameError = this.getNameError();
        const emailError = this.getEmailError();
        const phoneNumberError = this.getPhoneNumberError();

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: 'white' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <Image source={require('../assets/images/dp.png')} style={{
                        width: '00%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginTop: -320
                    }} />
                <Text style={styles.splashtext}>Add a Care Partner</Text>
                <View style={styles.form}>
                    <FormTextInput
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                        placeholder={'Name'}
                        onSubmitEditing={this.handleNameSubmitPress}
                        autoCorrect={false}
                        returnKeyType="next"
                        onBlur={this.handleNameBlur}
                        error={nameError}
                    />
                    <FormTextInput
                        ref={this.emailInputRef}
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        onSubmitEditing={this.handleEmailSubmitPress}
                        placeholder={'Email'}
                        returnKeyType="next"
                        onBlur={this.handleEmailBlur}
                        error={emailError}
                    />
                    <FormTextInput
                        ref={this.phoneInputRef}
                        value={this.state.phone}
                        onChangeText={this.handlePhoneChanged}
                        placeholder={'Phone number (ex: 4162250322)'}
                        returnKeyType="done"
                        onBlur={this.handlePhoneBlur}
                        error={phoneNumberError}
                    />
                <Button 
                    label={'Add Care Partner'} 
                    onPress={this.handleCompletePress}
                    disabled={!this.state.name || !this.state.email || !this.state.phone || !Utils.validateFullName(this.state.name) || !Utils.validateEmail(this.state.email) || !Utils.validatePhoneNumber(this.state.phone) }
                />
                <Button 
                    label={'Cancel'} 
                    onPress={this.handleCancelPress}
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
        width: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -150,
        width: '80%'
    },
    splashtext: {
        color: 'black',
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

export default AddACarePartnerScreen;