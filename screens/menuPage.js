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

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'World',
  };

  message() {
    Alert.alert('Added');
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Hello World</Text>
        <TextInput title="Add a Dish" editable={true} />
        <Button title="Add" onPress={this.message} />
      </View>
    );
  }
}
