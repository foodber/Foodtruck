import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import fire from 'firebase';
require('firebase/auth');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login() {
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });

    if (this.state.password.length < 7) {
      alert("Password must be at least six characters long");
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
      alert("Please enter a valid email address");
    }
  }

  signup() {
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });

    if (this.state.password.length < 7) {
      alert("Password must be at least six characters long");
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
      alert("Please enter a valid email address");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          onChangeText={email => this.setState({ email })}
          placeholder={'email'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          placeholder={'password'}
          placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />

        <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signup} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 150,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#ff7675',
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
