import Prospecto from '../models/Prospecto.js'
import { validateObjectId, handleNotFoundError, formatDate } from '../utils/index.js'


const createProspecto = async(req, res) => {
    const { _id, ... body} = req.body
    const { nombre, primer_apellido, segundo_apellido } = body
    if(!nombre && !primer_apellido && !segundo_apellido) {
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const prospecto = new Prospecto(body);
        const result = await prospecto.save();
        res.json({ msg:'El registro se creó correctamente', data: result });
    } catch (error) {
        console.log(error)
    }
}

const getProspectos = async(req, res) => {
    try {
        const prospectos = await Prospecto.find()
        res.json(prospectos)
    } catch (error) {
        console.log(error)
    }
}

const getProspectoByid = async(req, res) => {
    const { id } = req.params
    // validar que es un object id
    if(validateObjectId(id, res)) return 

    // validar que exista 
    const prospecto = await Prospecto.findById(id)
    if(!prospecto) {
        return handleNotFoundError('El registro no existe', res)
    }

    // mostrar el registro
    res.json(prospecto)
}

const updateProspecto = async(req, res) => {
    const { id } = req.params
    // validar que es un object id
    if(validateObjectId(id, res)) return 

    // validar que exista 
    const prospecto = await Prospecto.findById(id)
    if(!prospecto) {
        return handleNotFoundError('El registro no existe', res)
    }

    // escribimos en el objeto los valores nuevos
    prospecto.nombre = req.body.nombre || prospecto.nombre
    prospecto.primer_apellido = req.body.primer_apellido || prospecto.primer_apellido
    prospecto.segundo_apellido = req.body.segundo_apellido || prospecto.segundo_apellido
    prospecto.calle = req.body.calle || prospecto.calle
    prospecto.numero = req.body.numero || prospecto.numero
    prospecto.colonia = req.body.colonia || prospecto.colonia
    prospecto.codigo_postal = req.body.codigo_postal || prospecto.codigo_postal
    prospecto.telefono = req.body.telefono || prospecto.telefono
    prospecto.rfc = req.body.rfc || prospecto.rfc
    prospecto.estatus = req.body.estatus || prospecto.estatus
    prospecto.alt_img = req.body.alt_img || prospecto.alt_img

    try {
        await prospecto.save()
        res.json({ msg: 'el registro se actualizó correctamente', data: prospecto })
    } catch (error) {
        console.log(error)
    }
}

const deleteProspecto = async(req, res) => {
    const { id } = req.params
    // validar que es un object id
    if(validateObjectId(id, res)) return 

    // validar que exista 
    const prospecto = await Prospecto.findById(id)
    if(!prospecto) {
        return handleNotFoundError('El registro no existe', res)
    }

    try {
        await prospecto.deleteOne()
        res.json({ msg: 'el registro se eliminó correctamente', data: prospecto })
    } catch (error) {
        console.log(error)
    }
}

export {
    createProspecto,
    getProspectos,
    getProspectoByid,
    updateProspecto,
    deleteProspecto
}