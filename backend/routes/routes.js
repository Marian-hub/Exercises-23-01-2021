const
    router = require('express').Router(),
    fs = require('fs');
router.post('/nuovoImport', (req, res) => {
    const { data, ragione, importo } = req.body
    const dati = {}
    dati = {
        "data": data,
        "ragione": ragione,
        "importo": importo
    }
    const jsonDati = JSON.stringify(dati)
    fs.appendFile("dati.json", jsonDati, (err) => {
        res.send("there was an error ").status(500)
    })
    const tuttiDati = fs.readFile("dati.json", (err) => {
        res.send("there was an error ").status(500)
    })
    res.status(200).send(tuttiDati)
})
module.exports = router