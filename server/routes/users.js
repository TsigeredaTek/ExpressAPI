const express = require ('express');
const chirpsRouter = require('./chirps');
const usersRouter = require('./users');


let router = express.Router();

router.use('/', (req, res)=> {
    res.send('users');
});



module.exports = router;
