# AISplitterProject


## Live Demo
[Live project can be found here!](https://ariadna-aisplitterproject.onrender.com/)
## Project Goals
- To put together and make practical use of what I learned in my CanCode Communites JavaScript Frameworks
- To get some experience integrating my front-end with a back-end.
- To learn about developer practices, like setting up an application, maintaining my own git repository and writing a README.md.
- To learn how to deploy and share my project.
- To build a portfolio piece to show off to potential employers.

## Technologies Used:
- TypeScript
- React
- Material UI
- Node.js

## This project encompasses the following concepts:

- Share global state with the Context API
- AJAX with the useEffect hook or <Suspense />
- Routing
- Authentication
- TypeScript


## Getting Started
To load this project locally you will first
Fork the repo and clone your forked version in someplace that you will remember it (e.g. ~/Documents). Open the folder in Visual Studio Code. Open your terminal and install the server.
```
npm install
```
To start the server, 

```
cd server/
npm run start.
```
 You should see this:
```
Your server is running on http://localhost:3001/
```
Then to start the client side of the application
```
cd ../client
npm run start.
```
Press ctrl+c to stop

If you open http://localhost:3001/ in your browser, Thunder Client or Postman, you should see a message like this:
```
Its running! To use the API, please refer to the Project README.md.
```


## User Stories
- As a user, I want to log in so that I can use the web application.
- As a user, I want to click on my profile's default image to reveal the logout button, allowing me to log out from the application.
- As a user, I want to navigate to the text splitter page by clicking on the "Text Splitter" button in the header.
- As a user, I want to input a large block of text so that I can process and split it using the application.
- As a user, after inputting a large block of text, I want to see different chunk buttons generated. This way, I can use these buttons to easily copy and paste the broken down parts of the transcription.
- As a user, I want to navigate to the YouTube text splitter page by clicking on the "YouTube Text Splitter" button in the header.
- As a user, I want the ability to click a button to copy instructions for Chat GPT before submitting chunks of the transcription.
- As a user, I want to be able to click the "History" button in the header so that I can view my past transcriptions.
- As a user, I want to input a YouTube video link on the YouTube Text Splitter page so that the transcript can be fetched and generated for further processing.

## Hurdles Faced
One of the significant challenges I've encountered during the project relates to the logic of saving collections and seamlessly integrating this with the backend API while ensuring data persistence in local storage. This task marks the final step in completing the project, and I am actively working to overcome this hurdle.

