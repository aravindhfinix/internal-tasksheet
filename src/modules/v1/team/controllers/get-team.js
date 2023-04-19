import responseHandler from "../../../../utils/response-handler";
import { Team } from "../models/team-model";




class GetTeamController {

    constructor() {
    }
    /**
      * @description   api to get team
      * @param {*} req
      */
    get(req, res) {
        try {
            Team.findById(req.params.id).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Team retrived successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Team not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new GetTeamController();
