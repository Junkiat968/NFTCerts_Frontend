# To start the react dev server.
```sh
$ cd client
$ npm start
  Starting the development server...
```

## To Redeploy Contract [^1]
1. Replace the mnemonic seed phrase on line 72 or 79 for deployment on the networks.
2. In Root Directory run the following:
```sh
$ truffle develop
$ migrate --reset --network rinkeby (or roptsten)
```
3. Copy and replace the sitnftContractAddress variable in client\src\utils\constants.js

[^1]: The address that the contract is deployed on is automatically made an Admin.

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
