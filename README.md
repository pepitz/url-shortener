# Sartorius Project - URL Shortener Application

## Overview

This is a modern, responsive URL Shortener application built with Angular, designed to provide users with an efficient way to shorten, track, and manage URLs. The project leverages several technologies and third-party libraries to create an engaging and reliable user experience.

### Key Technologies and Libraries Used

- **Angular 18**: The main framework for building the frontend of the application, utilizing the latest features, including Angular Signals for reactive state management.
- **NgRx Signals**: Used for state management, enabling efficient application-wide state handling with a reactive, signal-based architecture.
- **PrimeNG**: A UI component library providing a wide array of pre-designed components like tables, buttons, dropdowns, and paginator features that are used throughout the project.
- **PrimeFlex and PrimeIcons**: PrimeFlex provides CSS utility classes to enhance the responsiveness and layout flexibility, while PrimeIcons offers a rich set of icons for the interface.
- **AngularX QR Code**: This library generates QR codes from URLs dynamically, allowing users to scan and access shortened links directly.
- **CORS-Anywhere**: A solution to handle CORS issues when the application is connecting to third-party APIs. This solution is embedded in the project structure to ensure cross-origin requests are managed effectively.

### Project Setup and Dependencies

The project includes several dependencies that need to be installed before you can start the application.

Please make sure you have the following prerequisites installed:

- **Node.js (>= 14.x.x)**
- **npm (>= 6.x.x)**

After unzipping the project folder, follow these steps to install the necessary dependencies and start the application.

## Installation and Setup

1. **Unzip the Sartorius Folder**

   - After unzipping the `Sartorius` folder, navigate to the project directory in your terminal.

2. **Install Dependencies**

   - The `node_modules` folder is not included to keep the project light. Therefore, you'll need to install the dependencies by running:

     ```bash
     npm install
     ```

   - This will install all the necessary packages as defined in `package.json`.

3. **Run Proxy and Angular Server**

   - **Important**: To properly run the application, due to the backend API not being configured for CORS, you must execute a combined script to start both the proxy server and the Angular development server.
   - Navigate to the root `url-shortener` folder and run the script `./run-proxy-and-angular.sh`:

     ```bash
     ./run-proxy-and-angular.sh
     ```

   - This script will start the CORS Anywhere proxy server and then the Angular server. Make sure you execute it in any web code editor like VS Code, and run it directly from the terminal console.

4. **Access the Application**
   - Once the server is up and running, open your browser and go to [http://localhost:4200](http://localhost:4200) to access the application.

## Features Overview

- **URL Shortening**: Quickly generate a shortened link for any URL.
- **QR Code Generation**: A QR code is automatically generated for each shortened URL to allow easy sharing, redirecting users to the correct target URL.
- **Table View with Sorting and Filtering**: View all generated URLs, complete with sorting, filtering, and pagination for easy navigation.
- **Dynamic UI Elements**: Built with PrimeNG components, the user interface is dynamic, responsive, and easy to use.

## Folder Structure

Here is the basic folder structure of the project to help you navigate:

- **src/**: Main source code for the Angular application, including components, services, models, and state management.
- **assets/**: Application-specific assets, including images and configuration files.
- **cors-anywhere/**: Contains the code for the CORS-Anywhere server to handle cross-origin requests.
- **run-proxy-and-angular.sh**: A shell script to start the CORS proxy server and the Angular development server.

```
url-shortener/
├── cors-anywhere/
│   ├── server.js
│   └── (other files related to cors-anywhere)
├── src/
│   └── (Angular source files)
├── dist/
│   └── (Angular production build files)
├── node_modules/
│   └── (Node dependencies)
├── run-proxy-and-angular.sh
├── package.json
├── angular.json
└── (other Angular-related files)
```

## Common Issues

- **CORS Errors**: Ensure the CORS-anywhere server is running correctly before starting the Angular application to avoid CORS issues when accessing third-party services.
- **Missing Node Modules**: Make sure to run `npm install` if you encounter module resolution errors.

## Troubleshooting

- If the application fails to start due to missing dependencies, try running:

  ```bash
  npm install
  ```

- If you encounter issues related to CORS, verify that the CORS-anywhere server is active and running.

- If Angular fails to load correctly or there are routing issues, make sure the `baseHref` is set correctly in `angular.json`.

## Deployment

To build the application for deployment:

```bash
ng build --configuration production
```

The build files will be generated in the `dist/url-shortener` directory. Make sure to deploy this folder to a web server that serves static files.

**Note**: Ensure that the CORS Anywhere server is running in the production environment or configure the backend server to support CORS.

## Summary

This project provides a powerful URL-shortening service with an easy-to-use interface built using modern web development tools. By following the instructions above, you should be able to get the project up and running seamlessly.
