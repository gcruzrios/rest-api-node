const { response,request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req=request, res=response) => {

    const { limite=5,desde = 0} = req.query;
    const query = {estado:true}
    
    
 //   const usuarios = await 
//    const total = await 


    const [ total, usuarios ] = await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
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
       
        usuario
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg:'patch API - controlador'
    })
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //const uid = req.uid;

    //DELETE REAL DE LA BD
    //const usuario = await Usuario.findByIdAndRemove( id );

    const usuario = await Usuario.findByIdAndUpdate(id, { estado : false })
    // const usuarioAutenticado = req.usuario;

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete
}