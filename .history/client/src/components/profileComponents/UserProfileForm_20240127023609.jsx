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
      <ToggleEditModeButton editMode={editMode} onToggle={handleToggleMode} />
      {status && <StatusMessage status={status} />}
      {editMode ? (
        <EditForm
          editedData={editedData}
          onChange={handleChange}
          onSave={handleSaveChanges}
        />
      ) : (
        <DisplayUserData userData={userData} />
      )}
    </div>
  );
};

const ToggleEditModeButton = ({ editMode, onToggle }) => (
  <button onClick={onToggle} className="btn btn-secondary">
    {editMode ? "Cancel" : "Edit Profile"}
  </button>
);

const StatusMessage = ({ status }) => (
  <div
    style={{
      color: status.type === "success" ? "green" : "red",
      margin: "10px 0",
    }}
  >
    {status.message}
  </div>
);

const EditForm = ({ editedData, onChange, onSave }) => (
  <form className="profile" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
    {Object.entries(editedData).map(([key, value]) => (
      <div key={key} className="mb-3">
        <label htmlFor={`input-${key}`} className="form-label">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:
        </label>
        <input
          type={key === "dateofbirth" ? "date" : "text"}
          name={key}
          value={value}
          onChange={onChange}
          className="form-control"
          id={`input-${key}`}
        />
      </div>
    ))}
    <button type="submit" className="btn btn-success">
      Save Changes
    </button>
  </form>
);


const DisplayUserData = ({ userData }) => (
  <div>
    {Object.entries(userData).map(([key, value]) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</strong> {value || "Not Provided"}
      </p>
    ))}
  </div>
);


export default UserProfileForm;
