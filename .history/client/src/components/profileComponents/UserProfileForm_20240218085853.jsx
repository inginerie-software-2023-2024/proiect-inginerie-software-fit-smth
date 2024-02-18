import React, { useState } from "react";
import "../../css/UserProfileForm.css";

const UserProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(null);

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  const activityLevelOptions = [
    { value: 'Sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'Light', label: 'Lightly active (light exercise/sports 1-3 days/week)' },
    { value: 'Moderate', label: 'Moderately active (moderate exercise/sports 3-5 days/week)' },
    { value: 'Very Active', label: 'Very active (hard exercise/sports 6-7 days a week)' },
    { value: 'Super Active', label: 'Super active (very hard exercise/sports & physical job or 2x training)' },
  ];

  const handleToggleMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async (editedData) => {
    try {
      const response = await onSaveChanges(editedData);
      if (response.status === 200) {
        setStatus({ type: "success", message: "Profile updated successfully." });
      } else {
        setStatus({ type: "error", message: "Failed to update profile." });
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      setStatus({ type: "error", message: "An error occurred during save." });
    }
  };

  const renderInputField = (label, type, name, placeholder, value) => (
    <tr>
      <td>{label}:</td>
      <td>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="form-control"
        />
      </td>
    </tr>
  );

  const renderDropdown = (label, name, value, options) => (
    <tr>
      <td>{label}:</td>
      <td>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </td>
    </tr>
  );

  const renderForm = () => (
    <form onSubmit={e => {
      e.preventDefault();
      handleSaveChanges(editedData);
    }}>
      <table className="table">
        <tbody>
          {renderInputField("First Name", "text", "firstname", "Enter First Name", editedData.firstname)}
          {renderInputField("Last Name", "text", "lastname", "Enter Last Name", editedData.lastname)}
          {renderDropdown("Gender", "gender", editedData.gender, genderOptions)}
          {renderInputField("Current Weight (kg)", "number", "current_weight", "Enter Current Weight", editedData.current_weight)}
          {renderInputField("Goal Weight (kg)", "number", "goal_weight", "Enter Goal Weight", editedData.goal_weight)}
          {renderInputField("Date of Birth", "date", "dateofbirth", "", editedData.dateofbirth)}
          {renderInputField("Height (cm)", "number", "height", "Enter Height", editedData.height)}
          {renderInputField("Body Fat (%)", "number", "bodyFat", "Enter Body Fat Percentage", editedData.bodyFat)}
          {renderDropdown("Activity Level", "activitylevel", editedData.activityLevel, activityLevelOptions)}
        </tbody>
      </table>
      <button type="submit" className="btn btn-success">Save Changes</button>
    </form>
  );

  return (
    <div className="container py-2">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {editMode ? renderForm() : <div>{/* Render user data view here */}</div>}
              <button onClick={handleToggleMode} className="btn btn-primary mt-3">
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
