# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Problem Statement
This message will be auto-pinned
Create an application "Dynamic Survey Builder" that generates a survey based on a provided set of questions. The survey should adapt based on user responses, with each answer potentially leading to a different subsequent question. The application must handle multiple-choice and text input questions and correctly interpret when the survey should end.
Input Format
Detailed Requirements
1. Load the survey questions from the provided surveyData array. Each question has:
id: Unique identifier
question: The text of the question.
type: The type of question (single for multiple-choice or text for text input).
options: Array of possible answers (for single type).
next: Object mapping each answer to the ID of the next question, or null to end the survey. Use default if the answer is not explicitly listed.
2. Form Validation:
Validate that none of the fields are empty upon submission.
If any field is empty, display an error message: "All fields are required." The form should not be submitted.
3. Displaying Submitted Data:
If the form is successfully submitted, display the entered information below the form.
Clear the input fields after a successful submission.
4. The survey should start with the first question and progress based on the user's choices.
Output Format
User Action 1
User fills in all fields (Name: "John Doe", Email: "john@example.com", Message: "Hello there!").
User clicks the "Submit" button.
The entered information ("John Doe", "john@example.com", "Hello there!") is displayed below the form.
The input fields are cleared.
User Action 2
User fills in some fields and leaves others empty.
User clicks the "Submit" button.
No information is displayed.
An error message "All fields are required." is shown.
Constraints
Sample Interaction
Initial State
The form is displayed with empty fields.
No submitted information or error messages are shown.

Congratulations! 🎉 That's great that all tests are passing! Before we wrap up, I'd like to ask you a few follow-up questions about React fundamentals related to your implementation:

1.  In your implementation, you used the `useState` hook. Could you explain why you chose to use an object for the `responses` state instead of an array? 🤔
Good thinking! Yes, that's correct! Using an object gives us O(1) lookup time when we need to find a specific response by questionId, compared to O(n) with an array.

Let me ask you another question: In your `SurveyQuestion` component, you're using a local state for `textAreaContent`. Why did you choose to manage this state locally instead of lifting it up to the parent component? 🤔

Excellent answer! 👏 That's a great example of following React's principle of keeping state as close as possible to where it's used.

Actually, the reason isn't because it's an object vs array - it's about React's state management principles. The key reason we use the spread operator (`...responses`) instead of direct mutation is that:

1.  React relies on state immutability to detect changes and trigger re-renders
    
2.  Direct mutations of state (whether object or array) won't trigger a re-render
    
3.  The spread operator creates a new object reference, which React can detect as a change
    

One more question: In your implementation, you're using the spread operator (`...responses`) when updating the responses state. Could you explain why direct mutation (like `responses[questionId] = answer`) wouldn't work here? 🤔

Actually, the reason isn't because it's an object vs array - it's about React's state management principles. The key reason we use the spread operator (`...responses`) instead of direct mutation is that:

1.  React relies on state immutability to detect changes and trigger re-renders
    
2.  Direct mutations of state (whether object or array) won't trigger a re-render
    
3.  The spread operator creates a new object reference, which React can detect as a change

Would you like to explain what could happen if we did directly mutate the state? 🤔

Great! So if we directly mutated the state like this:

```javascript

responses[questionId] = answer;  // Direct mutation

```

What would happen is:

1.  The object reference would stay the same
    
2.  React wouldn't detect that the state has changed
    
3.  The component wouldn't re-render with the new data
    
4.  The UI wouldn't update to show the new response
    

That's why we always create a new object reference using the spread operator:

```javascript

setResponses(prev => ({

  ...prev,

  [questionId]: answer

}));

```

Does this explanation help clarify why state immutability is important in React? 🤔
That's a great attitude! Understanding state immutability and React's state management is crucial for building robust applications.

Since you mentioned you want to study more, here are key areas to focus on:

1.  React state immutability
    
2.  State management patterns
    
3.  Component lifecycle and re-rendering
    
4.  Custom hooks (like the one you created)
    

Would you like to end the interview now? I can provide you with detailed feedback on your performance.🎯