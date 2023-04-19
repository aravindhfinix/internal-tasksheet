import responseHandler from "../../../../utils/response-handler";
import { Team } from "../models/team-model";




class ListTeamController {

    constructor() {
    }
    /**
      * @description   api to list team
      * @param {*} req
      */
    list(req, res) {
        try {
            Team.find().exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result.length != 0) {
                    responseHandler.successResponse(res, result, 'Teams retrived successfully');
                } else {
                    responseHandler.successResponse(res, {}, 'Teams not found');
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new ListTeamController();
