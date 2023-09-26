
# recipeApiV2

This is API for project RecipeWebApp and RecipeMobileApp.



## Table of Contents

* [Requirement](#requirement)
* [Built With](#built-with)
* [Installation](#installation)
* [How use](#how-use)
* [Related Project](#related-project)
* [Contact](#contact)
## Requirement
Before you install this project on your local computer. You need:

- **NodeJS**, I'm using **v18.16.0** when this docs is uploaded. You can download NodeJS in https://nodejs.org/en/download
- **PostgreSQL**, I'm using **v15.3** when this docs is uploaded. You can download PostgreSQL in https://www.postgresql.org/download
- **Postman**, I'm using **v10.18.8** when this docs is uploaded. You can download Postman in https://www.postman.com/downloads
## Built with
- [**bcryptjs 2.4.3**](https://www.npmjs.com/package/bcryptjs)
- [**body-parser 1.20.2**](https://www.npmjs.com/package/body-parser)
- [**cloudinary 1.40.0**](https://www.npmjs.com/package/cloudinary)
- [**cors 2.8.5**](https://www.npmjs.com/package/cors)
- [**dotenv 16.3.1**](https://www.npmjs.com/package/dotenv)
- [**express 4.18.2**](https://www.npmjs.com/package/express)
- [**helmet 7.0.0**](https://www.npmjs.com/package/helmet)
- [**jsonwebtoken 9.0.1**](https://www.npmjs.com/package/jsonwebtoken)
- [**morgan 1.10.0**](https://www.npmjs.com/package/morgan)
- [**multer 1.4.5-lts.1**](https://www.npmjs.com/package/multer)
- [**nodemailer 6.9.4**](https://www.npmjs.com/package/nodemailer)
- [**pg 8.11.3**](https://www.npmjs.com/package/pg)
- [**uuid 9.0.0**](https://www.npmjs.com/package/uuid)
- [**xss-clean 0.1.4**](https://www.npmjs.com/package/xss-clean)
## Installation

Open your default terminal like CMD or Git Bash. Then clone this project, in your folder destination, type on your terminal like below:

```
git clone https://github.com/mahardhikap/recipeApiV2.git
```
After installation is done, on your terminal type:

```
cd recipeApiV2
```

You need install package dependencies, to make this project work properly, in your terminal type:
```
npm install
```
Open folder **recipeApiV2**, if you have Visual Studio Code installed on you computer, you can type on terminal:
```
code .
```
or open it manually, with search in directories libraries windows explorer

Theres two important file for guide the set up database and env, you will found file named **database.sql** and **.example.env**, open your PostgreSQL then set up like query in database.sql. For .example.env set up you can follow this next tutorial below

You need to put file name **.env** in folder **recipeApiV2**, the **.env** should include this:
```
USER= your database username
HOST= your database host 127.0.0.1 for localhost
DATABASE= your database name
PASSWORD= your database password
PORT= your port database / 5432
CLOUDINARY_CLOUD_NAME= your cloudinary name
CLOUDINARY_API_KEY= your cloudinary api key
CLOUDINARY_SECRET_KEY= your cloudinary secret key
SECRET= your secret word in jwt setup
EMAIL_NAME= your ftp email
EMAIL_PASS= your password ftp email
BASE_URL= your access url, default http://localhost:3000
```

After all above is done, you can run this project with type on terminal:
```
node index.js
```

you will see 'App running on http://localhost:3000'
## How Use
Open Postman, go to workspace then import postman collection on folder recipeApiV2, name is **recipeApiV2.postman_collection**
## Related Project
You can visit my github where I'm using this API for the server:
- **[Recipe Web App](https://github.com/mahardhikap/recipeWebApp)**
- **[Recipe Mobile App](https://github.com/mahardhikap/RecipeMobileApp)**

##  Contact
You can reach me on:

[![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:putrad578@gmail.com)
[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/mahardhika300617)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahardhikapratama)

I know this project is not perfect.

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request