import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EthProvider } from "./contexts/EthContext";
import "./App.css";

// Demo/Sample Components
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";

// Import Components
import Navbar from './components/Navbar.jsx';

// Import Pages
import Home from './components/Pages/home.js';
import Page2 from './components/Pages/Page2';

function App() {
  return (
    <EthProvider>
      <div id="App" >
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Page2' element={<Page2 />} />
          </Routes>
        </Router>
        {/* <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div> */}
      </div>
    </EthProvider>
  );
}

export default App;
