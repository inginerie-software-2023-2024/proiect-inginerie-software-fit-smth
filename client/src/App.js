import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/UserProfile";

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
        <Route path={`/profile/${usernameAuth}`} element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
