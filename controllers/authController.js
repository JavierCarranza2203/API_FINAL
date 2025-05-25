import JsonWebToken from 'jsonwebtoken';
import dbController, { tables } from './dbController.js';
import UserTranslater from '../translaters/userTranslater.js'

export default class authController {
    static async Login(req, res, next) {
        try {
            const { email, password } = req.body;

            const data = await dbController.CreateQuerySelect(tables.users, "*", "correo = ?", [email])

            if(data[0] == undefined) res.status(404).json("No existe un usuario con ese correo");

            const User = UserTranslater.TranslateFromDatabase(data[0]);

            if(User.Password != password) res.status(404).json("Contraseña incorrecta");

            const token = JsonWebToken.sign(User.toJSON(), process.env.JWT_SECRET);

            res.status(200).json({ "access-token": token });
        }
        catch(error) {
            next(error);
        }
    }

    static async ValidateToken(req, res, next) {
            try {
            if(typeof(req.headers.authorization) == "undefined") return res.status(401).json({ "error": "Acceso no autorizado" });

            let token = req.headers.authorization;

            JsonWebToken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) return res.status(401).json({ "error": "Acceso no autorizado" }); 

                next();
            });
        }
        catch(error) {
            next(error);
        }
    }
}