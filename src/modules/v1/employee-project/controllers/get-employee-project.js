import responseHandler from "../../../../utils/response-handler";
import { EmployeeProject } from "../models/employee-project-model";



class GetEmployeeProjectController {

    constructor() {
    }
    /**
      * @description   api to get employeeProject
      * @param {*} req
      */
    get(req, res) {
        try {
            EmployeeProject.findOne({ employee_id: req.params.id }).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'EmployeeProject retrived successfully');
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


export default new GetEmployeeProjectController();
