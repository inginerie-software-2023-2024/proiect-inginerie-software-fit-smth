import React, { useState, useCallback } from "react";
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


  const renderInputField = (label, type, name, placeholder, value, onChange, id) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}:</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-control"
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
        {renderDropdown("Gender", "gender", "gender", data.gender, handleChange, genderOptions)}
        {renderInputField("Current Weight (kg)", "number", "current_weight", "Current Weight", data.current_weight, handleChange, "currentWeight")}
        {renderInputField("Goal Weight (kg)", "number", "goal_weight", "Goal Weight", data.goal_weight, handleChange, "goalWeight")}
        {renderInputField("Date of Birth", "date", "dateofbirth", "Date of Birth", data.dateofbirth, handleChange, "dateOfBirth")}
        {renderInputField("Height (cm)", "number", "height", "Height", data.height, handleChange, "height")}
        {renderInputField("Body Fat (%)", "number", "bodyFat", "Body Fat Percentage", data.bodyFat, handleChange, "bodyFat")}
        {renderDropdown("Activity Level", "activitylevel", "activitylevel", data.activityLevel, handleChange, activityLevelOptions)}
      </>
    );
  };

  const renderCalculatedData = () => {
    // Helper function to format number values
    const formatNumber = (value) => {
      return typeof value === 'number' ? value.toFixed(2) : value;
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {userData.BMI && (
            <>
              <tr>
                <td>BMI Value</td>
                <td>{formatNumber(userData.BMI.bmi) || "Not Provided"}</td>
              </tr>
              <tr>
                <td>BMI Condition</td>
                <td>{userData.BMI.condition || "Not Provided"}</td>
              </tr>
            </>
          )}
          {userData.BMR && (
            <>
              <tr>
                <td>BMR (Mifflin-St Jeor)</td>
                <td>{formatNumber(userData.BMR.mifflinStJeor) || "Not Provided"}</td>
              </tr>
              <tr>
                <td>BMR (Harris-Benedict)</td>
                <td>{formatNumber(userData.BMR.harrisBenedict) || "Not Provided"}</td>
              </tr>
              <tr>
                <td>BMR (Schofield)</td>
                <td>{formatNumber(userData.BMR.schofield) || "Not Provided"}</td>
              </tr>
            </>
          )}
          {userData.TDEE && (
            <tr>
              <td>TDEE</td>
              <td>{formatNumber(userData.TDEE) || "Not Provided"}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };



  return (
    <div className="container py-2">
      <div className="row justify-content-between stretch-cards-apart">
        <div className="col-lg-5"> {/* Adjust the column size as needed */}
          <div className="card">
            <div className="card-body">
              <StatusMessage status={status} />
              {editMode ? (
                <UserProfileEditForm
                  editedData={editedData}
                  handleChange={handleChange}
                  handleSaveChanges={handleSaveChanges}
                  genderOptions={genderOptions}
                  activityLevelOptions={activityLevelOptions}
                />
              ) : (
                <UserProfileView userData={userData} />
              )}

              <button onClick={handleToggleMode} className={`btn ${editMode ? "btn-danger" : "btn-primary"}`}>
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Health & Fitness Metrics</h5> {/* Title added here */}
              <div className="calculated-data">
                {renderCalculatedData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;


const StatusMessage = React.memo(({ status }) => (
  status && (
    <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"} mt-3`}>
      {status.message}
    </div>
  )
));

const renderParagraph = (label, value) => {
  return (
    <p>
      <strong>{label}:</strong> {value || "Not Provided"}
    </p>
  );
};

const UserProfileView = React.memo(({ userData }) => (
  <div className="user-data mt-3">
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
    {renderParagraph("Activity level", userData.activitylevel)}
  </div>));

const InputField = ({ label, type, name, placeholder, value, onChange }) => (
  <tr>
    <td>{label}:</td>
    <td>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </td>
  </tr>
);

const Dropdown = ({ label, name, value, onChange, options }) => (
  <tr>
    <td>{label}:</td>
    <td>
      <select name={name} value={value} onChange={onChange} className="form-control">
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </td>
  </tr>
);

const UserProfileEditForm = ({ editedData, handleChange, handleSaveChanges, genderOptions, activityLevelOptions }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSaveChanges(editedData);
    } catch (error) {
      console.log('Error found: ', error);
    }
  };

  const fields = [
    { label: "First Name", type: "text", name: "firstname", placeholder: "First Name", value: editedData.firstname },
    { label: "Last Name", type: "text", name: "lastname", placeholder: "Last Name", value: editedData.lastname },
    { label: "Gender", type: "dropdown", name: "gender", options: genderOptions, value: editedData.gender },
    { label: "Current Weight (kg)", type: "number", name: "current_weight", placeholder: "Current Weight", value: editedData.current_weight },
    { label: "Goal Weight (kg)", type: "number", name: "goal_weight", placeholder: "Goal Weight", value: editedData.goal_weight },
    { label: "Date of Birth", type: "date", name: "dateofbirth", placeholder: "", value: editedData.dateofbirth },
    { label: "Height (cm)", type: "number", name: "height", placeholder: "Height", value: editedData.height },
    { label: "Body Fat (%)", type: "number", name: "bodyFat", placeholder: "Body Fat Percentage", value: editedData.bodyFat },
    { label: "Activity Level", type: "dropdown", name: "activitylevel", options: activityLevelOptions, value: editedData.activityLevel },
  ];

  return (
    <form className="profile mt-3" onSubmit={handleSubmit}>
      <table className="table">
        <tbody>
          {fields.map((field) =>
            field.type === "dropdown" ? (
              <Dropdown key={field.name} {...field} onChange={handleChange} />
            ) : (
              <InputField key={field.name} {...field} onChange={handleChange} />
            )
          )}
        </tbody>
      </table>
      <button type="submit" className="btn btn-success">Save Changes</button>
    </form>
  );
};

export default UserProfileEditForm;
