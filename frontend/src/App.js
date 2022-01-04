import React from 'react';
import logo from './logo.svg';
import Main from './components/Main/Main';
import {
  BrowserRouter as Router,
  Switch,
  HashRouter,
  Route
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route path="/full" component={ Main } />
          <Route path="/single" component={ Main } />
          <Route path="/single/:place" component={ Main } />
          <Route path="/:filtered" component={ Main } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
