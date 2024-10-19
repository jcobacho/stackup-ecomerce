# Stackup Ecomerce

This is a fullstack app that uses Django + DRF in the backend
and React + Redux in the front making use of the Redux Toolkit 


## Getting Started
----------------


First we need to make sure with have python and pip installed in our system. You can check this with the following code in the terminal
```
$ python --version
$ pip --version
```

Next is good practice to create a virtual environment for our project but you could skip this part if not needed. 
To install virtualenv follow the link below for instructions

https://virtualenv.pypa.io/en/latest/installation.html#via-pip

After installation one can create a virtualenv inside our repo using 

```
$ cd backend/
$ virtualenv -p {python/path} venv
```

Once the virtualenv is created we can activate it using
```
$ source venv/bin/activate
```

## Django
--------------------
"Django is a high-level Python web framework that encourages rapid development
and clean, pragmatic design"

Inside our backend/ folder with our virtual environment activated(if it is being used) lets install all the requirements needed

```
$ pip install -r requirements.txt
```

After installation we need to create the db

```
$ python manage.py migrate
```

Lets create our super user to be able to access our app

```
$ python manage.py createsuperuser
```
In case we forget our password we can run the following command

```
$ python manage.py changepassword {username}
```
Finally lets run the server

```
$ python manage.py runserver
```

the following urls become available

* http://localhost:8000/api/docs
* http://localhost:8000/admin

The first link will grant you access to the endpoints documentation and the second link will open the Django admin site which allows db population and testing




## React
--------------------

For the react installation we followed the stackup tutorial
* https://earn.stackup.dev/campaigns/advanced-state-management-with-redux-toolkit-in-react-5e5b/quests/quest-3-building-a-real-world-application-with-redux-toolkit

the react code is in the frontend/ folder
to run the server

```
$ cd frontend/
$ npm run dev
```

the following url becomes available for our react app

* http://localhost:5173

## Using GitHub Codespaces
--------------------

To be able to work in a codespace environment the public url of your react app must be configured
in the django server settings located at backend/config/settings.py

```
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

the public url of codespace can be included here