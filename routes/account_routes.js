const express = require('express');
const router = express.Router();

/* Base API call, make sure our API works via this */
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Some account stuff"
    })
});

module.exports = router;