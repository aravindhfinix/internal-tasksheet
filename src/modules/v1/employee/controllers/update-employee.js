import responseHandler from "../../../../utils/response-handler";
import { Employee } from "../models/employee-model";




class UpdateEmployeeController {

    constructor() {
    }
    /**
      * @description   api to update employee details
      * @param {*} req
      */
    update(req, res) {
        try {
            Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Employee updated successfully');
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


export default new UpdateEmployeeController();
