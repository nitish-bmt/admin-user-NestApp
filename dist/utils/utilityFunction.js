"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeResponse = standardizeResponse;
exports.standardizeErrorResponse = standardizeErrorResponse;
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../user/entity/user.entity");
const user_dto_1 = require("../user/dto/user.dto");
function standardizeResponse(statusCode, message, response) {
    if (response instanceof user_entity_1.User) {
        console.log(response);
        response = (0, class_transformer_1.plainToInstance)(user_dto_1.SafeTransferUserDto, response);
        console.log(response);
    }
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