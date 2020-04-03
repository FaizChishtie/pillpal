import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps, View, Text} from 'react-native';

type Props = TextInputProps & {
    error?: string;
};

class FormTextInput extends React.Component<Props> {


    textInputRef = React.createRef<TextInput>();

    focus = () => {
        if (this.textInputRef.current) {
            this.textInputRef.current.focus();
        }
    };

    render() {
        const {error, style, ...otherProps} = this.props;
        return (
            <View style={[styles.container, style]}>
                <TextInput
                    ref={this.textInputRef}
                    style={[styles.textInput, style]}
                    selectionColor={'#c4dced'}
                    {...otherProps}
                />
                <Text style={styles.errorText}>{error || ""}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    textInput: {
        height: 40,
        borderColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    errorText: {
        height: 20,
        color: 'red'
    }
});

export default FormTextInput;