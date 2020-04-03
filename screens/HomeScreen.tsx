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
      width: '80%'
  },
  splashtext: {
      color: 'black',
      fontSize: 25,
      fontWeight: "bold",
      marginTop:200,
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

export default HomeScreen;