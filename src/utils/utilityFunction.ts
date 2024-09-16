import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { errorMessages } from "./constants/errors.constant";
import { StandardResponse } from "./types";

function standardizeResponse(statusCode: number, responseData?: any ): StandardResponse{

  let resp: StandardResponse;
  resp.status = statusCode;
  if(responseData) resp.response = responseData;

  switch(statusCode){
  
    case 200: // OK
    case 201: // CREATED
    case 202: // ACCEPTED
    case 302: // FOUND
              resp.success = true;
              break;
    default:  resp.success = false;
  }

  resp.message = HttpStatus[statusCode];
  
  return resp;
}