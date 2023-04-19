import Joi from 'joi';
import responseHandler from '../../../../utils/response-handler';


class EmployeeProjectValidator {

    constructor() {
        this.schema = Joi.object({
            employee_id: Joi.string().required().error(new Error("Enter a proper employee id")),
            project_id:Joi.array().required().error(new Error("Enter a proper project id"))
        })
        this.updateSchema = Joi.object({
            employee_id: Joi.string().error(new Error("Enter a proper employee id")),
            project_id:Joi.array().error(new Error("Enter a proper project id"))
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

export default new EmployeeProjectValidator();

