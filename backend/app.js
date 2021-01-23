const
    express = require('express'),
    app = express(),
    routes = require('./routes/routes');

app.use(routes)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(3000, (err) => { return err })