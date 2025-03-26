# Catie's notes

## How to run:

I built the wireframe with create react app - a more indepth (out of the box) description of how to run things is below in the "Getting Started with Create React App" section.

- To run: npm start
- To view in browser: `http://localhost:3000`
- To test: npm test

## What I would inmprove

I have added a quick list of improvements with their priority in the parent component "UserRoleManager.tsx - here I'll explain those and why they are on the improvement list.

- High priority:

  - **add mobile functionality**: I have not yet implemented any mobile functionality. Due to time constraint, I didn't yet figre out how to properly implement the breakpoints utilizing Redix. Previously I haveused styled components deeply, and am accustomed to adding breakpoints this way, so given the time contraint I tried to stick to I have yet to finish implementing.
  - **add more accessibility coverage**: Accessibility is high priority, and althought I added aria-label to the buttons, I would like to add more coverage in the appropriate way throughout the app.
  - **add success toast notificaitons**: This is a nice user experience to pair with the loading visuals when an API request is completed.

- Medium priority:
  - **better UX on error handling**: I think it's a better expereince when the error states reflect the UI consistantly. For example, if the API returns an error, I'd like to show that error (user friendly version) within the table, or as a toast noticiation.
  - **add ability to upload or edit avatar image**: This would just be a nice improvement - I did notice that the api adds a random avatar for you currently when you add a new user so I did not think this was a high priority for thetake home.
  - **add empty state for search if search returns no results on tables**: Again, similar to better error handling, it would be nice if there was a more pleasant explination that the search did not return any results. Maybe even add a button to add that search term into the User or Role data set.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
