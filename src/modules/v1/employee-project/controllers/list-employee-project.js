import responseHandler from "../../../../utils/response-handler";
import { EmployeeProject } from "../models/employee-project-model";



class ListEmployeeProjectController {

    constructor() {
    }
    /**
      * @description   api to list employeeProject
      * @param {*} req
      */
    list(req, res) {
        try {
            EmployeeProject.find().populate('employee_id project_id').exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result.length != 0) {
                    responseHandler.successResponse(res, result, 'EmployeeProjects retrived successfully');
                } else {
                    responseHandler.successResponse(res, {}, 'EmployeeProjects not found');
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new ListEmployeeProjectController();
