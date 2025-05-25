var Product = /** @class */ (function () {
    function Product(name, price, stock, description, id) {
        this._strName = name;
        this._dblPrice = price;
        this._intStock = stock;
        this._strDescription = description;
        this._intId = id;
    }
    Object.defineProperty(Product.prototype, "Name", {
        get: function () { return this._strName; },
        set: function (n) { this._strName = n; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "Price", {
        get: function () { return this._dblPrice; },
        set: function (p) { this._dblPrice = p; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "Stock", {
        get: function () { return this._intStock; },
        set: function (s) { this._intStock = s; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "Description", {
        get: function () { return this._strDescription; },
        set: function (d) { this._strDescription = d; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "Id", {
        get: function () { return this._intId; },
        set: function (i) { this._intId = i; },
        enumerable: false,
        configurable: true
    });
    Product.prototype.toJSON = function () {
        return {
            "name": this._strName,
            "price": this._dblPrice,
            "stock": this._intStock,
            "description": this._strDescription,
            "id": this._intId
        };
    };
    return Product;
}());
export default Product;
