import { Router } from "express";
import UserController from "../controllers/userController.js";

export const userRouter = Router();

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Usuarios
 *     security:
 *     requestBody:
 *       description: Datos para el registro de usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: juanperez
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: juanperezs@ejemplo.com
 *               contrasenia:
 *                 type: string
 *                 example: contraseñasegura1233
 *             required:
 *               - nombre
 *               - correo
 *               - contrasenia
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *       400:
 *         description: Solicitud incorrecta - datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
userRouter.post('/sign-up', async (req, res, next) => {
    try {
        const message = await UserController.SignUp(req.body);
        
        res.status(200).json({ message: message });
    }
    catch(error) {
        next(error)
    }
});
