import { validationResult } from 'express-validator';
import { ResponseHandler } from './ResponseHandler';
import { statusCodes } from './statusCodes';

export class RouteMethod {
  public static async build( { req, res, resolve }: any ) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res
        .status(statusCodes.UNPROCESSABLE)
        .send(ResponseHandler.build(errors.array(), false))
    }
    try {
      await resolve()
    } catch (error) {
      if (!error.statusCode) {
        return res
          .status(statusCodes.INTERNAL_ERROR)
          .send(ResponseHandler.build(`Oops! An unexpected error occurred, try again later. ${error}`))
      }

      return res
        .status(error.statusCode)
        .send(ResponseHandler.build(error.mesage))
    }
  }
}