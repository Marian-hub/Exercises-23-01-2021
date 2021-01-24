const
    express = require('express'),
    app = express(),
    routes = require('./routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.listen(4000, (err) => { return err })