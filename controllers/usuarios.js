const { response,request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req, res=response) => {

    const { q, otro} = req.query;
    res.json({
        msg:'get API - controlador',
        q,
        otro
    })
}  

const usuariosPost = async (req, res) => {
    
   
    const { nombre, correo, password, rol } = req.body;
    const usuario  =  new Usuario( { nombre, correo, password, rol } );
    //verificar que el correo ya existe en BD
    // Encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en BD
    await usuario.save();
    
    res.json({
        msg:'post API - controlador',
        usuario
        
    })
}

const usuariosPut = async (req, res) => {
    
    id = req.params.id;
    const {_id, password, google, correo, ...resto } = req.body;

    // Todo validar contra base de datos

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg:'put API - controlador',
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg:'patch API - controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg:'delete API - controlador'
    })
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete
}