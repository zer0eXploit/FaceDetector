# Face Detector API

## About this API

This is called face detector because,

it detects human faces from an input image url with the help of AI service from [clarifai](https://clarifai.com).

This is a backend of the following ***react.js project***:

[Face Detector Front End](https://github.com/zer0eXploit/face-detector-frontend)

This backend system includes basic authentication features 

and interactions with third-party APIs.

## How to run the app?

This app is backed by Express server so, some dependencies are needed.  
Please run npm install before starting the server.

Also the following environment variables are expected:


*   HOST **# The database hostname.**
*   DB_USER **# The database username.**
*   DB_PASS **# The database password.**
*   DB **# The database name.**
*   CLARIFAI_API_KEY **# The clarifai API access key.**

Please also take a look at ***.env.example*** file.

`Command: npm start || npm run dev`


## Live URL

[https://face-clarifai.herokuapp.com](https://face-clarifai.herokuapp.com/)
