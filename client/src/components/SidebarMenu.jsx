import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
import { useNavigate, NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import '../css/SidebarMenu.css'
import poweruplogo from "../assets/images/poweruplogo.png"

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    axios
      .get("/api/user/profile")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleUpdateProfile = () => {
    axios
      .put("/api/user/profile", { newUsername, newEmail })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  // return (
  //   <div style={{ display: "flex" }}>
  //     {/* Sidebar Menu */}
  //     <SidebarMenu />

      {/* User Profile Content
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <h1>{userData.name}</h1>
        {/* <p>ID: {userData.iduser}</p>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p> */}

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

export default Profile;