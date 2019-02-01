import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { getMenuForTruck } from '../store/Reducer';
import db from '../db/fire';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'World',
  };

  componentDidMount() {
    // db.collection('menu').add({
    //   email: 'truck' * Math.floor(Math.random() * 99) + '@truckytruck.com',
    //   pass: ';lasdkfjn;lksadfn',
    //   name: 'truck' * Math.floor(Math.random() * 99),
    //   menu: [
    //     {
    //       name: 'Potato',
    //       price: 12.1,
    //     },
    //   ],
    // });
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>Hello World</Text>
        <TextInput title="Add a Dish" editable={true} />
        <Button title="Add" />
      </View>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   getMenuForTruck: truckMenu => {
//     dispatch(getMenuForTruck(truckMenu));
//   },
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(SettingsScreen);
