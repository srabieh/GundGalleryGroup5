# Welcome to Gund Gallery Immersive Experience

This project provides an immersive experience of the Gund Gallery, using p5.js for interactive visualizations and a Node.js server with Socket.io and RESTful APIs.

## Overview

1. **Begin your Immersive Gund Gallery Experience!** - Browse through the virtual gallery and enjoy the interactive features for each artwork.
2. **Scan QR to fully experience Artificial Rock #85** - Scan a QR code to unlock additional content and an interactive experience for specific artworks.
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
project-root/
│
├── server/
│   ├── index.js (main server file)
│   ├── config/
│   │   └── config.js (server configuration)
│   │
│   ├── api/
│   │   ├── routes.js (API routes)
│   │   └── controllers/
│   │       ├── page1Controller.js
│   │       ├── page2Controller.js
│   │       ├── page3Controller.js
│   │       ├── page4Controller.js
│   │       └── page5Controller.js
│   │
│   └── socket/
│       ├── socketManager.js (socket.io manager)
│       └── events/
│           ├── event1.js
│           ├── event2.js
│           └── ... (other socket.io event files)
│
├── public/
│   ├── css/
│   │   ├── main.css (global styles)
│   │   ├── page1.css
│   │   ├── page2.css
│   │   ├── page3.css
│   │   ├── page4.css
│   │   └── page5.css
│   │
│   ├── js/
│   │   ├── p5/
│   │   │   └── p5.min.js (p5.js library)
│   │   ├── main.js (global scripts)
│   │   ├── page1.js
│   │   ├── page2.js
│   │   ├── page3.js
│   │   ├── page4.js
│   │   └── page5.js
│   │
│   ├── index.html
│   ├── page1.html
│   ├── page2.html
│   ├── page3.html
│   ├── page4.html
│   └── page5.html
│
├── package.json
└── README.md
```

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
