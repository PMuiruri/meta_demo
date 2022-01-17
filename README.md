# metademo

## The Challenge

The challenge in this project was to create a simple web based dashboard that would used to explore a gaming dataset. The dashboard presents statistics that provide insights into the game players' metrics.

## Overall Architecture
- Database: A JSON [server](https://github.com/typicode/json-server) is used to store and serve the data.
- Backend: A Nodejs server where descriptive statistics(min, max, mean, median) and analytics are computed and served though RESTFul endpoints. 
- Frontend: A React app used to present the statistics in form of a dashboard, the re-charts React library is used to create graphing components for the app.

## Setting up the project

Begin by cloning the project [here](https://github.com/PMuiruri/meta_demo.git) and follow the instructions below.

### Database
- Install JSON server and ensure the Resources (/players, /guilds, /segments and /offers) are available
```
npm install -g json-server
npx json-server --watch <data_file.json>
```
More instructions on installing JSON Server can be found [here](https://github.com/typicode/json-server)

### Backend Setup
Ensure nodes run-time version 16.X or above is installed.

Change directories to the server folder and install all dependencies 

```
npm install
```
- Run the app by
```
node index
```

PS: In Ubuntu  20.4 this can be abit challenging to get the correct versions installed as seen in this github [issue](https://github.com/nodesource/distributions/issues/1181) due to some seemingly missing public key signatures.

### Frontend Setup
To setup and start the front-end app, change back to the root directory (meta_demo) and start by installing the dependencies

Installing the dependecies run
```
npm install
```
To Start the app run
```
npm start
``` 

## App Visibility
If all installations are successfull and the JSON Server from [http://localhost:3000](http://localhost:3000) and Node Server from [http://localhost:3030](http://localhost:3030) are running, the app can be viewed from [http://localhost:3001](http://localhost:3001).

## Screenshot

A screenshot of the app can be viewed below.

![](./ScreenShot/preview.png)


The app runs the client side of the app in the development mode.
