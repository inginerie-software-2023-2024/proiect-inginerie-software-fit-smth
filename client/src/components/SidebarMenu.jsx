import React from 'react';
import { useNavigate, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/SidebarMenu.css'
import poweruplogo from "../assets/images/poweruplogo.png"

const SidebarMenu = () => {

  var auth = localStorage.getItem("currentUser");
  var usernameAuth = JSON.parse(auth);
  const navigate = useNavigate();

  const logout = () => {
      localStorage.removeItem("currentUser");
      navigate("/login");
    };

    return  (
        <div className='container-fluid'>
            <div className='column'>
                <div className=' custom-bg-color custom-border bg-gradient col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column'>
                        
                    <div>
                        <div className=''>
                            <img alt="" class="img-fluid p-3" src={poweruplogo} />
                        </div>
                        <hr className='text-secondary d-none d-sm-block'/>
                        <ul class = "nav nav-pills flex-column mt-3 mt-sm-0">
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-house'></i>
                                    <span className='ms-3 d-none d-sm-inline'>
                                    <NavLink to ="/home" className="text-white" style={{ textDecoration: 'none' }}>Home</NavLink>
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-table'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-grid'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Product</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-people'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Customers</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="bg-light d-flex justify-content-between flex-column dropdown open">
                    <a class="text-decoration-none  text-dark dropdown-toggle p-3 " type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                                <i className='bi bi-person-circle'></i><span className='ms-2 d-none d-sm-inline'>{usernameAuth}</span> 
                            </a>
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                        <a class="dropdown-item d-block" href="#"><button className='btn'>Profile</button></a>
                        <a class="dropdown-item d-block" href="#"><button className='btn'>Settings</button></a>
                        <a class="dropdown-item d-block" ><button onClick={logout} className="btn">Log out</button></a>
                    </div>
                </div>
                </div>
            </div>
             
        </div>
    )
}

export default SidebarMenu;