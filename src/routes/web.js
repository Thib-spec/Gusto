const path = require('path');
const express = require('express');
const router = express.Router();
const multer  = require('multer');

// Upload Image
router.post("/photo", (req, res, next) => {
    return res.json({
        image: null
    });
});

module.exports = router;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage});

// Upload Image
router.post("/photo", upload.single('photo'), (req, res, next) => {
    return res.json({
        image: req.file.path
    });
});

