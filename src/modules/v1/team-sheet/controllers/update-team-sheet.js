import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class UpdateTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to update teamSheet
      * @param {*} req
      */
    update(req, res) {
        try {
            TeamSheet.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'TeamSheet updated successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'TeamSheet not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new UpdateTeamSheetController();
