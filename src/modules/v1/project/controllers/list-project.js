import responseHandler from "../../../../utils/response-handler";
import { Project } from "../models/project-model";




class ListProjectController {

    constructor() {
    }
    /**
      * @description   api to list project
      * @param {*} req
      */
    list(req, res) {
        try {
            Project.find().exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result.length != 0) {
                    responseHandler.successResponse(res, result, 'Projects retrived successfully');
                } else {
                    responseHandler.successResponse(res, {}, 'Projects not found');
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new ListProjectController();
