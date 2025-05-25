import { pool } from "../config/db_config.js";

/**
 * * Estructura con el nombre de las tablas de la base de datos.
 * @public
 */
export const tables = {
    "users": "usuarios",
    "products": "productos"
}

/**
 * * Crea y ejecuta consultas de SQL a la base de datos
 * @public
 * @class
 */
export default class dbController {
    /**
     * * Crea y ejecuta una consulta "SELECT".
     * En caso de necesitar JOINS, hay que escribirlos en el parámetro "condition"
     * @param { string } table Tabla a la que se hará la consulta "SELECT".
     * @param { string } columns Columnas que se quieren visualizar.
     * @param { string } condition Condición para filtrar los datos (Incluir JOINS en caso de ser necesarios).
     * @param { any[] } params Array con los parametros en orden.
     * * Ejemplo: "SELECT nombre FROM usuarios WHERE id = ?"
     */
    static async CreateQuerySelect(table, columns = ['*'], condition = null, params = []) {
        if (!Object.values(tables).includes(table)) {
            throw new Error('La tabla no existe');
        }

        const columnsStr = Array.isArray(columns) ? columns.map(col => `\`${col}\``).join(', ') : columns;

        const query = `SELECT ${columnsStr} FROM \`${table}\`${condition ? ' WHERE ' + condition : ''}`;

        const [rows] = await pool.query(query, params);
        return rows;
    }


    static async CreateQueryInsert(table, columns = [], params = []) {
        if (!Object.values(tables).includes(table)) {
            throw new Error('La tabla no existe');
        }

        if (columns.length === 0 || params.length === 0 || columns.length !== params.length) {
            throw new Error('Columnas y parámetros no válidos');
        }

        const columnsStr = columns.map(col => `\`${col}\``).join(', ');
        const placeholders = columns.map(() => '?').join(', ');

        const query = `INSERT INTO \`${table}\` (${columnsStr}) VALUES (${placeholders})`;

        const [rows] = await pool.query(query, params);

        return rows.affectedRows > 0;
    }

        /**
     * * Crea y ejecuta una consulta "UPDATE".
     * @param { string } table Tabla a la que se hará la consulta "UPDATE".
     * @param { string[] } columns Columnas que se actualizarán.
     * @param { any[] } params Valores correspondientes a las columnas.
     * @param { string } condition Condición para filtrar los datos que se actualizarán (ej. "id = ?").
     * * Ejemplo: "UPDATE usuarios SET nombre = ? WHERE id = ?"
     * @returns { Promise<boolean> } True si se actualizó al menos un registro.
     */
    static async CreateQueryUpdate(table, columns = [], params = [], condition = '') {
        if (!Object.values(tables).includes(table)) {
            throw new Error('La tabla no existe');
        }

        if (columns.length === 0 || params.length === 0 || columns.length !== params.length) {
            throw new Error('Columnas y parámetros no válidos');
        }

        if (!condition) {
            throw new Error('Debes proporcionar una condición para el UPDATE');
        }

        const setClause = columns.map(col => `\`${col}\` = ?`).join(', ');
        const query = `UPDATE \`${table}\` SET ${setClause} WHERE ${condition}`;

        const [rows] = await pool.query(query, params);
        return rows.affectedRows > 0;
    }

    /**
     * * Crea y ejecuta una consulta "DELETE".
     * @param { string } table Tabla de donde se eliminarán registros.
     * @param { string } condition Condición para filtrar los datos que se eliminarán (ej. "id = ?").
     * @param { any[] } params Parámetros para la condición.
     * * Ejemplo: "DELETE FROM productos WHERE id = ?"
     * @returns { Promise<boolean> } True si se eliminó al menos un registro.
     */
    static async CreateQueryDelete(table, condition, params = []) {
        if (!Object.values(tables).includes(table)) {
            throw new Error('La tabla no existe');
        }

        if (!condition) {
            throw new Error('Debes proporcionar una condición para el DELETE');
        }

        const query = `DELETE FROM \`${table}\` WHERE ${condition}`;

        const [rows] = await pool.query(query, params);
        return rows.affectedRows > 0;
    }

}