import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EthProvider, EthContext } from "./contexts/EthContext";
import "./App.css";

// Demo/Sample Components
// import Intro from "./components/Intro/";
// import Setup from "./components/Setup";
// import Demo from "./components/Demo";
// import Footer from "./components/Footer";

// Import Components
import Navbar from './components/Navbar.jsx';

// Import Pages
import SITNFT from './components/Pages/SITNFT.js';
import Login from './components/Pages/Login';
import Page2 from './components/Pages/Page2';
import Error from './components/Pages/Error';
import PageNotFound from './components/Pages/PageNotFound';

class App extends Component {
  static contextType = EthContext;

  render() {
    const { loginState } = this.context;
    return (
      <div id="App" >
        <Router>
          <Navbar />
          {
            loginState ?
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/SITNFT" element={<SITNFT />} />
                <Route path='/Page2' element={<Page2 />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
              :
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/SITNFT" element={<Error />} />
                <Route path='/Page2' element={<Error />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
          }
        </Router>
      </div>
    );
  };
}

// function App() {
//   return (
//     <EthProvider>
//       <div id="App" >
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/Home" element={<Home />} />
//             <Route path='/Page2' element={<Page2 />} />
//           </Routes>
//         </Router>

//         {/* <div className="container">
//           <Intro />
//           <hr />
//           <Setup />
//           <hr />
//           <Demo />
//           <hr />
//           <Footer />
//         </div> */}
//       </div>
//     </EthProvider >
//   );
// }

export default App;
