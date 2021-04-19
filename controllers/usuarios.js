const { response } = require('express')


const usuariosGet = (req, res=response) => {

    const { q, otro} = req.query;
    res.json({
        msg:'get API - controlador',
        q,
        otro
    })
}  

const usuariosPost = (req, res) => {
    
    const body = req.body;
    
    res.json({
        body,
        msg:'post API - controlador'
    })
}

const usuariosPut = (req, res) => {
    
    id = req.params.id;
    res.json({
        msg:'put API - controlador',
        id
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