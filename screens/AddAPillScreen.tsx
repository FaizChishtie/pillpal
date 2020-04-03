import * as React from 'react';
import {Image, StyleSheet, View, Text, Keyboard} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import DropdownAlert from 'react-native-dropdownalert';

import Utils from '../utils/utils';

interface Props {
    navigation: {
      navigate: (arg0: string, arg1: {} ) => {}
    }
  }

interface State {
    name: string,
    description: string,
    nameTouched: boolean,
    descriptionTouched: boolean,
}


class AddAPillScreen extends React.Component<Props, State> {
    
    dropDownAlertRef = React.createRef<DropdownAlert>();
    descriptionInputRef = React.createRef<FormTextInput>();

    readonly state: State = {
        name: "",
        description: "",
        nameTouched: false,
        descriptionTouched: false,
    };

    handleNameChange = (name: string) => {
        this.setState({name: name});
        this.getNameError();
    }

    handleDescriptionChange = (description: string) => {
        this.setState({description: description});
    }
    
    handleNameSubmitPress = () => {
        if(this.descriptionInputRef.current) {
            this.descriptionInputRef.current.focus();
        }
        this.getNameError();
    }

    handleNameBlur = () => {
        this.setState({nameTouched: true});
    };

    handleDescriptionBlur = () => {
        this.setState({descriptionTouched: true});
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

    render() {
        const nameError = this.getNameError();

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
                <Text style={styles.splashtext}>Add a Pill</Text>
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
                        ref={this.descriptionInputRef}
                        value={this.state.description}
                        onChangeText={this.handleDescriptionChange}
                        placeholder={'Description (optional)'}
                        returnKeyType="done"
                        onBlur={this.handleDescriptionBlur}
                    />
                <Button 
                    label={'Add Medication'} 
                    onPress={this.handleCompletePress}
                    disabled={!this.state.name || !Utils.validateFullName(this.state.name)}
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

export default AddAPillScreen;