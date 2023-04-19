import responseHandler from "../../../../utils/response-handler";
import { Project } from "../models/project-model";




class UpdateProjectController {

    constructor() {
    }
    /**
      * @description   api to update project
      * @param {*} req
      */
    update(req, res) {
        try {
            Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Project updated successfully');
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


export default new UpdateProjectController();
