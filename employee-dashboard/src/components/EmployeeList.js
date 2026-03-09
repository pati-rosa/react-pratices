import React from "react"

const EmployeeList = ({ employees, onRemoveEmployee }) => {
  return (
    <div className="layout-column justify-content-center align-items-center">
      <h3>Employee List</h3>
      {employees.length === 0 && <p>No Employees Added.</p>}

      {employees.length > 0 &&
        employees.map((employee) => {
          return (
            <ul
              data-testid="employee-list"
              className="employee-list pa-0 w-100"
            >
              <li
                className="employee-list-item pa-10 flex justify-content-between align-items-center"
                data-testid="employee-item"
                key="1"
              >
                <div className="employee-details">
                  <strong>{employee.name}</strong> - {employee.role} (
                  {employee.department}) - {employee.email}
                </div>
                <button
                  className="remove-button"
                  data-testid="remove-button"
                  type="button"
                  onClick={() => onRemoveEmployee({ email: employee.email })}
                >
                  Remove
                </button>
              </li>
            </ul>
          )
        })}
    </div>
  )
}

export default EmployeeList
