import express from 'express'
import { createProspecto, getProspectos, getProspectoByid, updateProspecto, deleteProspecto } from '../controllers/prospectoController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(createProspecto)
    .get(getProspectos)

router.get('/id/:id', getProspectoByid)

router.route('/:id')
    .get(getProspectoByid)
    .put(updateProspecto)
    .delete(deleteProspecto)

export default router