# Welcome to Gund Gallery Immersive Experience

This project provides an immersive experience of the Gund Gallery, using p5.js for interactive visualizations and a Node.js server with Socket.io and RESTful APIs.

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

### Installation

1. Clone the repository:

```
git clone https://github.com/srabieh/GundGalleryGroup5.git
```

2. Navigate to the project directory:

```
cd GundGalleryGroup5
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

5. Open your web browser and visit `http://localhost:3000` to experience the Gund Gallery Immersive project.

## Project Structure
```
GundGalleryGroup5/
├── README.md
├── controllers
│   ├── adminController.js
│   ├── clientController.js
│   ├── installationController.js
│   ├── userController.js
│   └── wordController.js
├── models
│   ├── adminModel.js
│   ├── clientModel.js
│   ├── installationModel.js
│   ├── userModel.js
│   └── wordModel.js
├── package.json
├── routes
│   ├── adminRoutes.js
│   ├── clientRoutes.js
│   ├── installationRoutes.js
│   ├── userRoutes.js
│   └── wordRoutes.js
├── server.js
└── views
    ├── adminPanel.ejs
    ├── css
    │   └── style.css
    ├── error.ejs
    ├── installation.ejs
    ├── js
    │   ├── survey.js
    │   └── wordCloud.js
    ├── survey.ejs
    └── wordCloud.ejs
```

## Database
clients
-------
The clients table stores information about each client who fills out the survey. The table includes the following columns:
- id (INT): A unique identifier for each client.
- name (VARCHAR): The client's name.
- email (VARCHAR): The client's email address.
- age (INT): The client's age.
- gender (VARCHAR): The client's gender.

responses
---------
The responses table stores the responses to the survey for each client. The table includes the following columns:
- id (INT): A unique identifier for each response.
- client_id (INT): The ID of the client who filled out the survey (foreign key to the clients table).
- installation_id (INT): The ID of the installation where the survey was taken (foreign key to the installations table).
- questions (JSON): A JSON object that stores the questions and their answers for the survey.

admins
------
The admins table stores information about the administrators of the application. The table includes the following columns:
- id (INT): A unique identifier for each admin.
- username (VARCHAR): The admin's username.
- password (VARCHAR): The admin's password.

installations
--------------
The installations table stores information about the different installations where the survey can be taken. The table includes the following columns:
- id (INT): A unique identifier for each installation.
- name (VARCHAR): The name of the installation.
- location (VARCHAR): The location of the installation.

words
-----
The words table stores the words that have been entered into the survey's word cloud. The table includes the following columns:
- id (INT): A unique identifier for each word.
- word (VARCHAR): The word that was entered into the word cloud.
- count (INT): The number of times that the word has been entered into the word cloud.

## Contributing

If you'd like to contribute, please fork the repository and create a new branch for your feature or bugfix. Send a pull request when your changes are ready for review.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


# Mirrors
Grant's Mirror:  
Ricky's Mirror:  
Sam Rabieh's Mirror:  
Samyak's Mirror:  
Vishad's Mirror:  