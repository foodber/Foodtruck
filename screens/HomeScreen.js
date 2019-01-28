import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import { Constants } from "expo";
import * as firebase from "firebase";

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "KCho",
      cart: "",
      orders: []
    };
    this.addItem = this.addItem.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    //this is going to ref our firebase JUST ONCE when component mounts
    //it is going to look under orders for all the children and we can access it through snapshot
    //snapshot.val() will return a object with the key as a random string and value as the orders
    //we set our orders state with the new array for values in initOrder
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

  addItem() {
    //this is our onPress button handeler
    //when using push() this will generate the random key for the value
    //set() will add the new data to our data base with the push() key and the value in cart which is what we typed
    if (!this.state.cart) {
      return;
    }
    const newOrderKey = firebase
      .database()
      .ref()
      .child("orders")
      .push();
    newOrderKey.set(this.state.cart, () => {
      this.setState({ cart: "" });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>{this.state.name}</Text>
          <Text style={styles.getStartedText}>Order: {this.state.cart}</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter The Food You Want"
            onChangeText={food => this.setState({ cart: food })}
          />
          <Button title="Add" onPress={this.addItem} />
        </View>
        {this.state.orders.map(order => {
          return (
            <View style={styles.isItWorking} key={order}>
              <Text>{order}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight
  },
  foodInput: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  isItWorking: {
    fontSize: 24
  },
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff"
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});
