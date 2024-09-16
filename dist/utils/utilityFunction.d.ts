import { StandardResponse } from "./types";
export declare function standardizeResponse(statusCode: number, message: string, response?: any): StandardResponse;
export declare function standardizeErrorResponse(error: Error): StandardResponse;
