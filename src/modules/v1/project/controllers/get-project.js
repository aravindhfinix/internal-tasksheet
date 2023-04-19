import responseHandler from "../../../../utils/response-handler";
import { Project } from "../models/project-model";




class GetProjectController {

    constructor() {
    }
    /**
      * @description   api to get project
      * @param {*} req
      */
    get(req, res) {
        try {
            Project.findById(req.params.id).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Project retrived successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Project not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new GetProjectController();
