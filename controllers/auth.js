const { response } = require("express");
const Usuario = require ('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe

        const usuario = await Usuario.findOne({ correo });

        if (!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });


        }

        // si el usuario está activo=true

        if (!usuario.estado ){
            return res.status(400).json({
                msg:'Usuario inactivo estado-false'
            });

            
        }
        // verificar la contraseña

        const validPassword  = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }


        //Generar el JWT

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    
}

const googleSignin = async (req, res=response) =>{
   
    const { id_token } = req.body;

    try {
        
        const { correo, nombre, img } = await googleVerify(id_token);

        //console.log(googleUser);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                password:':)',
                img,
                google:true,
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en Db 

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            });

        }

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token    
        });
    } catch (error) {
        res.status(400).json({
            msg:'Token de Google no es válido'
        })
    }

    
}

module.exports = {
    login, googleSignin
}