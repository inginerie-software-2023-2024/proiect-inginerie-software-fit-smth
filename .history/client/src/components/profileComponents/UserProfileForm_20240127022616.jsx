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
      <EditToggle editMode={editMode} onToggle={handleToggleMode} status={status} />
      {editMode ? (
        <EditForm data={editedData} onChange={handleChange} onSave={handleSaveChanges} />
      ) : (
        <DisplayProfile data={userData} />
      )}
    </div>
  );
};

export default UserProfileForm;

const EditToggle = ({ editMode, onToggle, status }) => (
  <>
    <button onClick={onToggle} className="btn btn-secondary">
      {editMode ? "Cancel" : "Edit Profile"}
    </button>
    {status && <StatusMessage status={status} />}
  </>
);

const StatusMessage = ({ status }) => (
  <div style={{ color: status.type === "success" ? "green" : "red", margin: "10px 0" }}>
    {status.message}
  </div>
);

const EditForm = ({ data, onChange, onSave }) => (
  <form className="profile" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
    {["firstname", "lastname", "current_weight", "goal_weight", "dateofbirth", "height"].map((field) => (
      <FormField key={field} name={field} value={data[field]} onChange={onChange} />
    ))}
    <button type="submit" className="btn btn-success">
      Submit
    </button>
  </form>
);

const FormField = ({ name, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={`input-${name}`} className="form-label">
      {formatLabel(name)}:
    </label>
    <input
      type={name === "dateofbirth" ? "date" : "text"}
      name={name}
      value={value || ''}
      onChange={onChange}
      className="form-control"
      id={`input-${name}`}
    />
  </div>
);

const formatLabel = (name) => name.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

const DisplayProfile = ({ data }) => (
  <>
    {Object.entries(data).map(([key, value]) => (
      <p key={key}>
        <strong>{formatLabel(key)}:</strong> {value || "Not Provided"}
      </p>
    ))}
  </>
);
