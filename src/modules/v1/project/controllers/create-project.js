import responseHandler from "../../../../utils/response-handler";
import { Project } from "../models/project-model";




class CreateProjectController {

    constructor() {
    }
    /**
      * @description   api to create project
      * @param {*} req
      */
    create(req, res) {
        try {
            Project.create(req.body, (err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Project created successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Project cration failed', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new CreateProjectController();
