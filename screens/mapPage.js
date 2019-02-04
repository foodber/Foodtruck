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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { truckLocation } from '../db/fire'
import firebase from 'firebase'
require("firebase/auth");

export default class CartMainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      truckKey: ''
    };
    this.updateLocation = this.updateLocation.bind(this)
  }

  async componentDidMount() {
    let truckKey = await firebase.auth().currentUser
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          truckKey: truckKey.uid
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
      );
    }
    
    async updateLocation() {
      await truckLocation.doc(this.state.truckKey).set({
        location: {
        Lat: this.state.latitude,
        Long: this.state.longitude
      }
    })
  }

  render() {
    // let lat = 40.70513;
    // let long = -74.009378;
    // if (this.state.longitude && this.state.latitude) {
    //   lat = this.state.latitude;
    //   long = this.state.longitude;
    // }

    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude && (
          <MapView
            key={this.state.latitude}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title="Current Location"
              //description="Some description"
            />
          </MapView>
        )}
        <Button title="Update My Location" onPress={this.updateLocation} />
      </View>
    );
  }
}

// getMapRegion = () => ({
//   latitude: this.state.latitude,
//   longitude: this.state.longitude,
//   latitudeDelta: LATITUDE_DELTA,
//   longitudeDelta: LONGITUDE_DELTA,
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: { alignSelf: 'stretch', height: 350 },
});
