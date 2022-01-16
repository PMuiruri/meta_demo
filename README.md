# metademo
## The challenge

The challenge in this project was to create a simple web based dashboard that would used to explore a dataset provided by [metaplay](https://metaplay.io/). The dashboard provides user with statistics that provide insights into the game players metrics.

## Architecture
- Database: A JSON [server](https://github.com/typicode/json-server) is used to store and access data
- Back End: A Nodejs based server where some descriptive statistics (min, max, mean, median) and analytics are computed and presented by RESTFul endpoints. 
- Front End: A React app  is used to present the statistics in form of a dashboard. The re-charts React library is used to create graphing components for the app.

## Process

This project is built using React, Nodejs and JSON server.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the client side of the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.







