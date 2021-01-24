const
    router = require('express').Router(),
    multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, ".")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
const uploadStorage = multer({ storage: storage })
router.post("/uploadImage", uploadStorage.single("file"), (req, res) => {
    return res.status(200).send(req.file)
})
router.get('/getImage', (req, res) => {
    const { filename } = req.body
    if (typeof filename === "undefined") {
        res.status(404).send('NOT FOUND')
    } else {
        res.status(200).sendFile(filename)
    }
})
module.exports = router