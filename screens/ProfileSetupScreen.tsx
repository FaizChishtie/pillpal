import * as React from 'react';
import {Image, StyleSheet, View, Text, Keyboard} from 'react-native';
import DatePicker from 'react-native-datepicker';
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
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    firstNameTouched: boolean,
    lastNameTouched: boolean,
    middleNameTouched: boolean
    dateOfBirthTouched: boolean,
}


class ProfileSetupScreen extends React.Component<Props, State> {
    
    dropDownAlertRef = React.createRef<DropdownAlert>();
    middleNameInputRef = React.createRef<FormTextInput>();
    lastNameInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        firstName: "",
        middleName: "",
        lastName: "",
        firstNameTouched: false,
        lastNameTouched: false,
        middleNameTouched: false,
        dateOfBirthTouched: false,
        dateOfBirth: "",
    };

    handleFirstNameChange = (firstName: string) => {
        this.setState({firstName: firstName});
        this.getFirstNameError();
    }

    handleMiddleNameChange = (middleName: string) => {
        this.setState({middleName: middleName});
        this.getMiddleNameError();
    }

    handleLastNameChange = (lastName: string) => {
        this.setState({lastName: lastName});
        this.getLastNameError();
    }
    
    handleFirstNameSubmitPress = () => {
        if(this.middleNameInputRef.current) {
            this.middleNameInputRef.current.focus();
        }
        this.getFirstNameError();
    }

    handleMiddleNameSubmitPress = () => {
        if(this.lastNameInputRef.current) {
            this.lastNameInputRef.current.focus();
        }
        this.getLastNameError();
    }

    handleFirstNameBlur = () => {
        this.setState({firstNameTouched: true});
    };

    handleMiddleNameBlur = () => {
        this.setState({middleNameTouched: true});
    }

    handleLastNameBlur = () => {
        this.setState({lastNameTouched: true});
    }

    handleCompletePress = () => {
        this.props.navigation.navigate('Home', {user: hardCodedUser});
    }

    getFirstNameError = () => {
        if (this.state.firstNameTouched) {
            if (!this.state.firstName) {
                return Utils.errorMessage('emptyName');
            }
            if (!Utils.validateName(this.state.firstName)) {
                return Utils.errorMessage('invalidNameFormat');
            }
        }
    }

    getLastNameError = () => {
        if (this.state.lastNameTouched) {
            if (!this.state.lastName) {
                return Utils.errorMessage('emptyName');
            }
            if (!Utils.validateName(this.state.lastName)) {
                return Utils.errorMessage('invalidNameFormat');
            }
        }
    }

    getMiddleNameError = () => {
        if (this.state.middleName) {
            if (!Utils.validateName(this.state.middleName)) {
                return Utils.errorMessage('invalidNameFormat');
            }
        }
    }

    getDateOfBirthError = () => {
        return !this.state.dateOfBirth;
    }

    validateIfMiddleName = () => {
        return this.state.middleName ? !Utils.validateName(this.state.middleName) : false 
    }

    render() {
        const firstNameError = this.getFirstNameError();
        const lastNameError = this.getLastNameError();
        const middleNameError = this.getMiddleNameError();

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
                <Text style={styles.splashtext}>Before we begin, tell us a bit about yourself!</Text>
                <View style={styles.form}>

                <Image source={require('../assets/images/dp.png')} style={{
                        width: '20%',
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginBottom: -200,
                        marginTop: -100
                    }} />
                    <Text style={styles.small}>
                                <Text style={{fontWeight: "bold"}}
                                    onPress={() => this.dropDownAlertRef.alertWithType('success', 'Success!', 'Profile picture uploaded.')}>
                                        Add a profile picture{'\n\n'}
                    </Text>
                    </Text>
                    <FormTextInput
                        value={this.state.firstName}
                        onChangeText={this.handleFirstNameChange}
                        placeholder={'First name'}
                        onSubmitEditing={this.handleFirstNameSubmitPress}
                        autoCorrect={false}
                        returnKeyType="next"
                        onBlur={this.handleFirstNameBlur}
                        error={firstNameError}
                    />
                    <FormTextInput
                        ref={this.middleNameInputRef}
                        value={this.state.middleName}
                        onChangeText={this.handleMiddleNameChange}
                        onSubmitEditing={this.handleMiddleNameSubmitPress}
                        placeholder={'Middle name (optional)'}
                        returnKeyType="next"
                        onBlur={this.handleMiddleNameBlur}
                        error={middleNameError}
                    />
                    <FormTextInput
                        ref={this.lastNameInputRef}
                        value={this.state.lastName}
                        onChangeText={this.handleLastNameChange}
                        placeholder={'Last name'}
                        returnKeyType="done"
                        onBlur={this.handleLastNameBlur}
                        error={lastNameError}
                    />
                    <DatePicker
                        style={{width: 200, alignSelf:'center'}}
                        date={this.state.dateOfBirth}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        maxDate="2000-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({dateOfBirth: date})}}
                    />
                    <Text style={styles.small}>{'\n\n'}Want to do this later?{' '} 
                        <Text style={{fontWeight: "bold"}}
                            onPress={() =>  this.props.navigation.navigate('Home', {}) }>
                                Skip this step.{'\n\n'}
                        </Text>
                    </Text>
                <Button 
                    label={'Complete Profile'} 
                    onPress={this.handleCompletePress}
                    disabled={!this.state.firstName || !this.state.lastName || !Utils.validateName(this.state.lastName) || !Utils.validateName(this.state.firstName) || this.validateIfMiddleName() || this.getDateOfBirthError() }
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

export default ProfileSetupScreen;