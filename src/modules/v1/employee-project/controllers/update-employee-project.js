import responseHandler from "../../../../utils/response-handler";
import { EmployeeProject } from "../models/employee-project-model";



class UpdateEmployeeProjectController {

    constructor() {
    }
    /**
      * @description   api to update employeeProject
      * @param {*} req
      */
    update(req, res) {
        try {
            EmployeeProject.findByIdAndUpdate(req.params.id, { project_id: req.body.project_id }, { new: true }).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'EmployeeProject updated successfully');
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


export default new UpdateEmployeeProjectController();
