import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import '../styles/app.css';
import Recipe from '../containers/recipe';
import Search from '../containers/search';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Search} />
        <Route exact path="/search" component={Recipe} />
      </Router>
    </div>
  );
}

export default App;
