import responseHandler from "../../../../utils/response-handler";
import { EmployeeProject } from "../models/employee-project-model";



class DeteteEmployeeProjectController {

    constructor() {
    }
    /**
      * @description   api to delete employeeProject
      * @param {*} req
      */
    delete(req, res) {
        try {
            EmployeeProject.findByIdAndDelete(req.params.id).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'EmployeeProject deleted successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'EmployeeProject not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new DeteteEmployeeProjectController();
