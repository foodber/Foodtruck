import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
};

firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Place Order: ',
      cart: '',
      orders: [],
    };
    this.addItem = this.addItem.bind(this);
  }
  static navigationOptions = {
    title: 'Order Page',
    style: {
      backgroundColor: 'blue',
    },
  };

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
      .child('orders')
      .push();
    newOrderKey.set(this.state.cart, () => {
      this.setState({ cart: '' });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>{this.state.name}</Text>
          {/* <Text style={styles.getStartedText}>Order: {this.state.cart}</Text> */}
          <TextInput
            style={styles.foodInput}
            placeholder="Enter The Food You Want"
            onChangeText={food => this.setState({ cart: food })}
          />
          <Button title="Order" onPress={this.addItem} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  foodInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
