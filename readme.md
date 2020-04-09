# Pi Cam Server
Hosted @ https://picamserver.herokuapp.com/

Web Cam server for My Pet Robot project

## My Pet Robot project
#### Project Stack
![project stack](https://ab-cobb.github.io/assests/project_stack.png)

The My Pet Robot project allows for remote controlling and "robot" car over the internet through either a web app or iOS device. The Robot is controlled by a raspberry pi running a node.js server and comincates with two cloud servers receiving commands via socket.io messaging from our socket.io server and streaming live web cam feed to our webcam server. The Socket.io server receives commands from the frontend interface (React web app and iOS app) and logs cominication in a mongo stlas cloud database, socket comands are forwarded to raspberry pi. The Web cam server receive an mpeg stream through post request and pipes it to a web socket for consumtion by react front end and display webcam feed to the web for iphone web port al connection. Both front ends (iPhone and React Web App) allow the user to give comands to the pi via websockets and display live web cam feed from the robot.

## Repostitory for the Project
### Raspberry Pi
https://github.com/AB-Cobb/robot_drive
### Web Cam Server
https://github.com/AB-Cobb/pi_cam_server
### Socket.io Server
https://github.com/AB-Cobb/robot_serve
### React Web App
https://github.com/GiuseppeRag/robot_serve_react
### iOS app
https://github.com/AB-Cobb/Robot_Control_V2
