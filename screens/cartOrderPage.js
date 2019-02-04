import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/Reducer';
import fire from 'firebase';

class LinkScreen extends React.Component {
  static navigationOptions = {
    title: 'Online Orders',
  };

  async componentDidMount() {
    await this.props.fetchAllOrders();
  }

  render() {
    const allOrders = this.props.allOrders || [];
    return (
      <ScrollView>
        <Text style={styles.theHeader}>Incoming Orders: </Text>
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
