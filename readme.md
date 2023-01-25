# CVWO winter assignment
I wanted to build a photo webapp as I thought photographers like myself should have a platform to be able to express themselves and build a portfolio at the same time. I use go, fiber for the backend and react on the frontend. 

** To date, the app is not 100% completed as I am having troubles dockerising the go with the arm64 arch of the m1 chip, hence the state it is right now. The app will be finished eventually.

# Photo web application for CVWO winter assignment
Frontend: react
Backend: go
Database: mysql

# To run using air, use these 3 commands first
export GOPATH=$HOME/xxxxx;
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin;
export PATH=$PATH:$(go env GOPATH)/bin;

# To kill a port
kill -9 $(lsof -ti:8080)
