"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["UPDATED"] = 204] = "UPDATED";
    StatusCodes[StatusCodes["DELETED"] = 204] = "DELETED";
    StatusCodes[StatusCodes["VALIDATION_ERROR"] = 1002] = "VALIDATION_ERROR";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 1003] = "INTERNAL_SERVER_ERROR";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["UNAUTHORIZED_ACCESS"] = 1005] = "UNAUTHORIZED_ACCESS";
    StatusCodes[StatusCodes["SERVICE_UNAVAILABLE"] = 1008] = "SERVICE_UNAVAILABLE";
    StatusCodes[StatusCodes["FORBIDDEN"] = 1010] = "FORBIDDEN";
    StatusCodes[StatusCodes["USER_INACTIVE"] = 1012] = "USER_INACTIVE";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["INVALID_CREDENTIALS"] = 1014] = "INVALID_CREDENTIALS";
    StatusCodes[StatusCodes["INVALID_REFRESH_TOKEN"] = 1015] = "INVALID_REFRESH_TOKEN";
    StatusCodes[StatusCodes["DELETE_DEFAULT_ERROR"] = 1018] = "DELETE_DEFAULT_ERROR";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
//# sourceMappingURL=statusCodes.constant.js.map