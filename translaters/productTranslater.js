import Product from '../models/dist/productModel.js';

/**
 * * Clase para ayudar a la conversión entre objetos de la clase 'Product'
 */
export default class ProductTranslater {
    /**
     * * Genera una instancia con datos recuperados de la base de datos
     * @param { object } data Producto recopilado de la base de datos.
     * @returns 
     */
    static TranslateFromDatabase(data) {
        return new Product(data["nombre"], data["precio"], data["cantidad"], data["descripcion"], data["id"]);
    }

    /**
     * * Convierte un array de instancias de la clase 'Product' en un array con su representación en JSON
     * @static
     * @param { Product[] } productsList
     * @returns { object[] } Arreglo de productos en formato JSON.
     */
    static TranslateToJsonFromObject(productsList) {
        let jsonProductsList = [];

        productsList.forEach(product => {
            jsonProductsList.push(product.toJSON());
        });

        return jsonProductsList;
    }
}