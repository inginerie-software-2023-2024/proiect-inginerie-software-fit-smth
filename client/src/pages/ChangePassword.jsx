import React, {useState, useEffect} from 'react'
import axios from "axios"
import image from "../assets/images/changepasswordpage.jpg"

import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const [values, setValues] = useState({
        newpassword: "",
        confirmpassword: "",
        token: ""
    })
    
    const [error, setError] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log('Token from URL:', token);
        setValues({ ...values, token });
        console.log('Updated Values:', values);
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:3001/auth/changepassword', values)
          .then(res => {
              if(res.data.Status === 'Success'){
                  navigate("/login");
              }
              else{
                  
                  setError(res.data.Error)
              }
          })
          .catch(err => console.log(err))
    }
     return (
        <div>
			<div class="container d-flex align-items-center justify-content-center vh-100">
                <div class="card " style={{ width: '1000px' }}>
                    <div class="">
                        <div class="card card-info">
                            <div class="card">
                                <h3 class="card-header h5 text-white bg-info">
                                    <span class="d-flex flex-column glyphicon glyphicon-th text-center">
                                    Change password   
                                    </span>
                                  
                                </h3>
                            </div>
                            <div class="panel-body">
                                <div class="container-fluid d-flex flex-column align-items-center">
                                    <div class="col-md-9 col-lg-6 col-xl-5"> <br/>
                                        <img alt="" class="img-thumbnail" src={image}/>  </div>
                                    <div style={{/*margin-top:80px;*/}} class="col-xs-6 col-sm-6 col-md-6 login-box">
                                    <div class="text-danger fw-bold text-center justify-content-lg-start p-4">
                                    <div class="text-danger">{error && error}</div>
                                        </div>
                                        <div class="form-outline mb-4">
                                            <div class="input-group">
                                            <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                                            <input class="form-control form-control-lg" type="password" placeholder="New Password"
                                            onChange={e => setValues({...values, newpassword: e.target.value})}/>
                                            </div>
                                        </div>
                                         <div class="form-outline mb-4">
                                        <div class="input-group">
                                        <div class="input-group-addon"><span class="glyphicon glyphicon-log-in"></span></div>
                                        <input class="form-control form-control-lg" type="password" placeholder="Confirm Password"
                                        onChange={e => setValues({...values, confirmpassword: e.target.value})}/>
                                        </div>
                                        <div class="d-flex flex-column  text-center text-lg-start mt-4">
                                        <button class="btn btn-info " type="submit" onClick={handleSubmit}>
                                           <span class="btn-save-label"><i class="text-light"></i></span>Submit</button>
                                         </div>
                                         </div>
                                    </div>                                
                                    
                                
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default ChangePassword