# Netmeds

Angular front end to view employee information. 

---
## Important
The [`netmeds-api`](https://github.com/profgrammer/netmeds-api) server should be running in order to make this front end function properly. Please [follow the steps to get the server running](https://github.com/profgrammer/netmeds-api/blob/master/README.md) before continuing.

---

## Required Software

* [NodeJS](https://nodejs.org/en/download/)
* `angular-cli` : run `npm install -g @angular/cli`

## Steps

* Clone this repository
* `cd` into it and type `ng serve -o` to start the server and open the home page. 

## Home screen

* Search for employees using the search bar and button.
* Select how many employees to view per page with the selector (works only on list of all employees, not on search) 
* On the home page, click on the pencil icon to edit an employee.
* Click the garbage bin icon to delete the employee

![home screen](images/homeScreen.png)


## Employee Profile page

* Click on an employee to view their profile.

![employee profile](images/employeeScreen.png)

## Edit/delete employee

* Edit the details, and preview the profile picture or remove it. Click submit to save changes

![edit employee](images/update.png)


## Add a new employee

* On the top navbar, click *Add employee* to add a new employee.

![Add employee](images/add.png)

## Updated home screen after editing

![Updated employee](images/updatedHome.png)
