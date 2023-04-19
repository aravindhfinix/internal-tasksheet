import responseHandler from "../../../../utils/response-handler";
import { Employee } from "../models/employee-model";




class ListEmployeeController {

    constructor() {
    }
    /**
      * @description   api to list employee
      * @param {*} req
      */
    list(req, res) {
        try {
            Employee.find().populate('team').exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result.length != 0) {
                    responseHandler.successResponse(res, result, 'Employees list retrived successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Employees not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new ListEmployeeController();
