# Welcome to Gund Gallery Immersive Experience

This project provides an immersive experience of the Gund Gallery, using p5.js for interactive visualizations and a Node.js server with Socket.io and RESTful APIs.

Our team made this project for the final lab of Kenyon College's Spring 2023 Software Development class, and comprised Ricky Alvarez, Grant Culbertson, Vishad Onta, Sam Rabieh, and Sammy Shrestha.

## Overview

1. **Begin your Immersive Gund Gallery Experience!** - Browse through the virtual gallery and enjoy the interactive features for each artwork.
2. **Scan QR to fully experience each installation** - Scan a QR code to unlock additional content and an interactive experience for specific artworks.
3. **Word Cloud** - An interactive word cloud visualization built using p5.js.
    - Words are weighted in size according to the number of appearances.
    - Words are colored based on the predominant colors in the painting.
4. **Share your experience** - Provide feedback on your experience in three words, separated by commas (e.g., "confusing, RESTful, exciting").
5. **Leave your thoughts** - Let us know your thoughts on the Gund Gallery or our website!

## Getting Started

### Prerequisites

- Node.js (https://nodejs.org/)
- A modern web browser
- Your own VM, with phpMyAdmin installed

### Installation

1. Clone the repository:

```
git clone https://github.com/srabieh/GundGalleryGroup5.git
```

2. Navigate to the project directory:

```
cd GundGalleryGroup5
```
3. On your VM's phpMyAdmin, create a database called **gund**

4. In your database **gund**, import the `db.sql` file on this repo

5. Create a .env file in the project directory that follows the guideline set in exampleEnv.txt
   
   ```nano .env```

6. Two ways to install dependencies and start the server:

    ```npm install```, then ```npm start```
    
    or just ```make```

7. Open your web browser and visit `http://localhost:5000` to access your Gund Gallery Immersive Experience. 

## Project Structure
```
GundGalleryGroup5
├── Makefile
├── README.md
├── controllers
│   ├── adminController.js
│   ├── clientController.js
│   ├── installationController.js
│   └── wordController.js
├── db.js
├── db.sql
├── models
│   ├── adminModel.js
│   ├── clientModel.js
│   ├── installationModel.js
│   ├── responseModel.js
│   └── wordModel.js
├── package-lock.json
├── package.json
├── routes
│   ├── adminRoutes.js
│   ├── clientRoutes.js
│   ├── installationRoutes.js
│   └── wordRoutes.js
├── server.js
└── views
    ├── adminPanel.ejs
    ├── css
    │   └── style.css
    ├── error.ejs
    ├── index.ejs
    ├── installation.ejs
    ├── js
    │   ├── survey.js
    │   └── wordCloud.js
    ├── survey.ejs
    └── wordCloud.ejs
```

## MVC Architecture
In the Gund Gallery Immersive Experience project, the Model-View-Controller (MVC) pattern is used to establish connections between different components of the application, ensuring efficient communication and proper flow of information. Here is a more detailed explanation of the connections between the models, views, and controllers:

Models to Controllers:
Models interact with the database and define the data structure and the business logic of the application. When a controller requires data or needs to perform an operation, it communicates with the corresponding model. For example, if the userController needs to retrieve user information, it will call a function from the userModel. Similarly, if the wordController needs to update the count of a word in the word cloud, it will call a function from the wordModel.

Controllers to Views:
Controllers receive user input from the views and process this input. Based on the input and the results of the communication with the models, controllers update the views accordingly. For example, when the clientController receives input from the survey view (survey.ejs), it may need to process this input, update the clientModel, and then send the updated data back to the view to be displayed. The controllers update the views by rendering a new or updated view and passing the necessary data to be displayed.

Views to Controllers:
Views are responsible for displaying data provided by the controllers and capturing user input. When a user interacts with the application, the views send the input to the appropriate controller to process. For example, when a user submits a survey, the survey view (survey.ejs) will send the input data to the clientController, which will then process the input, interact with the clientModel, and update the view as needed.

Routes:
In this project, the routes play a crucial role in connecting the controllers with the views. The route files in the 'routes' directory (adminRoutes.js, clientRoutes.js, installationRoutes.js, userRoutes.js, and wordRoutes.js) define the application's endpoints and map them to the appropriate controller functions.

When a user interacts with the application, the views send HTTP requests to the defined endpoints in the routes. These routes are associated with specific controller functions that handle the request and produce a response. The controller functions process the input, interact with the models as needed, and render the appropriate views with the data.

To summarize, the connections in the MVC pattern work as follows:

1. Views capture user input and send it to controllers through routes.
2. Controllers process user input, communicate with models, and update views.
3. Models handle data management, business logic, and database operations.

These connections ensure efficient communication and proper flow of information within the application, resulting in a well-organized and maintainable codebase.

## Database
### Table Descriptions

admins
* id: INT(11) - A unique identifier for each admin (Primary Key).
* username: VARCHAR(255) - The admin's username.
* password: VARCHAR(255) - The admin's password.
* email: VARCHAR(255) - The admin's email address.
* session_id: VARCHAR(255) - The session ID associated with the admin.

clients
* id: INT(11) - A unique identifier for each client (Primary Key).
* name: VARCHAR(255) - The client's name.
* email: VARCHAR(255) - The client's email address.
* age: INT(11) - The client's age.
* gender: VARCHAR(255) - The client's gender.
* session_id: VARCHAR(255) - The session ID associated with the client.
* last_submission_date: DATE - The date of the client's last submission (NULL if no submissions have been made).

installations
* id: INT(11) - A unique identifier for each installation (Primary Key).
* work_name: VARCHAR(255) - The name of the artwork.
* artist: VARCHAR(255) - The name of the artist.
* material_medium: VARCHAR(255) - The material and medium of the artwork.
* date: VARCHAR(255) - The date the artwork was created.
* info_short_desc: VARCHAR(255) - A short description of the artwork.

responses
* id: INT(11) - A unique identifier for each response (Primary Key).
* client_id: INT(11) - The ID of the client who filled out the survey (Foreign Key to the clients table).
* installation_id: INT(11) - The ID of the installation where the survey was taken (Foreign Key to the installations table).
* response_text: LONGTEXT - The response text, stored as a longtext field.

words
* id: INT(11) - A unique identifier for each word (Primary Key).
* word: VARCHAR(255) - The word that was entered into the word cloud.
* count: INT(11) - The number of times that the word has been entered into the word cloud (default is 0).
* installation_id: INT(11) - The ID of the installation associated with the word (Foreign Key to the installations table).

### Relationships
The responses table has foreign key relationships with both the clients and installations tables. Each response is linked to a specific client and installation.
The words table has a foreign key relationship with the installations table, linking each word to a specific installation.

## Contributing

If you'd like to contribute, please fork the repository and create a new branch for your feature or bugfix. Send a pull request when your changes are ready for review.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


# Mirrors
Grant's Mirror: http://18.116.8.156:5000/  
Ricky's Mirror: http://3.22.149.75/
Sam's Mirror: http://34.229.136.9:5000/
