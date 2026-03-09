import React, { useState } from "react"

const EventForm = ({ onAddEvent }) => {
  const formInitialState = {
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
  }

  const [form, setForm] = useState(formInitialState)

  const handleOnChangeForm = (e) => {
    const { name, value } = e.currentTarget

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleOnFormSubmit = (e) => {
    e.preventDefault()

    onAddEvent(form)

    setForm(formInitialState)
  }

  return (
    <div className="event-form">
      <form onSubmit={handleOnFormSubmit}>
        <label className="date-label">
          Date:
          <input
            data-testid="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleOnChangeForm}
            required
          />
        </label>
        <label className="time-label">
          Start Time:
          <input
            data-testid="start-time"
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleOnChangeForm}
            required
          />
        </label>
        <label className="time-label">
          End Time:
          <input
            data-testid="end-time"
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleOnChangeForm}
            required
          />
        </label>
        <button data-testid="event-button" type="submit">
          Schedule Event
        </button>
      </form>
    </div>
  )
}

export default EventForm
