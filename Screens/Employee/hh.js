// To host your Node.js application on a local server in your office, you need to ensure that the server is always running and accessible within your local network. Here are the steps you can follow to set up and host your Node.js application:

// ### Step 1: Set Up Node.js Environment

// 1. **Install Node.js:**
//    - Download and install Node.js from the [official website](https://nodejs.org/).
//    - Verify the installation by running:
//      ```bash
//      node -v
//      npm -v
//      ```

// 2. **Install and Configure PM2:**
//    - PM2 is a process manager for Node.js applications that helps keep your application running 24/7.
//    - Install PM2 globally using npm:
//      ```bash
//      npm install -g pm2
//      ```

// ### Step 2: Prepare Your Node.js Application

// 1. **Navigate to Your Project Directory:**
//    ```bash
//    cd path/to/your/nodejs/project
//    ```

// 2. **Ensure Your `package.json` is Properly Configured:**
//    - Make sure the `start` script in your `package.json` is correctly set up. It should look something like this:
//      ```json
//      "scripts": {
//        "start": "node yourMainFile.js"
//      }
//      ```

// ### Step 3: Set Up the Local Server

// 1. **Start Your Node.js Application Using PM2:**
//    - Start the application with PM2 to ensure it restarts automatically if it crashes or the server reboots:
//      ```bash
//      pm2 start yourMainFile.js --name "yourAppName"
//      ```

// 2. **Save the PM2 Process List:**
//    - Save the list of processes to restart them automatically on server reboot:
//      ```bash
//      pm2 save
//      ```

// 3. **Set Up PM2 to Start on Boot:**
//    - Set up PM2 to start on system boot:
//      ```bash
//      pm2 startup
//      ```

//    - This command will provide an output command that you need to run with elevated privileges. For example:
//      ```bash
//      sudo env PATH=$PATH:/home/user/.nvm/versions/node/v14.17.0/bin pm2 startup systemd -u yourUsername --hp /home/yourUsername
//      ```

// ### Step 4: Network Configuration

// 1. **Open Firewall Ports:**
//    - Ensure the port your Node.js application is running on is open in your server's firewall settings.

// 2. **Static IP Address:**
//    - Assign a static IP address to your server to ensure it remains constant.

// ### Step 5: Update Your Code for Hosting

// 1. **Change API Base URL in React Native Application:**
//    - Update the base URL of your API calls in the React Native application to point to your local server's IP address and port.
//    - Example:
//      ```javascript
//      const apiUrl = 'http://your-server-ip-address:your-port/api/v1/';
//      ```

// ### Example Code Changes in React Native

// Assuming your current API base URL is configured in a central place in your React Native project (e.g., a `config.js` file or directly in API calls):

// 1. **config.js or API Service File:**
//    ```javascript
//    // config.js
//    export const API_BASE_URL = 'http://192.168.1.100:3000/api/v1/';
//    ```

// 2. **Usage in API Calls:**
//    ```javascript
//    import { API_BASE_URL } from './config';

//    const fetchData = async () => {
//      try {
//        const response = await fetch(`${API_BASE_URL}some-endpoint`);
//        const data = await response.json();
//        return data;
//      } catch (error) {
//        console.error('Error fetching data:', error);
//      }
//    };
//    ```

// ### Step 6: Testing

// 1. **Test Node.js Application:**
//    - Ensure your Node.js application is running correctly by accessing it from a browser or using `curl`:
//      ```bash
//      curl http://your-server-ip-address:your-port/
//      ```

// 2. **Test React Native Application:**
//    - Run your React Native application and ensure it communicates with your Node.js backend without issues.

// By following these steps, you can host your Node.js application on your local office server and update your React Native application to communicate with it. This setup ensures your application is available 24/7 within your local network. If you plan to access the application remotely, additional steps for setting up a reverse proxy (e.g., using NGINX) and configuring your router for port forwarding may be required.