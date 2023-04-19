import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class ListTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to list teamSheet
      * @param {*} req
      */
    list(req, res) {
        try {
            TeamSheet.find().populate('employee_id project_id').exec((err, result) => {
                if (err) responseHandler.errorResponse(res, err, err.message, 400);
                if (result.length != 0) {
                    responseHandler.successResponse(res, result, 'TeamSheets retrived successfully');
                } else {
                    responseHandler.successResponse(res, {}, 'TeamSheets not found');
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new ListTeamSheetController();
