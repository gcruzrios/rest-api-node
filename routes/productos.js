const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, esAdminRole } = require('../middlewares');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todas las Productos
router.get('/', obtenerProductos)

//Obtener una Producto por id
router.get('/:id', [
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId )
],obtenerProducto)

//Crear una Producto privado x token
router.post('/', [ validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
],crearProducto)

//Actualizar una Producto por id
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto )

//Borrar una Producto por id
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
],eliminarProducto)

module.exports = router;