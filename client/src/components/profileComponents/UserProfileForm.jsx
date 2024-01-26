import React, { useState } from "react";
import "../../css/UserProfileForm.css";

const UserProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);

  const handleToggleMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await onSaveChanges(editedData);
      setEditMode(false);
      setStatus({ type: "success", message: "Changes saved successfully" });
    } catch (error) {
      console.error("Error saving changes:", error.Error);
      setStatus({ type: "error", message: error.Error });
    }
  };

  return (
    <div>
      <button onClick={handleToggleMode}>
        {editMode ? "Cancel" : "Edit Profile"}
      </button>
      {status && (
        <div
          style={{
            color: status.type === "success" ? "green" : "red",
            margin: "10px 0",
          }}
        >
          {status.message}
        </div>
      )}
      {editMode ? (
        <>
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder={"username"}
              value={editedData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Firstname:
            <input
              type="text"
              name="firstname"
              placeholder={"First Name"}
              value={editedData.firstname}
              onChange={handleChange}
            />
          </label>
          <label>
            Lastname:
            <input
              type="text"
              name="lastname"
              placeholder={"Last Name"}
              value={editedData.lastname}
              onChange={handleChange}
            />
          </label>
          <label>
            Current Weight:
            <input
              type="number"
              name="current_weight"
              placeholder={"Current Weight"}
              value={editedData.current_weight}
              onChange={handleChange}
            />
          </label>
          <label>
            Goal Weight:
            <input
              type="number"
              name="goal_weight"
              placeholder={"Goal Weight"}
              value={editedData.goal_weight}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of birth:
            <input
              type="date"
              name="dateofbirth"
              placeholder={"Date of birth"}
              value={editedData.dateofbirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="height"
              placeholder={"Height"}
              value={editedData.height}
              onChange={handleChange}
            />
          </label>

          <button onClick={handleSaveChanges}>Save Changes</button>
        </>
      ) : (
        <>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Firstname: {userData.firstname || "Not Provided"}</p>
          <p>Lastname: {userData.lastname || "Not Provided"}</p>
          <p>Current Weight: {userData.current_weight || "Not Provided"}</p>
          <p>Goal Weight: {userData.goal_weight || "Not Provided"}</p>
          <p>Date of Birth: {userData.dateofbirth || "Not Provided"}</p>
          <p>Height: {userData.height || "Not Provided"}</p>
        </>
      )}
    </div>
  );
};

export default UserProfileForm;
