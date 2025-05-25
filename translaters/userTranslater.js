import User from "../models/dist/userModel.js";

export default class UserTranslater {
    static TranslateFromDatabase(data) {
        return new User(data["nombre"], data["correo"], data["contrasenia"], data["id"]);
    }
}