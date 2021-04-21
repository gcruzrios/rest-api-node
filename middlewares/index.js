
const validaCampos  = require('./validar-campos');
const validarJWT  = require('./validar-jwt');
const validaRoles  = require('./validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo')

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir
}