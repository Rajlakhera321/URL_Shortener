import './App.css';
import SignUp from './pages/SignUp';
import Login from "./pages/Login";
import React from "react";
import Background from "./components/Background";
import Home from "./pages/Home"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ViewAnalytics from './components/ViewAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/view/:id" element={<ViewAnalytics />} />
      </Routes>
      <Background/>
    </Router>
  );
}

export default App;
