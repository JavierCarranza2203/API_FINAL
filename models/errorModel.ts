export default class ErrorObject extends Error {
    private _strErrorMessage: string;
    private _strErrorCode: string;
    private _strClientMessage: string;
    private _strEndPoint: string;
    private _strController: string

    constructor(ep: string) {
        super();
        this._strEndPoint = ep;
        Object.setPrototypeOf(this, ErrorObject.prototype);
    }

    public get ErrorMessage(): string { return this._strErrorMessage; }
    public set ErrorMessage(value: string) { this._strErrorMessage = value; }

    public get ErrorCode(): string { return this._strErrorCode; }
    public set ErrorCode(value: string) { this._strErrorCode = value; }

    public get ClientMessage(): string { return this._strClientMessage; }
    public set ClientMessage(value: string) { this._strClientMessage = value; }

    public get EndPoint(): string { return this._strEndPoint; }
    public set EndPoint(value: string) { this._strEndPoint = value; }

    public get Controller(): string { return this._strController; }
    public set Controller(value: string) { this._strController = value; }

    public get Status(): number { return parseInt(this._strErrorCode) || 500 }

    public toJSON() {
        return {
            "endPoint": this._strEndPoint,
            "controller": this._strController,
            "code": this._strErrorCode,
            "message": this._strErrorMessage,
        }
    }

}