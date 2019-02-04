import { allOrders, allTrucks } from '../db/fire';

const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_TRUCK_MENU = 'GET_TRUCK_MENU';

const initialState = {
  allOrders: [],
  truckMenu: [],
};

const getOrders = allOrders => {
  return {
    type: GET_ALL_ORDERS,
    allOrders,
  };
};

const getTrucks = truckMenu => {
  return {
    type: GET_TRUCK_MENU,
    truckMenu
  }
}

export const fetchTruck = (truckId) => {
  return async dispatch => {
    try {
      const truck = await allTrucks.doc(truckId).get()
      const truckData = truck.data()
      dispatch(getTrucks(truckData.menu))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const orders = await allOrders.doc('First trucks').get(); //allOrders.doc(with specific truck Key)
      //   orders.forEach(anOrder => {
      //     orderList.push(anOrder.data());
      //   });
      let newObj=Object.values(orders.data())
      console.log('this one >>>>>>>>', newObj);
      dispatch(getOrders(orders.data()));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ...state, allOrders: [action.allOrders] };
    case GET_TRUCK_MENU:
      return { ...state, truckMenu: action.truckMenu };
    default:
      return state;
  }
}
