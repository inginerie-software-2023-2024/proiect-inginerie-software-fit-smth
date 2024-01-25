import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import EmailVerification from './pages/EmailVerification';
// import ForgotPassword from './pages/ForgotPassword';
// import ChangePassword from './pages/ChangePassword';
import BMICalculator from './BMICalculator'; // Import BMICalculator

function App() {
  return (
    <>   
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify-mail" element={<EmailVerification />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        <Route path="/" element={<BMICalculator />} /> {/* Default Route */}
      </Routes>
    </>
  );
}

export default App;