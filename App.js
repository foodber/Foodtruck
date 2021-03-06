import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import Login from "./screens/Login";
import store from "./store";
import { firebase, allTrucks } from "./db/fire";
import { Provider } from "react-redux";
import("firebase/auth");

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  async authListener() {
    await firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState({ user });
        const truckData = await allTrucks.doc(this.state.user.uid).get();
        if (truckData.data() && truckData.data().menu[0]) {
          const truckMenu = truckData.data().menu;
          await allTrucks.doc(this.state.user.uid).set({
            name: this.state.user.email,
            email: this.state.user.email,
            menu: [...truckMenu],
          });
        } else {
          await allTrucks.doc(this.state.user.uid).set({
            name: this.state.user.email,
            email: this.state.user.email,
            menu: [],
          });
        }
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        // <Provider store={store}>
        //   <View style={styles.container}>
        //     {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        //     <AppNavigator />
        //   </View>
        // </Provider>
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {this.state.user ? <AppNavigator /> : <Login />}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
