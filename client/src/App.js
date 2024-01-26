import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Profile from "./pages/UserProfile";
// import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import BMICalculator from './pages/Calculators/CalculatorBMI';
import TDEECalculator from './pages/Calculators/CalculatorTDEE';
import BMRCalculator from './pages/Calculators/CalculatorBMR';

function App() {
  var auth = localStorage.getItem("currentUser");
  var usernameAuth = JSON.parse(auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/verify-mail" element = {<EmailVerification/>} />
        <Route path="/changepassword" element = {<ChangePassword/> } />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path={`/profile/${usernameAuth}`} element={<Profile />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/bmr-calculator" element={<BMRCalculator />} />
        <Route path="/tdee-calculator" element={<TDEECalculator />} />
      </Routes>
    </>)
}

export default App;
