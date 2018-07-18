# Toptal challenge
This is the backend and frontend project


# Prerequisites
Docker version >= 17.06
docker-compose version >= 1.21.1


# Set up and run project 
Run build.sh script. With that frontend, backend and database will start in the following addresses:

- fronend - http://localhost:80
- backend - http://localhost:3020
- mongodb - http://localhost:27017


# Guide through the application
To create a regular user use the route:

    - POST localhost:3020/v1/users
    - Payload: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
        "caloriesPerDay": 5000
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To create a user manager provide the adminCode field with '#$ecretuser-admincode123' code.
To create a user admin provide the adminCode field with '#$ecretadmincode123' code.

To get user data:

    - GET localhost:3020/v1/users/:userId
    - Response: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
        "caloriesPerDay": 5000,
        "meals":[]
    }

To update user data:

    - PATCH localhost:3020/v1/users/:userId
    - Payload: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
        "caloriesPerDay": 5000
    }

To delete user:

    - DELETE localhost:3020/v1/users/:userId


To login:

    - POST localhost:3020/v1/users/login
    - Payload: 
    {
	    "email": string,
	    "password": string,
    }

then you will receive a token to insert in your header in the (x-auth), use it to access your data.

To create your meals:

    - POST localhost:3020/v1/users/:userId/meals
    - Payload: 
    {
	    "text": "lunch text",
	    "calories": 1000,
	    "time": 12, (number between 0 and 23)
	    "date": "2018-01-01" (Iso date)
    }

To retrieve your meals:

    - GET localhost:3020/v1/users/:userId/meals
    - Response: 
    [
    {
        "text": "lunch text",
        "time": 12,
        "date": "2018-01-01T00:00:00.000Z",
        "calories": 4500,
        "id": "5b1ed247d6ddbf000f3f05df"
    }
    ]

To update your meals:

    - PATCH localhost:3020/v1/users/:userId/meals/:mealsId
    - Payload: 
    [
    {
        "text": "lunch text",
        "time": 12,
        "date": "2018-01-01",
        "calories": 4500,
    }
    ]

To delete your meals:

    - DELETE localhost:3020/v1/users/:userId/meals/:mealsId


# User Manager private routes


To get all users:

    - GET localhost:3020/v1/users/
    - Response: 
    [{
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
        "caloriesPerDay": 5000,
        "meals":[]
    }]

To update a specific user:

    - PATCH localhost:3020/v1/users/:userId
    - Payload: 
    {
	    "email": "email@email.com",
	    "name": "user name",
	    "password": "yoursecretpassword",
        "caloriesPerDay": 5000,
        "meals":[]
    }

To delete a specific user:

    - DELETE localhost:3020/v1/users/:userId


# Admin private routes


To get all meals:

    - GET localhost:3020/v1/meals/
    - Response: 
    [{
        "time": 14,
        "_id": "5b1402adf3206a11f3495950",
        "text": "my lunch",
        "calories": 300,
        "date": "2018-01-01T00:00:00.000Z",
        "user": "5b1309db53f3dc2d91b7be0f",
    }]

To update a meal:

    - PATCH localhost:3020/v1/meals/:mealId
    - Payload: 
    {
        "time": 14,
        "_id": "5b1402adf3206a11f3495950",
        "text": "my lunch",
        "calories": 300,
        "date": "2018-01-01T00:00:00.000Z",
        "user": "5b1309db53f3dc2d91b7be0f",
    }

To delete a meal:

    - DELETE localhost:3020/v1/meals/:mealId

