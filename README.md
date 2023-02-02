# Moovup online test

## Question 1

### First please go inside q1 dir in your shell

`cd q1`

#### If you have Node.js installed, you can run with

`npm run start` or `node main.js`

#### else if you have docker install, you can run with

`docker run -it --rm --name moovup_test_q1 -v ${PWD}:/usr/src/app -w /usr/src/app node:current-slim npm run start`

This will pull a slim version node image, mount the current directory and run `npm run start` in docker

`run_with_docker.ps1` & `run_with_docker.sh` have the same content in case you wanna type less

---------------------------------------------------------------------------

## Question 2

### Make sure you are in the right directory

`cd q2`

#### If you have Node.js installed, you can run with the below command and access the displayed urls

`npm install && npm run dev -- --host`


#### else if you have docker install, you can run with

`docker build -t ben2613/moovup-test .`
`docker run -it -p 8080:80 --rm --name dockerize-vuejs-app-1 ben2613/moovup-test`

This will build a small docker image and then run it, exposing its 80 port

### Clean up
`docker image rm ben2613/moovup-test`
