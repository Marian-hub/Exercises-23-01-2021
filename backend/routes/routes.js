const
    router = require('express').Router(),
    jsonData = require('./dati.json')
router.post('/login', (req, res) => {
    console.log("LOGIN")
    const { username, password } = req.body
    if (username === "cavallo" && password === "cavallo19") {
        res.status(200).send("OK")
    }
    res.status(403).send('error')
})
module.exports = router