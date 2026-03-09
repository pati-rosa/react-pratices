import React from "react";
import medical_records from "../medicalRecords";

function Records({records, handleSetNextRecords}) {
  return (
    <div className="patient-profile-container" id="profile-view">
      <div className="layout-row justify-content-center">
        {records && 
        <div>
          <div id="patient-profile" data-testid="patient-profile"   className="mx-auto">
            <h4 id="patient-name">{records && records.data[0].userName}</h4>
            <h5 id="patient-dob">DOB: {records && records.data[0].userDob}</h5>
            <h5 id="patient-height">Height: {records && records.data[0].meta.height} cm</h5>
          </div>
          <button className="mt-10 mr-10" data-testid="next-btn"
          onClick={handleSetNextRecords}>
            Next
          </button>
        </div>
        }

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
        {records &&
          <tbody id="table-body" data-testid="patient-table">
            { records.data.map((record, index) => 
            <tr>
              <td>{index + 1}</td>
              <td>{record.userDob.replaceAll("-", "/")}</td>
              <td>{record.diagnosis.name}</td>
              <td>{record.meta.weight}</td>
              <td>{record.doctor.name}</td>
            </tr>
            )}
          </tbody>
        }
      </table>
    </div>
  );
}

export default Records;
