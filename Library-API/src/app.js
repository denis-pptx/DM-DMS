require('dotenv').config()
const express = require('express');
const router = require('./router/index');
const dbMiddleware = require('./middleware/db-middleware');
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 3000;
const app = express()
app.use(express.json());

app.use(dbMiddleware);
app.use('/api', router);
app.use(errorMiddleware);

function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()