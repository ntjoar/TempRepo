const express = require('express');
const router = express.Router();

/* Routes */
const loginRouter = require('./login_routes');
const accountRouter = require('./account_routes');

/* Base API call, make sure our API works via this */
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Bryan is the most baddest motherfucker (TJ is CODE MONKE)"
    })
});

router.use('/signin', loginRouter);
router.use('/account', accountRouter);

module.exports = router;