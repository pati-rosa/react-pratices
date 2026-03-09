/* eslint-disable */
import React from "react"
import App from "../src/App"
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Weekly Calendar Application Testing", () => {
  beforeEach(() => {
    render(<App />)
  })

  afterEach(() => {
    cleanup()
  })

  it("renders heading of the month correctly", () => {
    const currentDate = new Date()
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const startMonth = startOfWeek.toLocaleDateString("en-US", {
      month: "short",
    })
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" })
    const year = endOfWeek.getFullYear()
    const currMonth = startOfWeek.toLocaleDateString("en-US", { month: "long" })

    const monthHeading = screen.getByTestId("month-heading")
    if (startMonth === endMonth) {
      expect(monthHeading).toHaveTextContent(`${currMonth} ${year}`)
    } else {
      expect(monthHeading).toHaveTextContent(
        `${startMonth}-${endMonth} ${year}`,
      )
    }
  })

  it("renders the correct date in the input field initially", () => {
    const currentDate = new Date().toISOString().split("T")[0]
    const dateInput = screen.getByTestId("date")

    expect(dateInput).toHaveValue(currentDate)
  })

  it("renders the correct days & dates of the week in UI", () => {
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDay = day.toLocaleDateString("en-US", { weekday: "long" })
      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      const allWeekDays = screen.getAllByTestId("week-days")
      const allWeekDates = screen.getAllByTestId("week-dates")
      var receivedWeekDay = allWeekDays[i]
      var receivedWeekDates = allWeekDates[i]
      expect(receivedWeekDay).toHaveTextContent(weekDay)
      expect(receivedWeekDates).toHaveTextContent(weekDates)
    }
  })

  it("prev week button functions properly", () => {
    const prevButton = screen.getByTestId("prev-button")
    fireEvent.click(prevButton)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - 7)
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDay = day.toLocaleDateString("en-US", { weekday: "long" })
      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const allWeekDays = screen.getAllByTestId("week-days")
      const allWeekDates = screen.getAllByTestId("week-dates")
      var receivedWeekDay = allWeekDays[i]
      var receivedWeekDates = allWeekDates[i]

      expect(receivedWeekDay).toHaveTextContent(weekDay)
      expect(receivedWeekDates).toHaveTextContent(weekDates)
    }
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 7)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const startMonth = startOfWeek.toLocaleDateString("en-US", {
      month: "short",
    })
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" })
    const year = endOfWeek.getFullYear()
    const currMonth = startOfWeek.toLocaleDateString("en-US", { month: "long" })

    const monthHeading = screen.getByTestId("month-heading")

    console.log("monthHeading", monthHeading)
    if (startMonth === endMonth) {
      expect(monthHeading).toHaveTextContent(`${currMonth} ${year}`)
    } else {
      expect(monthHeading).toHaveTextContent(
        `${startMonth}-${endMonth} ${year}`,
      )
    }
  })

  it("next week button functions properly", () => {
    const nextButton = screen.getByTestId("next-button")
    fireEvent.click(nextButton)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + 7)
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDay = day.toLocaleDateString("en-US", { weekday: "long" })
      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const allWeekDays = screen.getAllByTestId("week-days")
      const allWeekDates = screen.getAllByTestId("week-dates")
      var receivedWeekDay = allWeekDays[i]
      var receivedWeekDates = allWeekDates[i]

      expect(receivedWeekDay).toHaveTextContent(weekDay)
      expect(receivedWeekDates).toHaveTextContent(weekDates)
    }
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 7)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const startMonth = startOfWeek.toLocaleDateString("en-US", {
      month: "short",
    })
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" })
    const year = endOfWeek.getFullYear()
    const currMonth = startOfWeek.toLocaleDateString("en-US", { month: "long" })

    const monthHeading = screen.getByTestId("month-heading")
    if (startMonth === endMonth) {
      expect(monthHeading).toHaveTextContent(`${currMonth} ${year}`)
    } else {
      expect(monthHeading).toHaveTextContent(
        `${startMonth}-${endMonth} ${year}`,
      )
    }
  })

  it("check if all input fields are required", () => {
    const date = screen.getByTestId("date")
    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")

    expect(date).toHaveAttribute("required")
    expect(startTime).toHaveAttribute("required")
    expect(endTime).toHaveAttribute("required")
  })

  it("check if alert is prompt, if end time is before start time", async () => {
    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")

    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {})

    expect(startTime).toHaveAttribute("required")
    expect(endTime).toHaveAttribute("required")

    fireEvent.change(startTime, { target: { value: "14:00" } })
    fireEvent.change(endTime, { target: { value: "13:00" } })

    fireEvent.click(screen.getByTestId("event-button"))
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        "End time should be after start time.",
      )
    })
    mockAlert.mockRestore()
  })

  it("Meeting has been scheduled on the board correctly", () => {
    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")

    fireEvent.change(startTime, { target: { value: "13:00" } })
    fireEvent.change(endTime, { target: { value: "14:00" } })
    fireEvent.click(screen.getByTestId("event-button"))

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate())
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const today = new Date()
      const meetTimings = screen.getAllByTestId("meet-timings")
      if (
        weekDates ==
        today.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("13:00 - 14:00")
      } else {
        const meetTimings = screen.getAllByTestId("meet-timings")
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).not.toHaveTextContent("13:00 - 14:00")
      }
    }
  })

  it("Multiple meetings are scheduled on the board correctly in sorting order", () => {
    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")

    fireEvent.change(startTime, { target: { value: "17:00" } })
    fireEvent.change(endTime, { target: { value: "17:30" } })
    fireEvent.click(screen.getByTestId("event-button"))

    fireEvent.change(startTime, { target: { value: "06:00" } })
    fireEvent.change(endTime, { target: { value: "07:00" } })
    fireEvent.click(screen.getByTestId("event-button"))

    fireEvent.change(startTime, { target: { value: "13:00" } })
    fireEvent.change(endTime, { target: { value: "14:00" } })
    fireEvent.click(screen.getByTestId("event-button"))

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate())
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const today = new Date()
      const meetTimings = screen.getAllByTestId("meet-timings")
      if (
        weekDates ==
        today.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("13:00 - 14:00")
        expect(meetScheduled).toHaveTextContent("06:00 - 07:00")
        expect(meetScheduled).toHaveTextContent("17:00 - 17:30")
        expect(meetScheduled).toHaveTextContent(
          "06:00 - 07:0013:00 - 14:0017:00 - 17:30",
        )
      } else {
        const meetTimings = screen.getAllByTestId("meet-timings")
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).not.toHaveTextContent("13:00 - 14:00")
        expect(meetScheduled).not.toHaveTextContent("06:00 - 07:00")
        expect(meetScheduled).not.toHaveTextContent("17:00 - 17:30")
        expect(meetScheduled).not.toHaveTextContent(
          "06:00 - 07:0013:00 - 14:0017:00 - 17:30",
        )
      }
    }
  })

  it("renders combined 2 months heading correctly", () => {
    const currentDate = new Date("2024-02-01T00:00:00")
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const startMonth = startOfWeek.toLocaleDateString("en-US", {
      month: "short",
    })
    const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" })
    const year = endOfWeek.getFullYear()

    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")
    const date = screen.getByTestId("date")

    fireEvent.change(date, { target: { value: "2024-02-01" } })
    fireEvent.change(startTime, { target: { value: "17:00" } })
    fireEvent.change(endTime, { target: { value: "17:30" } })
    fireEvent.click(screen.getByTestId("event-button"))
    const monthHeading = screen.getByTestId("month-heading")
    expect(monthHeading).toHaveTextContent(`${startMonth}-${endMonth} ${year}`)
  })

  it("check if the calendar UI shifts to the scheduled meeting week", () => {
    const currentDate = new Date("2024-01-07T00:00:00")
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const currMonth = startOfWeek.toLocaleDateString("en-US", { month: "long" })
    const year = endOfWeek.getFullYear()

    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")
    const date = screen.getByTestId("date")

    fireEvent.change(date, { target: { value: "2024-01-07" } })
    fireEvent.change(startTime, { target: { value: "17:00" } })
    fireEvent.change(endTime, { target: { value: "17:30" } })
    fireEvent.click(screen.getByTestId("event-button"))
    const monthHeading = screen.getByTestId("month-heading")
    expect(monthHeading).toHaveTextContent(`${currMonth} ${year}`)

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date("2024-01-07T00:00:00")
      currentDate.setDate(currentDate.getDate())
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDay = day.toLocaleDateString("en-US", { weekday: "long" })
      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const allWeekDays = screen.getAllByTestId("week-days")
      const allWeekDates = screen.getAllByTestId("week-dates")
      var receivedWeekDay = allWeekDays[i]
      var receivedWeekDates = allWeekDates[i]

      expect(receivedWeekDay).toHaveTextContent(weekDay)
      expect(receivedWeekDates).toHaveTextContent(weekDates)

      const today = new Date("2024-01-07T00:00:00")
      const meetTimings = screen.getAllByTestId("meet-timings")
      if (
        weekDates ==
        today.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("17:00 - 17:30")
      } else {
        const meetTimings = screen.getAllByTestId("meet-timings")
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).not.toHaveTextContent("17:00 - 17:30")
      }
    }
  })

  it("handle multiple meetings scheduled on different days correctly", () => {
    const startTime = screen.getByTestId("start-time")
    const endTime = screen.getByTestId("end-time")
    const date = screen.getByTestId("date")

    fireEvent.change(date, { target: { value: "2024-10-09" } })
    fireEvent.change(startTime, { target: { value: "14:00" } })
    fireEvent.change(endTime, { target: { value: "15:30" } })
    fireEvent.click(screen.getByTestId("event-button"))

    fireEvent.change(date, { target: { value: "2024-10-04" } })
    fireEvent.change(startTime, { target: { value: "18:00" } })
    fireEvent.change(endTime, { target: { value: "19:30" } })
    fireEvent.click(screen.getByTestId("event-button"))

    fireEvent.change(date, { target: { value: "2024-10-05" } })
    fireEvent.change(startTime, { target: { value: "20:00" } })
    fireEvent.change(endTime, { target: { value: "21:00" } })
    fireEvent.click(screen.getByTestId("event-button"))

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date("2024-10-04T00:00:00")
      currentDate.setDate(currentDate.getDate())
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const meetOneOct = new Date("2024-10-04T00:00:00")
      const meetTwoOct = new Date("2024-10-05T00:00:00")
      const meetTimings = screen.getAllByTestId("meet-timings")
      if (
        weekDates ==
        meetOneOct.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("18:00 - 19:30")
      } else if (
        weekDates ==
        meetTwoOct.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("20:00 - 21:00")
      } else {
        const meetTimings = screen.getAllByTestId("meet-timings")
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).not.toHaveTextContent("20:00 - 21:00")
        expect(meetScheduled).not.toHaveTextContent("18:00 - 19:30")
      }
    }

    fireEvent.click(screen.getByTestId("next-button"))

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date("2024-10-09T00:00:00")
      currentDate.setDate(currentDate.getDate())
      const day = new Date(currentDate)
      day.setDate(currentDate.getDate() - currentDate.getDay() + i)

      const weekDates = day.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      const meetDay = new Date("2024-10-09T00:00:00")
      const meetTimings = screen.getAllByTestId("meet-timings")
      if (
        weekDates ==
        meetDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ) {
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).toBeInTheDocument()
        expect(meetScheduled).toHaveTextContent("14:00 - 15:30")
      } else {
        const meetTimings = screen.getAllByTestId("meet-timings")
        const meetScheduled = meetTimings[i]
        expect(meetScheduled).not.toHaveTextContent("14:00 - 15:30")
      }
    }
  })
})
