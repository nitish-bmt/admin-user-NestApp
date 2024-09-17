"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = exports.UserError = exports.UserCreationError = exports.DbError = exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["INSUFFICIENT_ARGUMENTS"] = "TOO FEW ARGUMENTS PASSED";
    ErrorMessages["ENCRYPTION_ERROR"] = "ENCRYPTION FAILED";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
var DbError;
(function (DbError) {
    DbError["CONNECTION_ERROR"] = "COULD NOT CONNECT TO DB";
    DbError["WRITE_ERROR"] = "COULD NOT WRITE TO DB";
    DbError["READ_ERROR"] = "COULD NOT READ FROM DB";
})(DbError || (exports.DbError = DbError = {}));
var UserCreationError;
(function (UserCreationError) {
    UserCreationError["ERROR"] = "COULD NOT REGISTER NEW USER";
    UserCreationError["EMAIL_ALREADY_REGISTERED"] = "EMAIL ALREADY REGISTERED. TRY WITH ANOTHER EMAIL";
    UserCreationError["USERNAME_ALREADY_TAKEN"] = "USERNAME ALREADY TAKEN. TRY WITH ANOTHER USERNAME";
})(UserCreationError || (exports.UserCreationError = UserCreationError = {}));
var UserError;
(function (UserError) {
    UserError["INVALID_CREDENTIALS"] = "CREDENTIALS DO NOT MATCH";
    UserError["USER_NOT_CREATED"] = "COULD NOT CREATE THE USER";
    UserError["USER_NOT_FOUND"] = "USER DOES NOT EXIST";
    UserError["USER_NOT_DELETED"] = "COULD NOT DELETE THE USER";
    UserError["ADMIN_PRIVACY"] = "ADMIN CAN ONLY GET SUB ADMINS";
})(UserError || (exports.UserError = UserError = {}));
var AuthError;
(function (AuthError) {
    AuthError["ERROR"] = "COULD NOT LOGIN";
    AuthError["INACTIVE_USER"] = "INACTIVE USERS ARE NOT ALLOWED";
    AuthError["DELETED_USER"] = "USER HAS BEEN DELETED";
    AuthError["INVALID_CREDENTIALS"] = "USERNAME AND PASSWORD DO NOT MATCH";
})(AuthError || (exports.AuthError = AuthError = {}));
//# sourceMappingURL=errors.constant.js.map