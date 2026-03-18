const express = require('express');
const pessoaController = require('../controllers/pessoaController');

const router = express.Router();

router.post   ('/pessoa',     pessoaControlle.create.bind(pessoaController));
router.get    ('/pessoa/:id', pessoaControlle.findById.bind(pessoaController));
router.put    ('/pessoa/:id', pessoaControlle.update.bind(pessoaController));
router.delete ('/pessoa/:id', pessoaControlle.delete.bind(pessoaController));
router.get    ('/pessoa',     pessoaControlle.findAll.bind(pessoaController));

module.exports = router;