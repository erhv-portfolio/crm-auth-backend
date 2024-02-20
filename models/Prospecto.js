import mongoose from 'mongoose';

const prospectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    primer_apellido: {
        type: String,
        trim: true
    },
    segundo_apellido: {
        type: String,
        trim: true
    },
    calle: {
        type: String,
        trim: true
    },
    numero: {
        type: Number,
        trim: true
    },
    colonia: {
        type: String,
        trim: true
    },     
    codigo_postal: {
        type: Number,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },   
    rfc: {
        type: String,
        trim: true
    },
    estatus: {
        type: String,
        trim: true
    },
    alt_img: {
        type: String,
        trim: true
    }    
});

const Prospecto = mongoose.model('Prospecto', prospectoSchema);
export default Prospecto;