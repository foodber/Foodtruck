import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import fire from "firebase";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "World"
  };

  logout() {
    fire.auth().signOut();
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>Hello World</Text>
        <Button color="#d63031" title="LOGOUT" onPress={this.logout} />
      </View>
    );
  }
}
