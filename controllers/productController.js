import dbController, { tables } from './dbController.js';
import ProductTranslater from '../translaters/productTranslater.js';
import ErrorObject from '../models/dist/errorModel.js'

export default class productController {
    static async GetProductById(id) {
        const error = new ErrorObject('')
        error.Controller = "ProductController.GetProductById";
        const data = await dbController.CreateQuerySelect(tables.products, "*", "id = ?", [id]);

        if (!data) {
                error.ErrorCode = "404";
                error.ClientMessage = "El producto no existe";
                throw error;
        }

        return ProductTranslater.TranslateFromDatabase(data[0]);
    }

    static async GetProducts() {
        const error = new ErrorObject('')
        error.Controller = "ProductController.GetProducts";
        const data = await dbController.CreateQuerySelect(tables.products, "*");
        let productsList = [];

        if (!data) {
                error.ErrorCode = "404";
                error.ClientMessage = "No hay productos para mostrar";
                throw error;
        }

        for(let product of data) {
            productsList.push(ProductTranslater.TranslateFromDatabase(product));
        }

        return productsList;
    }

    static async CreateProduct(data) {
        const error = new ErrorObject('')
        error.Controller = "ProductController.CreateProduct";
        const flag = await dbController.CreateQueryInsert(tables.products, ['nombre', 'precio', 'descripcion', 'cantidad'], [data.nombre, data.precio, data.descripcion, data.cantidad]);

        if (!flag) {
                error.ErrorCode = "400";
                error.ClientMessage = "Error al insertar el producto";
                throw error;
        }

        return "El producto se ha agregado correctamente.";
    }

    static async Delete(id) {
        const error = new ErrorObject('')
        error.Controller = "ProductController.Delete";

        const flag = await dbController.CreateQueryDelete(tables.products, "id = ?", [id]);

        if(!flag) {
            error.ErrorCode = "404";
            error.ClientMessage = "El producto no se encuentra";
            throw error;
        }

        return flag;
    }

    static async Update(data, id) {
        const error = new ErrorObject('')
        error.Controller = "ProductController.Update";

        const flag = await dbController.CreateQueryUpdate(tables.products, ["nombre", "precio", "descripcion", "cantidad"], [data.nombre, data.precio, data.descripcion, data.cantidad, id], "id = ?");

        if(!flag) {
            error.ErrorCode = "404";
            error.ClientMessage = "El producto no se encuentra";
            throw error;
        }

        return flag;
    }
}