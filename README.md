# To start the react dev server.
In the root Directory, run:
  ```sh
  $ cd client
  $ npm start
    Starting the development server...
  ```

## To Redeploy Contract [^1]
1. In the root Directory, run:
    ```sh
    $ truffle develop
    ```
3. Replace the mnemonic seed phrase on line 72 or 79 in truffle-config.js for deployment on the networks.

   ![image](https://user-images.githubusercontent.com/20179214/182641062-b6a33849-032a-41c4-bc40-582a262c8170.png)

5. Reset the migration to redeploy the contract on the testnet [^2]:
    ```sh
    $ migrate --reset --network rinkeby (or ropsten)
    ```
3. Copy and replace the sitnftContractAddress variable in client\src\utils\constants.js

   ![image](https://user-images.githubusercontent.com/20179214/182641747-f0ce6521-fc00-400e-afdd-0ebddd3313ba.png)

5. Start the react dev server:
    ```sh
    $ cd client
    $ npm start
      Starting the development server...
    ```
    
## Account & Access Control
- Only Admins can add or remove Admin/Faculty/Students [^1].
  - Contact your admin if you do not have access rights to pages.
- The address that the contract is deployed on is automatically made an Admin.

## Notes
- Due to React **StrictMode** some functions in the application may run twice. 
  This is only present in the development environment. This is not an issue when running in production.

## Troubleshooting
- __Possible additional modules to install (if module not found).__
  - Root Directory
    - npm install @truffle/hdwallet-provider
    - npm install --save-dev @openzeppelin/contracts
  - In Client Directory
    - npm install react-router-dom@6
    - npm install --save ethers

[^1]: The address that the contract is deployed on is automatically made an Admin.
[^2]: Depending on the Ethereum network status, Contract deplopments may fail due at times. 
