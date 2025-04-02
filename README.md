# Inventory Tracker
This app is a full stack demonstration of building and managing an inventory.

The application utilizes tables, to display database data, and allows users to create items, variations, categories, attributes and build item skus to manage stock amounts and individual prices.

## Authorization
To access the application, a user must be authorized, for demo purposes, the username and password are the default values in the login form. The default username is `InventoryUser` and password is `password303`.

## Starting the services locally
This app has three services, the migration services, the backend service and the front end (UI) service. To start the back end services locally you will need docker-compose on your machine and node version 20 or greater.

### Starting the backend
From the root run `docker-compose up --build -d` to run in the background or `docker-compose up --build` to view the backend logs. This command starts a postgres service, runs a database migration, adds data to the database and starts the backend service.

### Starting the front end
When running locally you must install the node packages, run `npm --prefix front-end install`, once the packages are installed run `npm --prefix front-end run dev`

