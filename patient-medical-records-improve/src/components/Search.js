import React, { useState } from "react";
import medical_records from "../medicalRecords";

function Search({ handleSetRecords}) {
  const [id, setId] = useState()

  const usersList = medical_records && medical_records.map(record => {
    return { 
      id: record.id,
      name: record.data[0].userName
    }
  })

  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select 
          data-testid="patient-name" 
          defaultValue="0"
          onChange={(e) => setId(e.target.value)}
        >
          <option value="0" disabled>
            Select Patient
          </option>
          {
            usersList && usersList.map((user) => 
            <option value={user.id}>{user.name}</option>)
          }
        </select>
      </div>

      <button type="submit" data-testid="show" onClick={() => handleSetRecords(id)}>
        Show
      </button>
    </div>
  );
}

export default Search;
