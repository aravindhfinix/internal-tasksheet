import responseHandler from "../../../../utils/response-handler";
import { EmployeeProject } from "../models/employee-project-model";




class CreateEmployeeProjectController {

    constructor() {
    }
    /**
      * @description   api to create employeeEmployeeProject
      * @param {*} req
      */
    create(req, res) {
        try {
            EmployeeProject.create(req.body, (err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'EmployeeProject created successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'EmployeeProject cration failed', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new CreateEmployeeProjectController();
