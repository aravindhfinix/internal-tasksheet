import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class CreateTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to create teamSheet
      * @param {*} req
      */
    create(req, res) {
        try {
            TeamSheet.create(req.body, (err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'TeamSheet created successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'TeamSheet cration failed', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new CreateTeamSheetController();
