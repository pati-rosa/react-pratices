import React, { useState } from "react"

const EmployeeForm = ({ onAddEmployee }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    department: "",
  })

  const handleOnChangeForm = (e) => {
    const { name, value } = e.currentTarget

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className="layout-column justify-content-center align-items-center">
      <h3 className="">Add Employee</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onAddEmployee({ form })
        }}
      >
        <input
          className="mr-10"
          data-testid="name-input"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleOnChangeForm}
          aria-label="Employee Name"
        />
        <input
          className="mr-10"
          data-testid="role-input"
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleOnChangeForm}
          aria-label="Employee Role"
        />
        <select
          className="mr-10"
          data-testid="department-select"
          name="department"
          aria-label="Employee Department"
          value={form.department}
          onChange={handleOnChangeForm}
        >
          <option value="" disabled>
            Select a Department
          </option>
          <option value="IT">IT</option>
          <option value="Design">Design</option>
          <option value="HR">HR</option>
        </select>
        <input
          type="email"
          data-testid="contact-input"
          name="email"
          placeholder="Contact"
          value={form.email}
          onChange={handleOnChangeForm}
          aria-label="Employee Contact"
        />
        <button data-testid="submit-button" type="submit">
          Add Employee
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm
