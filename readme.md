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
