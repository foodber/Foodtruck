import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { firebase } from "../db/fire";
require("firebase/auth");

export default class LinksScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  static navigationOptions = {
    title: "Online Orders"
  };

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("orders")
      .once("value", snapshot => {
        const data = snapshot.val();
        if (data) {
          const initOrder = [];
          Object.keys(data).forEach(order => initOrder.push(data[order]));
          this.setState({
            orders: [...initOrder]
          });
        }
      });
    //this is going to ref our firebase at orders and put a event listener on there
    //this will trigger everytime a child is added to our orders
    //if the value in the child being added is valid it will add it to our orders state
    //which will make our page re-render since state was updated
    firebase
      .database()
      .ref()
      .child("orders")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            orders: [...prevState.orders, data]
          }));
        }
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.theHeader}>Incoming Orders: </Text>
        <View>
          {this.state.orders.map(order => {
            return (
              <View style={styles.isItWorking} key={order}>
                <Text>{order}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  isItWorking: {
    fontSize: 24
  },
  theHeader: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "left"
  }
});
