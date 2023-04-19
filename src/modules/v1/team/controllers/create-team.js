import responseHandler from "../../../../utils/response-handler";
import { Team } from "../models/team-model";




class CreateTeamController {

    constructor() {
    }
    /**
      * @description   api to create team
      * @param {*} req
      */
    create(req, res) {
        try {
            Team.create(req.body, (err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'Team created successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'Team cration failed', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new CreateTeamController();
