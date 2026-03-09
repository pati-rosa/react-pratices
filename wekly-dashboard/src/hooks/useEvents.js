import { useState, useCallback, useMemo } from "react"

const mountWeek = (date) => {
  const currentDate = date ? new Date(date) : new Date()

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const week = []

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)

    const year = day.getFullYear()
    const month = String(day.getMonth() + 1).padStart(2, "0")
    const date = String(day.getDate()).padStart(2, "0")

    week.push(`${year}-${month}-${date}`)
  }

  return week
}

const useEvents = () => {
  const [events, setEvents] = useState([])
  const [selectedWeek, setSelectedWeek] = useState(new Date())

  const weekEvents = useMemo(() => {
    const weekMounted = mountWeek(selectedWeek)

    const mergeEventsOnWeek = weekMounted.map((day) => ({
      date: day,
      events: events
        .filter((e) => e.date === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }))
    return mergeEventsOnWeek
  }, [selectedWeek, events])

  const handleAddEvent = useCallback((event) => {
    if (event.startTime > event.endTime) {
      alert("End time should be after start time.")
      return
    }

    if (event.startTime < event.endTime && event.date) {
      setEvents((prev) => [...prev, event])
      setSelectedWeek(new Date(event.date + "T00:00:00"))
    }
  }, [])

  return {
    setSelectedWeek,
    weekEvents,
    selectedWeek,
    handleAddEvent,
  }
}

export default useEvents
