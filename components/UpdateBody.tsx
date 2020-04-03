import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from './Button';
import TopProfile from './TopProfile';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface Props extends NavigationInjectedProps {
    hasMedication: boolean,
    medication: any,
    name: string,
    date: string,
};

class UpdateBody extends React.Component<Props> {

    handleAddMedicationPressed = () => {
        this.props.navigation.navigate('AddMed', {});
    }

    hasMedication = () => {
        if (this.props.hasMedication) {

        } else {
            return (
                <View>
                    <Text style={styles.splashtext}>Nothing to show yet!{'\n'}</Text>
                    <View style={styles.form}>
                        <Text style={[styles.small, {textAlign: 'center'}]}> Once you begin tracking drugs, we’ll update here with milestones.{'\n'}</Text>
                        <Button 
                        label={'ADD A PILL'} 
                        onPress={this.handleAddMedicationPressed}
                        />
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TopProfile name={this.props.name} date={this.props.date} renderHello={false}/>
                </View>
                {this.hasMedication()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    top: {
        marginTop: -50,
        paddingLeft: 30
    },
    splashtext: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold",
        marginTop:225,
        textAlign: 'center'
    },
    login: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom:2,
    },
    small: {
        color: 'black',
        fontSize: 14,
        marginBottom: 2,
        textAlign:'center',
        alignSelf: 'center',
    },
    form: {
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center'
    }
});

export default withNavigation(UpdateBody);