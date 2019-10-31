const {Router} = require('express');

const router = Router();

const {getCompras,getCompra,createCompra} = require('../controllers/compras.controller');

router.get('/',getCompras);
router.get('/:id',getCompra);
router.post('/',createCompra);

module.exports = router