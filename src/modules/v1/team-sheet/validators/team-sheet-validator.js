import Joi from 'joi';
import responseHandler from '../../../../utils/response-handler';

Joi.objectId = require('joi-objectid')(Joi)

class projectValidator {

    constructor() {
        this.schema = Joi.object({
            employee_id: Joi.objectId().required().error(new Error("Enter a proper employee_id")),
            project_id: Joi.objectId().required().error(new Error("Enter a proper project_id")),
            task_description: Joi.string().required().error(new Error("Enter a proper task_description")),
            date: Joi.string().required().error(new Error("Enter a proper date")),
            estimated_hours: Joi.number().required().error(new Error("Enter a proper estimated_hours")),
            worked_hours: Joi.number().required().error(new Error("Enter a proper worked_hours")),
            status: Joi.number().error(new Error("Enter a proper priority"))
        })
        this.updateSchema = Joi.object({
            project_id: Joi.objectId().error(new Error("Enter a proper project_id")),
            task_description: Joi.string().error(new Error("Enter a proper task_description")),
            date: Joi.string().error(new Error("Enter a proper date")),
            estimated_hours: Joi.number().error(new Error("Enter a proper estimated_hours")),
            worked_hours: Joi.number().error(new Error("Enter a proper worked_hours")),
            status: Joi.number().error(new Error("Enter a proper priority"))
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

