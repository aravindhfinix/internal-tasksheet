import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class DeteteTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to delete teamSheet
      * @param {*} req
      */
    delete(req, res) {
        try {
            TeamSheet.findByIdAndDelete(req.params.id).exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'TeamSheet deleted successfully');
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


export default new DeteteTeamSheetController();
