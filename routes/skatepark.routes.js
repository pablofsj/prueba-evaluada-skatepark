import { Router } from "express";
import { skateparkController } from "../controllers/skatepark.controller.js";
import { verifyTokenJWT } from "../middlewares/jwt.middleware.js";



const router = Router()

router.get('/skaters', skateparkController.allSkaters)
router.post('/skater', skateparkController.newSkater)
router.post('/login', skateparkController.loginSkater)
router.put('/skater/:id', verifyTokenJWT, skateparkController.editSkater)
router.delete('/skater/:id', verifyTokenJWT, skateparkController.deleteSkater)


export default router
