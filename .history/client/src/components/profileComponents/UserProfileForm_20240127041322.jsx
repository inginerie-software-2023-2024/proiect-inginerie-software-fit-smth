import React, { useState } from "react";
import "../../css/UserProfileForm.css";

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
  // ... Add more options as needed
];

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

  const renderInputField = (label, type, name, placeholder, value, onChange, id) => {
    return (
      <div class="mb-3">
        <label for={id} class="form-label">
          {label}:
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          class="form-control"
          id={id}
        />
      </div>
    );
  };

  const renderDropdown = (label, name, id, value, onChange, options) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <select 
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          id={id}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };
  

  const renderInputFields = (data, handleChange) => {
    return (
      <>
        {renderInputField("First name", "text", "firstname", "First Name", data.firstname, handleChange, "firstname")}
        {renderInputField("Last Name", "text", "lastname", "Last Name", data.lastname, handleChange, "lastname")}
        {renderInputField("Current Weight (kg)", "number", "current_weight", "Current Weight", data.current_weight, handleChange, "currentWeight")}
        {renderInputField("Goal Weight (kg)", "number", "goal_weight", "Goal Weight", data.goal_weight, handleChange, "goalWeight")}
        {renderInputField("Date of Birth", "date", "dateofbirth", "Date of Birth", data.dateofbirth, handleChange, "dateOfBirth")}
        {renderInputField("Height (cm)", "number", "height", "Height", data.height, handleChange, "height")}
        {renderInputField("Gender", "text", "gender", "Gender", data.gender, handleChange, "gender")}
        {renderInputField("Body Fat (%)", "number", "bodyFat", "Body Fat Percentage", data.bodyFat, handleChange, "bodyFat")}
        {renderInputField("Activity Level", "text", "activityLevel", "Activity Level", data.activityLevel, handleChange, "activityLevel")}
      </>
    );
  };

  const renderCalculatedData = () => {
    return (
      <>
        {userData.BMI && (
          <>
            {renderParagraph("BMI Value", userData.BMI.bmi)}
            {renderParagraph("BMI Condition", userData.BMI.condition)}
          </>
        )}

        {userData.BMR && (
          <>
            {renderParagraph("BMR (Mifflin-St Jeor)", userData.BMR.mifflinStJeor)}
            {renderParagraph("BMR (Harris-Benedict)", userData.BMR.harrisBenedict)}
            {renderParagraph("BMR (Schofield)", userData.BMR.schofield)}
          </>
        )}

        {userData.TDEE && <>{renderParagraph("TDEE", userData.TDEE)}</>}

      </>
    );
  };

  const renderParagraph = (label, value) => {
    return (
      <p>
        <strong>{label}:</strong> {value || "Not Provided"}
      </p>
    );
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
          <form className="profile">
            {renderInputFields(editedData, handleChange)}
            <button
              type="submit"
              class="btn btn-success"
              onClick={handleSaveChanges}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          {renderParagraph("Username", userData.username)}
          {renderParagraph("Email", userData.email)}
          {renderParagraph("First Name", userData.firstname)}
          {renderParagraph("Last Name", userData.lastname)}
          {renderParagraph("Gender", userData.gender)}
          {renderParagraph("Current Weight (kg)", userData.current_weight)}
          {renderParagraph("Body Fat (%)", userData.bodyFat)}
          {renderParagraph("Goal Weight (kg)", userData.goal_weight)}
          {renderParagraph("Date of Birth", userData.dateofbirth)}
          {renderParagraph("Height (cm)", userData.height)}
          {renderParagraph("Activity level", userData.activityLevel)}
          {renderCalculatedData()}
        </>
      )}
    </div>
  );
};

export default UserProfileForm;
