import Joi from 'joi';
import responseHandler from '../../../../utils/response-handler';


class projectValidator {

    constructor() {
        this.schema = Joi.object({
            name: Joi.string().required().error(new Error("Enter a proper name")),
            description: Joi.array().required().error(new Error("Enter a proper description")),
            client_name: Joi.string().required().error(new Error("Enter a proper client_name")),
            priority: Joi.string().required().error(new Error("Enter a proper priority")),
        })
        this.updateSchema = Joi.object({
            name: Joi.string().error(new Error("Enter a proper name")),
            description: Joi.array().error(new Error("Enter a proper description")),
            client_name: Joi.string().error(new Error("Enter a proper client_name")),
            priority: Joi.string().error(new Error("Enter a proper priority")),
        })

        this.validator = this.validator.bind(this);
        this.updateValidator = this.updateValidator.bind(this)

    }

    /**
    * @description  validation middleware 
    * @param {*} req 
    * @param {*} res 
    **/
    validator(req, res, next) {
        try {
            const { error, value } = this.schema.validate(req.body)
            if (error == undefined) {
                next();
            } else {
                return responseHandler.errorResponse(res, {}, error.message, 421);
            }
        } catch (err) {
            responseHandler.errorResponse(res, err);
        }
    }

    /**
    * @description  validation middleware 
    * @param {*} req 
    * @param {*} res 
    **/
    updateValidator(req, res, next) {
        try {
            const { error, value } = this.updateSchema.validate(req.body)
            if (error == undefined) {
                next();
            } else {
                return responseHandler.errorResponse(res, {}, error.message, 421);
            }
        } catch (err) {
            responseHandler.errorResponse(res, err);
        }
    }


}

export default new projectValidator();

