import responseHandler from "../../../../utils/response-handler";
import { Employee } from "../models/employee-model";




class GetEmployeeController {

    constructor() {
    }
    /**
      * @description   api to get employee
      * @param {*} req
      */
    get(req, res) {
        try {
            Employee.findById(req.params.id).populate('team').exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Employee details retrived successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Employee not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new GetEmployeeController();
