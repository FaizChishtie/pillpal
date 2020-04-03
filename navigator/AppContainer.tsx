import * as React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateScreen from '../screens/UpdateScreen';
import LogInLoadingScreen from '../screens/LogInLoadingScreen';

const AuthStack = createStackNavigator({
    LogIn: {screen: LoginScreen},
    SignUp: {screen: SignUpScreen},
    ProfileSetup: {screen: ProfileSetupScreen},
    }, {
    defaultNavigationOptions: {
        header: null,
    },
    initialRouteName: 'LogIn',
});

const HomeTabNavigator = createBottomTabNavigator({
    Home: {screen: HomeScreen},
    Updates: {screen: UpdateScreen},
    Profile: {screen: ProfileScreen},
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            let { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = 'home';
            } else if (routeName === 'Updates') {
                iconName = 'inbox';
            } else if (routeName === 'Profile') {
                iconName = 'person';
            }
            return ( 
                <Icon
                    color={`${tintColor}`}
                    name={`${iconName}`}
                    size={25} 
                />
            )
        } 
    }),
    tabBarOptions: {
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: 'white',
        activeTintColor: '#66afe7',
        inactiveTintColor: 'gray',
    }
})

const AppNavigator = createSwitchNavigator( 
{
        App: HomeTabNavigator,
        Auth: AuthStack,
        LogInLoading: LogInLoadingScreen

}, {
    defaultNavigationOptions: {
    header: null,
    },
    initialRouteName: 'LogInLoading',
})

export default createAppContainer(AppNavigator);