# mindbeamer - frontend
The ReactJS based frontend for mindbeamer.
This app has two displays which is the full panel display displaying all the events across the convention and the single room display which displays events for the specified room.
There is also a live clock, qr code, and map of the convention on both displays.
To get to the endpoints for either displays look at the [Endpoints](#endpoints) section. This app uses virtual routing thanks to [react-router-dom](https://www.npmjs.com/package/react-router-dom) node package.

Look at the instructions in [Getting Started with Create React App](#getting-started-with-create-react-app) section on how to run the frontend.

## Endpoints
- `http://localhost:3000/#/`
- `http://localhost:3000/#/filtered`
- `http://localhost:3000/#/single?place=MAGES+1`
- `http://localhost:3000/#/filtered&single?place=MAGES+1`


### Full Panel Display
**Example:** `http://localhost:3000/#/`

Returns all of the panels for the full schedule display regardless if it's expired

### Full Panel Display Filtered
**Example:** `http://localhost:3000/#/filtered`

Filters the full schedule display based on if the end time has expired and also orders the times

### Room Specific Display
**Example:** `http://localhost:3000/#/single?place=MAGES+1`

Returns all the panels for the specificed location (single panel room display) which in this example is MAGES 1. There can be any location specified as long as it's after the `place=`. If there are no panels assigned to that location then nothing is returned.
You must concat with a plus sign `+` if the place is more than one word as shown in the example above, otherwise no plus sign is necessary and can be done like so:
`http://localhost:3000/#/single?place=Consoles`

**Note:** This is case sensitive.

### Room Specific Display Filtered
**Example:** `http://localhost:3000/#/filtered&single?place=MAGES+1`

Filters the above single panel room display based off of if the event is today, if the end time of the event is expired and then the order of events is ordered.

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

### `npx jest --coverage --colors`
Launches the test runner with test coverage information collected and reported in the output.\
See the section about [running test coverage](https://jestjs.io/docs/cli#--coverageboolean) for more information.

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
