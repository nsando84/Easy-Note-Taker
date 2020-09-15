const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT 


// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next()
// }

// app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/')));
console.log(__dirname)

require('./routes/APIroutes')(app)
require('./routes/htmlRoutes')(app)

app.listen(PORT, () => console.log(`serving started on ${PORT}`))

