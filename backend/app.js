const
    express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes/routes');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.listen(4000, (err) => { return err })