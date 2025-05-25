import { Router } from "express";
import authController from '../controllers/authController.js';
import productController from "../controllers/productController.js";
import ProductTranslater from "../translaters/productTranslater.js";
import ErrorObject from "../models/dist/errorModel.js";

export const productRouter = Router();

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     security:
 *       - JsonWebToken: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
*                  name:
*                    type: string
*                    example: Producto1
*                  price:
*                    type: number
*                    example: 100.0
*                  stock:
*                    type: number
*                    example: 10
*                  description:
*                    type: string
*                    example: Descripción del producto
*                  id:
*                    type: number
*                    example: 1
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
productRouter.get('/all', authController.ValidateToken, async (req, res, next) => {
    try {
        const products = await productController.GetProducts();
        res.status(200).json(ProductTranslater.TranslateToJsonFromObject(products));
    } catch (error) {
        if(error instanceof ErrorObject) error.EndPoint = req.url;
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - JsonWebToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
*                  name:
*                    type: string
*                    example: Producto1
*                  price:
*                    type: number
*                    example: 100.0
*                  stock:
*                    type: number
*                    example: 10
*                  description:
*                    type: string
*                    example: Descripción del producto
*                  id:
*                    type: number
*                    example: 1
*             required:
*               - name
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
productRouter.get('/:id', authController.ValidateToken, async (req, res, next) => {
    try {
        const product = await productController.GetProductById(req.params.id);
        res.status(200).json(product.toJSON());
    } catch (error) {
        if(error instanceof ErrorObject) error.EndPoint = req.url;
        next(error);
    }
});

/**
 * @swagger
 * /products/new:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Productos
 *     security:
 *       - JsonWebToken: []
 *     requestBody:
 *       description: Datos del nuevo producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Producto1
 *               precio:
 *                 type: number
 *                 example: 100.0
 *               descripcion:
 *                 type: string
 *                 example: Descripción del producto
 *               cantidad:
 *                 type: number
 *                 example: 10
 *             required:
 *               - nombre
 *               - precio
 *               - descripcion
 *               - cantidad
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto creado exitosamente
 *       400:
 *         description: Solicitud incorrecta - datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
productRouter.post('/new', authController.ValidateToken, async(req, res, next) => {
    try {
        const message = await productController.CreateProduct(req.body);

        res.status(200).json({ message: message });
    }
    catch(error) {
        if(error instanceof ErrorObject) error.EndPoint = req.url;
        next(error);
    }
});

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - JsonWebToken: []
 *     requestBody:
 *       description: ID del producto a eliminar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El producto con id 1 se ha eliminado.
 *       400:
 *         description: Solicitud incorrecta - ID inválido o faltante
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
productRouter.delete('/', authController.ValidateToken, async(req, res, next) => {
    try {
        if(!req.body.id) res.status(400).json({ message: "El id debe especificarse" });
        await productController.Delete(req.body.id);

        res.status(200).json({ message: "El producto con id " + req.body.id + " se ha eliminado." });
    }
    catch(error) {
        if(error instanceof ErrorObject) error.EndPoint = req.url;
        next(error);
    }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar un producto por ID
 *     tags:
 *       - Productos
 *     security:
 *       - JsonWebToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       description: Datos del producto a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Camiseta nueva"
 *               precio:
 *                 type: number
 *                 format: number
 *                 example: 19
 *               descripcion:
 *                 type: string
 *                 example: "Camiseta algodón"
 *               cantidad:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El producto con id 1 se ha actualizado.
 *       400:
 *         description: Solicitud incorrecta - Datos inválidos o faltantes
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
productRouter.patch('/:id', authController.ValidateToken, async(req, res, next) => {
    try {
        if(!req.params.id) res.status(400).json({ message: "El id debe especificarse" });
        await productController.Update(req.body, req.params.id);

        res.status(200).json({ message: "El producto con id " + req.params.id + " se ha actualizado." });
    }
    catch(error) {
        if(error instanceof ErrorObject) error.EndPoint = req.url;
        next(error);
    }
});
