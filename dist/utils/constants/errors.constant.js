"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFailure = exports.userFailure = exports.userCreationFailure = exports.dbFailure = exports.errorMessages = void 0;
var errorMessages;
(function (errorMessages) {
    errorMessages["INSUFFICIENT_ARGUMENTS"] = "Too few arguments passed";
    errorMessages["ENCRYPTION_FAILURE"] = "Encryption failed";
})(errorMessages || (exports.errorMessages = errorMessages = {}));
var dbFailure;
(function (dbFailure) {
    dbFailure["DB_FAILURE"] = "COULD NOT CONNECT TO DB";
    dbFailure["DB_WRITE_FAILURE"] = "COULD NOT WRITE TO DB";
    dbFailure["DB_READ_FAILURE"] = "COULD NOT READ FROM DB";
    dbFailure["DB_SEARCH_FAILURE"] = "COULD NOT FIND DB";
    dbFailure["DB_ITEM_NOT_FOUND"] = "ITEM NOT FOUND IN DB";
    dbFailure["EMPTY_DB_STRING"] = "RECEIVED EMPTY DB STRING ";
    dbFailure["DB_ITEM_NOT_DELETED"] = "COULD NOT DELETE THE ITEM";
})(dbFailure || (exports.dbFailure = dbFailure = {}));
var userCreationFailure;
(function (userCreationFailure) {
    userCreationFailure["FAILURE"] = "Could not register new user.";
    userCreationFailure["EMAIL_ALREADY_REGISTERED"] = "Email already registered. Try with another email.";
    userCreationFailure["USERNAME_ALREADY_TAKEN"] = "Username already taken. Try with another username.";
})(userCreationFailure || (exports.userCreationFailure = userCreationFailure = {}));
var userFailure;
(function (userFailure) {
    userFailure["USER_NOT_FOUND"] = "User does not exist";
    userFailure["USER_NOT_DELETED"] = "COULD NOT DELETE THE USER";
    userFailure["ADMIN_PRIVACY"] = "ADMIN CAN ONLY GET SUB ADMINS";
})(userFailure || (exports.userFailure = userFailure = {}));
var authFailure;
(function (authFailure) {
    authFailure["FAILURE"] = "Could not login";
    authFailure["INACTIVE_USER"] = "Inactive users are not allowed";
    authFailure["INVALID_CREDENTIALS"] = "username and password do not match";
})(authFailure || (exports.authFailure = authFailure = {}));
//# sourceMappingURL=errors.constant.js.map