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
