import Joi from 'joi';
import responseHandler from './response-handler';
Joi.objectId = require('joi-objectid')(Joi)


class ParamsValidator {

    constructor() {
        this.schema = Joi.objectId().required().error(new Error("please give a proper id")),
            this.validator = this.validator.bind(this);
    }

    /**
    * @description  validation middleware 
    * @param {*} req 
    * @param {*} res 
    */

    validator(req, res, next) {

        try {
            const { error, value } = this.schema.validate(req.params.id)
            if (error == undefined) {
                next();
            }
            else {
                return responseHandler.errorResponse(res, {}, error.message, 400);
            }
        }

        catch (err) {
            responseHandler.errorResponse(res, err);
        }

    }
}

export default new ParamsValidator();
