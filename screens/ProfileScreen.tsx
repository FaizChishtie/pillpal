import * as React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import TopProfile from '../components/TopProfile';
import User from '../utils/profile';
import Button from '../components/Button';

const hardCodedUser = new User();

interface Props {
    navigation: {
      navigate: (arg0: string, arg1: {} ) => {}
    }
  }

const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://gravatar.com/avatar/ec826cfd8d825642317ecec7c80cf217?s=400&d=robohash&r=x',
      subtitle: '727-959-6636'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://gravatar.com/avatar/ec826cfd8d825646317ecec7c80cf227?s=400&d=robohash&r=x',
      subtitle: '474-226-3929'
    },
    {
        name: 'Jill Red',
        avatar_url: 'https://gravatar.com/avatar/ec826cfd8d825646317ecec7c80cf217?s=400&d=robohash&r=x',
        subtitle: '667-226-9898'
      },
]

const list_2 = [
    {
      name: 'Medication 1',
      subtitle: '1x per week'
    },
    {
      name: 'Medication 2',
      subtitle: '1x per day'
    },
    {
        name: 'Medication 3',
        subtitle: '3x per week'
      },
]


  

export default class ProfileScreen extends React.Component<Props, {}> {

    handleAddCarePartnerPressed = () => {
        this.props.navigation.navigate('AddCare', {});
    }

    handleAddMedicationPressed = () => {
        this.props.navigation.navigate('AddMed', {});
    }

      render () {
        return (
            <ScrollView style={styles.container}>
            <View style={styles.top}>
                <TopProfile name={hardCodedUser.name.first + ' ' + hardCodedUser.name.last} date={'Friday, April 3, 2020'} renderHello={false} />
            </View>
            <View style={styles.form}>
            <Text style={styles.login}>{'\n\n'}Care Partners{'\n'}</Text>
                {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                        chevron
                    />
                    ))
                }
                <Button 
                    label={'ADD A CARE PARTNER'} 
                    onPress={this.handleAddCarePartnerPressed}
                />
            <Text style={styles.login}>{'\n'}Medications{'\n'}</Text>
                {
                    list_2.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: require('../assets/images/parlodel.png')  }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                        chevron
                    />
                    ))
                }
                <Button 
                    label={'ADD A PILL'} 
                    onPress={this.handleAddCarePartnerPressed}
                />
            </View>
            </ScrollView>
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
        marginTop:50,
        textAlign: 'center'
    },
    login: {
        color: 'black',
        fontSize: 20,

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
    },
    top: {
        marginTop: -50,
        paddingLeft: 30
    },
});
