const
    router = require('express').Router(),
    jsonData = require('./dati.json')
router.post('/login', (req, res) => {
    jsonData.push(req.body)
    console.log(jsonData)
    res.status(200).send(jsonData)
})
module.exports = router