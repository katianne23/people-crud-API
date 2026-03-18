const express = require('express');
const pessoaController = require('../controllers/pessoaController');

const router = express.Router();

router.post('/pessoa', pessoaController.create.bind(pessoaController));
router.get('/pessoa/:id', pessoaController.findById.bind(pessoaController));
router.put('/pessoa/:id', pessoaController.update.bind(pessoaController));
router.delete('/pessoa/:id', pessoaController.delete.bind(pessoaController));
router.get('/pessoa', pessoaController.findAll.bind(pessoaController));

module.exports = router;