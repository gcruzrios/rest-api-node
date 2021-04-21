
const Usuario = require('../models/usuario');
const Role = require('../models/role');
const { Categoria, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El role ${ rol } no existe en la BD`)
    }
}
const emailExiste = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`)
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error(`El usuario ${ id } no está registrado`)
    }
}

const existeCategoriaPorId = async (id = '') => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria){
        throw new Error(`La categoria ${ id } no está registrada`)
    }
}

const existeProductoPorId = async (id = '') => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto){
        throw new Error(`La categoria ${ id } no está registrada`)
    }
}

module.exports = {
    esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId
}