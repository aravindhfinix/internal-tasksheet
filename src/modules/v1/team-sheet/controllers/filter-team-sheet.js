import responseHandler from "../../../../utils/response-handler";
import { TeamSheet } from "../models/task-sheet-model";


class FilterTeamSheetController {

    constructor() {
    }
    /**
      * @description   api to get teamSheet
      * @param {*} req
      */
    async list(req, res) {
        try {
            let search = await searchParams(req.query)
            TeamSheet.find(search).populate('employee_id project_id').exec((err, result) => {
                if (err) return responseHandler.errorResponse(res, err, err.message, 400);
                if (result != 0) {
                    responseHandler.successResponse(res, result, 'TeamSheets retrived successfully');
                } else {
                    responseHandler.errorResponse(res, {}, 'TeamSheets not found', 400);
                }
            })
        } catch (err) {
            console.log(err)
            responseHandler.errorResponse(res, err);
        }
    }
}


export default new FilterTeamSheetController();


const searchParams = (filter) => {
    return new Promise((resolve, reject) => {
        let params = {}
        if (filter.employee_id) params.employee_id = filter.employee_id
        if (filter.project_id) params.project_id = filter.project_id
        if (filter.date) {
            const nextDay = new Date(filter.date);
            nextDay.setDate(nextDay.getDate() + 1);
            params.date = { $gte: new Date(filter.date), $lt: new Date(nextDay) }
        }
        if (filter.range) {
            const dates = filter.range.split(',')
            params.date = { $gte: new Date(dates[0]), $lte: new Date(dates[1]) }
        }
        resolve(params)
    })
}