import './App.css';
import {Router, Switch,Route} from 'react-router-dom'
import {useState} from 'react'
import Home from './pages/Home'
import PokeDetail from './container/PokeDetail'
import {DBConfig} from './config/DBConfig'
import {initDB} from 'react-indexed-db'
import history from './utils/history'
import { connect,useSelector } from 'react-redux';
import { Dialog, DialogContent } from '@material-ui/core';
initDB(DBConfig)
function App() {
  const dialog=useSelector(state=>{
    // console.log('State',state.dialog)
    return state.dialog;
  })
  console.log('dialog',dialog)
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Home />
            <Dialog open={dialog.visible}>
              <DialogContent>
                {dialog.message}
              </DialogContent>
            </Dialog>
          </Route>
          <Route exact path="/detail">
            <PokeDetail />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
const mapStateToProps=(state)=>{
  return{
    dlg:state.dialog,
    message:state.message
  }
}
export default (App);
