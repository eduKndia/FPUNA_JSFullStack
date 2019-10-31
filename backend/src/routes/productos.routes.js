const {Router} = require ('express');
const router = Router();

const {getProducto, getProductos, createProducto, updateProducto, deleteProducto} = require('../controllers/productos.controller');


router.get('/', getProductos);
router.get('/:id',getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id',deleteProducto);

module.exports = router;