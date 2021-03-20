import './App.css';
import {Router, Switch,Route} from 'react-router-dom'
import Home from './pages/Home'
import PokeDetail from './container/PokeDetail'
import {DBConfig} from './config/DBConfig'
import {initDB} from 'react-indexed-db'
import history from './utils/history'
initDB(DBConfig)
function App() {
  return (
    <>
      <Router history={history}>
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

export default App;
