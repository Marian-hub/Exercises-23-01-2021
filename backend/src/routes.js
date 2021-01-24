const
    router = require('express').Router(),
    dati = require('./dati.json');

router.post('/login', (req, res) => {
    try {
        dati.push(req.body)
        res.status(200).send(dati)
    } catch (error) {
        res.status(500).send("error")
    }
})
module.exports = router