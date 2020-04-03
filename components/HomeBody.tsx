import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from './Button';
import TopProfile from './TopProfile';

type Props = {
    hasMedication: boolean,
    medication: any,
    name: string,
    date: string,
};

class HomeBody extends React.Component<Props> {

    handleAddCarePartnerPressed = () => {
        console.log('carepartner')
    }

    handleAddMedicationPressed = () => {
        console.log('medication')
    }

    hasMedication = () => {
        if (this.props.hasMedication) {

        } else {
            return (
                <View>
                    <Text style={styles.splashtext}>Let's get started{'\n'}</Text>
                    <View style={styles.form}>
                        <Text style={[styles.small, {textAlign: 'center'}]}> Add drugs to begin tracking intake or add a care partner get your community involved.{'\n'}</Text>
                        <Button 
                        label={'Add Medication'} 
                        onPress={this.handleAddMedicationPressed}
                        />
                        <Text style={[styles.small, {color: 'gray', paddingBottom: 10}]}> OR </Text>
                        <Button 
                        label={'Add Care Partner'} 
                        onPress={this.handleAddCarePartnerPressed}
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
                    <TopProfile name={this.props.name} date={this.props.date}/>
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
        marginTop:50,
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

export default HomeBody;