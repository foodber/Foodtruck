import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDluonuaPcLFWSjnA7h8EaRCKxZnUHJ19g',
  authDomain: 'foodber-65c10.firebaseapp.com',
  databaseURL: 'https://foodber-65c10.firebaseio.com',
  projectId: 'foodber-65c10',
  storageBucket: 'foodber-65c10.appspot.com',
  messagingSenderId: '669394895252',
};

firebase.initializeApp(config);
const db = firebase.firestore();

const allOrders = db.collection('truckOrders');
const allTrucks = db.collection('trucks');
const truckLocation = db.collection('truckLocation')

export { db, allOrders, firebase, allTrucks, truckLocation };
