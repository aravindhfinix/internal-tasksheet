import responseHandler from "../../../../utils/response-handler";
import { Team } from "../models/team-model";




class DeteteTeamController {

    constructor() {
    }
    /**
      * @description   api to delete team
      * @param {*} req
      */
    delete(req, res) {
        try {
            Team.findByIdAndDelete(req.params.id).exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Team deleted successfully');
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


export default new DeteteTeamController();
