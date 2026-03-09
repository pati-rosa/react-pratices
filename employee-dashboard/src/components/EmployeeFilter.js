const EmployeeFilter = ({ filters, setFilters }) => {
  const handleOnChangeFilters = (e) => {
    const { name, value } = e.currentTarget
    setFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  return (
    <div className="layout-column justify-content-center align-items-center">
      <h3>Filter Employees</h3>
      <div>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search by Role"
          aria-label="Search Employees by Role"
          className="mr-10"
          value={filters.role}
          name="role"
          onChange={handleOnChangeFilters}
        />
        <select
          data-testid="filter-select"
          aria-label="Filter Employees by Department"
          value={filters.department}
          name="department"
          onChange={handleOnChangeFilters}
        >
          <option value="" disabled>
            Select Department
          </option>
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Design">Design</option>
          <option value="HR">HR</option>
        </select>
      </div>
    </div>
  )
}

export default EmployeeFilter
