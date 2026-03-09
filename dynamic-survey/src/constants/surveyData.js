const surveyData = [
  {
    id: "q1",
    question: "Do you like ice cream?",
    type: "single",
    options: ["Yes", "No"],
    next: {
      Yes: "q2",
      No: "q4",
    },
  },
  {
    id: "q2",
    question: "What is your favorite flavor?",
    type: "single",
    options: ["Vanilla", "Chocolate", "Strawberry"],
    next: {
      Vanilla: "q3",
      Chocolate: "q3",
      Strawberry: "q3",
    },
  },
  {
    id: "q3",
    question: "Would you like to add toppings?",
    type: "single",
    options: ["Yes", "No"],
    next: {
      Yes: "q5",
      No: null, // End of survey
    },
  },
  {
    id: "q4",
    question: "Why don’t you like ice cream?",
    type: "text",
    next: {
      default: null, // End of survey
    },
  },
  {
    id: "q5",
    question: "Which topping would you prefer?",
    type: "single",
    options: ["Choco Chips", "Hot Fudge", "Crumbled Brownie", "Sprinkles"],
    next: {
      default: null, // End of survey
    },
  },
];

export default surveyData;
