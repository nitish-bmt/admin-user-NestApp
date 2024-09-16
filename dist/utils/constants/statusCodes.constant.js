"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["ResourceCreated"] = 201] = "ResourceCreated";
    StatusCodes[StatusCodes["ValidationError"] = 1002] = "ValidationError";
    StatusCodes[StatusCodes["InternalServerError"] = 1003] = "InternalServerError";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["UnauthorizedAccess"] = 1005] = "UnauthorizedAccess";
    StatusCodes[StatusCodes["ServiceUnAvailable"] = 1008] = "ServiceUnAvailable";
    StatusCodes[StatusCodes["Forbidden"] = 1010] = "Forbidden";
    StatusCodes[StatusCodes["UserInactive"] = 1012] = "UserInactive";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["InvalidCredentials"] = 1014] = "InvalidCredentials";
    StatusCodes[StatusCodes["InvalidRefreshToken"] = 1015] = "InvalidRefreshToken";
    StatusCodes[StatusCodes["DeleteDefaultError"] = 1018] = "DeleteDefaultError";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
//# sourceMappingURL=statusCodes.constant.js.map