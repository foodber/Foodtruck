import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/Reducer';
import { allOrders } from '../db/fire';
import fire from 'firebase';
import Swipeout from 'react-native-swipeout';
require('firebase/auth');

class LinkScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
    this.register = this.register.bind(this);
    this.orderFinished = this.orderFinished.bind(this);
  }

  static navigationOptions = {
    title: 'Incoming Orders',
  };

  static swipeoutBtn = [
    {
      text: 'Button',
    },
  ];

  orderFinished(userId) {
    let newArr = this.state.orders.filter(order => order[0] !== userId);
    this.setState({
      orders: newArr,
    });
  }

  async register() {
    const { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.NOTIFICATIONS
    );

    if (status !== 'granted') {
      alert('You need to enable permissions in settings');
      return;
    }

    const token = await Expo.Notifications.getExpoPushTokenAsync();

    const user = firebase.auth().currentUser;
    expoToken.doc(user.uid).set({ token });
    console.log(token);
  }

  listen({ origin, data }) {
    console.log(origin, data);
  }

  componentWillMount() {
    this.listener = Expo.Notifications.addListener(this.listen);
  }

  componentWillUnmount() {
    this.listener && Expo.Notifications.removeListener(this.listen);
  }

  async componentDidMount() {
    const userId = await fire.auth().currentUser;
    // await this.props.fetchAllOrders();
    const orders = await allOrders.doc(userId.email).get();
    const orderData = orders.data();
    let newOrdersData = Object.entries(orderData);
    this.setState({
      orders: newOrdersData,
    });
    await allOrders.doc(userId.email).onSnapshot(doc => {
      const newOrders = doc.data();
      const testing = Object.entries(newOrders);
      this.setState({
        orders: testing,
      });
    });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    const truckOrders = this.state.orders || [];
    return (
      <ScrollView>
        <View>
          {truckOrders &&
            truckOrders[0] &&
            truckOrders.map((order, index) => {
              let eachOrder = Object.entries(order[1]);
              return (
                <View key={index} style={styles.individualOrder}>
                  <Text style={styles.userName}>
                    Ordered Person's Name : {this.state.orders.length}
                  </Text>

                  <Swipeout
                    backgroundColor="transparent"
                    autoClose={true}
                    right={[
                      {
                        text: 'Delete',

                        backgroundColor: 'red',
                        onPress: () => {
                          this.orderFinished(order[0]);
                        },
                      },
                    ]}
                  >
                    {eachOrder.map((singleOrder, index) => {
                      return (
                        <View key={index}>
                          <Text>
                            {singleOrder[0]} {singleOrder[1]}
                          </Text>
                        </View>
                      );
                    })}
                  </Swipeout>
                </View>
              );
            })}
        </View>
        <Button
          color={'#d63031'}
          title="LOGOUT"
          onPress={this.logout}
          style={{
            position: 'absolute',
            bottom: 5,

            alighnSelf: 'flex-end',
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7,
  },
  isItWorking: {
    fontSize: 24,
  },
  theHeader: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  ViewBox: {
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
  },
  individualOrder: {
    flex: 1,
    backgroundColor: '#dfe6e9',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  allOrders: state.allOrders.allOrders,
});

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => {
    dispatch(fetchAllOrders());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkScreen);
