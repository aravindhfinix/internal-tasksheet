import responseHandler from "../../../../utils/response-handler";
import { Employee } from "../models/employee-model";




class DeteteEmployeeController {

    constructor() {
    }
    /**
      * @description   api to delete employee
      * @param {*} req
      */
    delete(req, res) {
        try {
            Employee.findByIdAndDelete(req.params.id).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Employee deleted successfully');
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


export default new DeteteEmployeeController();
