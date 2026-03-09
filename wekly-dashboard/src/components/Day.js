import React from "react"

const Day = ({ day }) => {
  const [year, month, dayNumber] = day.date.split("-")
  const newDate = new Date(year, month - 1, dayNumber)
  const getStringDay = newDate.toLocaleDateString("en-US", { weekday: "long" })
  const getNumberDay = newDate.getDate()

  const getMonth = newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div className="day">
      <div className="day-header">
        <p data-testid="week-days">{getStringDay}</p>
        <p data-testid="week-dates">{getMonth}</p>
      </div>
      <div data-testid="meet-timings" className="day-content">
        {day.events.map((e) => (
          <span key={e.startTime}>
            {e.startTime} - {e.endTime}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Day
