import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AvatarAndName from './AvatarAndName';
import Button from './Button';

type Props = {
    name: string,
    date: string,
    renderHello: boolean
};

class TopProfile extends React.Component<Props> {

    renderHello = () => {
        if (this.props.renderHello) {
            return (
            <View>
                <Text style={styles.splashtext}>Hello!</Text>
                <Text style={[styles.small, {color: 'gray', paddingBottom: 10}]}> {this.props.date} </Text>
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.5,
                    }}/>
            </View>    
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: '90%'}}>
                    <AvatarAndName name={this.props.name}/>
                    {this.renderHello()}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    splashtext: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold",
        marginTop:20,
        textAlign: 'left'
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
        textAlign:'left',
    },
    form: {
        justifyContent: 'center',
        alignSelf: 'center'
    }
});

export default TopProfile;