import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationParams } from 'react-navigation';

interface Props extends NavigationParams {};
interface State {};

export default class LogInLoadingScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.nav();
    }

    nav () {
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View>
                <ActivityIndicator>

                </ActivityIndicator>
            </View>
        )
    }
;}