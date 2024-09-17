"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSuccess = exports.UserSuccess = exports.DBSuccess = void 0;
var DBSuccess;
(function (DBSuccess) {
    DBSuccess["DB_SUCCESS"] = "CONNECTED TO DB";
    DBSuccess["DB_WRITE_SUCCESS"] = "DATA ADDED TO DB";
    DBSuccess["DB_READ_SUCCESS"] = "READING FROM DB";
    DBSuccess["DB_SEARCH_SUCCESS"] = "SEARCHING IN DB";
    DBSuccess["DB_ITEM_FOUND"] = "ITEM FOUND IN DB";
})(DBSuccess || (exports.DBSuccess = DBSuccess = {}));
var UserSuccess;
(function (UserSuccess) {
    UserSuccess["USER_CREATED"] = "NEW USER CREATED SUCCESSFULLY";
    UserSuccess["LOGGED_IN"] = "LOGGED IN SUCCESSFULLY";
    UserSuccess["USER_UPDATED"] = "USER UPDATED SUCCESSFULLY";
    UserSuccess["USER_FOUND"] = "USER EXISTS";
    UserSuccess["USER_DELETED"] = "DELETED THE USER";
    UserSuccess["FETCHED_USER"] = "GOT THE USER";
    UserSuccess["FETCHED_USER_LIST"] = "GOT THE USER LIST";
    UserSuccess["ACTIVATED"] = "ACTIVATED THE USER SUCCESSFULLY";
    UserSuccess["DEACTIVATED"] = "DEACTIVATED THE USER SUCCESSFULLY";
})(UserSuccess || (exports.UserSuccess = UserSuccess = {}));
var AuthSuccess;
(function (AuthSuccess) {
    AuthSuccess["SUCCESS"] = "LOGGED IN SUCCESSFULLY";
})(AuthSuccess || (exports.AuthSuccess = AuthSuccess = {}));
//# sourceMappingURL=success.constant.js.map