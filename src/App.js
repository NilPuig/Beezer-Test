import React from 'react';
import './App.css';

import List from './components/list';
import TopBar from './components/topbar';

const App = () => (
  <div className="App">
    <TopBar/>
    <List/>
  </div>
)

export default App;
