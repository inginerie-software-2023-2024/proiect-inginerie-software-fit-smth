<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import video from "../resources/video.mp4";
import logo from "../resources/logo512.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
=======
import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/Login.css'
import {Link, useNavigate} from 'react-router-dom'
import video from '../resources/video.mp4'

>>>>>>> origin/login-register

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

<<<<<<< HEAD
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });
=======
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
>>>>>>> origin/login-register

  const handleRegister = (event) => {
    event.preventDefault();

<<<<<<< HEAD
    axios
      .post("http://localhost:3001/auth/register", values)
      .then((res) => {
        if (res.data.Status === "Error") setError(res.data.Error);
        else navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section class="vh-100">
      <div class="py-3 text-center">
        <h1 class="display-3 font-weight-bold"> PowerUp</h1>
        <h3 class="display-10 font-weight-bold">
          Your Journey to Strength, Harmony, and Self-Care at Home.
        </h3>
      </div>
      <div class="container-fluid h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <video
              src={video}
              autoPlay
              muted
              loop
              class="img-fluid"
              alt="Sample image"
            ></video>
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div class="d-flex flex-row align-items-center text-center justify-content-lg-start">
                <p class="lead fw-normal mb-0 me-3 ">
                  Welcome! Register to PowerUp!
                </p>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <label class="form-label" for="form3Example3"></label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  class="form-control form-control-lg"
                  placeholder="Enter username"
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                />
                <label class="form-label" for="form3Example3"></label>
              </div>

              <div class="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  class="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                <label class="form-label" for="form3Example4"></label>
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  onClick={handleRegister}
                  type="button"
                  class="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Register
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Do you have an account?
                  <span className="link-danger">
                    <Link to="/login" className="login">
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div class="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
      </div>
    </section>
  );
};
=======
    const handleRegister = (event) => {
      event.preventDefault();
      
      axios.post('http://localhost:3001/auth/register', values)
      .then(res => {
          if(res.data.Status === 'Success'){
              setMessage(res.data.message);
          }
          else{
              setError(res.data.Error)
          }
      })
      .catch(err => console.log(err))
      
  }

    return (
        <section class="vh-100">
        <div class="py-3 text-center">
            <h1 class="display-3 font-weight-bold"> PowerUp</h1>
            <h3 class="display-10 font-weight-bold">Your Journey to Strength, Harmony, and Self-Care at Home.</h3>
        </div>
        <div class="container-fluid">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
            <video src={video} autoPlay muted loop class="img-fluid" alt="Sample image"></video>
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div class="d-flex flex-column align-items-center text-center justify-content-lg-start p-4">
                     <p class="fw-bold lead fw-normal mb-0">SIGN UP</p>
                </div>
                <div class="text-success">
                   {message && message}
                </div>
                <div class="text-danger">
                    {error && error}
                </div>
                
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control form-control-lg"
                    placeholder="Enter email" 
                    onChange = {e => setValues({...values, email: e.target.value})}/>
                  <label class="form-label" for="form3Example3"></label>
                </div>
                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3" class="form-control form-control-lg"
                    placeholder="Enter username" 
                    onChange = {e => setValues({...values, username: e.target.value})}/>
                  <label class="form-label" for="form3Example3"></label>
                </div>
      
                <div class="form-outline mb-3">
                  <input type="password" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter password" 
                    onChange = {e => setValues({...values, password: e.target.value})}/>
                  <label class="form-label" for="form3Example4"></label>
                </div>
      
                <div class=" d-flex flex-column text-center text-lg-start mt-4 ">
                  <button onClick = {handleRegister} type="button" class="btn btn-info"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Register</button>
                  <p class="fw-italic mt-2 pt-1 mb-0">Do you have an account?
                   <span className="link-danger" ><Link to ="/login" className="link-info" style={{ textDecoration: 'none' }}> Login</Link></span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}
>>>>>>> origin/login-register

export default Register;
