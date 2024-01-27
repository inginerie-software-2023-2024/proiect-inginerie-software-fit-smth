import React, { useState, useEffect } from "react";
import "../../css/UserProfileForm.css";

const UserProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEditedData({ ...userData });
  }, [userData]);

  const handleToggleMode = () => setEditMode(!editMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
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
      <StatusMessage status={status} />
      {editMode ? (
        <EditProfileForm
          editedData={editedData}
          handleChange={handleChange}
          handleSaveChanges={handleSaveChanges}
        />
      ) : (
        <ViewProfile userData={userData} />
      )}
    </div>
  );
};

export default UserProfileForm;

const EditProfileForm = ({ editedData, handleChange, onSaveChanges }) => (
  <form 
    className="profile" 
    onSubmit={async (e) => {
      e.preventDefault();
      try {
        await onSaveChanges(editedData);
      } catch (error) {
        console.error("Error saving changes:", error.Error);
      }
    }}
  >
    {Object.entries(editedData).map(([key, value]) => (
      <FormField key={key} name={key} value={value} onChange={handleChange} />
    ))}
    <button type="submit" className="btn btn-success">
      Submit
    </button>
  </form>
);


const ViewProfile = ({ userData }) => (
  <div>
    <p><strong>Username:</strong> {userData.username}</p>
    <p><strong>Email:</strong> {userData.email}</p>
    <p><strong>First Name:</strong> {userData.firstname || "Not Provided"}</p>
    <p><strong>Last Name:</strong> {userData.lastname || "Not Provided"}</p>
    <p><strong>Current Weight:</strong> {userData.current_weight || "Not Provided"}</p>
    <p><strong>Goal Weight:</strong> {userData.goal_weight || "Not Provided"}</p>
    <p><strong>Date of Birth:</strong> {userData.dateofbirth || "Not Provided"}</p>
    <p><strong>Height:</strong> {userData.height || "Not Provided"}</p>
  </div>
);

const FormField = ({ name, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={`input-${name}`} className="form-label">
      {name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')}:
    </label>
    <input
      type={name === "dateofbirth" ? "date" : "text"}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
      id={`input-${name}`}
    />
  </div>
);

const StatusMessage = ({ status }) => {
  if (!status) return null;

  return (
    <div style={{ color: status.type === "success" ? "green" : "red", margin: "10px 0" }}>
      {status.message}
    </div>
  );
};