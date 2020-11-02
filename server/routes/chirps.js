const express = require('express');
const chirpStore = require('../../chirpstore');

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if(id) {
        res.json(chirpStore.GetChirp(id));
    } else {
    res.send(chirpStore.GetChirps());
    }
});



router.post('/', (req, res) => {
    console.log(req.body);
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id
    chirpStore.DeleteChirp(id);
    res.sendStatus(200);
});

router.put('/:id', (req, res) => {
    console.log(req.body);
    let id = req.params.id;
    let chirp = req.body;
    chirpStore.UpdateChirp(id, chirp);
    res.send('success').status(200);
})

module.exports = router;



