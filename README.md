# Face Detector

## About this App

This is called face detector because it detects human faces from an input image url with the help of AI service from [clarifai](https://clarifai.com).

Includes basic authentication and state management without redux as it is not a complex application.


## How to run the app?

This app is backed by Express server so some dependencies are needed.  
Please run npm install before starting the server.

Also the following environment variables are expected:

*   HOST **# The database hostname.**
*   DB_USER **# The database username.**
*   DB_PASS **# The database password.**
*   DB **# The database name.**
*   CLARIFAI_API_KEY **# The clarifai API access key.**

`Command: npm start || npm run dev`


## Live URL

[https://face-clarifai.herokuapp.com](https://face-clarifai.herokuapp.com/)
