"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeResponse = standardizeResponse;
exports.standardizeErrorResponse = standardizeErrorResponse;
function standardizeResponse(statusCode, message, response) {
    return {
        status: statusCode,
        success: true,
        response: response,
        message: message,
    };
}
function standardizeErrorResponse(error) {
    return {
        success: false,
        message: error.message,
    };
}
//# sourceMappingURL=utilityFunction.js.map