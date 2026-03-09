import React from "react";
import medical_records from "../medicalRecords";

function Search({ id, setId, setRecords  }) {

  const usersList = medical_records.map((item) => {
    return ({
      id: item.id,
      name: item.data[0].userName
    })
  })

  const handleShowClick = () => {
    if (id) {
      setRecords(medical_records.find((item) => item.id === id).data)
    } else {
      window.alert("Please select a patient name")
    }
  }

  const handleOnSelect = (e) => {
    setId(e.target.value)
  }
  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select data-testid="patient-name" defaultValue="0" onChange={handleOnSelect}>
          <option value="0" disabled>
            Select Patient
          </option>
          {usersList.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" data-testid="show" onClick={handleShowClick}>
        Show
      </button>
    </div>
  );
}

export default Search;
