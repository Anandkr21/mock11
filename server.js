const express = require('express');
const cors = require('cors')
const { connection } = require('./config/db');
const { postRouter } = require('./route/postRoute');
require('dotenv').config();
const Port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        msg: "Welcome to Plan My Trip !"
    });
});


app.use('/api', postRouter)


app.listen(Port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log('Something error in connection.');
    }
    console.log(`Server is running at Port http://localhost:${Port}`);
})