import responseHandler from "../../../../utils/response-handler";
import { Team } from "../models/team-model";




class UpdateTeamController {

    constructor() {
    }
    /**
      * @description   api to update team
      * @param {*} req
      */
    update(req, res) {
        try {
            Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Team updated successfully');
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


export default new UpdateTeamController();
