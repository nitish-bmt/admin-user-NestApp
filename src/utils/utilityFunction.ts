import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { errorMessages } from "./constants/errors.constant";
import { StandardResponse } from "./types";
import { response } from "express";

export function standardizeResponse(statusCode: number,  message: string, response?: any): StandardResponse{
  let resp: StandardResponse;
  resp.status = statusCode;
  resp.success = true;
  resp.message = message;
  if(response) resp.response = response;
  return resp;
}

export function standardizeErrorResponse(error: Error ): StandardResponse{

  let resp: StandardResponse;
  // resp.status = error.;

  resp.success = false;  
  resp.message = error.message;
  return resp;
}