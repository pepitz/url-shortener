# Sartorius Project - URL Shortener Application

## Overview

This is a modern, responsive URL Shortener application built with Angular, designed to provide users with an efficient way to shorten, track, and manage URLs. The project leverages several technologies and third-party libraries to create an engaging and reliable user experience.

### Key Technologies and Libraries Used

- **Angular 18**: The main framework for building the frontend of the application. We are utilizing some of the newest features, including signals for reactive state management.
- **NgRx Signals**: Used for state management, making it easier to handle application-wide state efficiently with reactive, signal-based architecture.
- **PrimeNG**: A UI component library providing a wide array of pre-designed components like tables, buttons, dropdowns, and paginator features that are used throughout the project.
- **PrimeFlex and PrimeIcons**: PrimeFlex is used for CSS utility classes to enhance the responsiveness and layout flexibility, and PrimeIcons provides a rich set of icons for the interface.
- **AngularX QR Code**: This library allows us to generate QR codes from URLs dynamically, providing a quick way for users to scan and access shortened links directly.
- **CORS-Anywhere**: A solution to handle CORS issues when the application is connecting to third-party APIs. This solution runs alongside the Angular application to ensure cross-origin requests are handled effectively.

### Project Setup and Dependencies

The project includes several dependencies that need to be installed before you can start the application.

Please make sure you have the following prerequisites installed:

- **Node.js (>= 22.1.0)**
- **npm (>= 10.9.0)**

After cloning the project from GitHub, follow these steps to install the necessary dependencies and start the application.

## Installation and Setup

1. **Clone the Repository**

   - Clone the repository from GitHub:

     ```bash
     git clone https://github.com/pepitz/url-shortener.git
     ```

2. **Install Dependencies**

   - Navigate to the `url-shortener` folder and install the dependencies:

     ```bash
     cd url-shortener
     npm install
     ```

   - This will install all the necessary packages as defined in `package.json`.

3. **Run Proxy and Angular Server**

   - **Important**: To properly run the application, due to the backend API not being configured for CORS, you must execute a combined script to start both the proxy server and the Angular development server.

   - Run the script `run-proxy-and-angular.sh` to start both services:

     ```bash
     ./run-proxy-and-angular.sh
     ```

   - The script will automatically navigate to the CORS-anywhere folder, start the proxy, and then start the Angular server.

   - Note: You may need to set permissions to execute the script by running:

     ```bash
     chmod +x run-proxy-and-angular.sh
     ```

4. **Access the Application**
   - Once the server is up and running, open your browser and go to [http://localhost:4200](http://localhost:4200) to access the application.

## Features Overview

- **URL Shortening**: Quickly generate a shortened link for any URL.
- **QR Code Generation**: A QR code is automatically generated for each shortened URL to allow easy sharing.
- **Table View with Sorting and Filtering**: View all generated URLs, complete with the ability to sort and filter entries. Pagination is also enabled for efficient navigation.
- **Dynamic UI Elements**: Built with PrimeNG components, the user interface is dynamic, responsive, and easy to use.

## Folder Structure

Here's a detailed look at the folder structure to help you understand how the project is organized:

```
url-shortener/
|
├── cors-anywhere/                  # CORS proxy server to handle CORS issues
│   ├── server.js                   # Main server file for CORS proxy
│   ├── package.json                # Dependencies for the CORS proxy
│   └── ...                         # Other files related to CORS setup
|
├── src/                            # Main source code for the Angular application
│   ├── app/                        # Angular application components, services, etc.
│   ├── assets/                     # Static assets like images and configuration files
│   ├── styles.scss                 # Global stylesheet for the application
│   └── index.html                  # Main HTML file
├── angular.json                    # Angular CLI configuration file
├── package.json                    # Dependencies for the Angular application
├── run-proxy-and-angular.sh        # Shell script to start both the proxy server and the Angular app
└── README.md                       # Documentation file
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
