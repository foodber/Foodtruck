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
import { fetchTruck } from '../store/Reducer';
import { allTrucks } from '../db/fire';
import fire from 'firebase';
require('firebase/auth');

class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      itemName: '',
      itemPrice: '',
      truckId: '',
    };
    this.removeItemFromMenu = this.removeItemFromMenu.bind(this);
    this.addItemToMenu = this.addItemToMenu.bind(this);
  }
  static navigationOptions = {
    title: 'Edit Menu',
  };

  async componentDidMount() {
    const truckId = await fire.auth().currentUser;
    let data = await allTrucks.doc(truckId.uid).get();
    let truckData = data.data();
    this.setState({
      menu: truckData.menu,
      truckId,
    });
  }

  async removeItemFromMenu(itemName) {
    let currentMenu = this.state.menu;
    let newMenu = currentMenu.filter(item => {
      return item.name !== itemName;
    });
    await this.setState({
      menu: newMenu,
    });
    await allTrucks.doc(this.state.truckId.uid).set({
      name: this.state.truckId.providerData[0].email,
      email: this.state.truckId.providerData[0].email,
      menu: this.state.menu,
    });
  }

  async addItemToMenu(itemName, itemPrice) {
    if (this.state.itemName.length === 0) {
      alert('Please enter a product name');
    } else if (this.state.itemPrice.length === 0) {
      alert('Please enter the products price');
    } else {
      await allTrucks.doc(this.state.truckId.uid).set({
        name: this.state.truckId.providerData[0].email,
        email: this.state.truckId.providerData[0].email,
        menu: [...this.state.menu, { name: itemName, price: itemPrice }],
      });
      this.setState({
        menu: [...this.state.menu, { name: itemName, price: itemPrice }],
        itemName: '',
        itemPrice: '',
      });
    }
  }

  render() {
    const truckMenu = this.state.menu || [];
    return (
      <ScrollView>
        <TextInput
          placeholder="Please Enter Item Name"
          onChangeText={text => {
            this.setState({
              itemName: text,
            });
          }}
          value={this.state.itemName}
        />
        <TextInput
          placeholder="Please Enter Item Price"
          keyboardType="numeric"
          value={this.state.itemPrice}
          maxLength={7}
          onChangeText={text => {
            this.setState({
              itemPrice: text,
            });
          }}
        />
        <Button
          title="ADD ITEM TO MENU"
          onPress={() =>
            this.addItemToMenu(this.state.itemName, this.state.itemPrice)
          }
        />
        <View>
          {truckMenu &&
            truckMenu[0] &&
            truckMenu.map(menuItem => {
              return (
                <View key={menuItem.name} style={styles.container}>
                  <Text style={styles.Text}>Item Name : {menuItem.name}</Text>
                  <Text style={styles.Text}>Item Price : {menuItem.price}</Text>
                  <Button
                    color={'#d63031'}
                    title="REMOVE ITEM FROM MENU"
                    onPress={() => this.removeItemFromMenu(menuItem.name)}
                  />
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
    backgroundColor: '#fff',
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  truck: state.truckMenu.truckMenu,
});

const mapDispatchToProps = dispatch => ({
  fetchTruck: truckId => {
    dispatch(fetchTruck(truckId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
