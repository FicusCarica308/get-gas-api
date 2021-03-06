# get-gas-api: DEPLOYED
get-gas-api is a non-production practice/portfolio API service that returns data associated with gas stations in a users area + vehicle specifications. 
* Express.js
* mongoDB
* Node.js
* Typescript

## Project Objective:
For this project I wanted to create an application that could consistently stay connected to a database during usage. The API will call an external API on database failure or if a item is not found in a DB query. The API will also normalize the external data then store it in the database to be used later. This prevents unecessary external API calls or re-normalizing of repeated calls.

## Routes:
* /specs/:devKey/:type/:make/:model/:year/:cylinders?/ - Returns MPG data for a vehicle using an external API.
* /stations/:devKey/:latitude/:longitude/ - Returns the GPS Coordinates of gas stations ranked closest to farthest using the given longitude and latitude. (uses google maps places API and includes the gas stations place_id)

### /specs parameters description
* :devKey (required) - This is a development API key that makes the API only accessable to desired users
* :type (required) - The type of MPG the user wants to return (possible vals include 'all_mpg', 'city_mpg', 'highway_mpg', or 'combination_mpg').
* :make (required) - This is the vehicle manufacturer of the users vehicle (e.g. Honda, Toyota, Ford, etc...).
* :model (required) - The model of the users vehicle (e.g. Camry, F-150, Accord, etc...).
* :year - (required) - The year of production of the users vehicle.
* :cylinders? (optional) - An optional parameter that can narrow down the search results to more accurate MPG ratings. The number of cylinders of a vehicles engine.

### /stations parameters description
* :devKey (required) - This is a development API key that makes the API only accessable to desired users
* :latitude (required) - The latitude of the users current position.
* :longitude (required) - the longitude of the users current position.


### Technologies:
* Node.js - Node has become my go-to environemnt just because of its overall community and robustness (plus I still have alot to learn about it)
* Express.js - I decided to use Express.js as my back-end framework due to my previous experience with it in another portfolio project.
* (MongoDB Atlas) - I used mongoDB atlas to store all normalized data from the /specs route.
* Typescript - Since I was working with alot of moving data / unknown values I wanted to give Typescript a shot to help make some sense of the confusion

## Learning Objectives:
* Explore Express.js routing
* Explore Express.js in route parameters using the Request object
* Exploring using Express.js's req.local application storage
* Explore using configuring and using typescript to develop a application
* Explore returning and error handling of async/await function in an application
* Practice configuring Jest / Typescript / eslint in a new project fro scratch
* Trying out mongoDB Atlas as a database
* Practice normalizing data from external API's and storing normalized data
* Configure CORS in a express application

#### Other:
The project requires process.env vairables 
* DEV_KEY - dev key required to access data
* GOOGLE_MAPS_API_KEY - A google maps API key for /stations route
* MONGO_URI - to enable database storage
* SPECS_API_KEY - Key to car specification API
* SPECS_API_URL
* ORIGIN - The external origin that cors allows access to

#### TO DO LIST:
* create a app configuration file that exports all process.env variables into the app so I have a central point of access for all of them in development

## Authors
Manuel Enrique Figueroa - [Github](https://github.com/FicusCarica308), [LinkedIn](https://www.linkedin.com/in/manuel-figueroa-292216215)

## License
Public Domain. No copy write protection.
