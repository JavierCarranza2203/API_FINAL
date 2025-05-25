export default class ErrorObject extends Error {
    private _strErrorMessage;
    private _strErrorCode;
    private _strClientMessage;
    private _strEndPoint;
    private _strController;
    constructor(ep: string);
    get ErrorMessage(): string;
    set ErrorMessage(value: string);
    get ErrorCode(): string;
    set ErrorCode(value: string);
    get ClientMessage(): string;
    set ClientMessage(value: string);
    get EndPoint(): string;
    set EndPoint(value: string);
    get Controller(): string;
    set Controller(value: string);
    get Status(): number;
    toJSON(): {
        endPoint: string;
        controller: string;
        code: string;
        message: string;
    };
}
