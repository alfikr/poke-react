import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reportWebVitals from './reportWebVitals';
import {DBConfig} from './config/DBConfig'
import {initDB} from 'react-indexed-db'
initDB(DBConfig)
const globalState ={
  dialog:{
    visible:false,
    message:'', 
    action:null,
  },
  reloadList:false,
  pokemon:{
    dialogInputNickName:false,
  }
}
const rootReducer=(state=globalState,action)=>{
  switch(action.type){
      case 'ERROR':
          return{
              ...state,
              dialog:{
                visible:action.dialog,
                message:action.message,
                action:action.action==null?null:action.action,
              }
          }
      case 'CLOSE_DIALOG':
        return{
          ...state,
          dialog:{
            visible:false,
            message:''
          }
        }
      case 'INPUT':
        return{
          ...state,
          dialogInputNickName:action.nick,
        }
      case 'RELOAD':
        return{
          ...state,
          reloadList:action.reload
        }
      case 'ADD_DATA':
        return{
          ...state,
          pokemon:{
            id:action.id,
            url:action.url,
            name:action.name,
            nick:action.nick
          }
        }
      default:
        return state;
  }
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
