const
    router = require('express').Router(),
    jsonData = require('./dati.json')
router.get('/getImporti', (req, res) => {
    res.status(200).send(jsonData)
})
router.post('/nuovoImporto', (req, res) => {
    console.log("POST")
    jsonData.push(req.body)
    console.log(jsonData)
    res.status(200).send(jsonData)
})
module.exports = router