const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, esAdminRole } = require('../middlewares');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * 
 * {{ url }}/api/categorias
 */
//Obtener todas las categorias
router.get('/', obtenerCategorias)

//Obtener una categoria por id
router.get('/:id', [
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaPorId )
],obtenerCategoria)

//Crear una categoria privado x token
router.post('/', [ validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar una categoria por id
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria )

//Borrar una categoria por id
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],eliminarCategoria)

module.exports = router;