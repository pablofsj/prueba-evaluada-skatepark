import { Router } from "express";
import { skateparkController } from "../controllers/skatepark.controller.js";
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";

const router = Router()

// app.use('/api', skateparkRoutes)
router.get('/skaters', skateparkController.allSkaters) 
router.get('/admin', skateparkController.allSkaters) 
router.put('/admin', skateparkController.editStatusSkater) 


router.post('/skater', skateparkController.newSkater)
router.put('/skater', verifyTokenJWT, skateparkController.editSkater)
router.delete('/skater', verifyTokenJWT, skateparkController.deleteSkater) 

router.post('/login', skateparkController.loginSkater)
router.get('/perfil', verifyTokenJWT, skateparkController.profileSkater)  



export default router
