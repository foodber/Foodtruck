import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { getMenuForTruck } from '../store/Reducer';
import db from '../db/fire';
import fire from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'World',
  };

  message() {
    Alert.alert('Added');
  }

  logout() {
    fire.auth().signOut();
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Hello World</Text>
        <TextInput title="Add a Dish" editable={true} />
        <Button title="logout" onPress={this.logout} />
      </View>
    );
  }
}
