import React, { useState } from "react";
import "../../css/UserProfileForm.css";

const UserProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);

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

const EditProfileForm = ({ editedData, handleChange, handleSaveChanges }) => (
  <>
    <form className="profile">
      {/* Form fields here */}
      <button type="submit" className="btn btn-success" onClick={handleSaveChanges}>
        Submit
      </button>
    </form>
  </>
);

const ViewProfile = ({ userData }) => (
  <>
    {/* Display user data here */}
  </>
);
