Data Collector Web App
----------------------------------

 - Using AdminLTE website template 2.4

Features
--------

- Local Authentication using Email and Password
- Flash notifications
- MVC Project Structure
- Bootstrap 3
- **Account Management**
 - Profile picture
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Delete Account
- **Security**
 - Brute force protection
 - Secure cookies

Requirements
-------
Node (Tested on v8)
MongoDB (Tested on 3.4)

Install
-------
After installing Node.js & npm:
```console
$ npm i -g grunt-cli
$ npm i
$ grunt build
```

Run
-------
- $ npm run start

Sign Up
-------
- Signing up is currently locked down to admin@1.com to prevent multiple users

Packages
--------
- See package.json

Deployment on Google Cloud Platform - Compute
--------
- See this  [link](https://cloud.google.com/community/tutorials/deploy-mean-app-mongodb-replication) for instructions setting up a MEAN application on Google Cloud

Re-deploy on GCP
--------
SSH into the GCP VM
```console
$ sudo su - bitnami
$ cd /home/bitnami/apps/collector/htdocs/
$ git pull
$ ./start-data-collector.sh
```