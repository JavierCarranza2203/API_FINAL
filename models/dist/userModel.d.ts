export default class User {
    private _strName;
    private _strEmail;
    private _strPassword;
    private _strId;
    constructor(name: string, email: string, password: string, id?: number);
    get Name(): string;
    set Name(n: string);
    get Email(): string;
    set Email(e: string);
    get Password(): string;
    get Id(): number;
    toJSON(): {
        name: string;
        email: string;
        id: number;
    };
}
