import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import HomeBody from '../components/HomeBody';
import User from '../utils/profile';

const hardCodedUser = new User();

interface Props {
  navigation: {
    navigate: (arg0: string, arg1: {} ) => {}
  }
}

class HomeScreen extends React.Component<Props>{
      render(){
        return (
            <View>
              <HomeBody hasMedication={hardCodedUser.hasMedication} medication={hardCodedUser.prescriptions} name={hardCodedUser.name.first + ' ' + hardCodedUser.name.last} date='Friday, April 3, 2020'/>
            </View>
          );
        }
}

export default HomeScreen;