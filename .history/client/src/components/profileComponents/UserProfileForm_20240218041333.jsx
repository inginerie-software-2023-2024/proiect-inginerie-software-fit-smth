import React, { useState, useCallback, useEffect } from "react";
import "../../css/UserProfileForm.css";

const UserProfileForm = ({ userData, onSaveChanges, onUserDataUpdated }) => {
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

  useEffect(() => {
    console.log('EditMode now:', editMode);
  }, [editMode]);

  useEffect(() => {
    console.log('Status now:', status);
  }, [status]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);
    setEditedData(prevData => {
      const updatedData = { ...prevData, [name]: value };
      console.log('Updated data after handleChange:', updatedData);
      return updatedData;
    });
  }, []);

  const handleSaveChanges = async () => {
    console.log('Attempting to save changes...');
    try {
      await onSaveChanges(editedData);
      console.log('Successfully saved changes.');
      setStatus({ type: "success", message: "Changes saved successfully" });

      if (onUserDataUpdated) {
        onUserDataUpdated();
      }

      setEditMode(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
      setStatus({ type: "error", message: "Failed to save changes" });
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
                <td>{userData.BMI.bmi || "Not Provided"}</td>
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
                <td>{userData.BMR.mifflinStJeor || "Not Provided"}</td>
              </tr>
              <tr>
                <td>BMR (Harris-Benedict)</td>
                <td>{userData.BMR.harrisBenedict || "Not Provided"}</td>
              </tr>
              <tr>
                <td>BMR (Schofield)</td>
                <td>{userData.BMR.schofield || "Not Provided"}</td>
              </tr>
            </>
          )}
          {userData.TDEE && (
            <tr>
              <td>TDEE</td>
              <td>{userData.TDEE || "Not Provided"}</td>
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
              <button onClick={handleToggleMode} className={`btn ${editMode ? "btn-danger" : "btn-primary"}`}>
                {editMode ? "Cancel" : "Edit Profile"}
              </button>

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
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
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


const UserProfileEditForm = React.memo(({ editedData, handleChange, renderInputFields, handleSaveChanges }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSaveChanges(); // Call the handleSaveChanges function
  };

  return (
    <form className="profile mt-3" onSubmit={handleSubmit}>
      {renderInputFields(editedData, handleChange)}
      <button type="submit" className="btn btn-success">
        Save Changes
      </button>
    </form>
  );
});
