const express = require('express');
const router = require('./router')
const morgan = require('morgan')
const cors = require('cors');
const { protect } = require('./modules/auth.js');
const { createNewUser, signin } = require('./handlers/user');


const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    console.log('hello express');
    res.status(200);
    res.json({ message: 'hello' })
});
app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin)



module.exports = app