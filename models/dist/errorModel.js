var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ErrorObject = /** @class */ (function (_super) {
    __extends(ErrorObject, _super);
    function ErrorObject(ep) {
        var _this = _super.call(this) || this;
        _this._strEndPoint = ep;
        Object.setPrototypeOf(_this, ErrorObject.prototype);
        return _this;
    }
    Object.defineProperty(ErrorObject.prototype, "ErrorMessage", {
        get: function () { return this._strErrorMessage; },
        set: function (value) { this._strErrorMessage = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorObject.prototype, "ErrorCode", {
        get: function () { return this._strErrorCode; },
        set: function (value) { this._strErrorCode = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorObject.prototype, "ClientMessage", {
        get: function () { return this._strClientMessage; },
        set: function (value) { this._strClientMessage = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorObject.prototype, "EndPoint", {
        get: function () { return this._strEndPoint; },
        set: function (value) { this._strEndPoint = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorObject.prototype, "Controller", {
        get: function () { return this._strController; },
        set: function (value) { this._strController = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErrorObject.prototype, "Status", {
        get: function () { return parseInt(this._strErrorCode) || 500; },
        enumerable: false,
        configurable: true
    });
    ErrorObject.prototype.toJSON = function () {
        return {
            "endPoint": this._strEndPoint,
            "controller": this._strController,
            "code": this._strErrorCode,
            "message": this._strErrorMessage,
        };
    };
    return ErrorObject;
}(Error));
export default ErrorObject;
