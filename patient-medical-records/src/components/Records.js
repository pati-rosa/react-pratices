import React from "react";
import medical_records from "../medicalRecords";

function Records({records, setRecords, setId, id}) {
  const handleClickNext = () => {
    const lastUserId = medical_records[medical_records.length-1].id
    const newId= Number(id) >= Number(lastUserId) ? 1 : Number(id) + 1
    setId(String(newId))
    setRecords(medical_records.find((item) => item.id === String(newId)).data)
  }
  return (
    <div className="patient-profile-container" id="profile-view">
      <div className="layout-row justify-content-center">
        {id && <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
          <h4 id="patient-name">{id && medical_records.find((item) => item.id === String(id)).data[0].userName}</h4>
          <h5 id="patient-dob">DOB: {id && medical_records.find((item) => item.id === String(id)).data[0].userDob}</h5>
          <h5 id="patient-height">Height: {id && (medical_records.find((item) => item.id === String(id)).data[0].meta.height + " cm")}</h5>
        </div>}
        { id && <button className="mt-10 mr-10" data-testid="next-btn" onClick={handleClickNext}>
          Next
        </button>}
      </div>

      <table id="patient-records-table">
        <thead id="table-header">
          <tr>
            <th>SL</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Weight</th>
            <th>Doctor</th>
          </tr>
        </thead>
        {records && <tbody id="table-body" data-testid="patient-table">
          {records && records.map((record, index) => {
            return <tr>
            <td>{index + 1}</td>
            <td>{record.userDob.replaceAll("-", "/")}</td>
            <td>{record.diagnosis.name}</td>
            <td>{record.meta.weight}</td>
            <td>{record.doctor.name}</td>
          </tr>
          })}
        </tbody>}
      </table>
    </div>
  );
}

export default Records;
