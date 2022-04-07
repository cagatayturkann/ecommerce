require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

var morgan = require('morgan');

const app = express();

//to clear all db everytime server starts change code with sync({force: true})
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.');
// });

let corsOptions = {
	origin: 'http://localhost:8081',
};
//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('short'));
app.use(express.static('uploads'));

//ROUTES
app.get('/', (req, res) => {
	res.send('HELLO POSTGRESQL SERVER');
});
app.use('/api/products', productRouter);
app.use('/api', authRouter);
app.use('/api/users', userRouter);

//SERVER
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
