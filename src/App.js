import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Todo from './pages/Todo';
import { Global } from './GlobalState'; 

const App = () => {
  return (
    <Router>
      <Global Root={() => (
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/todo" element={<Layout><Todo /></Layout>} />
        </Routes>
      )} />
    </Router>
  );
};

export default App;

