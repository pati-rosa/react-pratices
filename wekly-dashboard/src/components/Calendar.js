import React from "react"
import Day from "./Day"
import EventForm from "./EventForm"
import useEvents from "../hooks/useEvents"

const Calendar = () => {
  const { weekEvents, setSelectedWeek, handleAddEvent, selectedWeek } =
    useEvents()

  const firstDate = new Date(selectedWeek)
  firstDate.setDate(firstDate.getDate() - firstDate.getDay())

  const firstMonthShort = firstDate.toLocaleDateString("en-US", {
    month: "short",
  })

  const lastDate = new Date(firstDate)
  lastDate.setDate(lastDate.getDate() + 6)

  const lastMonthShort = lastDate.toLocaleDateString("en-US", {
    month: "short",
  })

  const concatMonths = `${firstMonthShort}-${lastMonthShort}`

  const monthShort = firstDate.toLocaleDateString("en-US", { month: "long" })

  const getYear = lastDate.getFullYear()

  const goToNextWeek = () => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(newDate.getDate() + 7)
    setSelectedWeek(newDate)
  }

  const goToPrevWeek = () => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(newDate.getDate() - 7)
    setSelectedWeek(newDate)
  }

  return (
    <div className="calendar">
      <div className="header">
        <button data-testid="prev-button" onClick={goToPrevWeek}>
          &lt; Prev Week
        </button>
        <h2 data-testid="month-heading">
          {firstMonthShort === lastMonthShort ? monthShort : concatMonths}{" "}
          {getYear}
        </h2>
        <button data-testid="next-button" onClick={goToNextWeek}>
          Next Week &gt;
        </button>
      </div>
      <EventForm onAddEvent={handleAddEvent} />
      <div className="days">
        {weekEvents.map((day) => (
          <Day key={day.date} day={day} />
        ))}
      </div>
    </div>
  )
}

export default Calendar
