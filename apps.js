const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3030;
app.locals.jsonData = require('./db/db.json')

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next()
}



app.use(logger)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/notes', require('./routes/view'))

app.use(express.static(path.join(__dirname, './public')))

app.listen(PORT, () => console.log(`serving started on ${PORT}`))