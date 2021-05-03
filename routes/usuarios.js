const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuarioGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,validarJWT, tieneRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.get('/:id', usuarioGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y tiene que ser de 6 letras mínimo').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    validarJWT,

    //esAdminRole,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/:id', usuariosPatch);



module.exports = router;