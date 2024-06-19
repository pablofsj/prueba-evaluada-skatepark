import { skateparkModel } from "../models/skatepark.model.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const allSkaters = async (_,res) =>{
    try {
        const skaters = await skateparkModel.getSkaters()
        return res.json(skaters)
    } catch (error) {
        console.log(error);
        res.status(500).json( {error: 'Error interno del servidor'})   
    }
}

const newSkater = async (req, res) =>{
    try {

        const {foto} = req.files
        const {mimetype, size} = foto
        const id_foto = uuidv4()
        const __dirname = import.meta.dirname
        const filePath = path.join(__dirname, '..', 'public', 'img', `${id_foto}.jpeg`);

        if (mimetype !== "image/jpeg" && mimetype !== "image/jpg") {
            return res.status(400).json({
                ok: false,
                msg: 'Error, solo puedes subir fotos en formato JPG o JPEG'
            });
        }

        if (size > 1024 * 1024 * 6) { 
            return res.status(400).json({
                ok: false,
                msg: 'Error, la imagen debe pesar menos de 6MB'
            });
        }

        foto.mv(filePath, (err) => {
            if (err) {
                return res.status(409).json({
                    ok: false ,
                    msg: 'Error, la imagen no pudo ser subida, intente otra vez'
                })
            }
            
        })
        const {email, nombre, password, anos_experiencia, especialidad} = req.body


        //validar email y hasheo de password
        const user = await skateparkModel.getSkaterByEmail(email)
        if(user){
            return res.status(400).json({
                ok: false ,
                msg: 'El email ya se encuentra registrado'
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);


        const new_skater = await skateparkModel.register({ email, nombre, password: hashed, anos_experiencia, especialidad, foto: id_foto, estado: false })

        return res.redirect('/')

    } catch (error) {
        console.log(error);
        res.status(500).json( {error: 'Error interno del servidor'})   
    }
}

const loginSkater = async (req,res) =>{
    try {
        const {email, password} = req.body
        const user = await skateparkModel.getSkaterByEmail(email)
        if(!user){
            return res.status(400)
            .json({
                ok: false ,
                msg: 'El email no se encuentra registrado'
            })
        }
       
        const passwordIsValid = await bcrypt.compare( password , user.password)
        if (!passwordIsValid) {
            return res.status(400)
            .json({
                ok: false ,
                msg: 'Password incorrecta'
            })
        }

        const token = jwt.sign(
            { email: user.email},
            process.env.SECRET_JWT,
            { expiresIn: '1h'}
        )



        return res.json({
            token,
            email: user.email
        })  

    } catch (error) {
        console.log(error);
        res.status(500).json( {error: 'Error interno del servidor'})
    }
}

const profileSkater = async (req, res) => {
    try {

        const user = await skateparkModel.getSkaterByEmail(req.email)
        return res.json({ ok: true, msg: user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const editSkater = async (req, res) =>{
    try {
        
        const {email, nombre, password, anos_experiencia, especialidad} = req.body
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const edit_skater = await skateparkModel.update({email, nombre, password : hashed, anos_experiencia, especialidad})
        return res.json(edit_skater)

    } catch (error) {
        console.log(error);
        res.status(500).json( {error: 'Error interno del servidor'})   
    }
}

const editStatusSkater = async (req, res) =>{
    try {
        
        const {email, estado} = req.body
        const edit_skater_estado = await skateparkModel.updateEstado({email, estado})
        return res.json(edit_skater_estado)

    } catch (error) {
        console.log(error);
        res.status(500).json( {error: 'Error interno del servidor'})   
    }
}


const deleteSkater = async (req,res) => {
    try {
        const {email} = req.body
        const remove_skater = await skateparkModel.remove(email)
        res.json(remove_skater)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error interno del servidor'}) 
    }
}


export const skateparkController = {
    allSkaters,
    newSkater,
    profileSkater,
    loginSkater,
    editSkater,
    editStatusSkater,
    deleteSkater
}

