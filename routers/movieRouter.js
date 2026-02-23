//importo express
const express = require('express');
//creo istanza oggetto rotte
const router = express.Router();
//importo sita posts da posts.js
//const listaPosts = require('../data/postsList')
//importo il controller della risorsa posts
const movieController = require('./../controllers/movieController');


//rotte di crud a cui assegno come parametro della funzione la rotta che mi gestisce la logica
// index
router.get('/', movieController.index)
// show
router.get('/:id', movieController.show)
// store
//router.post('/', movieController.store)
// update
//router.put('/:id', movieController.update)
// modify
//router.patch('/:id', movieController.modify)
// destroy
//router.delete('/:id', movieController.destroy)

//esporto istanza rootte
module.exports = router;