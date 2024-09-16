"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeResponse = standardizeResponse;
exports.standardizeErrorResponse = standardizeErrorResponse;
function standardizeResponse(statusCode, message, response) {
    let resp;
    resp.status = statusCode;
    resp.success = true;
    resp.message = message;
    if (response)
        resp.response = response;
    return resp;
}
function standardizeErrorResponse(error) {
    let resp;
    resp.success = false;
    resp.message = error.message;
    return resp;
}
//# sourceMappingURL=utilityFunction.js.map