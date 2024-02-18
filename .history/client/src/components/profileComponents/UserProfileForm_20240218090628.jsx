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


  const UserProfileView = React.memo(({ userData }) => {
    const genderLabel = genderOptions.find(option => option.value === userData.gender)?.label || "Not Provided";

    const activityLevelLabel = activityLevelOptions.find(option => option.value === userData.activityLevel)?.label || "Not Provided";

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Username</th>
              <td>{userData.username}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <th scope="row">First Name</th>
              <td>{userData.firstname}</td>
            </tr>
            <tr>
              <th scope="row">Last Name</th>
              <td>{userData.lastname}</td>
            </tr>
            <tr>
              <th scope="row">Gender</th>
              <td>{genderLabel}</td>
            </tr>
            <tr>
              <th scope="row">Current Weight (kg)</th>
              <td>{userData.current_weight}</td>
            </tr>
            <tr>
              <th scope="row">Goal Weight (kg)</th>
              <td>{userData.goal_weight}</td>
            </tr>
            <tr>
              <th scope="row">Date of Birth</th>
              <td>{userData.dateofbirth}</td>
            </tr>
            <tr>
              <th scope="row">Height (cm)</th>
              <td>{userData.height}</td>
            </tr>
            <tr>
              <th scope="row">Body Fat (%)</th>
              <td>{userData.bodyFat}</td>
            </tr>
            <tr>
              <th scope="row">Activity Level</th>
              <td>{activityLevelLabel}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });


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
                  renderInputFields={renderInputFields}
                  handleSaveChanges={handleSaveChanges}
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



const UserProfileEditForm = React.memo(({ editedData, handleChange, renderInputFields, handleSaveChanges }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSaveChanges(editedData);
    } catch (error) {
      console.log('Error found: ', error);
    }
  };

  return (
    <form className="profile mt-3" onSubmit={handleSubmit}>
      {renderInputFields(editedData, handleChange)}
      <button type="submit" className="btn btn-success">Save Changes</button>
    </form>
  );
});
