export default class Product {
    private _intId: number;
    private _strName: string;
    private _dblPrice: number;
    private _intStock: number;
    private _strDescription: string;

    constructor(name: string, price: number, stock: number, description: string, id: number) 
    {
        this._strName = name;
        this._dblPrice = price;
        this._intStock = stock;
        this._strDescription = description;
        this._intId = id;
    }

    public get Name() { return this._strName; }
    public set Name(n: string) { this._strName = n; }

    public get Price() { return this._dblPrice; }
    public set Price(p: number) { this._dblPrice = p; }

    public get Stock() { return this._intStock; }
    public set Stock(s: number) { this._intStock = s; }

    public get Description() { return this._strDescription; }
    public set Description(d: string) { this._strDescription = d; }

    public get Id() { return this._intId; }
    public set Id(i: number) { this._intId = i; }

    public toJSON() {
        return {
            "name": this._strName,
            "price": this._dblPrice,
            "stock": this._intStock,
            "description": this._strDescription,
            "id": this._intId
        }
    }
}