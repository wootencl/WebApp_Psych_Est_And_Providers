# Setup Instructions 

The following are some brief instructions on how to get this web application up and running. 

## Prerequisite:
The following steps are going to assume you have Node.js installed. If that's not the case they have excellent documentation and installation software for both mac and windows. So head over to [their](https://nodejs.org/en/) website to get a fresh install and when you're done with that we can move onto the next steps.

### Steps:
1. Our first step will to be either clone this repository via terminal or command prompt or to download the zip above. Below is the command necessary to clone the repository. Also it should be noted that if you downloaded the zip it may be best to unarchive it upon download. 

    ```
    git clone https://github.com/wootencl/WebApp_Psych_Est_And_Providers.git
    ```

2. The next step will involve node or more specifically the node package manager npm (which is thankfully bundled into each node install). Below is the code to install the node dependencies for this web application: 

    ```
    // Before downloading the dependencies you need to be in the project's root directory
    // A command similiar to the following should get you there
    cd ~/('Downloads' or the directory you cloned into)/WebApp_Psych_Est_And_Providers

    npm install express
    npm install pokitdok-nodejs
    ```

3. These commands will download locally the node_modules needed by the project. 
4. Now that you have all the dependencies installed you are almost ready to use the web application. You must next type the following into terminal or the command prompt:

    ```
    node server.js
    ```

5. The above command will fire up a node server and should cause the following to output into terminal/command prompt: "```App listening at http://:::8081```"
6. The last and final step should be to navigate to ```http://127.0.0.1:8081/index.html``` in your browser of choice and the app will be there. 

That's it. You now can get up-to-date price of a psychiatric diagnosis in Charleston and in addition get a list of doctors specializing in psychology in the Charleston area. 
