import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class GetTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to get teamSheet
      * @param {*} req
      */
    get(req, res) {
        try {
            TeamSheet.findById(req.params.id).populate('employee_id project_id').exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result) {
                    responseHandler.successResponse(res, result, 'TeamSheet retrived successfully');
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


export default new GetTeamSheetController();
