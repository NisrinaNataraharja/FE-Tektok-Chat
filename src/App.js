import React from 'react'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import Route from './configs/Router/mainRoute'
import store from './configs/redux/store'

function App() {
  return (
    <Provider store={store}>
    <Route/>
    </Provider>
  );
}

export default App;
