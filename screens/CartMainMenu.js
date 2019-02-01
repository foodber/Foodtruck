import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/Reducer';
import fire from 'firebase';

class LinkScreen extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     orders: [],
  //   };
  // }

  static navigationOptions = {
    title: 'Online Orders',
  };

  async componentDidMount() {
    await this.props.fetchAllOrders();
  }

  render() {
    const allOrders = this.props.allOrders || [];
    //console.log('test>>>>>>>>>>>>>', allOrders);
    return (
      <ScrollView>
        <Text style={styles.theHeader}>Incoming Orders: </Text>
        <View>
          {allOrders &&
            allOrders[0] &&
            allOrders.map(order => {
              let arr = Object.keys(order);
              return arr.map(title => {
                console.log('IAMTITLE', order[title]);
                let food = Object.keys(order[title]);
                let quant = Object.values(order[title]);
                for (let i = 0; i <= food.length; i++) {
                  return (
                    <View key={title}>
                      <Text>{title}</Text>
                      <Text>{food[i]}</Text>
                      <Text>{quant[i]}</Text>
                    </View>
                  );
                }
              });
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
