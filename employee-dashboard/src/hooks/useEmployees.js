import React, { useMemo, useState } from "react"

const useEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [filters, setFilters] = useState({
    role: "",
    department: "",
  })

  const filteredEmployees = useMemo(() => {
    const applyFilter =
      filters.role || filters.department
        ? employees.filter((employee) => {
            return (
              (!filters.role || employee.role.includes(filters.role)) &&
              (!filters.department ||
                employee.department === filters.department)
            )
          })
        : employees

    return applyFilter
  }, [employees, filters])

  const handleOnAddEmployee = ({ form }) => {
    if (!form.name || !form.email || !form.role || !form.department) {
      alert("All fields are required!")
      return
    }

    const alreadyExistsEmployee = employees.find(
      (employee) => employee.email === form.email,
    )

    if (alreadyExistsEmployee) {
      return
    }

    setEmployees((prev) => {
      return [...prev, form]
    })
  }

  const handleOnRemoveEmployee = ({ email }) => {
    const newEmployees = employees.filter(
      (employee) => employee.email !== email,
    )
    setEmployees(newEmployees)
  }

  return {
    employees,
    filteredEmployees,
    filters,
    setFilters,
    handleOnAddEmployee,
    handleOnRemoveEmployee,
  }
}

export default useEmployees
