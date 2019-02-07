import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { truckLocation } from '../db/fire';
import firebase from 'firebase';
require('firebase/auth');

export default class CartMainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      truckKey: '',
      markers: [],
    };
    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  async componentDidMount() {
    let truckKey = await firebase.auth().currentUser;
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          truckKey: truckKey.uid,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 100000, maximumAge: 0 }
    );
  }

  async removeLocation() {
    this.setState({
      markers: [],
    });
    await truckLocation.doc(this.state.truckKey).delete();
  }

  async addLocation() {
    await truckLocation.doc(this.state.truckKey).set({
      location: {
        Lat: this.state.latitude,
        Long: this.state.longitude,
      },
      state: 'NY',
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        markers: [
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        ],
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude && (
          <MapView
            key={this.state.latitude}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              longitudeDelta: 0.00299,
              latitudeDelta: 0.00299,
            }}
          >
            {this.state.markers.map(marker => (
              <MapView.Marker
                key={marker}
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
              />
            ))}
          </MapView>
        )}
        <Button title="Open" onPress={this.addLocation} />
        <Button title="Closed" onPress={this.removeLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 70 },
});
