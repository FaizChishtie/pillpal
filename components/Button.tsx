import * as React from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
    disabled?: boolean;
    label: string;
    onPress: () => void;
}

class Button extends React.Component<Props> {
    render () {
        const  { disabled, label, onPress } = this.props;

        const containerStyle = [
            styles.container,
            disabled ? styles.containerDisabled : styles.containerEnabled
        ]

        return (
            <TouchableOpacity
                style={containerStyle} 
                onPress={onPress}
                disabled={disabled}
            >
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#66afe7',
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)"
    },
    containerEnabled: {
        opacity: 1
    },
    containerDisabled: {
        opacity: 0.3
    },
    text: {
        color: 'white',
        textAlign: 'center',
        height: 20
    }
});

export default Button;