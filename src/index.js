import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reportWebVitals from './reportWebVitals';

const globalState ={
  dialog:{
    visible:false,
    message:''
  }
}
const rootReducer=(state=globalState,action)=>{
  // switch(action.type){
  //     case 'ERROR':
  //         return{
  //             ...state,
  //             dialog:action.dialog,
  //             message:action.message
  //         }
  // }
  return state;
}
const store = createStore(rootReducer)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
