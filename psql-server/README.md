# Logo Siber Güvenlik ve Ağ Teknolojileri Full Stack Bootcamp Graduation Project Server Side

<h2>Details</h2>

<p>Server for E-commerce Project</p>

<h4>File Structure</h4>
```
├── config
|   ├── auth.config.js
|   ├── elastics.config.js
|   └── postgre.config.js
├── controllers
|   ├── authController.js
|   ├── productController.js
|   └── userContoller.js
├── logs
├── middlewares
|   └── index.js
├── models
|   ├── index.js
|   ├── Product.js
|   └── User.js
├── routes
|   ├── authRouter.js
|   ├── productRouter.js
|   └── userRouter.js
├── app.js
├── logger.js
└── package.json
```

<p>I developed server-side with MVC approach. I used Express and NodeJS all server-side process.</p>
<p>All models are under the Models folder and all data process are under Controller folder. There are two different models as Product and User and three different controllers as auth, user and product.</p>

## Project setup
```
cd psqlserver
npm install
npm run dev
```
