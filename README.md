# Coding Test By Aung Thu Moe (agthumoe@gmail.com)

## 1. Project Structure
This project contains 2 main folders: `api` and `web`. `api` folder contains the backend API and `web` folder contains the frontend web application.

### 1.1. API
The API is built with NestJS framework using Typescript. It is a simple API that has 3 main endpoints (CRUD) and open API documentation.
- API Documentation: http://localhost:4000/api-docs
- Endpoints:
    - `GET /products`: Get all products
    - `POST /products`: Create a new product
    - `GET /products/:sku`: Get a product by SKU
    - `PUT /products/:sku`: Update a product by SKU
    - `DELETE /products/:sku`: Delete a product by SKU
    - `GET /discounts`: Get all discounts
    - `POST /discounts`: Create a new discount
    - `GET /discounts/:key`: Get a discount by Key
    - `DELETE /discounts/:key`: Delete a discount by Key
    - `POST /rules`: This route is used to apply discount rules to the cart. It accepts a list of products in array format of SKU. It return the discounted price of the cart.

### 1.2. Web
The web application is built with ReactJS using NextJS and Typescript. It is a simple web application that has 2 main pages: `Home` and `Products`. `Home` page is the landing page and can add products to the cart. `Products` page is the page to manage products.

## 2. How to run
### 2.1. Prerequisites
- NodeJS v18.0.0
- Docker v20.10.8
- Docker Compose v1.29.2

### 2.2. Run the project
- Clone the project from Github
- Go to the project root directory
- Run `docker-compose up -d` to start the database
- Go to `api` folder and run `npm install` to install dependencies
- run `cp .env.example .env` and update the environment variables
- Generate and apply migrations for local development
```$ npx prisma migrate dev```
- Populate the database with seed data
```$ npx prisma db seed```
- Run `npm run start:dev` to start the API
- Open the browser and go to http://localhost:4000/api-docs to see the API documentation
- run `npm run test` to run all the tests
- Go to `web` folder and run `npm install` to install dependencies
- run `cp .env.example .env` and update the environment variables
- Run `npm run dev` to start the web application
- Open the browser and go to http://localhost:3000 to see the web application

### Disclaimer
- This project is not production ready. It is just a simple project to demonstrate my coding skills within a short period of time.