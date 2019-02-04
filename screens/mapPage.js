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

export default class CartMainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('wokeeey');
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
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
        <Button title="Open" />
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
