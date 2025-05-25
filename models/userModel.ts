export default class User {
    private _strName: string;
    private _strEmail: string;
    private _strPassword: string;
    private _strId: number;

    constructor(name: string, email: string, password: string, id: number = 0) 
    {
        this._strName = name;
        this._strEmail = email;
        this._strPassword = password;
        this._strId = id;
    }

    public get Name() { return this._strName; }
    public set Name(n: string) { this._strName = n; }

    public get Email() { return this._strEmail; }
    public set Email(e: string) { this._strEmail = e; }

    public get Password() { return this._strPassword; }

    public get Id() { return this._strId; }

    public toJSON() {
        return {
            "name": this._strName,
            "email": this._strEmail,
            "id": this.Id
        }
    }
}