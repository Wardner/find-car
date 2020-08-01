import { check, param } from 'express-validator';
import { VehicleResponses } from './VehicleResponses';

const { VALIDATOR } = VehicleResponses;

const verifyPlate = [
  check('plate', VALIDATOR.PLATE)
    .notEmpty()
    .isLength({
      min: 5,
      max: 7
    })
]

const verifyModelBrand = [
  check(['brand', 'model'], VALIDATOR.BRAND_MODEL)
    .notEmpty()
    .isInt()
]

const verifyVin = [
  check('niv', VALIDATOR.VIN)
    .notEmpty()
    .isLength({
      min: 17
    })
]

const emptyCamps = [
  ...verifyModelBrand,
  ...verifyPlate,
  ...verifyVin,
  check(['year', 'lostlocation', 'date', 'description', 'user'], VALIDATOR.EMPTY_CAMPS)
    .notEmpty()
]


export const validators = {
  verifyVin,
  verifyModelBrand,
  verifyPlate,
  emptyCamps: [...verifyModelBrand, ...verifyPlate, ...verifyVin]
}
