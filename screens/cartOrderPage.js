import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/Reducer';
import { allOrders } from '../db/fire'
import fire from "firebase";
require("firebase/auth");

class LinkScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
    this.logOut = this.logOut.bind(this)
  }

  static navigationOptions = {
    title: 'Online Orders',
  };

  async componentDidMount() {
    const userId = await fire.auth().currentUser
    // await this.props.fetchAllOrders();
    const orders = await allOrders.doc(userId.email).get();
    const orderData = orders.data()
    let newOrdersData = Object.entries(orderData)
    this.setState({
      orders: newOrdersData
    })
    await allOrders.doc(userId.email).onSnapshot(doc => {
      const newOrders = doc.data()
      const testing = Object.entries(newOrders)
      this.setState({
        orders: testing,
      });
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  logOut (){
    fire.auth().signOut()
  }

  render() {
    const truckOrders = this.state.orders || [];
    return (
      <ScrollView>
        <Text style={styles.theHeader}>Incoming Orders: </Text>
        <View>
          {truckOrders &&
            truckOrders[0] &&
            truckOrders.map((order, index) => {
              let eachOrder = Object.entries(order[1]);
              return (
                <View key={index}>
                  <Text>Ordered Person's Name : {order[0]}</Text>
                  {eachOrder.map((singleOrder, index) => {
                    return (
                      <View key={index}>
                        <Text>Ordered Item : {singleOrder[0]}</Text>
                        <Text>Ordered Quantity : {singleOrder[1]}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
            <Button title="Signout" onPress={this.logOut} />
        </View>
        <Button color="#d6301" title="LOGOUT" onPress={this.logout} />
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
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  ViewBox: {
    paddingLeft: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: '#f5f5f5',
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
