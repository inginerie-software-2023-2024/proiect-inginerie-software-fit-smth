import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/Login.css'
import {NavLink, useNavigate} from 'react-router-dom'
import video from '../resources/video.mp4'
import logo from '../resources/logo512.png'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'

const Login = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleLogin = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/auth/login', values)
        .then(res => {
            if(res.data.Status === 'Success'){
                localStorage.setItem('currentUser', JSON.stringify(values.username));
                navigate("/home");
            }
            else{
                setError(res.data.Error)
            }
        })
        .catch(err => console.log(err))
        
    }

    return (
        <section className="vh-100">
        <div className="py-3 text-center">
            <h1 className="display-3 font-weight-bold"> PowerUp</h1>
            <h3 className="display-10 font-weight-bold">Your Journey to Strength, Harmony, and Self-Care at Home.</h3>
        </div>
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
            <video src={video} autoPlay muted loop className="img-fluid" alt="Sample image"></video>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center text-center justify-content-lg-start">
                     <p className="lead fw-normal mb-0 me-3 ">Welcome back!!!</p>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter username" 
                    onChange = {e => setValues({...values, username: e.target.value})}/>
                  <label className="form-label" htmlFor="form3Example3"></label>
                </div>
      
                <div className="form-outline mb-3">
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" 
                    onChange = {e => setValues({...values, password: e.target.value})}/>
                  <label className="form-label" htmlFor="form3Example4"></label>
                </div>
      
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div>
      
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick = {handleLogin} type="button" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                   <span className="link-danger" ><NavLink to ="/register" className="register">Register</NavLink></span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2024. All rights reserved.
          </div>
        </div>
      </section>
    )
}

export default Login;