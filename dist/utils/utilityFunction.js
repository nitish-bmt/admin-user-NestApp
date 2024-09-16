"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function standardizeResponse(statusCode, responseData) {
    let resp;
    resp.status = statusCode;
    if (responseData)
        resp.response = responseData;
    switch (statusCode) {
        case 200:
        case 201:
        case 202:
        case 302:
            resp.success = true;
            break;
        default: resp.success = false;
    }
    resp.message = common_1.HttpStatus[statusCode];
    return resp;
}
//# sourceMappingURL=utilityFunction.js.map