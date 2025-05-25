import dbController, { tables } from './dbController.js';
import ErrorObject from '../models/dist/errorModel.js';

export default class UserController {
    static async SignUp(data) {
        const error = new ErrorObject('')
        error.Controller = "UserController.SignUp";
        const flag = await dbController.CreateQueryInsert(tables.users, ['nombre', 'contrasenia', 'correo'], [data.nombre, data.contrasenia, data.correo]);
        
        if (!flag) {
                error.ErrorCode = "400";
                error.ClientMessage = "Error al crear cuenta";
                throw error;
        }

        return "La cuenta se ha creado.";
    }
}