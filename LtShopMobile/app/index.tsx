import React from 'react';
import { Redirect } from "expo-router";
// import { Provider } from 'react-redux';
// import store from '../redux/store';

const Home = () => {
  return (
    // <Provider store={store}>
    <Redirect href='/(root)/(tabs)/home' />
    // </Provider>

  );
};

export default Home;
