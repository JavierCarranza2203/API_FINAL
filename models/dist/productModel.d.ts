export default class Product {
    private _intId;
    private _strName;
    private _dblPrice;
    private _intStock;
    private _strDescription;
    constructor(name: string, price: number, stock: number, description: string, id: number);
    get Name(): string;
    set Name(n: string);
    get Price(): number;
    set Price(p: number);
    get Stock(): number;
    set Stock(s: number);
    get Description(): string;
    set Description(d: string);
    get Id(): number;
    set Id(i: number);
    toJSON(): {
        name: string;
        price: number;
        stock: number;
        description: string;
        id: number;
    };
}
