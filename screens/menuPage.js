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
import { fetchTruck} from '../store/Reducer';
import { allTrucks } from '../db/fire'

class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      menu: [],
      itemName: '',
      itemPrice: ''
    }
    this.removeItemFromMenu = this.removeItemFromMenu.bind(this)
    this.addItemToMenu = this.addItemToMenu.bind(this)
  }
  static navigationOptions = {
    title: 'Edit Menu',
  };

  async componentDidMount() {
    // await this.props.fetchTruck('3H9auvKIacpVaD1nPvOD')
    let data = await allTrucks.doc('3H9auvKIacpVaD1nPvOD').get()
    let truckData = data.data()
    this.setState({
      menu: truckData.menu
    })
  }

  async removeItemFromMenu (itemName) {
    let currentMenu = this.state.menu
    let newMenu = currentMenu.filter(item => {
      return item.name !== itemName
    })
    this.setState({
      menu: newMenu
    })
    await allTrucks.doc('3H9auvKIacpVaD1nPvOD').update({
      menu: newMenu
    })
  }

  async addItemToMenu (itemName, itemPrice) {
    if (this.state.itemName.length === 0) {
      alert("Please enter a product name")
    } else if (this.state.itemPrice.length === 0) {
      alert("Please enter the products price")
    } else {
      await allTrucks.doc('3H9auvKIacpVaD1nPvOD').update({
        menu: [...this.state.menu, {name: itemName, price: itemPrice}]
      })
      this.setState({
        menu: [...this.state.menu, {name: itemName, price: itemPrice}],
        itemName: '',
        itemPrice: ''
      })
    }
  }

  render() {
    const truckMenu = this.state.menu || []
    console.log('IAMMENU', this.state)
    return (
     <ScrollView>
      <TextInput
        placeholder="Please Enter Item Name"
        onChangeText={text => {
          this.setState({
            itemName: text
          })
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
            itemPrice: text
          })
        }}
       />
       <Button title="ADD ITEM TO MENU" onPress={() => this.addItemToMenu(this.state.itemName, this.state.itemPrice)} />
       <View>
         {truckMenu && truckMenu[0] &&
          truckMenu.map(menuItem => {
            return (
              <View key={menuItem.name}>
              <Text>Item Name : {menuItem.name}</Text>
              <Text>Item Price : {menuItem.price}</Text>
              <Button title="REMOVE ITEM FROM MENU" onPress={() => this.removeItemFromMenu(menuItem.name)} />
              </View>
            )
          })
        }
       </View>
     </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  truck: state.truckMenu.truckMenu
})

const mapDispatchToProps = dispatch => ({
  fetchTruck: truckId => {
    dispatch(fetchTruck(truckId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);