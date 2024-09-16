"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSuccess = exports.successStatus = exports.userSuccess = exports.dbSuccess = void 0;
var dbSuccess;
(function (dbSuccess) {
    dbSuccess["DB_SUCCESS"] = "CONNECTED TO DB";
    dbSuccess["DB_WRITE_SUCCESS"] = "DATA ADDED TO DB";
    dbSuccess["DB_READ_SUCCESS"] = "READING FROM DB";
    dbSuccess["DB_SEARCH_SUCCESS"] = "SEARCHING IN DB";
    dbSuccess["DB_ITEM_NOT_FOUND"] = "ITEM FOUND IN DB";
})(dbSuccess || (exports.dbSuccess = dbSuccess = {}));
var userSuccess;
(function (userSuccess) {
    userSuccess["USER_CREATED"] = "New user created successfully.";
    userSuccess["LOGGED_IN"] = "Logged in successfully";
    userSuccess["USER_UPDATED"] = "User updated successfully.";
    userSuccess["USER_FOUND"] = "User exists";
    userSuccess["USER_DELETED"] = "DELETED THE USER";
    userSuccess["FETCHED_USER"] = "Got the user";
    userSuccess["FETCHED_USER_LIST"] = "Got the user list";
    userSuccess["ACTIVATED"] = "Activated the user successfully";
    userSuccess["DEACTIVATED"] = "Deactivated the user successfully";
})(userSuccess || (exports.userSuccess = userSuccess = {}));
var successStatus;
(function (successStatus) {
    successStatus[successStatus["OK"] = 200] = "OK";
    successStatus[successStatus["RESOURCE_CREATED_SUCCESSFULLY"] = 201] = "RESOURCE_CREATED_SUCCESSFULLY";
})(successStatus || (exports.successStatus = successStatus = {}));
var authSuccess;
(function (authSuccess) {
    authSuccess["SUCCESS"] = "Logged in successfully";
})(authSuccess || (exports.authSuccess = authSuccess = {}));
//# sourceMappingURL=success.constant.js.map