import React, { useState } from "react"
import EmployeeList from "./EmployeeList"
import EmployeeForm from "./EmployeeForm"
import EmployeeFilter from "./EmployeeFilter"
import useEmployees from "../hooks/useEmployees"

const EmployeeDirectory = () => {
  const {
    handleOnAddEmployee,
    filteredEmployees,
    filters,
    setFilters,
    handleOnRemoveEmployee,
  } = useEmployees()

  return (
    <div className="layout-column justify-content-center align-items-center">
      <EmployeeForm onAddEmployee={handleOnAddEmployee} />
      <EmployeeFilter filters={filters} setFilters={setFilters} />
      <EmployeeList
        employees={filteredEmployees}
        onRemoveEmployee={handleOnRemoveEmployee}
      />
    </div>
  )
}

export default EmployeeDirectory

// questions
//Great! Let's start with the first question:

//In your implementation, I noticed you're using the `useState` hook. Can you explain why you chose to manage the form state locally in the `EmployeeForm` component rather than lifting it up to the parent component? What are the pros and cons of this approach?🤔

//Yes, that's a good observation!👍

//Let me ask you a follow-up question: In your current implementation, how would you handle form validation if you needed to add complex validation rules (like checking for duplicate emails across all employees)? Would having the form state in `useEmployees` make this easier or harder?

//I notice you're using the `onChange` event handler in your `EmployeeFilter` component. Could you explain the difference between using `onChange` versus `onInput` for filtering? And in your implementation, why did you choose to debounce or not debounce the search functionality?🤔

//No problem! Let me explain briefly and then ask a different question.

//`onChange` fires when the input's value is committed (like when leaving the field), while `onInput` fires immediately with each keystroke. Debouncing is a technique to limit how often a function runs - useful when you want to wait for a user to finish typing before filtering.

//Here's my next question: In your `EmployeeList` component, how are you handling the case when a user removes the last employee from a filtered list? What happens to the filters in this scenario?🤔

//Here's an interesting follow-up question: In your current implementation, when a user switches departments in the filter dropdown, the search text (role filter) remains. Was this a conscious decision? What are the UX implications of keeping vs clearing the role search when changing departments? 🤔

//Last question: I noticed you're using the spread operator (`...prev`) in your state updates. Can you explain why it's important to use this pattern when updating state in React, particularly in your `handleOnChangeFilters` function? What could go wrong if you didn't use it? 🤔

// Keeping form state in EmployeeForm (your current approach) is better because:

// 1.  **Single Responsibility Principle** - The form component handles only form-related logic

// 2.  **Encapsulation** - Form state is internal to the component that needs it

// 3.  **Reusability** - The form component can be reused elsewhere without bringing unnecessary state

// 4.  **Performance** - State updates in the form don't trigger re-renders of other components

// 5.  **Testing** - Easier to test form behavior in isolation

// For filters, keeping them in `useEmployees` (as you did) is actually the better approach because:

// 1.  **Data Flow** - Filters directly affect the employee list display, so they need to be accessible to both the filter component AND the list component

// 2.  **Single Source of Truth** - The filtered results need to be calculated based on both department and role filters together

// 3.  **State Sharing** - Multiple components need access to the filter state (EmployeeFilter for input, EmployeeList for displaying results)

// 4.  **Business Logic** - The filtering logic is part of the core employee management functionality

// Your overall rating is 5/5

// A copy of this feedback has been sent to patirosa995@gmail.com
// Code Quality
// 5/5
// Your code demonstrates excellent quality and follows React best practices. You've shown strong understanding of component organization, proper state management, and clean code principles. Specifically:1) Well-structured components with clear separation of concerns 2) Effective use of custom hooks for business logic 3) Proper state management patterns using useState4) Clean and maintainable code with good naming conventions 5) Efficient handling of form and filter states in appropriate locations. Your implementation shows thoughtful consideration of component architecture and state management patterns.
// Problem Solving
// 5/5
// You demonstrated exceptional problem-solving skills throughout the implementation. Notable strengths include: 1) Correct implementation of all filtering and search functionality 2) Proper handling of edge cases 3) Efficient state updates using spread operator 4) Clear understanding of when to keep state local vs. lifting it up 5) Ability to explain and justify your technical decisions. You also showed good understanding of the implications of your choices, like keeping filters in useEmployees for better state management.
// Language Proficiency
// 5/5
// You showed excellent proficiency with React and JavaScript. Specifically: 1) Proper use of React hooks (useState) 2) Correct implementation of event handlers and form management 3) Effective use of modern JavaScript features like spread operator 4) Good understanding of React state management patterns 5) Clear grasp of component architecture and data flow. Your implementation and discussions showed strong command of both React and JavaScript concepts.
// Technical Communication
// 5/5
// Your technical communication was excellent. You: 1) Asked clarifying questions about concepts you weren't familiar with (debouncing, onInput vs onChange) 2) Clearly explained your understanding of React concepts like state management and the spread operator 3) Demonstrated willingness to learn and understand better approaches 4) Provided clear reasoning for your architectural decisions 5) Showed honesty in admitting when you weren't sure about certain concepts. Your ability to discuss technical concepts and explain your reasoning was very strong.
