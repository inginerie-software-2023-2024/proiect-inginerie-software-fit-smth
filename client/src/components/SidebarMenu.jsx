import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/SidebarMenu.css'


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
            <div className='row'>
                <div className='bg-dark col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column'>
                    <div>
                        <a className='text-decoration-none text-white d-non d-sm-inline d-flex align-itemcenter ms-3 mt-2'>
                            <i className='fs-4 bi bi-speedometer'></i>
                                <span className='ms-1 fs-4 d-none d-sm-inline'>PowerUp</span>
                        </a>
                        <hr className='text-secondary d-none d-sm-block'/>
                        <ul class = "nav nav-pills flex-column mt-3 mt-sm-0">
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-speedometer2'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" class="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-house'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Home</span>
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
                    <div class="bg-dark dropdown open">
                    <a class="text-decoration-none text-white dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                                <i className='bi bi-person-circle'></i><span className='ms-2 d-none d-sm-inline'>{usernameAuth}</span> 
                            </a>
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <a class="dropdown-item" ><button onClick={logout} className="btn">Log out</button></a>
                    </div>
                </div>
                </div>
                
            </div>
             
        </div>
    )
}

export default SidebarMenu