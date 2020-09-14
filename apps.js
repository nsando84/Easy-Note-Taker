const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3030;


const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next()
}

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/APIroutes')(app)
require('./routes/htmlRoutes')(app)

app.listen(PORT, () => console.log(`serving started on ${PORT}`))

