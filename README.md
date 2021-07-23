# Project "Print Jobs List"

This WEB application was developed with using:
 - Angular framework (version 12.1.0 ) for frontend part;
 - NodeJS Express framework (version 4.17.1) for backend part.

## Overview
The task was to create WEB application where user can:
 - see list of Print Jobs;
 - add new Print Job to the list.

## Manual
_Precondition._ Supposing Docker is installed in advance.

Application can be run in Docker.
Download the project.
To start the whole application (backend and frontend part) execute:
1. in terminal go to the project root folder and run:
```
docker-compose build
docker-compose up
```
2. in browser open URL http://localhost:9000
3. To stop application use command:
```
docker-compose down
```

To start only backend:
1. in terminal go to the project /Backend folder and run:
```
docker build -t <image-name> .
docker run -p <custom_port>:3001 <image-name>
```
2. server can be reached by endpoints:
  - GET http://localhost:{custom_port}/jobs
  - POST http://localhost:{custom_port}/job

To start only frontend
1. in terminal go to the project /Frontend folder and run:
```
docker build -t <image-name> .
docker run -p <custom_port>:80 <image-name>
```
2. in browser open URL http://localhost:{custom_port}

To stop individual container use command:
```
docker stop [container name]
```

## Development server
### **Backend**
Go to the project /Backend folder.
### _Running project_
1. Execute command 
```
npm install
```
2. Run 
```
npm run start
```
for a dev server.
Server can be reached by endpoints:
  - GET http://localhost:3001/jobs
  - POST http://localhost:3001/job


### _Running unit tests_
Run 
```
npm run test
```
to execute unit tests via Jest.

### _Running lint_
Run 
```
npm run lint
```
to see the list of possible fixes.

### **Frontend**
Go to the project /Frontend folder.
### _Running project_
1. Execute command 
```
npm install
```
2. Run 
```
ng serve
```
for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run 
```
ng build
```
to build the project. The build artifacts will be stored in the `dist/` directory.

### _Running unit tests_
Run
```
ng test
```
to execute unit tests via [Karma](https://karma-runner.github.io).

### _Running lint_
Run 
```
ng lint
```
to see the list of possible fixes.
