import { Router } from 'express';
import authController from '../controllers/authController.js';

export const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       description: Credenciales de usuario para iniciar sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 example: contraseñasegura123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Solicitud incorrecta - datos inválidos
 *       401:
 *         description: No autorizado - credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
authRouter.post('/login', authController.Login);
