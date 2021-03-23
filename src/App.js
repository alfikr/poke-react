import './App.css';
import {Router, Switch,Route} from 'react-router-dom'
import {useState} from 'react'
import Home from './pages/Home'
import PokeDetail from './container/PokeDetail'
import history from './utils/history'
import { connect,useSelector } from 'react-redux';
import { Dialog,Button, DialogActions, DialogContent,DialogContentText } from '@material-ui/core';

function App(props) {
  let dialog=useSelector(state=>{
    console.log('State',state.dialog)
    return state.dialog;
  })
  return (
    <>
      <Router history={history}>
      <Dialog open={dialog.visible} 
      keepMounted
      onClose={dialog.action==null?props.closeDialog:dialog.action}
      
      >
              <DialogContent>
                <DialogContentText>
                {dialog.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={dialog.action==null?props.closeDialog:dialog.action}  
                color="primary">OK</Button>
              </DialogActions>
            </Dialog>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route exact path="/detail">
            <PokeDetail />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
const mapDispatchToProps=(dispatch)=>{
  return{
    closeDialog:()=>dispatch({
      type:'CLOSE_DIALOG'
    })
  }
}
const mapStateToProps=(state)=>{
  return{
    dlg:state.dialog,
    message:state.message
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
