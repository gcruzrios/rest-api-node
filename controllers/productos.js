const { response } = require("express");
const { Producto } = require('../models');


//obtener Producto

const obtenerProductos = async (req,res=response)=>{

    const { limite=5,desde = 0} = req.query;
    const query = {estado:true}
    
    
 //   const usuarios = await 
//    const total = await 


    const [ total, productos ] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    })
}

//obtener Producto x id
const obtenerProducto = async (req,res = response)=>{
    
    const { id } = req.params;

    const producto = await Producto.findById(id)
                                   .populate('usuario','nombre')
                                   .populate('categoria','nombre');

    res.json(producto);
}

const crearProducto = async (req, res=response) =>{

    const { estado, usuario, ...body } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre })

    if (productoDB){
        return res.status(400).json({
            msg: `Error, Producto ${productoDB.nombre}, ya existe`
        })
    }

    //generar la data a guardar

    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto)
}

//actualizar Producto
const actualizarProducto = async (req,res)=>{

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase(); 
    }
    data.usuario = req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json(producto);
}

//borrar Producto
const eliminarProducto = async (req,res)=>{

    const { id } = req.params;

   //const Producto = await Producto.findByIdAndDelete(id);
    const producto = await Producto.findByIdAndUpdate(id, {estado:false},{new:true})
    res.json(producto);
}

module.exports = {
    crearProducto, 
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}