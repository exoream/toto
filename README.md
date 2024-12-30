<p align="center">
  <img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/logo.png" alt="Nama Alternatif" style="transform: scale(10);"> 
</p>

---
## Table of Contents

- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Introduction](#introduction)
- [Application Architecture](#application-architecture)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [How to Deploy to Google Cloud Run with CI/CD](#how-to-deploy-to-google-cloud-run-with-cicd)
- [API Documentation](#api-documentation)
- [Cloud Computing Team](#cloud-computing-team)
- [References](#references)

---
## Folder Structure
```
├── app                            
│   ├── config                      # configuration connection any database
│   ├── database                    # any database connection
|   ├── migrate                        
│   └── route                      
├── features
│   └── feature(a,b,c)              #this structure is the same for all of the features
|       |── controller
|       |   └── controller.js  
│       ├── dto                    
│       │   ├── request.js
│       │   └── response.js
│       ├── entity
│       │   ├── entity.js          
│       │   ├── interface.js       # interface contract for all function repository and service 
│       │   └── mapping.js         # mapping struct main to model or model to main
│       ├── model      
│       │   └── model.js            # structure database 
│       ├── repository
│       │   └── respository.js      # query for manipulating data
│       └── service
│           └── service.js          # contains the core business logic of the application and validation
├── utils                         
```
---
## Introduction
Trototrack is an innovative application designed to streamline and expedite the process of reporting sidewalk defects. It leverages advanced technologies to simplify the identification and monitoring of damaged sidewalks, ensuring a safer and more accessible environment for pedestrians.

---

## Technologies Used
![Static Badge](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=black&color=%2385EA2D&)
![Static Badge](https://img.shields.io/badge/Express.js-express?style=for-the-badge&logo=express&logoColor=black&color=%2385EA2D&)
![Static Badge](https://img.shields.io/badge/mysql-s?style=for-the-badge&logo=mysql&logoColor=white&color=%234479A1)
![Static Badge](https://img.shields.io/badge/docker-s?style=for-the-badge&logo=docker&logoColor=white&color=%232496ED)
![Static Badge](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Static Badge](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Static Badge](https://img.shields.io/badge/Sequelize-sequelize?style=for-the-badge&logo=sequelize&logoColor=white&color=%232496ED)
<img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Cloudrun.png" alt="Cloud Run" style="width: 140px">
<img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Cloud%20Bucket.png" alt="Cloud Bucket" style="width: 140px">
<img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Cloud%20SQL.png" alt="Cloud Bucket" style="width: 140px">

---

## Application Architecture
<img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Application%20Architecture.png" alt="Application Architecture" style="transform: scale(10);"> 

---

## Installation Guide
Follow these steps to set up and run the Trototrack application on your local machine. This guide will help you clone the repository, install necessary dependencies, configure the environment, and set up the database.
### Step 1: Clone the Repository
Begin by cloning the Trototrack API repository from GitHub. Use the following command to clone the repository to your local machine:
```
git clone https://github.com/TrotoTrackApp/TrotoTrack-API.git
```

### Step 2: Choose the Branch
The main branch contains the stable version of the application, which has been thoroughly tested and deployed. However, if you prefer to work with the latest development features, you can switch to the development branch. Use the commands below to switch branches:
```
# Switch to the main branch
git checkout main

# Or switch to the development branch
git checkout development
```

### Step 3: Install Dependencies
Navigate to the project directory and install the necessary dependencies using npm. This ensures all required packages are available for the application to run smoothly.
```
cd TrotoTrack-API
npm install
```

### Step 4: Configure the Environment
Create a .env file in the root directory of the project. This file will contain your environment-specific configurations, such as database credentials and API keys. You can use the .env.example file provided as a template. Copy and customize it according to your environment:
```
cp .env.example .env
```
Open the .env file in a text editor and replace the placeholder values with your actual configuration details. Here are some typical environment variables you might need to set:
```
PORT=3000
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=trototrack
JWT_SECRET=your_jwt_secret
```

### Step 5: Configure the Database
The application comes with a default database configuration located in app/database. If you need to use a different database, update the configuration in this directory.

---

## Usage
* Start the application by running the following command:
```
npm run start
```
* Connect to the API using Postman on port 8080.

---

## API Endpoint
### Users

| HTTP Verbs                                                                            | Endpoints             | Query Params                | Action                                 | Authorized |
| ------------------------------------------------------------------------------------- | --------------------- | --------------------------- | -------------------------------------- | ---------- |       
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/register`           |                             | Sign up a new user account             | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/login`              |                             | Login an existing user account         | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/send-otp`           |                             | Send otp for forget password           | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/verify-otp`         |                             | Verify the OTP received via email      | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/verify `            | `token`                     | Verify account recevied via email      | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PATCH.png)  | `/new-password`       |                             | Set a new password                     | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/scan`               |                             | Scan image sidewalk                    | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/profile`            |                             | Get user profile                       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/profile`            |                             | Update user profile                    | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PATCH.png)  | `/profile`            |                             | Update password user                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/articles`           | `limit`, `page`, `search`   | Get all articles                       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/articles/:id`       |                             | Get details articles                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/reports`            |                             | Create a new report sidewalk           | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/reports`            | `limit`, `page`, `search`   | Retrieve all report sidewalk           | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/reports/profile`    | `limit`, `page`, `search`   | Retrieve sidewalk reports profiles     | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/reports/:id`        |                             | Retrieve sidewalk reports details      | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/reports/:id`        |                             | Update sidewalk reports profiles       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/reports/:id/upvote` |                             | Upvote sidewalk reports                | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/jobs`               |                             | Register to the application            | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/jobs/profile`       |                             | Get profile application job            | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/jobs/:id`           |                             | Update profile application job         | Yes        |


### Admin
| HTTP Verbs                                                                            | Endpoints             | Query Params                | Action                                 | Authorized |
| ------------------------------------------------------------------------------------- | --------------------- | --------------------------- | -------------------------------------- | ---------- |       
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/login`              |                             | Login an existing admin account        | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/users`              | `limit`, `page`, `search`   | Get all users account                  | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/users/:id`          |                             | Get users account details              | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/users/:id `         |                             | Update users account                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/DELETE.png) | `/users/:id`          |                             | Delete users account                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PATCH.png)  | `/users/:id`          |                             | Update password users account          | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/POST.png)   | `/articles`           |                             | Create a new articles                  | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/articles`           | `limit`, `page`, `search`   | Get all articles                       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/articles/:id`       |                             | Get articles details                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/articles/:id`       |                             | Update articles                        | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/DELETE.png) | `/articles/:id`       |                             | Delete articles                        | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/reports`            | `limit`, `page`, `search`   | Retrieve all report sidewalk           | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/reports/:id`        |                             | Retrieve sidewalk reports details      | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/reports/:id`        |                             | Update sidewalk reports                | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/DELETE.png) | `/reports/:id`        |                             | Delete sidewalk reports                | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PATCH.png)  | `/reports/:id/status` |                             | Update status sidewalk reports         | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/jobs`               | `limit`, `page`, `search`   | Get all application jobs               | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/GET.png)    | `/jobs/:id`           |                             | Get application job details            | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PUT.png)    | `/jobs/:id`           |                             | Update application job                 | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/DELETE.png) | `/jobs/:id`           |                             | Delete application job                 | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/PATCH.png)  | `/jobs/:id/status`    |                             | Update status application jobs         | Yes        |

---

## How to Deploy to Google Cloud Run with CI/CD
Follow these steps to deploy Trototrack to Google Cloud Run using CI/CD:
### Step 1 : Enable Required Google Cloud Services
```
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```
### Step 2 : Create Service Account
Create a service account with the following roles:
  - Artifact Registry Administrator
  - Cloud Run Admin
  - Service Account User
    
You can use the Google Cloud Console UI or CLI to create the service account.

CLI Instructions:
```
# Buat service account baru
gcloud iam service-accounts create trototrack-sa --description="Service account for Trototrack deployment" --display-name="Trototrack Service Account"

# Ambil alamat email service account
export SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list --filter="displayName:Trototrack Service Account" --format="value(email)")

# Tambahkan peran Artifact Registry Administrator
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" --role="roles/artifactregistry.admin"

# Tambahkan peran Cloud Run Administrator
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" --role="roles/run.admin"

# Tambahkan peran Service Account User
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" --role="roles/iam.serviceAccountUser"
```

UI Instructions:
- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Select Your Project: Make sure you have selected the correct project where you want to create the service account.
- Open the IAM & Admin Page:
  - Click on the menu icon ☰ at the top left corner.
  - Navigate to IAM & Admin > Service accounts.
- Create a New Service Account:
  - Click on Create Service Account.
  - Enter a name and description for your service account (e.g., "trototrack-sa" and "Service account for Trototrack deployment").
  - Click Create.
- Assign Roles:
  - After creating the service account, click on the newly created service account from the list.
  - Click on Add permissions.
  - In the Select a role dropdown, search for and select:
    - Artifact Registry Administrator
    - Cloud Run Admin
    - Service Account User
  - Click Save to assign these roles to the service account.

### Step 3 : Generate Service Account Key JSON
  
You can use the Google Cloud Console UI or CLI to create Service Account Key JSON

CLI Instructions:
```
gcloud iam service-accounts keys create KEY_FILE.json --iam-account=SERVICE_ACCOUNT_EMAIL
```
Replace KEY_FILE.json with the desired filename for your service account key JSON file, and SERVICE_ACCOUNT_EMAIL with the email address of your service account.

UI Instructions:
- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Select Your Project: Make sure you have selected the correct project where your service account is located.
- Open the IAM & Admin Page:
  - Click on the menu icon ☰ at the top left corner.
  - Navigate to IAM & Admin > Service accounts.
- Find Your Service Account:
  - Locate the service account for which you want to create a key in the list.
  - Click on the service account name to open its details.
- Create Key
  - Click on Add Key > Create new key.
  - Choose the key type: JSON.
  - Click Create to download the JSON key file.



### Step 4 : Create Artifact Registry Repository

You can create a repository in Artifact Registry configured for Docker format using either the Google Cloud Console UI or CLI.

CLI Instructions:
```
# Create repository in Artifact Registry for Docker format
gcloud artifacts repositories create REPOSITORY_NAME --repository-format=docker --location=LOCATION
```
Replace REPOSITORY_NAME with the desired name for your Artifact Registry repository, and LOCATION with the region where you want to create the repository (e.g., us-central1).

UI Instructions:
- Navigate to [Google Cloud Console](https://console.cloud.google.com/)
- Select Your Project: Make sure you have selected the correct project where you want to create the Artifact Registry repository.
- Open Artifact Registry:
  - Click on the menu icon ☰ at the top left corner.
  - Navigate to Artifact Registry under Tools.
- Create a New Repository:
  - Click on Create Repository.
  - Enter a name for your repository under Repository name.
  - Select Docker as the format under Repository format.
  - Choose the appropriate Location.
  - Click Create to create the repository.

### Step 5 : Store the following securely as GitHub secrets:
- In your GitHub repository, go to Settings > Secrets > New repository secret.
- Enter the name of the secret (e.g., GOOGLE_APPLICATION_CREDENTIALS for the Service Account Key JSON).
- Paste the contents of the JSON file (KEY_FILE.json) into the value field.
- Add additional secrets for each environment variable required for deployment.

![Secret Github](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Secret%20Github.png) 

### Step 6 : Create Dockerfile
Use the provided Dockerfile from Trototrack or customize it as needed for your application.
Examples:
```
FROM node:18.7.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
```

### Step 7 : Create GitHub Actions Workflow
You can either:
- Use GitHub Action to find a Cloud Run deployment template:
  - Navigate to GitHub Action and search for "Cloud Run".
  - Choose a template like "Build and Deploy to Cloud Run".
  - Follow the setup instructions to configure the workflow with your repository and secrets.
  - Manually create a GitHub Actions workflow (deploy.yaml):

![Secret Github](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/utils/img/Cloud%20Run%20Action.png)

- Manually create a GitHub Actions workflow (deploy.yaml):
  - Create a new file under .github/workflows/deploy.yaml.
  - Copy and paste the following basic template and adjust it according to your project specifics:
```
name: Build and Deploy

on:
  push:
    branches:
      - main  # Default branch for deployment, You can change the branch trigger according to what you want

env:
  PROJECT_ID: YOUR_PROJECT_ID
  GAR_LOCATION: LOCATION_REPOSITORY
  GAR_REPOSITORY_NAME: YOUR_REPOSITORY_NAME
  SERVICE: YOUR_SERVICE_NAME
  REGION: LOCATION_SERVICE_CLOUD_RUN
  DBHOST: ${{ secrets.DBHOST }}
  DBUSER: ${{ secrets.DBUSER }}
  DBPASS: ${{ secrets.DBPASS }}
  DBNAME: ${{ secrets.DBNAME }}
  DBPORT: ${{ secrets.DBPORT }}
  SERVERPORT: ${{ secrets.SERVERPORT }}
  JWTSECRET: ${{ secrets.JWTSECRET }}
  GOOGLE_CLOUD_KEY_BASE64: ${{ secrets.GOOGLE_CLOUD_KEY_BASE64 }}
  BUCKET_NAME: ${{ secrets.BUCKET_NAME }}
  FOLDER_NAME: ${{ secrets.FOLDER_NAME }}
  EMAIL_HOST: ${{ secrets.EMAIL_HOST }}
  EMAIL_PORT: ${{ secrets.EMAIL_PORT }}
  EMAIL_USER: ${{ secrets.EMAIL_USER }}
  EMAIL_PASS: ${{ secrets.EMAIL_PASS }}

jobs:
  deploy:
    timeout-minutes: 30
    permissions:
      contents: "read"
      id-token: "write"

    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Google Auth
        id: auth
        uses: "google-github-actions/auth@v2"
        with:
          credentials_json: "${{ secrets.SERVICE_ACCOUNT }}"

      # Authenticate Docker to Google Cloud Artifact Registry
      - name: Configure Docker to use gcloud
        run: |-
          gcloud auth configure-docker ${{ env.GAR_LOCATION }}-docker.pkg.dev --quiet

      - name: Build and Push Container
        run: |-
          docker build -t "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}" ./
          docker push "${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}"

      # END - Docker auth and build

      - name: Deploy to Cloud Run
        id: deploy
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: ${{ env.SERVICE }}
          region: ${{ env.REGION }}
          image: ${{ env.GAR_LOCATION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.GAR_REPOSITORY_NAME }}/${{ env.SERVICE }}:${{ github.sha }}
          flags: --verbosity=debug
          env_vars: |
            GOOGLE_CLOUD_KEY_BASE64=${{ env.GOOGLE_CLOUD_KEY_BASE64 }}
            DBHOST=${{ env.DBHOST }}
            DBUSER=${{ env.DBUSER }}
            DBPASS=${{ env.DBPASS }}
            DBNAME=${{ env.DBNAME }}
            DBPORT=${{ env.DBPORT }}
            SERVERPORT=${{ env.SERVERPORT }}
            BUCKET_NAME=${{ env.BUCKET_NAME }}
            FOLDER_NAME=${{ env.FOLDER_NAME }}
            EMAIL_HOST=${{ env.EMAIL_HOST }}
            EMAIL_PORT=${{ env.EMAIL_PORT }}
            EMAIL_USER=${{ env.EMAIL_USER }}
            EMAIL_PASS=${{ env.EMAIL_PASS }}
            JWTSECRET=${{ env.JWTSECRET }}

      - name: Show Output
        run: echo ${{ steps.deploy.outputs.url }}
```
Explanation
- on: This configuration determines when the workflow will be triggered. In this example, the workflow will be triggered every time there is a push or pull request to the main branch.
- env: The env section defines the environment variables required in the workflow. Make sure to replace the YOUR_PROJECT_ID, YOUR_REPOSITORY_NAME, and YOUR_SERVICE_NAME values ​​with the appropriate values ​​for your project. Secret variables taken from GitHub Secrets must also be adapted to your project needs, such as DBHOST, DBUSER, DBPASS, and others.

---
## API Documentation
- [User Documentation](https://api.trototrack.online/users-docs/)
- [Admin Documentation](https://api.trototrack.online/admin-docs/)

---
## Cloud Computing Team

| Name                           | University	                                         | 
| :----------------------------- | :---------------------------------------------------| 
|	Al Hilaluddin                  | Universitas Muslim Indonesia                        |
|	Ardhian Wisnu Kartika          | Universitas Telkom                                  |	

---
## References
- [Cloud Run](https://cloud.google.com/run?hl=id) : Deployment Platform
- [Cloud SQL](https://cloud.google.com/sql) : Managed database service for relational databases
- [Sequelize](https://sequelize.org/) : Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [Express.js](https://expressjs.com/) : Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) : The world's most popular open source database
- [Docker](https://www.docker.com/) : Platform for developing, shipping, and running applications
- [TensorFlow](https://www.tensorflow.org/js) : Develop ML models in JavaScript, and use ML directly in the browser or in Node.js.
- [Swagger](https://swagger.io/) : A widely-used framework for designing, building, and documenting APIs with ease.




