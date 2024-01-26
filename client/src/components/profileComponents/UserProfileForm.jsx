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
      <button onClick={handleToggleMode} className="btn btn-secondary">
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
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Username:
              </label>
              <input
                type="text"
                name="username"
                placeholder={"username"}
                value={editedData.username}
                onChange={handleChange}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                First name:
              </label>
              <input
                type="text"
                name="firstname"
                placeholder={"First Name"}
                value={editedData.firstname}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Last Name:
              </label>
              <input
                type="text"
                name="lastname"
                placeholder={"Last Name"}
                value={editedData.lastname}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Current Weight:
              </label>
              <input
                type="number"
                name="current_weight"
                placeholder={"Current Weight"}
                value={editedData.current_weight}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Goal Weight:
              </label>
              <input
                type="number"
                name="goal_weight"
                placeholder={"Goal Weight"}
                value={editedData.goal_weight}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Date of birth:
              </label>
              <input
                type="date"
                name="dateofbirth"
                placeholder={"Date of birth"}
                value={editedData.dateofbirth}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Height:
              </label>
              <input
                type="number"
                name="height"
                placeholder={"Height"}
                value={editedData.height}
                onChange={handleChange}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button
              type="submit"
              class="btn btn-success"
              onClick={handleSaveChanges}
            >
              Submit
            </button>
          </form>
          {/* 
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
          <button onClick={handleSaveChanges}>Save Changes</button> */}
        </>
      ) : (
        <>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>First Name</strong>: {userData.firstname || "Not Provided"}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastname || "Not Provided"}
          </p>
          <p>
            <strong>Current Weight:</strong>{" "}
            {userData.current_weight || "Not Provided"}
          </p>
          <p>
            <strong>Goal Weight:</strong>{" "}
            {userData.goal_weight || "Not Provided"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {userData.dateofbirth || "Not Provided"}
          </p>
          <p>
            <strong>Height:</strong> {userData.height || "Not Provided"}
          </p>
        </>
      )}
    </div>
  );
};

export default UserProfileForm;
