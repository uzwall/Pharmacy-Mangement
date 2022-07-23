# Pharmacy-Mangement
This is my first project of Pharmacy System Inventory Features 

# language used are:
	Angular
	NestJs 
	TypeScript

# Instructions to run the Project 

## With Docker
Command:  
`docker-compose up`  or  `COMPOSE_HTTP_TIMEOUT=200 docker-compose up`
and then visit `localhost:4200`

### Tipps & Tricks for docker
If you need to remove docker images or containers you can use one of the following commands.

Command to remove all images:  
`docker rmi -f $(docker images -a -q)`

Command to remove all containers:  
`docker rm -vf $(docker ps -a -q)`

### To Build the Docker
`docker-compose build` or `docker-compose up --detach --build `

To build single service
	`docker-compose build service_name(eg:api) `



### Start the Backend in dev Mode after you added the .env file
`cd api`  
`npm install`  
`npm run start:dev`  
  
### Start the Frontend in dev Mode after you added the .env file
`cd frontend`    
`npm install`  
`ng serve`  
