//Anto nu stiu de ce ai schimbat SidebarMenu...dar nu era bine...


// import React, { useState, useEffect } from "react";
// import SidebarMenu from "../components/SidebarMenu";
// import axios from "axios";

// const Profile = () => {
//   const [userData, setUserData] = useState({});
//   const [newUsername, setNewUsername] = useState("");
//   const [newEmail, setNewEmail] = useState("");

//   useEffect(() => {
//     axios
//       .get("/api/user/profile")
//       .then((response) => {
//         setUserData(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile:", error);
//       });
//   }, []);

//   const handleUpdateProfile = () => {
//     axios
//       .put("/api/user/profile", { newUsername, newEmail })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error updating user profile:", error);
//       });
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       {/* Sidebar Menu */}
//       <SidebarMenu />

//       {/* User Profile Content */}
//       <div style={{ marginLeft: "250px", padding: "20px" }}>
//         <h1>{userData.name}</h1>
//         {/* <p>ID: {userData.iduser}</p> */}
//         <p>Username: {userData.username}</p>
//         <p>Email: {userData.email}</p>

//         <h2>Update Profile</h2>
//         <label>
//           New Username:
//           <input
//             type="text"
//             value={newUsername}
//             onChange={(e) => setNewUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           New Email:
//           <input
//             type="text"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//           />
//         </label>
//         <br />
//         <button onClick={handleUpdateProfile}>Update Profile</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


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
        <div className='div main'>
            <div className='row'>
                <div className='content bg-dark col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column'>
                    <div>
                        <a className='text-decoration-none text-white d-non d-sm-inline d-flex align-itemcenter ms-3 mt-2'>
                            <i className='fs-4 bi bi-speedometer'></i>
                                <span className='ms-1 fs-4 d-none d-sm-inline'>PowerUp</span>
                        </a>
                        <hr className='text-secondary d-none d-sm-block'/>
                        <ul className = "nav nav-pills flex-column mt-3 mt-sm-0">                           
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="/home" className="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-house'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Home</span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="/articles" className="nav-link text-white fs-5" aria-current="page">
                                    <i class="bi bi-file-richtext-fill"></i>
                                    <span className='ms-3 d-none d-sm-inline'>Articles</span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-speedometer2'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-grid'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Product</span>
                                </a>
                            </li>
                            <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                                <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                    <i className='bi bi-people'></i>
                                    <span className='ms-3 d-none d-sm-inline'>Customers</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-dark dropdown open">
                    <a className="text-decoration-none text-white dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                                <i className='bi bi-person-circle'></i><span className='ms-2 d-none d-sm-inline'>{usernameAuth}</span> 
                            </a>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        <a className="dropdown-item" href="#">Profile</a>
                        <a className="dropdown-item" href="#">Settings</a>
                        <a className="dropdown-item" ><button onClick={logout} className="btn">Log out</button></a>
                    </div>
                </div>
                </div>
                
            </div>
             
        </div>
    )
}

export default SidebarMenu