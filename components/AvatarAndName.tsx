import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Button from './Button';

type Props = {
    name: string,
};

class TopProfile extends React.Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={require('../assets/images/pp.png')} style={{
                            width: '50%',
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }} />
                    <Text style={styles.splashtext}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop:80,
        alignSelf: 'center'
    },
    splashtext: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'left'
    },
});

export default TopProfile;