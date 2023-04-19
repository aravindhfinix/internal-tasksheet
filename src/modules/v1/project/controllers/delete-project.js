import responseHandler from "../../../../utils/response-handler";
import { Project } from "../models/project-model";




class DeteteProjectController {

    constructor() {
    }
    /**
      * @description   api to delete project
      * @param {*} req
      */
    delete(req, res) {
        try {
            Project.findByIdAndDelete(req.params.id).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Project deleted successfully');
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


export default new DeteteProjectController();
