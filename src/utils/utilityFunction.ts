import { StandardResponse } from "./types";

export function standardizeResponse(statusCode: number,  message: string, response: any): StandardResponse{
  return {
    status: statusCode,
    success: true,
    response: response,
    message: message,
  } as StandardResponse;
}

export function standardizeErrorResponse(error: Error ): StandardResponse{

  return{
    // status: [error.name],
    success: false,
    message: error.message,
  } as StandardResponse;
}