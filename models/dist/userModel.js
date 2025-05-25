var User = /** @class */ (function () {
    function User(name, email, password, id) {
        if (id === void 0) { id = 0; }
        this._strName = name;
        this._strEmail = email;
        this._strPassword = password;
        this._strId = id;
    }
    Object.defineProperty(User.prototype, "Name", {
        get: function () { return this._strName; },
        set: function (n) { this._strName = n; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Email", {
        get: function () { return this._strEmail; },
        set: function (e) { this._strEmail = e; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Password", {
        get: function () { return this._strPassword; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "Id", {
        get: function () { return this._strId; },
        enumerable: false,
        configurable: true
    });
    User.prototype.toJSON = function () {
        return {
            "name": this._strName,
            "email": this._strEmail,
            "id": this.Id
        };
    };
    return User;
}());
export default User;
