import Joi from 'joi';
import responseHandler from '../../../../utils/response-handler';
Joi.objectId = require('joi-objectid')(Joi)

class EmployeeValidator {

    constructor() {
        this.signInschema = Joi.object({
            name: Joi.string().required().error(new Error("please enter a proper name")),
            employee_id: Joi.string().required().error(new Error("Enter a proper employee id")),
            email: Joi.string().required().error(new Error("please enter a proper email")),
            password: Joi.string().required().error(new Error("please enter a proper password")),
            role: Joi.number().required().error(new Error("please select a role")),
            type: Joi.number().required().error(new Error("please select a type")),
            team: Joi.objectId().required().error(new Error("please select a team"))
        })
        this.updateSchema = Joi.object({
            name: Joi.string().error(new Error("please enter a proper name")),
            employee_id: Joi.string().error(new Error("Enter a proper employee id")),
            email: Joi.string().error(new Error("please enter a proper email")),
            role: Joi.number().error(new Error("please select a role")),
            type: Joi.number().error(new Error("please select a type")),
            team: Joi.objectId().error(new Error("please select a team"))
        })
        this.loginSchema = Joi.object({
            email: Joi.string().error(new Error("please enter a proper email")),
            password: Joi.string().error(new Error("please enter a poper password")),
        })
        this.validator = this.validator.bind(this);
        this.updateValidator = this.updateValidator.bind(this)
        this.loginValidator = this.loginValidator.bind(this);
    }

    /**
    * @description  validation middleware 
    * @param {*} req 
    * @param {*} res 
    **/
    validator(req, res, next) {
        try {
            const { error, value } = this.signInschema.validate(req.body)
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

    /**
    * @description  validation middleware 
    * @param {*} req 
    * @param {*} res 
    **/
    loginValidator(req, res, next) {
        try {
            const { error, value } = this.loginSchema.validate(req.body)
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

export default new EmployeeValidator();

