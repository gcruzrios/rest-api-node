const { response } = require("express");
const { Categoria } = require('../models');


//obtener categoria

const obtenerCategorias = async (req,res=response)=>{

    const { limite=5,desde = 0} = req.query;
    const query = {estado:true}
    
    
 //   const usuarios = await 
//    const total = await 


    const [ total, categorias ] = await Promise.all([

        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        categorias
    })
}

//obtener categoria x id
const obtenerCategoria = async (req,res = response)=>{
    
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json(categoria);
}

const crearCategoria = async (req, res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB){
        return res.status(400).json({
            msg: `Error, categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria)
}

//actualizar categoria
const actualizarCategoria = async (req,res)=>{

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase(); 
    data.usuario = req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.json(categoria);
}

//borrar categoria
const eliminarCategoria = async (req,res)=>{

    const { id } = req.params;

   //const categoria = await Categoria.findByIdAndDelete(id);
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true})
    res.json(categorias);
}

module.exports = {
    crearCategoria, 
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}