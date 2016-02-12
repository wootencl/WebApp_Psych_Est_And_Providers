# Instructions 

Here are some instructions to get this app up and running. 

## Prerequisite:
The following steps are going to assume you have Node.js installed. If that's not the case you may want to head over to their [site](https://nodejs.org/en/download/) and get a fresh install. 

### Steps:
* First you'll want to either clone this repository via terminal (or command line) onto your computer or download the zip which should be an option above.
* Now in terminal navigate to the directory that contains the cloned/downloaded files and run the following commands to download the remaining dependencies:
```
npm install express
npm install body-parser
npm install pokitdok-nodejs
```
* The above commands will download locally the node_modules needed by the project.
* Once those are installed type the following into your terminal to get your server up and running:
```
node server.js
```
* This above should cause the following to output into terminal: "```App listening at http://:::8081```"
* Lastly, navigate to ```http://127.0.0.1:8081/index.html``` in your browser and the app will be there.
